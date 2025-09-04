import { useState } from 'react';
import useInputState from '../components/useInputState';

const useNewsletterSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getState } = useInputState();

  const signUp = async (email, name) => {
    setIsLoading(true);
    setError(null);

    try {
      const onboardingData = getState('onboarding', 'data');
      const response = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, onboardingData }),
      });

      if (!response.ok) {
        throw new Error('Newsletter signup failed');
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  return { signUp, isLoading, error };
};

export default useNewsletterSignup;
