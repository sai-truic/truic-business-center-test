"use client";

import React from 'react';
import { Provider as JotaiProvider } from 'jotai';

/**
 * Provider component that wraps BNG components to ensure state is properly shared
 * Note: The main app already has JotaiProvider, but this provides isolated scope for BNG
 */
export const BNGStateProvider = ({ children }) => {
  return (
    <JotaiProvider>
      {children}
    </JotaiProvider>
  );
};

export default BNGStateProvider;