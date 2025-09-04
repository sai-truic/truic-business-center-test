import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const CACHE_TIMEOUT = 60000; // 1 minute

const fetchFromAPI = async (cacheKey) => {
  const res = await fetch('/api/getCache', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cacheKey }),
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const { cacheValue } = await res.json();
  return cacheValue;
};

const saveToAPI = async ({ cacheKey, data }) => {
  const res = await fetch('/api/setCache', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cacheKey,
      databaseDetails: JSON.stringify(data)
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to save data');
  }

  return res.json();
};

export const useCache = () => {
  const queryClient = useQueryClient();

  const fetchFromCache = useCallback((cacheKey) => {
    // Return query configuration instead of calling useQuery inside callback
    return {
      queryKey: [cacheKey],
      queryFn: () => fetchFromAPI(cacheKey),
      staleTime: CACHE_TIMEOUT,
      gcTime: Infinity,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    };
  }, []);

  const saveToCache = useCallback(async (cacheKey, data) => {
    queryClient.setQueryData([cacheKey], data);
    try {
      await saveToAPI({ cacheKey, data });
      queryClient.invalidateQueries({ queryKey: [cacheKey] });
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: [cacheKey] });
      throw error;
    }
  }, [queryClient]);

  const invalidateCache = useCallback((cacheKey) => {
    queryClient.invalidateQueries({ queryKey: [cacheKey] });
  }, [queryClient]);

  return { fetchFromCache, saveToCache, invalidateCache };
};