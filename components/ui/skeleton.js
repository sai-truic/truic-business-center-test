import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Skeleton components:

 <Skeleton id="loadingRect" className="w-64 h-32" />
 <SkeletonText id="loadingText" lines={5} />
 <SkeletonCircle id="loadingAvatar" size={16} />
*/

export const Skeleton = ({ id, className = '', ...props }) => {
  const { getState, updateState } = useInputState();
  
  const { customClass = className } = getState('skeleton', id) || {};

  React.useEffect(() => {
    if (className !== customClass) {
      updateState('skeleton', id, { customClass: className });
    }
  }, [id, className, customClass, updateState]);

  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${customClass}`}
      {...props}
    />
  );
};

export const SkeletonText = ({ id, lines = 3, className = '' }) => {
  const { getState, updateState } = useInputState();
  
  const { lineCount = lines, customClass = className } = getState('skeletonText', id) || {};

  React.useEffect(() => {
    if (lines !== lineCount || className !== customClass) {
      updateState('skeletonText', id, { lineCount: lines, customClass: className });
    }
  }, [id, lines, lineCount, className, customClass, updateState]);

  return (
    <div className={`space-y-2 ${customClass}`}>
      {[...Array(lineCount)].map((_, i) => (
        <Skeleton key={i} id={`${id}-line-${i}`} className="h-4 w-full" />
      ))}
    </div>
  );
};

export const SkeletonCircle = ({ id, size = 12, className = '' }) => {
  const { getState, updateState } = useInputState();
  
  const { circleSize = size, customClass = className } = getState('skeletonCircle', id) || {};

  React.useEffect(() => {
    if (size !== circleSize || className !== customClass) {
      updateState('skeletonCircle', id, { circleSize: size, customClass: className });
    }
  }, [id, size, circleSize, className, customClass, updateState]);

  return (
    <Skeleton
      id={id}
      className={`rounded-full ${customClass}`}
      style={{ width: `${circleSize * 0.25}rem`, height: `${circleSize * 0.25}rem` }}
    />
  );
};
