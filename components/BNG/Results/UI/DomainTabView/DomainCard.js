import React from 'react';

// Add window.gtag definition for browsers
if (typeof window !== 'undefined') {
  window.gtag = window.gtag || function() {
    console.warn('Google Analytics not loaded yet');
  };
}

/**
 * Component for a single domain card with domain names positioned toward center
 * - Mobile: Stacked layout with proper visibility
 * - Tablet/Desktop: Two-column layout with domains positioned more centrally
 * - Text remains left-aligned within its container
 */
const DomainCard = ({ domain, domainName, onCheckDomain }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Domain name */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-3 md:mb-0">
          <span className="text-lg font-medium text-gray-800">
            {domain.fullDomain || `${domainName}${domain.extension}`}
          </span>
        </div>
        
        {/* Button container */}
        <div className="w-full md:w-auto">
          <button 
            onClick={() => {
              // Track domain purchase intent with Google Analytics
              if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('event', 'click_buy_domain', {
                  'event_category': 'Conversion',
                  'event_label': domain.fullDomain || `${domainName}${domain.extension}`,
                  'domain_name': domain.fullDomain || `${domainName}${domain.extension}`,
                  'domain_extension': domain.extension,
                  'business_name': domainName
                });
              }
              onCheckDomain(domain.checkUrl);
            }}
            className="w-full md:w-auto px-6 py-2 rounded-md font-bold text-white uppercase tracking-wide text-sm whitespace-nowrap transition-all hover:shadow-lg glossy-button"
            style={{
              backgroundColor: '#DB3A00',
              border: '2px solid #DB3A00',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#C6500C';
              e.target.style.borderColor = '#C6500C';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#DB3A00';
              e.target.style.borderColor = '#DB3A00';
            }}
          >
            BUY DOMAIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainCard;
