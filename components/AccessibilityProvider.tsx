import React, { useEffect } from 'react';
import { FocusScope } from '@react-aria/focus';

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  useEffect(() => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-primary-foreground p-2 z-50';
    skipLink.setAttribute('aria-label', 'Skip to main content');
    
    if (!document.getElementById('skip-link')) {
      skipLink.id = 'skip-link';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    return () => {
      const existingSkipLink = document.getElementById('skip-link');
      if (existingSkipLink) {
        existingSkipLink.remove();
      }
    };
  }, []);

  return (
    <FocusScope contain={false} restoreFocus autoFocus={false}>
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
    </FocusScope>
  );
}