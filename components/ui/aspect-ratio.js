import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the AspectRatio component:

 <AspectRatio id="video-container" ratio={16/9}>
   <video src="example.mp4" />
 </AspectRatio>

 <AspectRatio id="image-container" ratio={4/3}>
   <img src="example.jpg" alt="Example" />
 </AspectRatio>
*/

export const AspectRatio = ({ id, ratio = 16 / 9, children, className = '' }) => {
  const { getState, updateState } = useInputState();

  const { storedRatio = ratio } = getState('aspectRatio', id) || {};

  React.useEffect(() => {
    if (ratio !== storedRatio) {
      updateState('aspectRatio', id, { storedRatio: ratio });
    }
  }, [id, ratio, storedRatio, updateState]);

  return (
    <div className={`relative ${className}`} style={{ paddingBottom: `${(1 / storedRatio) * 100}%` }}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};
