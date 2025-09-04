import React, { forwardRef } from 'react';
import DomainTabHeader from './DomainTabHeader';

/**
 * Error state component for DomainTabView
 */
const DomainError = forwardRef(({ error, onClose, domainName, configProps }, ref) => {
  return (
    <div className="relative max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <DomainTabHeader ref={ref} domainName={domainName} onClose={onClose} configProps={configProps} />
      
      <div className="bg-gray-50 p-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-800 text-lg font-medium mb-2">Unable to check domain availability</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    </div>
  );
});

DomainError.displayName = 'DomainError';

export default DomainError;
