/**
 * Simple tool to test the Business Name Generator API directly
 * Run with: node tools/test-api.js
 */

async function testBngApi() {
  const businessType = process.argv[2] || 'coffee shop';
  
  console.log(`Testing BNG API with business type: "${businessType}"`);
  
  // Construct the query string like the client would
  const query = `Keyword:${businessType};Location:;Industry:;Tone:Creative`;
  
  try {
    // Make a direct POST request to the API
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/bng/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/event-stream', // Updated to match the API expectation
      },
      body: JSON.stringify({
        query,
        bngId: 'test_api_tool',
        env: 'dev',
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}:`, errorText);
      return;
    }
    
    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);
    
    // Process the server-sent events
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let names = [];
    let buffer = '';
    
    console.log('Starting to process SSE stream...');
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        console.log('Stream complete');
        break;
      }
      
      // Decode the chunk
      const chunk = decoder.decode(value, { stream: true });
      console.log('Received chunk:', chunk.length > 100 ? chunk.substring(0, 100) + '...' : chunk);
      
      // Add chunk to buffer
      buffer += chunk;
      
      // Process server-sent events in the format "data: value\n\n"
      const events = buffer.split('\n\n');
      buffer = events.pop() || ''; // Keep the last (potentially incomplete) event in the buffer
      
      for (const event of events) {
        if (event.trim().startsWith('data:')) {
          const data = event.substring(5).trim();
          try {
            // Data is URL encoded
            const decodedData = decodeURIComponent(data);
            console.log('Decoded data:', decodedData);
            
            // Process each line in the decoded data
            const lines = decodedData.split('\n')
              .map(line => line.trim())
              .filter(line => line);
            
            for (const line of lines) {
              names.push(line);
              console.log(`Business name: ${line}`);
            }
          } catch (e) {
            console.error('Error decoding data:', e, data);
          }
        }
      }
    }
    
    console.log(`Total names received: ${names.length}`);
    if (names.length > 0) {
      console.log('First 10 names:', names.slice(0, 10));
    }
  } catch (error) {
    console.error('Error testing BNG API:', error);
  }
}

testBngApi();