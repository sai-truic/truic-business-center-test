import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { debounce } from 'lodash';

const CACHE_TIMEOUT = 60000; // 1 minute
const DEBOUNCE_DELAY = 300; // 300ms debounce

/*
  This hook provides an interface to interact with a MongoDB database using React Query.
  It includes functions to fetch data from MongoDB and save data to MongoDB.
  The fetchFromMongodb function sends a POST request to the /api/mongodb/query endpoint
  with the queryKey and an optional aggregation pipeline.
  The saveToMongodb function sends a POST request to the /api/mongodb/mutate endpoint
  with the queryKey, data, and an optional aggregation pipeline.
  The useMongodb hook returns functions to fetch and mutate data, leveraging React Query's
  caching and state management capabilities.

   const { data, isLoading, error } = fetchFromDatabase('users', [                                                                                      
   { $match: { age: { $gte: 18 } } },                                                                                                                 
   { $sort: { name: 1 } }                                                                                                                             
 ]);  

 const { saveToDatabase, isSaving, saveError } = setToDatabase('users');                                                                              
 saveToDatabase(newUserData, [                                                                                                                        
   { $set: { lastUpdated: new Date() } },                                                                                                             
   { $inc: { updateCount: 1 } }                                                                                                                       
 ]);                                                                                                                                                  
*/


const fetchFromMongodb = async (queryKey, pipeline = []) => {
  const res = await fetch('/api/mongodb/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ queryKey, pipeline }),
  });

  if (!res.ok) {
    throw new Error('MongoDB query failed');
  }

  const { data } = await res.json();
  return data;
};

const saveToMongodb = async ({ queryKey, data, pipeline = [] }) => {
  const res = await fetch('/api/mongodb/mutate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      queryKey,
      data: JSON.stringify(data),
      pipeline
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to save data to MongoDB');
  }

  return res.json();
};

export const useMongodb = () => {
  const queryClient = useQueryClient();

  const fetchFromDatabase = useCallback((queryKey, pipeline = []) => {
    return useQuery({
      queryKey: [queryKey, pipeline],
      queryFn: () => fetchFromMongodb(queryKey, pipeline),
      staleTime: CACHE_TIMEOUT,
      gcTime: Infinity,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    });
  }, []);

  const setToDatabase = useCallback((queryKey) => {
    const mutation = useMutation({
      mutationFn: ({ data, pipeline = [] }) => saveToMongodb({ queryKey, data, pipeline }),
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey });
        const previousData = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, newData.data);
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(queryKey, context.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });

    const debouncedMutate = debounce(mutation.mutate, DEBOUNCE_DELAY);

    const saveToDatabase = (data, pipeline = []) => {
      queryClient.setQueryData(queryKey, data);
      debouncedMutate({ data, pipeline });
    };

    return { saveToDatabase, isSaving: mutation.isPending, saveError: mutation.error };
  }, [queryClient]);

  const invalidateDatabase = useCallback((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient]);

  return { fetchFromDatabase, setToDatabase, invalidateDatabase };
};
