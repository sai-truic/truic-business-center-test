/**
 * API client for making requests to the BNG API
 */

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { processStreamBuffer } from './streamProcessor';
import { smoothProcessor } from './smoother';

/**
 * Safely parse JSON string to object, returning null on error
 * @param {string} jsonString - JSON string to parse
 * @returns {object|null} - Parsed object or null on error
 */
function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Error parsing JSON:", e, jsonString);
    return null;
  }
}

/**
 * Send a request to the BNG API
 * @param {string} bng_result - The BNG query string
 * @param {string} bngId - The BNG ID
 * @param {string} bng_env - The environment (prod, dev, etc.)
 * @param {Array} collectedNamesArray - Array of collected names
 * @param {Function} setCollectedNamesCallback - Callback to update collected names
 * @param {Function} setIsLoadingCallback - Callback to update loading state
 * @param {Function} setIsStreamingCallback - Callback to update streaming state
 * @returns {Promise} - Promise resolving to the API response
 */
export const sendRequest = async (
  bng_result, 
  bngId, 
  bng_env, 
  collectedNamesArray, 
  setCollectedNamesCallback,
  setIsLoadingCallback,
  setIsStreamingCallback
) => {
  // Set up the processor to handle streaming results
  smoothProcessor.setCallback(nameObj => {
    if (typeof setCollectedNamesCallback === 'function') {
      // Ensure we have a proper object with a name property
      if (!nameObj || typeof nameObj !== 'object') {
        console.warn('Invalid name object:', nameObj);
        return;
      }
      
      const name = nameObj.name;
      
      // Skip invalid names
      if (!name || typeof name !== 'string' || name.trim() === '') {
        console.warn('Invalid name in name object:', nameObj);
        return;
      }
      
      // Add one name at a time to the collection, but only if under 100 limit
      setCollectedNamesCallback(prevNames => {
        // Enforce 100-name limit in the callback itself
        if (prevNames.length >= 100) {
          console.log("Callback: Limit reached, not adding more names");
          return prevNames; // Don't add if already at limit
        }
        
        // Check for duplicates
        if (prevNames.some(item => item.name === name)) {
          console.log("Callback: Duplicate name, not adding:", name);
          return prevNames;
        }
        
        return [...prevNames, {
          name: name,
          extensions: nameObj.extensions || ['.com'],
        }];
      });
    }
  });

  let result;
  let streamBuffer = '';
  const delimiter = '  \n'; // This is the decoded version of %20%20%0A
  
  // Reference to track locally collected names in this function
  let localCollectedNames = Array.isArray(collectedNamesArray) ? [...collectedNamesArray] : [];
  
  // Timeout tracking for stream completion
  let lastResultTimestamp = Date.now();
  let completionTimeoutId = null;
  let finalTimeoutId = null;
  const STREAM_COMPLETION_TIMEOUT = 2000; // 2 seconds
  const FINAL_TIMEOUT = 1000; // 1 second after last activity for final enable

  const start_time = Date.now();
  
  // Function to complete the stream after timeout
  const completeStreamAfterTimeout = (resolve) => {
    console.log("Stream completed after 2-second timeout from last result");
    
    // Set a final timeout to ensure input is re-enabled after 1 more second
    finalTimeoutId = setTimeout(() => {
      console.log("Final timeout: Ensuring input is re-enabled after 1 second");
      if (typeof setIsStreamingCallback === 'function') {
        setIsStreamingCallback(false);
      }
    }, FINAL_TIMEOUT);
    
    // Set streaming to false when timeout completes (input will be re-enabled)
    if (typeof setIsStreamingCallback === 'function') {
      setIsStreamingCallback(false);
    }
    // Keep loading false so results stay visible
    resolve({ status: "success", message: "Stream completed after timeout" });
  };
  
  // Function to reset the completion timeout
  const resetCompletionTimeout = (resolve) => {
    if (completionTimeoutId) {
      clearTimeout(completionTimeoutId);
    }
    if (finalTimeoutId) {
      clearTimeout(finalTimeoutId);
    }
    completionTimeoutId = setTimeout(() => {
      completeStreamAfterTimeout(resolve);
    }, STREAM_COMPLETION_TIMEOUT);
  };
  
  try {
    // Create a promise that will resolve with the final result
    return new Promise((resolve) => {
      fetchEventSource('/api/bng/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: bng_result, bngId, env: bng_env }),
        openWhenHidden: true,
        onopen() {
          console.log("Stream connection opened");
          // Set streaming state to true when stream starts (disables input)
          if (typeof setIsStreamingCallback === 'function') {
            setIsStreamingCallback(true);
          }
          // Set loading to false immediately so results can be shown
          if (typeof setIsLoadingCallback === 'function') {
            setIsLoadingCallback(false);
          }
          // Start the initial timeout when stream opens
          resetCompletionTimeout(resolve);
        },
        onmessage(event) {
          try {
            // Process server-sent events in the format "data: encodedValue"
            // Update timestamp for timeout tracking
            lastResultTimestamp = Date.now();
            
            // Reset the completion timeout since we received new data
            resetCompletionTimeout(resolve);
            
            // Try to decode the data
            // Exactly matching epicbusinessnames approach for consistency
            try {
              // Decode the event data - this contains a single line or partial line of text
              const decodedData = decodeURIComponent(event.data);
              
              // Simple logging to avoid console spam
              if (decodedData.trim()) {
                console.log("Received data:", decodedData.length > 30 ? decodedData.substring(0, 30) + "..." : decodedData);
              }
              
              // Append to the buffer - accumulating text until we get complete lines
              streamBuffer += decodedData;
              
              // Process the buffer using the exact same approach as epicbusinessnames
              const { chunks, newBuffer } = processStreamBuffer(streamBuffer, delimiter);
              
              // Update the buffer with any remaining partial data
              streamBuffer = newBuffer;
              
              // Process collected chunks
              if (chunks.length > 0) {
                // Flatten the chunks and process as business names
                // IMPORTANT: We don't do any splitting here - we preserve whole lines exactly as they come
                const newNames = chunks.flat()
                  .map(name => name.trim())
                  .filter(name => name && name.length >= 1) // Allow any valid name
                  .map(name => {
                    // Only remove leading numbers if present (like "1. Name")
                    // but don't do any other transformations
                    const cleanName = name.replace(/^\d+\.\s*/, '').trim();
                    return {
                      name: cleanName,
                      extensions: ['.com', '.io', '.co', '.net'] // Default extensions
                    };
                  });
                
                if (newNames.length > 0) {
                  // Update local reference for tracking
                  localCollectedNames = [...localCollectedNames, ...newNames];
                  
                  // Check if we've reached the 100 name limit
                  if (localCollectedNames.length >= 100) {
                    console.log("Reached the 100 name limit, stopping collection");
                    // Clear the smooth processor queue to prevent additional processing
                    smoothProcessor.clearQueue();
                    // Clear timeout since we're completing due to limit
                    if (completionTimeoutId) {
                      clearTimeout(completionTimeoutId);
                    }
                    if (finalTimeoutId) {
                      clearTimeout(finalTimeoutId);
                    }
                    // Set streaming to false when limit reached (keeps input disabled permanently)
                    if (typeof setIsStreamingCallback === 'function') {
                      setIsStreamingCallback(false);
                    }
                    resolve({ status: "success", message: "Completed (100 name limit reached)" });
                    return;
                  }
                  
                  // Only add names to queue if we're still under the limit
                  const currentCount = localCollectedNames.length - newNames.length; // Count before adding these names
                  const remainingSlots = 100 - currentCount;
                  const namesToQueue = remainingSlots > 0 ? newNames.slice(0, remainingSlots) : [];
                  
                  if (namesToQueue.length > 0) {
                    // Add the names to the smooth processor queue - this displays them immediately
                    smoothProcessor.addItems(namesToQueue);
                    console.log("Business names added to queue:", namesToQueue.length, "names");
                  } else {
                    console.log("No names queued - would exceed 100 limit");
                  }
                  
                  // Log for debugging
                  console.log("Current total names collected:", localCollectedNames.length);
                }
              }
            } catch (error) {
              console.error("Error processing stream data:", error);
            }
          } catch (parseError) {
            console.error("Error parsing event data:", parseError, event.data);
          }
        },
        onclose() {
          console.log("Stream closed by the server.");
          // Clear timeout since stream closed naturally
          if (completionTimeoutId) {
            clearTimeout(completionTimeoutId);
          }
          if (finalTimeoutId) {
            clearTimeout(finalTimeoutId);
          }
          // Set streaming to false when stream closes (re-enables input)
          if (typeof setIsStreamingCallback === 'function') {
            setIsStreamingCallback(false);
          }
          resolve({ status: "success", message: "Stream completed" });
        },
        onerror(err) {
          console.error("Stream error:", err);
          // Clear timeout on error
          if (completionTimeoutId) {
            clearTimeout(completionTimeoutId);
          }
          if (finalTimeoutId) {
            clearTimeout(finalTimeoutId);
          }
          // Set streaming to false on error (re-enables input)
          if (typeof setIsStreamingCallback === 'function') {
            setIsStreamingCallback(false);
          }
          // Set loading to false on error
          if (typeof setIsLoadingCallback === 'function') {
            setIsLoadingCallback(false);
          }
        }
      });
    });
  } catch (e) {
    // Clean up timeout on exception
    if (completionTimeoutId) {
      clearTimeout(completionTimeoutId);
    }
    if (finalTimeoutId) {
      clearTimeout(finalTimeoutId);
    }
    
    // Set streaming to false on exception (re-enables input)
    if (typeof setIsStreamingCallback === 'function') {
      setIsStreamingCallback(false);
    }
    
    // Ensure loading is set to false on exception
    if (typeof setIsLoadingCallback === 'function') {
      setIsLoadingCallback(false);
    }
    
    result = {
      "status": "Failed with error",
      "error": e.toString()
    };
    return result;
  }
};