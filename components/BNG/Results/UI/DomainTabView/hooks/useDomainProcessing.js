import { useState, useEffect, useMemo } from 'react';
import { processDomains, groupDomainsByCategory } from '../utils/domainUtils';

/**
 * Custom hook to process domain data
 * Handles loading, error states, and domain processing logic
 */
const useDomainProcessing = (domainName, availableDomains, correctedRoute = '') => {
  // State management
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Process domains when component mounts or domainName/availableDomains change
  useEffect(() => {
    console.log("useDomainProcessing useEffect triggered");
    
    if (!domainName) {
      setLoading(false);
      return;
    }
    
    // Create AbortController for cleanup
    const abortController = new AbortController();
    
    const fetchDomains = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/domain-availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            baseName: domainName.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, ""),
            extensions: ['.com', '.net', '.org', '.io', '.co', '.biz', '.info', '.tech', '.app', 
                         '.dev', '.cloud', '.ai', '.digital', '.shop', '.store', '.online',
                         '.solutions', '.services', '.agency', '.studio', '.design', '.media',
                         '.club', '.life', '.world', '.green', '.energy', '.coffee', '.restaurant']
          }),
          signal: abortController.signal // Add abort signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Domain availability response:', data);
        
        // Check if request was aborted
        if (!abortController.signal.aborted) {
          if (data.availableExtensions && Array.isArray(data.availableExtensions)) {
            const processedDomains = processDomains(data.availableExtensions, domainName, correctedRoute);
            setDomains(processedDomains);
          } else {
            setDomains([]);
          }
          setLoading(false);
        }
        
      } catch (err) {
        // Only update state if request wasn't aborted
        if (!abortController.signal.aborted) {
          console.error('Error fetching domain availability:', err);
          setError('Failed to check domain availability. Please try again later.');
          setLoading(false);
        }
      }
    };
    
    fetchDomains();
    
    // Cleanup function to abort request
    return () => {
      abortController.abort();
    };
    
  }, [domainName, correctedRoute]);

  // Group domains by category
  const domainsByCategory = useMemo(() => {
    try {
      if (!Array.isArray(domains)) {
        return {};
      }
      
      const grouped = groupDomainsByCategory(domains);
      return grouped;
    } catch (err) {
      console.error("Error grouping domains by category:", err);
      return {};
    }
  }, [domains]);

  return {
    domains,
    domainsByCategory,
    loading,
    error
  };
};

export default useDomainProcessing;
