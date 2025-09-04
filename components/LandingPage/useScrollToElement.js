import { useRef, useCallback } from 'react';

const useScrollToElement = () => {
  const elementRef = useRef(null);

  const scrollToElement = useCallback(() => {
    if (elementRef.current) {
      const navHeight = 80; // Adjust this value based on your navigation bar height
      const yOffset = -navHeight;

      // Force a reflow to ensure the latest layout is used
      void elementRef.current.offsetHeight;

      const y = elementRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // Use smooth scrolling with a callback
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      // Additional check to ensure the element is in view after scrolling
      const checkIfInView = () => {
        const rect = elementRef.current.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Wait for the scroll to finish before checking
      setTimeout(checkIfInView, 1000); // Adjust timeout as needed
    }
  }, []);

  return [elementRef, scrollToElement];
};

export default useScrollToElement;
