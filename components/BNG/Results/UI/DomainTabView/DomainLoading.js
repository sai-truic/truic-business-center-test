import React, { forwardRef } from 'react';
import DomainTabHeader from './DomainTabHeader';

/**
 * Loading state component for DomainTabView
 */
const DomainLoading = forwardRef(({ onClose, domainName, configProps }, ref) => {
  return (
    <div className="relative max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <DomainTabHeader ref={ref} domainName={domainName} onClose={onClose} configProps={configProps} />
      
      <div className="bg-gray-50 p-12">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-6 h-6 border-3 border-t-orange-500 border-gray-300 rounded-full animate-spin"></div>
          <span className="text-gray-700 text-lg font-medium">Checking domain availability...</span>
        </div>
      </div>
    </div>
  );
});

DomainLoading.displayName = 'DomainLoading';

export default DomainLoading;
