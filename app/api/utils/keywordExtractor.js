/**
 * Extracts the business name keyword from the BNG result string
 * @param {string|null} input - BNG result string containing keyword
 * @returns {string} - Extracted keyword or default value if not found
 */
export function extractKeyword(input) {
  // If input is null, undefined, or not a string, return default
  if (!input || typeof input !== 'string') {
    console.log('Input is not a valid string, using default business name');
    return 'Sample Business';
  }

  // If input doesn't contain "Keyword:", treat the entire input as the business name
  if (!input.includes('Keyword:')) {
    console.log('Using entire input as business name:', input);
    return input.trim();
  }
  
  // Split the input string by semicolons
  const parts = input.split(';');
  
  // Find the part that starts with "Keyword:"
  const keywordPart = parts.find(part => part.trim().startsWith('Keyword:'));
  
  if (keywordPart) {
    // Extract the keyword by removing "Keyword:" and trimming whitespace
    const keyword = keywordPart.replace('Keyword:', '').trim();
    console.log('Extracted keyword:', keyword);
    return keyword;
  } else {
    // Return default if keyword format is not found
    console.log('Keyword format not found, using default business name');
    return 'Sample Business';
  }
}

/**
 * Helper function to extract industry from BNG result string
 * @param {string|null} input - BNG result string containing industry
 * @returns {string|null} - Extracted industry or null if not found
 */
export function extractIndustry(input) {
  // If input is null, undefined, or not a string, return null
  if (!input || typeof input !== 'string') {
    return null;
  }

  // If input doesn't contain "Industry:", return null
  if (!input.includes('Industry:')) {
    return null;
  }
  
  // Split the input string by semicolons
  const parts = input.split(';');
  
  // Find the part that starts with "Industry:"
  const industryPart = parts.find(part => part.trim().startsWith('Industry:'));
  
  if (industryPart) {
    // Extract the industry by removing "Industry:" and trimming whitespace
    const industry = industryPart.replace('Industry:', '').trim();
    // Only return non-empty industry values
    return industry && industry !== '' ? industry : null;
  }
  
  return null;
}

/**
 * Helper function to extract location from BNG result string
 * @param {string|null} input - BNG result string containing location
 * @returns {string|null} - Extracted location or null if not found
 */
export function extractLocation(input) {
  // If input is null, undefined, or not a string, return null
  if (!input || typeof input !== 'string') {
    return null;
  }

  // If input doesn't contain "Location:", return null
  if (!input.includes('Location:')) {
    return null;
  }
  
  // Split the input string by semicolons
  const parts = input.split(';');
  
  // Find the part that starts with "Location:"
  const locationPart = parts.find(part => part.trim().startsWith('Location:'));
  
  if (locationPart) {
    // Extract the location by removing "Location:" and trimming whitespace
    const location = locationPart.replace('Location:', '').trim();
    // Only return non-empty location values
    return location && location !== '' ? location : null;
  }
  
  return null;
}