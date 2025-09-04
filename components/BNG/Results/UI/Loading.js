import React, { useState, useEffect } from 'react';
import useInputState from '../../useInputState';

const Loading = () => {
  const { loadingMessages, isStreaming } = useInputState();
  const [messageIndex, setMessageIndex] = useState(0);
  
  // Rotate through loading messages every 4 seconds
  useEffect(() => {
    if (!isStreaming) return;
    
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [loadingMessages, isStreaming]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      <div className="relative">
        {/* Loading spinner */}
        <div className="w-16 h-16 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin"></div>
        
        {/* Pulsing dot in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading message */}
      <div className="mt-4 text-center">
        <p className="text-gray-700 font-medium">{loadingMessages[messageIndex]}</p>
        <p className="text-gray-500 text-sm mt-1">
          {isStreaming ? 'Names will appear as they are generated' : 'This may take a few seconds...'}
        </p>
      </div>
    </div>
  );
};

export default Loading;