/**
 * Process results from the BNG API
 */

/**
 * Remove duplicate responses from collected names
 * @param {Array} allResponses - All responses collected from the API
 * @returns {Array} - Array with duplicates removed
 */
export const removeDuplicateResponses = (allResponses) => {
  const uniqueNames = new Set();
  const uniqueResponses = [];

  if (!allResponses || !Array.isArray(allResponses)) {
    console.warn("removeDuplicateResponses called with invalid input:", allResponses);
    return [];
  }

  for (const response of allResponses) {
    // Skip if response doesn't have a name
    if (!response || !response.name) continue;

    const name = typeof response.name === 'string' ? response.name.trim() : String(response.name).trim();
    
    // Skip empty names
    if (!name) continue;
    
    // Add to results if this name hasn't been seen yet
    if (!uniqueNames.has(name.toLowerCase())) {
      uniqueNames.add(name.toLowerCase());
      uniqueResponses.push(response);
    }
  }

  return uniqueResponses;
};

/**
 * Process raw results into the format needed by the UI
 * @param {Array} names - Array of name objects from the API
 * @param {Array} domains - Array of domain objects from the API
 * @returns {Array} - Processed results
 */
export const processResult = (names, domains) => {
  // Ensure names is an array, or return an empty array
  if (!Array.isArray(names)) {
    console.warn("processResult received non-array names:", names);
    return [];
  }
  
  // Filter out any invalid entries
  const validNames = names.filter(item => item && typeof item === 'object' && item.name);
  
  // Remove duplicates based on business name
  const uniqueNames = removeDuplicateResponses(validNames);
  
  // Return array with max 100 items
  return uniqueNames.slice(0, 100);
};