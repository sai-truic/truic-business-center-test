import { useEffect } from 'react';

/**
 * Component to fix Clerk QuotaExceededError by patching localStorage
 */
const ClerkStorageFix = () => {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    try {
      // 1. Clean up existing Clerk telemetry data from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('clerk_telemetry') || 
            (key.includes('clerk') && key.includes('throttler'))) {
          localStorage.removeItem(key);
        }
      });

      // 2. Override localStorage.setItem to intercept Clerk telemetry writes
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function(key, value) {
        // If this is a Clerk telemetry key, don't store in localStorage
        if (key.startsWith('clerk_telemetry') || 
            (key.includes('clerk') && key.includes('throttler'))) {
          // Store in cookies instead with a short expiration (1 day)
          document.cookie = `${key}=${encodeURIComponent(value)};path=/;max-age=86400`;
          return; // Skip localStorage for these keys
        }
        
        // For all other keys, use the original localStorage behavior
        try {
          originalSetItem.call(localStorage, key, value);
        } catch (error) {
          // If we hit quota error, try to free up space
          if (error.name === 'QuotaExceededError') {
            console.warn('localStorage quota exceeded, cleaning up...');
            
            // Clear large or expendable items
            Object.keys(localStorage).forEach(k => {
              // Skip user data, auth tokens and important app state
              if (k.includes('user') || k.includes('auth') || 
                  k.includes('token') || k.includes('state')) {
                return;
              }
              
              // Clear caches, temp data, logs, etc.
              if (k.includes('cache') || k.includes('temp') || 
                  k.includes('log') || k.includes('history')) {
                localStorage.removeItem(k);
              }
            });
            
            // Try one more time
            try {
              originalSetItem.call(localStorage, key, value);
            } catch (retryError) {
              // If still failing, use cookies as fallback for this key too
              document.cookie = `${key}=${encodeURIComponent(value)};path=/;max-age=86400`;
            }
          }
        }
      };

      // 3. Override localStorage.getItem to retrieve from cookies if needed
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = function(key) {
        // For Clerk telemetry keys, try to get from cookies
        if (key.startsWith('clerk_telemetry') || 
            (key.includes('clerk') && key.includes('throttler'))) {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${key}=`)) {
              return decodeURIComponent(cookie.substring(key.length + 1));
            }
          }
          return null;
        }
        
        // For all other keys, use the original localStorage behavior
        return originalGetItem.call(localStorage, key);
      };

      // 4. Periodically clean up Clerk telemetry data
      const cleanupInterval = setInterval(() => {
        // Clean localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('clerk_telemetry') || 
              (key.includes('clerk') && key.includes('throttler'))) {
            localStorage.removeItem(key);
          }
        });
      }, 30 * 60 * 1000); // Every 30 minutes
      
      return () => clearInterval(cleanupInterval);
    } catch (error) {
      console.error('Error setting up Clerk storage fix:', error);
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default ClerkStorageFix;