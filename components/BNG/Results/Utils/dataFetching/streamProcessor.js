/**
 * Stream processor for handling streaming data from the API
 * 
 * This implementation is based on the epicbusinessnames approach.
 * It processes text-based business names from server-sent events.
 */

/**
 * Process stream data and extract business names
 * @param {string} chunk - A chunk of data from the stream
 * @returns {string[]} - Array of business names as strings
 */
export const processStreamChunk = (chunk) => {
  if (!chunk || !chunk.trim()) {
    return [];
  }
  
  try {
    // ONLY split by newlines - exactly like epicbusinessnames
    // Do not attempt any other processing or splitting
    const names = chunk.split('\n')
      .map(line => line.trim())
      .filter(line => line && 
              line !== '%20%20%0A' &&
              line !== '\n');
    
    // Simple logging to avoid console spam
    if (names.length > 0) {
      console.log(`Processed ${names.length} names from chunk`);
    }
    
    return names;
  } catch (error) {
    console.error('Error processing stream chunk:', error, chunk);
    return [];
  }
};

/**
 * Process stream buffer and extract chunks separated by delimiters
 * @param {string} streamBuffer - The current stream buffer
 * @param {string} delimiter - The delimiter that separates chunks
 * @returns {Object} - Object containing processed chunks and the new buffer
 */
export const processStreamBuffer = (streamBuffer, delimiter) => {
  // Copy of the epicbusinessnames implementation exactly
  
  // If no delimiter is found, keep accumulating the buffer
  if (!streamBuffer.includes(delimiter)) {
    return { 
      chunks: [],
      newBuffer: streamBuffer
    };
  }

  try {
    // Split buffer by delimiter (exactly like epicbusinessnames)
    const parts = streamBuffer.split(delimiter);
    const completeParts = parts.slice(0, -1);
    const remainingBuffer = parts[parts.length - 1];
    
    // Process all complete chunks
    const processedChunks = completeParts
      .map(part => part.trim())
      .filter(Boolean)
      .map(processStreamChunk)
      .filter(lines => lines.length > 0);
    
    return {
      chunks: processedChunks,
      newBuffer: remainingBuffer
    };
  } catch (error) {
    console.error('Error processing stream buffer:', error);
    return {
      chunks: [],
      newBuffer: streamBuffer
    };
  }
};