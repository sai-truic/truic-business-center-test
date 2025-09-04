import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useSafeUser } from '../components/useSafeUser';
import { v4 as uuidv4 } from 'uuid';

const CACHE_TIMEOUT = 60000; // 1 minute

const fetchFromCosmosDB = async (containerId, query, userId, token) => {
  try {
    const querySpec = {
      query: query ? `SELECT * FROM c WHERE c.userId = @userId AND ${query}` : 'SELECT * FROM c WHERE c.userId = @userId',
      parameters: [{ name: '@userId', value: userId }]
    };

    const response = await fetch('/api/cosmosdb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ operation: 'query', containerId, querySpec, userId }),
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch from Cosmos DB:', response.status, errorText);
      throw new Error(`Failed to fetch from Cosmos DB: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchFromCosmosDB:', error);
    throw error;
  }
};

const createInCosmosDB = async ({ containerId, item, userId }) => {
  try {
    const response = await fetch('/api/cosmosdb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operation: 'create', containerId, data: { ...item, userId } }),
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cosmos DB create failed:', response.status, errorText);
      throw new Error(`Failed to create in Cosmos DB: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in createInCosmosDB:', error);
    throw error;
  }
};

const upsertInCosmosDB = async ({ containerId, item, userId, token }) => {
  try {
    const existingItems = await fetchFromCosmosDB(containerId, `c.userId = "${userId}"`, userId, token);
    let itemToUpsert;
    
    if (existingItems.length > 0) {
      const existingItem = existingItems[0];
      itemToUpsert = {
        ...item,                                                                                          
        userId,                                                                                           
        id: existingItem.id,                                                                              
        _rid: existingItem._rid,                                                                          
        _self: existingItem._self,                                                                        
        _etag: existingItem._etag,                                                                        
        _attachments: existingItem._attachments,                                                          
        _ts: existingItem._ts 
      };
      delete itemToUpsert[0];
    } else {
      itemToUpsert = { ...item, userId, id: uuidv4() };
    }

    const response = await fetch('/api/cosmosdb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ operation: 'upsert', containerId, data: itemToUpsert }),
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cosmos DB upsert failed:', response.status, errorText);
      throw new Error(`Failed to upsert in Cosmos DB: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in upsertInCosmosDB:', error);
    throw error;
  }
};

export const useCosmosDB = () => {
  const queryClient = useQueryClient();
  const { user } = useSafeUser();
  const { getToken } = useAuth();
  const userId = user?.id;

  const fetchFromDatabase = useCallback(async (containerId, query) => {
    const token = await getToken();
    return fetchFromCosmosDB(containerId, query, userId, token);
  }, [userId, getToken]);

  const createMutation = useMutation({
    mutationFn: async (variables) => {
      const token = await getToken();
      return createInCosmosDB({ ...variables, token });
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [variables.containerId, userId] });
      const previousItems = queryClient.getQueryData([variables.containerId, userId]);
      queryClient.setQueryData([variables.containerId, userId], (old) => [...(old || []), variables.item]);
      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context && context.previousItems) {
        queryClient.setQueryData([variables.containerId, userId], context.previousItems);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.containerId, userId] });
    },
  });

  const upsertMutation = useMutation({
    mutationFn: async (variables) => {
      const token = await getToken();
      return upsertInCosmosDB({ ...variables, token });
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [variables.containerId, userId] });
      const previousItems = queryClient.getQueryData([variables.containerId, userId]);
      queryClient.setQueryData([variables.containerId, userId], (old) => {
        if (!Array.isArray(old)) {
          return [variables.item];
        }
        const index = old.findIndex(item => item.id === variables.item.id);
        if (index > -1) {
          return [...old.slice(0, index), variables.item, ...old.slice(index + 1)];
        }
        return [...old, variables.item];
      });
      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context && context.previousItems) {
        queryClient.setQueryData([variables.containerId, userId], context.previousItems);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.containerId, userId] });
    },
  });

  const create = useCallback((containerId, item) => {
    return createMutation.mutateAsync({ containerId, item, userId });
  }, [createMutation, userId]);

  const upsert = useCallback((containerId, item) => {
    return upsertMutation.mutateAsync({ containerId, item, userId });
  }, [upsertMutation, userId]);

  const save = useCallback((containerId, item) => {
    return upsert(containerId, item);
  }, [upsert]);

  const invalidateDatabase = useCallback((containerId) => {
    queryClient.invalidateQueries({ queryKey: [containerId, userId] });
  }, [queryClient, userId]);

  return { fetchFromDatabase, create, upsert, save, invalidateDatabase };
};
