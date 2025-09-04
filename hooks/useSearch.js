import { useState, useCallback, useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const CACHE_TIMEOUT = 60000; // 1 minute

const fetchFromAPI = async (query, options, isAutocomplete = false) => {
  const endpoint = isAutocomplete ? '/api/autocomplete' : '/api/search';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, options }),
  });

  if (!res.ok) {
    throw new Error(isAutocomplete ? 'Autocomplete query failed' : 'Search query failed');
  }

  return res.json();
};

export const useSearch = (initialData = [], options = {}) => {
  const [searchData, setSearchData] = useState(initialData);
  const [query, setQuery] = useState('');
  const fuseRef = useRef(null);
  const queryClient = useQueryClient();

  const {
    keys = [],
    threshold = 0.6,
    isServerSide = false,
    serverOptions = {},
    autocompleteLimit = 5,
  } = options;

  useEffect(() => {
    if (!isServerSide) {
      fuseRef.current = new Fuse(searchData, { keys, threshold, ...options });
    }
  }, [searchData, isServerSide, keys, threshold, options]);

  const search = useCallback((searchQuery) => {
    setQuery(searchQuery);
    if (!isServerSide && fuseRef.current) {
      return fuseRef.current.search(searchQuery);
    }
    // For server-side, the actual search is performed in the useQuery hook
    return [];
  }, [isServerSide]);

  const debouncedSearch = useCallback(debounce(search, DEBOUNCE_DELAY), [search]);

  const { data: serverSearchResults, isLoading: isSearchLoading, error: searchError } = useQuery({
    queryKey: ['search', query, serverOptions],
    queryFn: () => fetchFromAPI(query, serverOptions),
    enabled: isServerSide && query.length > 0,
    staleTime: CACHE_TIMEOUT,
  });

  const autocomplete = useCallback((searchQuery) => {
    setQuery(searchQuery);
    if (!isServerSide && fuseRef.current) {
      return fuseRef.current.search(searchQuery).slice(0, autocompleteLimit);
    }
    // For server-side, the actual autocomplete is performed in the useQuery hook
    return [];
  }, [isServerSide, autocompleteLimit]);

  const debouncedAutocomplete = useCallback(debounce(autocomplete, DEBOUNCE_DELAY), [autocomplete]);

  const { data: serverAutocompleteResults, isLoading: isAutocompleteLoading, error: autocompleteError } = useQuery({
    queryKey: ['autocomplete', query, serverOptions],
    queryFn: () => fetchFromAPI(query, { ...serverOptions, limit: autocompleteLimit }, true),
    enabled: isServerSide && query.length > 0,
    staleTime: CACHE_TIMEOUT,
  });

  const updateSearch = useCallback((newData) => {
    setSearchData(newData);
    if (!isServerSide) {
      fuseRef.current = new Fuse(newData, { keys, threshold, ...options });
    }
    queryClient.invalidateQueries({ queryKey: ['search'] });
    queryClient.invalidateQueries({ queryKey: ['autocomplete'] });
  }, [isServerSide, keys, threshold, options, queryClient]);

  const searchResults = isServerSide ? serverSearchResults?.results : search(query);
  const autocompleteResults = isServerSide ? serverAutocompleteResults?.results : autocomplete(query);

  return {
    search: debouncedSearch,
    autocomplete: debouncedAutocomplete,
    updateSearch,
    query,
    searchResults,
    autocompleteResults,
    isSearchLoading,
    isAutocompleteLoading,
    searchError,
    autocompleteError,
  };
};
