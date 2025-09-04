import React, { useEffect, useState, useRef } from 'react';
import useInputState from '../../useInputState';
import InputBox from './InputBox';
import Loading from './Loading';
import { fetchData } from '../Utils/dataFetching';

const ResultsSearch = () => {
  const { 
    inputValue, 
    isLoading,
    setIsLoading, 
    setResults, 
    handleInputChange, 
    setBNGQuery,
    setGenerateButton,
    collectedNames,
    setCollectedNames,
    isStreaming,
    setIsStreaming,
    setTabIndex,
    setShowTabs,
    industryValue
  } = useInputState();

  // Always call hooks unconditionally at the top level
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);
  const [debugMode, setDebugMode] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});
  
  const lastProcessedInputRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
    
    // Check for debug mode in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('debug')) {
        setDebugMode(true);
        console.log("Debug mode enabled");
      }
    }
  }, []);

  // Check if there are no results after a timeout
  useEffect(() => {
    if (isStreaming && collectedNames.length === 0) {
      // If still streaming but no names after 10 seconds, show helpful message
      const timeoutId = setTimeout(() => {
        if (isStreaming && collectedNames.length === 0) {
          setDebugInfo(prev => ({
            ...prev,
            noResultsTimeout: true,
            message: "No names received yet. This could be due to API issues."
          }));
        }
      }, 10000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isStreaming, collectedNames.length]);

  const handleFetchData = async () => {
    // Reset any previous errors and debug info
    setError(null);
    setDebugInfo({});
    
    // Validate input
    if (!inputValue || inputValue.trim() === '') {
      setError('Please enter a business keyword');
      return;
    }
    
    try {
      // Don't allow new requests if already streaming or have 100 results
      if (isStreaming || (collectedNames && collectedNames.length >= 100)) {
        console.log("Request blocked - either streaming or 100 results reached");
        return;
      }
      
      // Switch to results tab when starting a new search (in case user was on domains tab)
      setTabIndex(0);
      // Reset message to show "Exclusively for you" instead of domain message
      setShowTabs(false);
      
      // Prepare for new search
      setResults([]) // Clear previous results
      setCollectedNames([]) // Clear collected names
      setIsLoading(true) // Set loading state
      setGenerateButton(true) // Set to true when Generate is clicked
      
      // Reset the smooth processor to ensure clean state
      if (typeof window !== 'undefined') {
        // This import is safe because it's only used in the browser
        const { smoothProcessor } = require('../Utils/dataFetching/smoother');
        if (smoothProcessor && typeof smoothProcessor.reset === 'function') {
          smoothProcessor.reset();
        }
      }
      
      // Create query string with all parameters
      const bng_result = "Keyword:" + inputValue + 
                        ";Industry:" + (industryValue || "") + 
                        ";Tone:Creative";
      
      if (bng_result !== undefined) {
        setBNGQuery(bng_result);
      }
      
      // Identify the environment
      const bng_env = "prod";
      const bngId = "business_center_bng"; // Identifier for analytics
      
      // Set a reasonable timeout for the request
      const max_request_time = 60 * 1000; // 60 seconds
      
      // Set streaming state to true to show loading message
      setIsStreaming(true);
      
      // Update debug info
      setDebugInfo(prev => ({
        ...prev,
        requestStart: new Date().toISOString(),
        query: bng_result
      }));
      
      // Call the fetch function
      const newResults = await fetchData(
        bng_result, 
        bngId, 
        bng_env, 
        max_request_time, 
        setIsLoading, 
        setResults, 
        collectedNames, 
        setCollectedNames,
        setIsStreaming
      );
      
      // Update debug info on success
      setDebugInfo(prev => ({
        ...prev,
        requestEnd: new Date().toISOString(),
        namesReceived: collectedNames.length
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // Update debug info
      setDebugInfo(prev => ({
        ...prev,
        error: error.message,
        stack: error.stack,
        requestEnd: new Date().toISOString()
      }));
      
      // Set appropriate error message based on the error
      if (error.message?.includes('timeout')) {
        setError('Request timed out. Please try again.');
      } else if (error.message?.includes('500')) {
        setError('Server error. Please try again later.');
      } else if (error.message?.includes('OpenAI API key not found')) {
        setError('OpenAI API key not configured. Please check your .env.local file.');
      } else if (error.message?.includes('keyword') || error.message?.includes('business name not found')) {
        setError('Please enter a business keyword.');
      } else if (error.message?.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Failed to generate business names. Please try again later.');
      }
      
      // Clear states
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
      <InputBox 
        inputValue={inputValue} 
        handleKeySubmission={handleFetchData} 
        handleInputChange={handleInputChange} 
        onSubmit={handleFetchData} 
      />
      
      {/* Show loading indicator */}
      {isLoading && <Loading />}
      
      {/* Show error message */}
      {error && !isLoading && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          <p className="font-medium">{error}</p>
          
          {error.includes('keyword') && (
            <p className="text-sm mt-1">
              Please enter a business keyword like "coffee shop" or "fitness studio".
            </p>
          )}
          
          {error.includes('Server error') && (
            <p className="text-sm mt-1">
              Our name generation service is temporarily unavailable. Try refreshing the page or try again later.
            </p>
          )}
          
          {error.includes('OpenAI API key') && (
            <p className="text-sm mt-1">
              Please make sure your OpenAI API key is configured in the .env.local file.
            </p>
          )}
          
          {error.includes('timed out') && (
            <p className="text-sm mt-1">
              The request took too long to complete. This might be due to high server load or network issues.
            </p>
          )}
        </div>
      )}
      
      {/* Show streaming issues message */}
      {isStreaming && collectedNames.length === 0 && debugInfo.noResultsTimeout && (
        <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
          <p className="font-medium">Still waiting for name suggestions...</p>
          <p className="text-sm mt-1">
            It's taking longer than expected to generate business names. You can:
          </p>
          <ul className="list-disc ml-5 text-sm mt-1">
            <li>Continue waiting</li>
            <li>Cancel and try again</li>
            <li>Try a different business type</li>
          </ul>
        </div>
      )}
      
      {/* Show empty state prompt */}
      {!isLoading && !isStreaming && collectedNames.length === 0 && !error && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
          <p className="font-medium">Enter a business type to generate unique business name ideas</p>
          <p className="text-sm mt-1">
            For example: "coffee shop", "tech startup", or "fitness studio"
          </p>
        </div>
      )}
      
      {/* Debug information (only shown in debug mode) */}
      {debugMode && (
        <div className="mt-4 p-3 bg-gray-100 text-gray-700 rounded-md text-xs">
          <p className="font-medium">Debug Information:</p>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          <p className="mt-1">Collected Names: {collectedNames.length}</p>
          <p>Streaming: {isStreaming ? 'Yes' : 'No'}</p>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default ResultsSearch;