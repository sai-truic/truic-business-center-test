import { domainCategories } from '../constants';

/**
 * Find the category of a domain extension
 * @param {string} extension - The domain extension (e.g., ".com")
 * @returns {string} - The category name or "Other" if no matching category found
 */
export const getDomainCategory = (extension) => {
  // Normalize the extension: trim whitespace, convert to lowercase
  let normalizedExtension = extension.trim().toLowerCase();
  
  // Ensure it has a leading dot
  if (!normalizedExtension.startsWith('.')) {
    normalizedExtension = '.' + normalizedExtension;
  }
  
  // Also create a version without the dot for complete matching coverage
  const extensionWithoutDot = normalizedExtension.substring(1);
  
  // Try to find a match in the domain categories
  for (const [category, extensions] of Object.entries(domainCategories)) {
    // Normalize each extension in the category for comparison
    const normalizedExtensions = extensions.map(ext => ext.trim().toLowerCase());
    
    // Check if either version of our extension is in the category
    if (normalizedExtensions.includes(normalizedExtension) || 
        normalizedExtensions.includes(extensionWithoutDot)) {
      return category;
    }
  }
  
  // If no match found in any category, return 'Other'
  return 'Other';
};

/**
 * Process domains from API response
 * @param {Array} availableExtensions - Array of available extensions
 * @param {string} domainName - Base domain name
 * @param {string} correctedRoute - Route parameter for tracking
 * @returns {Array} - Processed domain objects
 */
export const processDomains = (availableExtensions, domainName, correctedRoute = '') => {
  if (!availableExtensions || !Array.isArray(availableExtensions)) {
    return [];
  }

  const cleanDomainName = domainName.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "");

  return availableExtensions.map(extension => {
    // Ensure extension has a dot
    const normalizedExtension = extension.startsWith('.') ? extension : `.${extension}`;
    const fullDomain = `${cleanDomainName}${normalizedExtension}`;
    
    return {
      extension: normalizedExtension,
      fullDomain: fullDomain,
      checkUrl: `https://www.kqzyfj.com/click-5628080-15162961?sid=%2Aw%3Aepic%2Ap%3A${correctedRoute}2As%3A${fullDomain}&url=https%3A%2F%2Fwww.godaddy.com%2Fdomainsearch%2Ffind%3FdomainToCheck%3D${fullDomain}&cjelbDays=45`,
      available: true
    };
  });
};

/**
 * Group domains by category
 * @param {Array} domains - Array of domain objects
 * @param {string} domainName - Base domain name (optional)
 * @param {Object} context - Additional context (optional)
 * @returns {Object} - Domains grouped by category
 */
export const groupDomainsByCategory = (domains, domainName = '', context = {}) => {
  if (!domains || !Array.isArray(domains)) {
    return {};
  }

  const grouped = {};

  domains.forEach(domain => {
    const category = getDomainCategory(domain.extension);
    
    // Skip 'Other' category domains
    if (category === 'Other') {
      return;
    }

    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    grouped[category].push(domain);
  });

  // Sort categories to ensure 'Universal' comes first
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    if (a === 'Universal') return -1;
    if (b === 'Universal') return 1;
    return a.localeCompare(b);
  });

  const sortedGrouped = {};
  sortedCategories.forEach(category => {
    sortedGrouped[category] = grouped[category];
  });

  return sortedGrouped;
};
