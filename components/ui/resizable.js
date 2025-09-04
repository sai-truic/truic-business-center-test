import React, { useCallback } from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Resizable component:

 <Resizable id="sidebar" direction="horizontal" minSize={200} maxSize={500}>
   <div>Resizable content</div>
 </Resizable>
*/

export const Resizable = ({ id, children, direction = 'horizontal', minSize = 100, maxSize = Infinity }) => {
  const { getState, updateState } = useInputState();
  
  const { size = minSize, isResizing = false } = getState('resizable', id) || {};

  const startResizing = useCallback(() => {
    updateState('resizable', id, { isResizing: true });
  }, [id, updateState]);

  const stopResizing = useCallback(() => {
    updateState('resizable', id, { isResizing: false });
  }, [id, updateState]);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        const newSize =
          direction === 'horizontal'
            ? mouseMoveEvent.clientX
            : mouseMoveEvent.clientY;
        updateState('resizable', id, { size: Math.min(Math.max(newSize, minSize), maxSize) });
      }
    },
    [id, isResizing, direction, minSize, maxSize, updateState]
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      style={{
        [direction === 'horizontal' ? 'width' : 'height']: size,
        position: 'relative',
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          [direction === 'horizontal' ? 'right' : 'bottom']: 0,
          [direction === 'horizontal' ? 'top' : 'left']: 0,
          [direction === 'horizontal' ? 'width' : 'height']: '5px',
          [direction === 'horizontal' ? 'height' : 'width']: '100%',
          cursor: direction === 'horizontal' ? 'ew-resize' : 'ns-resize',
        }}
        onMouseDown={startResizing}
      />
    </div>
  );
};
