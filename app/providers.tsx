'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ClerkProvider } from '@clerk/nextjs'
import { Provider as JotaiProvider } from 'jotai'
import { HelmetProvider } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Import ClerkStorageFix with no SSR to ensure it only runs on client
const ClerkStorageFix = dynamic(
  () => import('../components/ClerkStorageFix'),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <HelmetProvider>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider
            appearance={{
              variables: {
                colorPrimary: '#F7931E'
              }
            }}
            telemetry={false}
          >
            {/* Component that fixes Clerk storage issues */}
            <ClerkStorageFix />
            
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </ClerkProvider>
        </QueryClientProvider>
      </JotaiProvider>
    </HelmetProvider>
  )
} 