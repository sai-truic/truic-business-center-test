import { useUser } from "@clerk/nextjs";

/**
 * Safe wrapper for useUser hook that handles cases where ClerkProvider is not available
 * @returns {Object} User object with isLoaded, isSignedIn, and user properties
 */
export const useSafeUser = () => {
  try {
    const clerkUser = useUser();
    return clerkUser;
  } catch (error) {
    console.warn('ClerkProvider not available:', error.message);
    return {
      isLoaded: false,
      isSignedIn: false,
      user: null
    };
  }
};