import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { debounce } from 'lodash';

const CACHE_TIMEOUT = 60000; // 1 minute
const DEBOUNCE_DELAY = 300; // 300ms debounce

const fetchFromS3 = async (bucketName, objectKey) => {
  const res = await fetch('/api/s3/getObject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bucketName, objectKey }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch object from S3');
  }

  const { data } = await res.json();
  return data;
};

const saveToS3 = async ({ bucketName, objectKey, data }) => {
  const res = await fetch('/api/s3/putObject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bucketName,
      objectKey,
      data: JSON.stringify(data)
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to save object to S3');
  }

  return res.json();
};

export const useS3 = () => {
  const queryClient = useQueryClient();

  const fetchFromStorage = useCallback((bucketName, objectKey) => {
    return useQuery({
      queryKey: ['s3', bucketName, objectKey],
      queryFn: () => fetchFromS3(bucketName, objectKey),
      staleTime: CACHE_TIMEOUT,
      gcTime: Infinity,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    });
  }, []);

  const setToStorage = useCallback((bucketName, objectKey) => {
    const mutation = useMutation({
      mutationFn: (data) => saveToS3({ bucketName, objectKey, data }),
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: ['s3', bucketName, objectKey] });
        const previousData = queryClient.getQueryData(['s3', bucketName, objectKey]);
        queryClient.setQueryData(['s3', bucketName, objectKey], newData);
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(['s3', bucketName, objectKey], context.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['s3', bucketName, objectKey] });
      },
    });

    const debouncedMutate = debounce(mutation.mutate, DEBOUNCE_DELAY);

    const saveToStorage = (data) => {
      queryClient.setQueryData(['s3', bucketName, objectKey], data);
      debouncedMutate(data);
    };

    return { saveToStorage, isSaving: mutation.isPending, saveError: mutation.error };
  }, [queryClient]);

  const invalidateStorage = useCallback((bucketName, objectKey) => {
    queryClient.invalidateQueries({ queryKey: ['s3', bucketName, objectKey] });
  }, [queryClient]);

  const listObjects = useCallback((bucketName, prefix = '') => {
    return useQuery({
      queryKey: ['s3List', bucketName, prefix],
      queryFn: async () => {
        const res = await fetch('/api/s3/listObjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bucketName, prefix }),
        });

        if (!res.ok) {
          throw new Error('Failed to list objects in S3');
        }

        return res.json();
      },
      staleTime: CACHE_TIMEOUT,
      gcTime: Infinity,
    });
  }, []);

  return { fetchFromStorage, setToStorage, invalidateStorage, listObjects };
};
