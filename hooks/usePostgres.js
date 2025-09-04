import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';

const CACHE_TIMEOUT = 60000; // 1 minute
const DEBOUNCE_DELAY = 300; // 300ms debounce

const getDrizzleInstance = (dbType, connection) => {
  switch (dbType) {
    case 'postgres':
      return drizzle(connection);
    case 'mysql':
      return drizzleMysql(connection);
    case 'sqlite':
      return drizzleSqlite(connection);
    default:
      throw new Error(`Unsupported database type: ${dbType}`);
  }
};

const fetchFromDatabase = async (dbInstance, query, params = {}) => {
  try {
    const result = await dbInstance.execute(query, params);
    return result;
  } catch (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }
};

const saveToDatabase = async (dbInstance, query, data) => {
  try {
    const result = await dbInstance.execute(query, data);
    return result;
  } catch (error) {
    throw new Error(`Failed to save data to database: ${error.message}`);
  }
};

export const useSqlDatabase = (dbType, connection) => {
  const queryClient = useQueryClient();
  const dbInstance = getDrizzleInstance(dbType, connection);

  const fetchFromSql = useCallback((queryKey, query, params = {}) => {
    return useQuery({
      queryKey: [queryKey, query, params],
      queryFn: () => fetchFromDatabase(dbInstance, query, params),
      staleTime: CACHE_TIMEOUT,
      gcTime: Infinity,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    });
  }, [dbInstance]);

  const setToSql = useCallback((queryKey, query) => {
    const mutation = useMutation({
      mutationFn: (data) => saveToDatabase(dbInstance, query, data),
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey });
        const previousData = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, newData);
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

    const saveToSql = (data) => {
      queryClient.setQueryData(queryKey, data);
      debouncedMutate(data);
    };

    return { saveToSql, isSaving: mutation.isPending, saveError: mutation.error };
  }, [queryClient, dbInstance]);

  const invalidateSql = useCallback((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient]);

  return { fetchFromSql, setToSql, invalidateSql };
};
