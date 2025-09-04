/**
 * Helper functions for domain extension management
 */

/**
 * Stores domain extensions for a specific domain name
 * 
 * @param {Object} domainExtensions - Current domain extensions state object
 * @param {Function} setDomainExtensions - State setter function
 * @param {string} domainName - The domain name to store extensions for
 * @param {Array} extensions - Array of extension objects to store
 */
export const storeDomainExtensions = (domainExtensions, setDomainExtensions, domainName, extensions) => {
  if (!domainName || !extensions || !Array.isArray(extensions)) {
    return;
  }

  setDomainExtensions(prev => ({
    ...prev,
    [domainName]: extensions
  }));
};

/**
 * Retrieves domain extensions for a specific domain name
 * 
 * @param {Object} domainExtensions - Current domain extensions state object
 * @param {string} domainName - The domain name to get extensions for
 * @returns {Array} Array of extension objects or empty array if not found
 */
export const getDomainExtensions = (domainExtensions, domainName) => {
  if (!domainName || !domainExtensions) {
    return [];
  }
  
  return domainExtensions[domainName] || [];
};