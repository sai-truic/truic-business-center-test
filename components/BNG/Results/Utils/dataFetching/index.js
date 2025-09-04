/**
 * Data fetching utilities for BNG
 */

import { sendRequest } from './apiClient';
import { processResult, removeDuplicateResponses } from './resultProcessor';
import { processStreamBuffer, processStreamChunk } from './streamProcessor';
import { smoothProcessor } from './smoother';

/**
 * Fetch data from the BNG API
 * @param {string} bng_result - The BNG query string
 * @param {string} bngId - The BNG ID
 * @param {string} bng_env - The environment (prod, dev, etc.)
 * @param {number} max_request_time - Maximum request time in milliseconds
 * @param {Function} setIsLoading - Callback to update loading state
 * @param {Function} setResults - Callback to update results
 * @param {Array} collectedNames - Array of collected names
 * @param {Function} setCollectedNames - Callback to update collected names
 * @param {Function} setIsStreaming - Callback to update streaming state
 * @returns {Promise<Array>} - Promise resolving to an array of processed results
 */
export const fetchData = async (
  bng_result, 
  bngId, 
  bng_env, 
  max_request_time, 
  setIsLoading, 
  setResults, 
  collectedNames, 
  setCollectedNames,
  setIsStreaming
) => {
  
  try {
    await sendRequest(
      bng_result, 
      bngId, 
      bng_env, 
      collectedNames, 
      setCollectedNames,
      setIsLoading,
      setIsStreaming
    );
    
    // Limit collectedNames to maximum 100 items
    const limitedNames = Array.isArray(collectedNames) ? collectedNames.slice(0, 100) : [];
    
    // Process results into the format needed by the UI
    const result_json = processResult(limitedNames, []);

    // Ensure we don't exceed 100 results
    const finalResults = result_json.slice(0, 100);
    
    // Set results state with processed data (limited to 100)
    setResults(finalResults);
    
    // Update collectedNames to match the limit (safety net)
    if (collectedNames.length > 100) {
      console.log("FetchData: Limiting collectedNames from", collectedNames.length, "to 100");
      setCollectedNames(limitedNames);
    }
    
    return finalResults;
  } catch (error) {
    console.error("Error in fetchData:", error);
    setResults([]);
    return [];
  } finally {
    setIsLoading(false); // set loading state to false when fetching ends
  }
};

// Export other utilities
export {
  sendRequest,
  processResult,
  removeDuplicateResponses,
  processStreamBuffer,
  processStreamChunk,
  smoothProcessor
};