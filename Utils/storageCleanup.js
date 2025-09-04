/**
 * Utility function to clean up localStorage to prevent QuotaExceededError
 * Especially targets Clerk telemetry data which can accumulate over time
 */
export const cleanupLocalStorage = () => {
  try {
    // Get total localStorage usage (rough estimate)
    const totalSize = Object.keys(localStorage).reduce((total, key) => {
      return total + (localStorage[key] ? localStorage[key].length : 0);
    }, 0);

    // If storage is getting close to quota (most browsers have ~5MB), clean up
    // Assuming 4MB (4 * 1024 * 1024) as a safe threshold
    if (totalSize > 4 * 1024 * 1024) {
      console.log('localStorage cleanup initiated due to high usage');
      
      // Clear Clerk telemetry data first
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('clerk_telemetry') || 
            key.includes('telemetry') || 
            key.includes('clerk') && key.includes('throttler')) {
          localStorage.removeItem(key);
        }
      });

      // If still too large, clean up other cache items, session storage
      const remainingSize = Object.keys(localStorage).reduce((total, key) => {
        return total + (localStorage[key] ? localStorage[key].length : 0);
      }, 0);

      if (remainingSize > 3 * 1024 * 1024) {
        // Get all keys sorted by size (largest first)
        const keySizes = Object.keys(localStorage).map(key => ({
          key, 
          size: localStorage[key] ? localStorage[key].length : 0
        })).sort((a, b) => b.size - a.size);
        
        // Remove the largest items that aren't critical
        // Be cautious - don't remove authentication or important app state
        for (const {key, size} of keySizes) {
          // Skip important keys
          if (key.includes('user') || 
              key.includes('auth') || 
              key.includes('token') || 
              key.includes('persist')) {
            continue;
          }
          
          // Remove large caches or temporary data
          if (key.includes('cache') || 
              key.includes('temp') || 
              key.includes('history') ||
              size > 100000) { // Items larger than ~100KB
            localStorage.removeItem(key);
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error cleaning up localStorage:', error);
  }
};

/**
 * Clear Clerk-specific telemetry data
 */
export const clearClerkTelemetry = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('clerk_telemetry') || 
          key.includes('telemetry') || 
          key.includes('clerk') && key.includes('throttler')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Error clearing Clerk telemetry:', error);
  }
};