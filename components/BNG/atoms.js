/**
 * Atom definitions for the Business Name Generator state
 */

import { createUniqueAtom } from './atomRegistry';

// Define all BNG atoms
export const bngIdState = createUniqueAtom({ key: 'bngId', default: '' });
export const inputValueState = createUniqueAtom({ key: 'inputValue', default: '' });
export const locationValueState = createUniqueAtom({ key: 'locationValue', default: '' });
export const resultsState = createUniqueAtom({ key: 'results', default: [] });
export const isExpandedState = createUniqueAtom({ key: 'isExpanded', default: false });
export const numResultsDisplayedState = createUniqueAtom({ key: 'numResultsDisplayed', default: 200 });
export const selectedResultState = createUniqueAtom({ key: 'selectedResult', default: {} });
export const selectedExtensionState = createUniqueAtom({ key: 'selectedExtension', default: '' });
export const selectedFilterButtonState = createUniqueAtom({ key: 'selectedFilterButton', default: 'all' });
export const selectedCategoryState = createUniqueAtom({ key: 'selectedCategory', default: 'Universal' });
export const isLoadingState = createUniqueAtom({ key: 'isLoading', default: false });
export const parentUrlState = createUniqueAtom({ key: 'parentUrl', default: '' });
export const resultUrlState = createUniqueAtom({ key: 'resultUrl', default: '' });
export const industryValueState = createUniqueAtom({ key: 'industryValue', default: '' });
export const correctedRouteState = createUniqueAtom({ key: 'correctedRoute', default: '' });
export const resetState = createUniqueAtom({ key: 'reset', default: false });
export const isDomainAvailableState = createUniqueAtom({ key: 'isDomainAvailable', default: false });
export const availableDomainsState = createUniqueAtom({ key: 'availableDomains', default: []});
export const queryInputState = createUniqueAtom({ key: 'queryInput', default: '' });
export const isModernBrowserState = createUniqueAtom({ key: 'isModernBrowser', default: true });
export const loadingMessageState = createUniqueAtom({ key: 'loadingMessage', default: "Please wait...We are generating cool business names for you." });
export const selectedStateState = createUniqueAtom({ key: 'selectedState', default: 'Select Your State'});
export const bngQueryState = createUniqueAtom({ key: 'bngQuery', default: null});
export const generateButtonState = createUniqueAtom({ key: 'generateButton', default: false});
export const singleDomainResultsState = createUniqueAtom({ key: 'singleDomainResults', default: [] });
export const multiDomainResultsState = createUniqueAtom({ key: 'multiDomainResults', default: [] });
export const showTabsState = createUniqueAtom({ key: 'showTabs', default: false});
export const collectedNamesState = createUniqueAtom({ key: 'collectedNames', default: [] });
export const linkOpenedState = createUniqueAtom({ key: 'linkOpened', default: false });
export const hasOpenedLinkInSessionState = createUniqueAtom({ key: 'hasOpenedLinkInSession', default: false });

// Domain extensions (replaces localStorage)
export const domainExtensionsState = createUniqueAtom({
  key: 'domainExtensions',
  default: {} // Object mapping domain names to extension arrays
});

// Streaming functionality
export const isStreamingState = createUniqueAtom({ key: 'isStreaming', default: false });
export const streamingResultsState = createUniqueAtom({ key: 'streamingResults', default: [] });
export const streamingProgressState = createUniqueAtom({ key: 'streamingProgress', default: 0 });
export const streamingTotalState = createUniqueAtom({ key: 'streamingTotal', default: 60 });
export const streamingConceptsState = createUniqueAtom({ 
  key: 'streamingConcepts', 
  default: { relatedConcepts: [], styleOrientation: '' } 
});

// Result list state atoms
export const expandedIndexState = createUniqueAtom({ key: 'expandedIndex', default: null });
export const selectedDomainNameState = createUniqueAtom({ key: 'selectedDomainName', default: '' });
export const tabIndexState = createUniqueAtom({ key: 'tabIndex', default: 0 }); // 0 = Results tab, 1 = Domains tab
export const isDesktopOrTabletState = createUniqueAtom({ key: 'isDesktopOrTablet', default: true });