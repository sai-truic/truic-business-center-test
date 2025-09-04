import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Progress component:

 <Progress id="downloadProgress" value={50} max={100} />
*/

export const Progress = ({ id, value, max = 100 }) => {
  const { getState, updateState } = useInputState();
  
  const { value: storedValue = value, max: storedMax = max } = getState('progress', id) || {};

  React.useEffect(() => {
    if (value !== storedValue || max !== storedMax) {
      updateState('progress', id, { value, max });
    }
  }, [id, value, max, storedValue, storedMax, updateState]);

  const percentage = (storedValue / storedMax) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
