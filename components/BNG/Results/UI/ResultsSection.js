import React, { useRef } from 'react';
import useInputState from '../../useInputState';
import Loading from './Loading';
import ResultList from './ResultList';

const ResultsSection = () => {
  const {
    inputValue,
    isLoading,
    isStreaming,
    collectedNames,
    showTabs
  } = useInputState();
  
  const topRef = useRef(null);
  
  // Calculate business name count
  const businessNameCount = isStreaming 
    ? collectedNames.length
    : collectedNames.length;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 mt-6">
      <div ref={topRef} className="absolute top-0"></div>
      
      {(!isLoading || isStreaming) && (
        <>
          {showTabs ? (
            <div className="mb-6">
              <p className="text-base md:text-lg text-gray-700 leading-normal mb-4">
                These domains are available now. Select one to secure your brand.
              </p>
            </div>
          ) : (
            <div className="mb-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
                Exclusively for you: {businessNameCount} premium business names
              </h2>
              <p className="text-base text-gray-600 leading-normal">
                {isStreaming ? 
                  "Names will appear as they are generated. Click on any name to view available domains." :
                  "Select a name below to view available domains."
                }
              </p>
            </div>
          )}
          
          <ResultList />
        </>
      )}
    </div>
  );
};

export default ResultsSection;