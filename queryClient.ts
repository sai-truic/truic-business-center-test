import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const queryClient = new QueryClient();

export const withQueryClient = (Component: React.ComponentType) => {
  return function WrappedComponent(props: any) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(Component, props)
    );
  };
};
