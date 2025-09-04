import React, { useRef, useEffect } from 'react';
import useInputState from '../useInputState';

export const ScrollArea = ({ id, children, className = '' }) => {
  const { getState, updateState } = useInputState();
  const scrollRef = useRef(null);
  const contentRef = useRef(null);

  const { scrollTop = 0 } = getState('scrollArea', id) || {};

  useEffect(() => {
    const scrollElement = scrollRef.current;
    const contentElement = contentRef.current;

    if (!scrollElement || !contentElement) return;

    const handleScroll = () => {
      updateState('scrollArea', id, { scrollTop: scrollElement.scrollTop });
    };

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    scrollElement.addEventListener('scroll', handleScroll);
    resizeObserver.observe(contentElement);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [id, updateState]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        maxHeight: '100vh',
        maxWidth: '100vw'
      }}
    >
      <div
        ref={scrollRef}
        className="h-full w-full overflow-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;