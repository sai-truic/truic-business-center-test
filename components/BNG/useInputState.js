/**
 * Business Name Generator state hook
 * 
 * This is the main entry point for the useInputState hook that provides state
 * management for the Business Name Generator (BNG) component.
 */

import { useState, useRef } from 'react';
import { useAtom } from 'jotai';

// Import atom states
import * as atoms from './atoms';

// Import translations
import { loadingMessages } from './translations/loadingMessages';
import { inputBoxPlaceholder, locationBoxPlaceholder, getIndustryPlaceholder } from './translations/inputPlaceholders';
import { filterButtonText, resultsSearchButtonText, showMoreText, domainExactlyAvailableButtonText } from './translations/buttonTexts';
import { postToSocialText, sendViaMessageText, copyMessageText, facebookCopiedMessageText, 
         instagramCopiedMessageText, messengerCopiedMessageText, weChatCopiedMessageText,
         smallBusinessTipShortText, smallBusinessTipLongText, smallBusinessMessageText } from './translations/socialMediaTexts';
import { startBusinesTodayText, formLLCText, stateFeesText, whatPeopleThinkText, 
         strongRecommendationToPurchaseText } from './translations/businessTexts';
import { notAvailableText, alternativeNameSuggestionsText, greatNameSuggestionsText } from './translations/generalTexts';

// Import state data
import { states, stateLinks } from './stateData';

// Import helpers
import { storeDomainExtensions, getDomainExtensions } from './helpers/domainHelpers';
import { createHandleInputChange, createHandleLocationChange } from './helpers/formHandlers';

/**
 * Custom hook for BNG state management
 * @returns {Object} State management object for BNG component
 */
const useInputState = () => {
  // Set up all state atoms
  const [bngId, setBngId] = useAtom(atoms.bngIdState);
  const [inputValue, setInputValue] = useAtom(atoms.inputValueState);
  const [locationValue, setLocationValue] = useAtom(atoms.locationValueState);
  const [results, setResults] = useAtom(atoms.resultsState);
  const [isExpanded, setIsExpanded] = useAtom(atoms.isExpandedState);
  const [numResultsDisplayed, setNumResultsDisplayed] = useAtom(atoms.numResultsDisplayedState);
  const [selectedResult, setSelectedResult] = useAtom(atoms.selectedResultState);
  const [selectedExtension, setSelectedExtension] = useAtom(atoms.selectedExtensionState);
  const [selectedFilterButton, setSelectedFilterButton] = useAtom(atoms.selectedFilterButtonState);
  const [selectedCategory, setSelectedCategory] = useAtom(atoms.selectedCategoryState);
  const [isLoading, setIsLoading] = useAtom(atoms.isLoadingState);
  const [parentUrl, setParentUrl] = useAtom(atoms.parentUrlState);
  const [resultUrl, setResultUrl] = useAtom(atoms.resultUrlState);
  const [industryValue, setIndustryValue] = useAtom(atoms.industryValueState);
  const [correctedRoute, setCorrectedRoute] = useAtom(atoms.correctedRouteState);
  const [reset, setReset] = useAtom(atoms.resetState);
  const [isDomainAvailable, setIsDomainAvailable] = useAtom(atoms.isDomainAvailableState);
  const [availableDomains, setAvailableDomains] = useAtom(atoms.availableDomainsState);
  const [queryInput, setQueryInput] = useAtom(atoms.queryInputState);
  const [isModernBrowser, setIsModernBrowser] = useAtom(atoms.isModernBrowserState);
  const [loadingMessage, setLoadingMessage] = useAtom(atoms.loadingMessageState);
  const [selectedState, setSelectedState] = useAtom(atoms.selectedStateState);
  const [bngQuery, setBNGQuery] = useAtom(atoms.bngQueryState);
  const [generateButton, setGenerateButton] = useAtom(atoms.generateButtonState);
  const [singleDomainResults, setSingleDomainResults] = useAtom(atoms.singleDomainResultsState);
  const [multiDomainResults, setMultiDomainResults] = useAtom(atoms.multiDomainResultsState);
  const [showTabs, setShowTabs] = useAtom(atoms.showTabsState);
  const [collectedNames, setCollectedNames] = useAtom(atoms.collectedNamesState);
  const [linkOpened, setLinkOpened] = useAtom(atoms.linkOpenedState);
  const [hasOpenedLinkInSession, setHasOpenedLinkInSession] = useAtom(atoms.hasOpenedLinkInSessionState);
  
  // Streaming state atoms
  const [isStreaming, setIsStreaming] = useAtom(atoms.isStreamingState);
  const [streamingResults, setStreamingResults] = useAtom(atoms.streamingResultsState);
  const [streamingProgress, setStreamingProgress] = useAtom(atoms.streamingProgressState);
  const [streamingTotal, setStreamingTotal] = useAtom(atoms.streamingTotalState);
  const [streamingConcepts, setStreamingConcepts] = useAtom(atoms.streamingConceptsState);
  
  // Result list state - migrated from useResultListState
  const [expandedIndex, setExpandedIndex] = useAtom(atoms.expandedIndexState);
  const [selectedDomainName, setSelectedDomainName] = useAtom(atoms.selectedDomainNameState);
  const [tabIndex, setTabIndex] = useAtom(atoms.tabIndexState);
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useAtom(atoms.isDesktopOrTabletState);
  
  // Domain extensions
  const [domainExtensions, setDomainExtensions] = useAtom(atoms.domainExtensionsState);

  // Create refs
  const newSearchButtonRef = useRef(null);

  // Create input handlers
  const handleInputChange = createHandleInputChange(setInputValue);
  const handleLocationChange = createHandleLocationChange(setLocationValue);

  // Create domain extension handler with bound state
  const storeDomainExtensionsWithState = (domainName, extensions) => 
    storeDomainExtensions(domainExtensions, setDomainExtensions, domainName, extensions);
  
  const getDomainExtensionsWithState = (domainName) => 
    getDomainExtensions(domainExtensions, domainName);

  /**
   * Process a streaming domain result and add it to the streamingResults state
   * @param {Object} domainData - The domain data object received from the stream
   */
  const processStreamingDomain = (domainData) => {
    // Make sure we're not processing data that isn't there
    if (!domainData || typeof domainData !== 'object') {
      console.error('Invalid domain data received:', domainData);
      return;
    }
    
    try {
      // Extract the key and extensions from the domain data
      const key = Object.keys(domainData)[0];
      
      if (!key) {
        console.error('No key found in domain data:', domainData);
        return;
      }
      
      const extensions = domainData[key];
      
      // Extract business name from key (remove the -Domain suffix)
      const name = key.replace('-Domain', '');
      
      console.log(`Processing streamed domain: ${name} with ${extensions?.length || 0} extensions`);
      
      // Create a properly formatted result object
      const resultData = {
        name: name,
        extensions: extensions || ['.com', '.io', '.co'] // Provide defaults if missing
      };
      
      // Add the new result to the streamingResults array
      setStreamingResults(prevResults => {
        // Check if this domain already exists to avoid duplicates
        const exists = prevResults.some(r => r.name === name);
        if (exists) {
          console.log(`Domain ${name} already exists in streaming results`);
          return [...prevResults]; // Return a new array reference to force re-render
        } else {
          console.log(`Adding domain ${name} to streaming results (total: ${prevResults.length + 1})`);
          return [...prevResults, resultData];
        }
      });
      
      // Store domain extensions for immediate access
      if (extensions && extensions.length > 0) {
        const cleanName = name.replace(/[^\w\s]/g, "").replace(/\s+/g, "");
        storeDomainExtensionsWithState(cleanName, extensions);
      }
      
      // Ensure streaming mode is active
      if (!isStreaming) {
        console.log('Activating streaming mode');
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error processing streaming domain:', error, domainData);
    }
  };

  /**
   * Process streaming concepts data
   * @param {Object} conceptsData - The concepts data object received from the stream
   */
  const processStreamingConcepts = (conceptsData) => {
    // Store the concepts in the streamingConcepts state
    setStreamingConcepts(conceptsData);
  };

  /**
   * Reset streaming state when generation is complete
   */
  const resetStreamingState = () => {
    // With our new approach, collectedNames is already being updated in real-time
    // Just update the results state with the current collectedNames
    setResults([...collectedNames]);
    
    // Reset streaming states
    setIsStreaming(false);
    setStreamingProgress(0);
    setIsLoading(false);
  };

  // Return all state and handlers in a single object
  return {
    // State variables
    bngId, setBngId,
    inputValue, setInputValue,
    locationValue, setLocationValue,
    results, setResults,
    isExpanded, setIsExpanded,
    numResultsDisplayed, setNumResultsDisplayed,
    selectedResult, setSelectedResult,
    selectedExtension, setSelectedExtension,
    selectedFilterButton, setSelectedFilterButton,
    selectedCategory, setSelectedCategory,
    isLoading, setIsLoading,
    parentUrl, setParentUrl,
    resultUrl, setResultUrl,
    industryValue, setIndustryValue,
    correctedRoute, setCorrectedRoute,
    reset, setReset,
    isDomainAvailable, setIsDomainAvailable,
    availableDomains, setAvailableDomains,
    queryInput, setQueryInput,
    isModernBrowser, setIsModernBrowser,
    loadingMessage, setLoadingMessage,
    selectedState, setSelectedState,
    bngQuery, setBNGQuery: setBNGQuery,
    generateButton, setGenerateButton,
    singleDomainResults, setSingleDomainResults,
    multiDomainResults, setMultiDomainResults,
    showTabs, setShowTabs,
    collectedNames, setCollectedNames,
    
    // Result list states (migrated from useResultListState)
    expandedIndex, setExpandedIndex,
    selectedDomainName, setSelectedDomainName,
    tabIndex, setTabIndex,
    isDesktopOrTablet, setIsDesktopOrTablet,
    
    // Streaming states and handlers
    isStreaming, setIsStreaming,
    streamingResults, setStreamingResults,
    streamingProgress, setStreamingProgress,
    streamingTotal, setStreamingTotal,
    streamingConcepts, setStreamingConcepts,
    processStreamingDomain,
    processStreamingConcepts,
    resetStreamingState,
    
    // Event handlers
    handleInputChange,
    handleLocationChange,
    
    // Refs
    newSearchButtonRef,
    
    // Domain extension helpers
    domainExtensions, setDomainExtensions, 
    storeDomainExtensions: storeDomainExtensionsWithState,
    getDomainExtensions: getDomainExtensionsWithState,
    
    // Data
    loadingMessages,
    states, stateLinks,
    
    // Session state
    hasOpenedLinkInSession, setHasOpenedLinkInSession,
    
    // Translations
    inputBoxPlaceholder, locationBoxPlaceholder,
    getIndustryPlaceholder: (language = 'english') => getIndustryPlaceholder(industryValue, language),
    filterButtonText, resultsSearchButtonText,
    notAvailableText, showMoreText,
    startBusinesTodayText, formLLCText,
    stateFeesText, whatPeopleThinkText,
    strongRecommendationToPurchaseText, postToSocialText,
    sendViaMessageText, smallBusinessTipLongText,
    smallBusinessTipShortText, smallBusinessMessageText,
    facebookCopiedMessageText, instagramCopiedMessageText,
    messengerCopiedMessageText, weChatCopiedMessageText,
    domainExactlyAvailableButtonText, copyMessageText,
    alternativeNameSuggestionsText, greatNameSuggestionsText
  };
};

export default useInputState;