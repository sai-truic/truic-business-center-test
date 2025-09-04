/**
 * Fetch business name data from the API
 */

/**
 * Fetches business name data from the API
 * @param {string} query - The query string for the API
 * @param {string} bngId - The BNG ID for analytics
 * @param {string} env - The environment to use (prod or dev)
 * @param {number} max_request_time - Maximum request time in milliseconds
 * @param {Function} setIsLoading - Function to set loading state
 * @param {Function} setResults - Function to set results state
 * @param {Array} collectedNames - Array of already collected names
 * @param {Function} setCollectedNames - Function to set collected names state
 * @param {Function} setIsStreaming - Function to set streaming state
 * @returns {Promise<void>}
 */
export const fetchData = async (
  query,
  bngId,
  env,
  max_request_time,
  setIsLoading,
  setResults,
  collectedNames,
  setCollectedNames,
  setIsStreaming
) => {
  // Create a timeout promise that will reject after the max_request_time
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), max_request_time);
  });
  
  // Reference to abortController for cleanup
  const abortController = new AbortController();
  const signal = abortController.signal;
  
  try {
    // Clean empty parameters from the query
    const cleanQuery = query.replace(/;Industry:;/g, ';');
    
    // Extract keyword to validate request
    const keywordMatch = cleanQuery.match(/Keyword:([^;]+)/);
    if (!keywordMatch || !keywordMatch[1].trim()) {
      console.error('No keyword provided in query');
      throw new Error('A business keyword is required');
    }

    // Start a fetch with streaming response
    const fetchPromise = fetch('/api/bng/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/event-stream', // Updated to match API's SSE format
      },
      body: JSON.stringify({
        query: cleanQuery,
        bngId: bngId || 'business_center_bng',
        env: env || 'prod',
      }),
      signal, // Add abort signal
    });
    
    // Race the fetch against the timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);

    // Check if the response is not a Response object (indicating the timeout won)
    if (!(response instanceof Response)) {
      throw new Error('Request timeout');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}:`, errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Get the reader from the response body
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    const SSE_DELIMITER = '\n\n'; // Delimiter for server-sent events
    const DATA_PREFIX = 'data:'; // Prefix for SSE data

    // Counter for names collected in this request
    let namesCollectedInThisRequest = 0;
    const MAX_NAMES = 100;

    // Process the stream as server-sent events
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        console.log('Stream reading complete');
        break;
      }
      
      // Add the new chunk to our buffer
      buffer += decoder.decode(value, { stream: true });
      
      // Process complete SSE events in the buffer
      const events = buffer.split(SSE_DELIMITER);
      // Keep the last (potentially incomplete) event in the buffer
      buffer = events.pop() || '';
      
      for (const event of events) {
        if (event.trim().startsWith(DATA_PREFIX)) {
          const data = event.substring(DATA_PREFIX.length).trim();
          
          try {
            // Data is URL encoded
            const decodedData = decodeURIComponent(data);
            console.log('Decoded SSE data:', decodedData);
            
            // Process each line in the decoded data
            const lines = decodedData.split('\n')
              .map(line => line.trim())
              .filter(line => line);
            
            for (const line of lines) {
              // Skip if we've already collected enough names
              if (namesCollectedInThisRequest >= MAX_NAMES) {
                console.log(`Already collected ${MAX_NAMES} names, ignoring additional names`);
                continue;
              }
              
              // Create a business name object
              const businessName = {
                name: line,
                extensions: ['.com']
              };
              
              // Add random additional extensions
              if (Math.random() > 0.3) businessName.extensions.push('.io');
              if (Math.random() > 0.5) businessName.extensions.push('.co');
              if (Math.random() > 0.7) businessName.extensions.push('.net');
              
              // Add to collected names
              setCollectedNames(prev => {
                if (prev.length >= MAX_NAMES) return prev;
                
                // Check for duplicates
                const exists = prev.some(n => n.name === line);
                if (exists) return prev;
                
                // Add the new name
                namesCollectedInThisRequest++;
                return [...prev, businessName];
              });
            }
          } catch (e) {
            console.error('Error processing event data:', e, data);
          }
        }
      }
    }

    // When stream is finished, update the results with collected names
    setResults(prevResults => {
      // If we already have results, don't overwrite them
      if (prevResults && prevResults.length > 0) return prevResults;
      return [...collectedNames].slice(0, MAX_NAMES);
    });

    console.log(`Successfully collected ${namesCollectedInThisRequest} business names`);
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Set empty results if we have none
    setResults(prevResults => {
      if (!prevResults || prevResults.length === 0) return [];
      return prevResults;
    });
    
    // Re-throw the error for the component to handle
    throw error;
  } finally {
    // Abort the fetch if it's still in progress
    abortController.abort();
    
    // Clean up states
    setIsLoading(false);
    setIsStreaming(false);
  }
};

export default fetchData;