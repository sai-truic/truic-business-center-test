// In src/components/ui/separator.js
import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Separator component:

 <Separator id="section-divider" className="my-4" />
*/

export const Separator = ({ id, className = '' }) => {
  const { getState, updateState } = useInputState();
  
  const { customClass = className } = getState('separator', id) || {};

  React.useEffect(() => {
    if (className !== customClass) {
      updateState('separator', id, { customClass: className });
    }
  }, [id, className, customClass, updateState]);

  return <hr className={`border-gray-300 ${customClass}`} />;
};
