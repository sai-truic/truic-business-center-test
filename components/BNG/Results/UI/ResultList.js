import React, { useState, useEffect } from 'react';
import useInputState from '../../useInputState';
import ResultItem from './ResultItem';
import DomainTabView from './DomainTabView';

const ResultList = () => {
  const {
    collectedNames,
    isStreaming,
  } = useInputState();

  // State for domain tab view
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showDomainTab, setShowDomainTab] = useState(false);

  // Handle clicking on a result item
  const handleResultClick = (result) => {
    const businessName = typeof result === 'string' 
      ? result.replace(/^\d+\.\s*/, '').trim()
      : result.name?.replace(/^\d+\.\s*/, '').trim() || 'BusinessName';
    
    const formattedDomainName = businessName
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
    
    setSelectedDomain(formattedDomainName);
    setShowDomainTab(true);
  };

  // Handle closing domain tab
  const handleCloseDomainTab = () => {
    setShowDomainTab(false);
    setSelectedDomain(null);
  };

  // If showing domain tab, render it instead of the list
  if (showDomainTab && selectedDomain) {
    return (
      <DomainTabView
        domainName={selectedDomain}
        onClose={handleCloseDomainTab}
        availableDomains={[]}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Grid-based Results Layout - Show all results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ minHeight: "400px", height: "auto" }}>
        {collectedNames.length > 0 ? (
          collectedNames.map((result, index) => (
            <div 
              key={`${typeof result === 'object' ? result.name : result}-${index}`}
              className="cursor-pointer transition-all hover:shadow-lg relative bg-gray-800 rounded-lg"
            >
              <ResultItem
                result={result}
                index={index}
                onClick={() => handleResultClick(result)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            {isStreaming ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-3 border-t-orange-500 border-gray-300 rounded-full animate-spin mb-4"></div>
                <span>Generating names...</span>
              </div>
            ) : (
              "No results found. Try different keywords."
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultList;
