import React, { forwardRef, useEffect } from 'react';
import useDomainProcessing from './hooks/useDomainProcessing';
import useInputState from '../../../useInputState';

// Component imports
import DomainTabHeader from './DomainTabHeader';
import DomainLoading from './DomainLoading';
import DomainError from './DomainError';
import DomainCategoryAccordion from './DomainCategoryAccordion';
import EmptyView from './EmptyView';

/**
 * Component to display all available domains for a name in a tab within the page
 * This is displayed when a user clicks on a domain name in the results list
 */
const DomainTabView = forwardRef(({ domainName, onClose, availableDomains = [], configProps = {} }, ref) => {
  
  console.log("DomainTabView: Component function called :", domainName);
  
  // Get correctedRoute from global state
  const { correctedRoute } = useInputState();
  
  // Use custom hook for domain processing
  const { domains, domainsByCategory, loading, error } = useDomainProcessing(
    domainName,
    availableDomains,
    correctedRoute
  );

  // Handle direct selection of a specific domain extension
  const handleCheckDomain = (checkUrl) => {
    window.open(checkUrl, '_blank'); // Open in a new tab
  };

  // Render loading state
  if (loading) {
    return <DomainLoading ref={ref} onClose={onClose} domainName={domainName} configProps={configProps} />;
  }

  // Render error state
  if (error) {
    return <DomainError ref={ref} error={error} onClose={onClose} domainName={domainName} configProps={configProps} />;
  }

  // Render main content
  return (
    <div className="relative max-w-6xl mx-auto bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
      <DomainTabHeader ref={ref} domainName={domainName} onClose={onClose} configProps={configProps} />
      
      <div className="bg-gray-50">
        {Object.keys(domainsByCategory).length > 0 ? (
          <>
            {Object.entries(domainsByCategory).map(([category, categoryDomains]) => (
              <DomainCategoryAccordion 
                key={category}
                category={category} 
                domains={categoryDomains} 
                domainName={domainName}
                onCheckDomain={handleCheckDomain}
                configProps={configProps}
              />
            ))}
          </>
        ) : (
          <EmptyView />
        )}
      </div>
    </div>
  );
});

// Display name for debugging purposes
DomainTabView.displayName = 'DomainTabView';

export default DomainTabView;
