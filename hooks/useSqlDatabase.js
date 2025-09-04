import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { debounce } from 'lodash';

const CACHE_TIMEOUT = 60000; // 1 minute
const DEBOUNCE_DELAY = 300; // 300ms debounce

const fetchFromDatabase = async (queryKey, query, params = {}) => {
  const response = await fetch('/api/database', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operation: 'query', queryKey, query, params }),
  });

  if (!response.ok) {
    throw new Error('Database query failed');
  }

  return response.json();
};

const saveToDatabase = async ({ queryKey, query, data }) => {
  const response = await fetch('/api/database', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operation: 'mutate', queryKey, query, data }),
  });

  if (!response.ok) {
    throw new Error('Failed to save data to database');
  }

  return response.json();
};

export const useSqlDatabase = (userId) => {
  const queryClient = useQueryClient();

  const fetchFromSql = useCallback((queryKey, query, params = {}) => {
    return useQuery({
      queryKey: [queryKey, query, params, userId],
      queryFn: () => fetchFromDatabase(queryKey, query, { ...params, userId }),
      staleTime: CACHE_TIMEOUT,
      gcTime: Infinity,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    });
  }, [userId]);

  const setToSql = useCallback((queryKey, query) => {
    const mutation = useMutation({
      mutationFn: (data) => saveToDatabase({ queryKey, query, data: { ...data, userId } }),
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: [queryKey, userId] });
        const previousData = queryClient.getQueryData([queryKey, userId]);
        queryClient.setQueryData([queryKey, userId], newData);
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData([queryKey, userId], context.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey, userId] });
      },
    });

    const debouncedMutate = debounce(mutation.mutate, DEBOUNCE_DELAY);

    const saveToSql = (data) => {
      queryClient.setQueryData([queryKey, userId], data);
      debouncedMutate(data);
    };

    return { saveToSql, isSaving: mutation.isPending, saveError: mutation.error };
  }, [queryClient, userId]);

  const invalidateSql = useCallback((queryKey) => {
    queryClient.invalidateQueries({ queryKey: [queryKey, userId] });
  }, [queryClient, userId]);

  return { fetchFromSql, setToSql, invalidateSql };
};
