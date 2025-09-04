import React, { forwardRef, useEffect, useLayoutEffect } from 'react';

/**
 * The header section of the domain tab view with back/close buttons and title
 */
const DomainTabHeader = forwardRef(({ domainName, onClose }, ref) => {
  console.log("DomainTabHeader: Component function called :", domainName);
  
  // Scroll to header when component mounts
  useLayoutEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [ref]);
  
  return (
    <div 
      ref={ref} 
      id="domain-tab-header" 
      data-domain-header="true"
      className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800/30"
    >
      <div className="flex items-center">
        <button 
          onClick={onClose}
          className="flex items-center text-white hover:text-gray-300 font-semibold text-sm transition-colors"
          aria-label="Back to Results"
          data-back-button="true"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd"
            />
          </svg>
          <span>Back to Results</span>
        </button>
      </div>
      
      <h2 className="text-xl font-bold text-center text-white">
        Domains for &quot;{domainName}&quot;
      </h2>
      
      {/* Empty div to maintain spacing with flex justify-between */}
      <div className="w-[120px]"></div>
    </div>
  );
});

// Display name for debugging purposes
DomainTabHeader.displayName = 'DomainTabHeader';

export default DomainTabHeader;
