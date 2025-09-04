import React from 'react';

/**
 * Empty state component when no domains are available
 */
const EmptyView = () => {
  return (
    <div className="p-12 text-center bg-gray-50">
      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-gray-700 text-lg font-medium">No domains available at this time.</p>
      <p className="text-gray-500 text-sm mt-2">Please try again later.</p>
    </div>
  );
};

export default EmptyView;
