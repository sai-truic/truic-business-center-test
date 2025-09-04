import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useInputState from '../useInputState';

/*
This is how you can use the Collapsible component:

 <Collapsible id="section1" trigger="Click to expand">
   <p>This is the collapsible content</p>
 </Collapsible>
*/

export const Collapsible = ({ id, trigger, children }) => {
  const { getState, updateState } = useInputState();
  
  const { isOpen = false } = getState('collapsible', id) || {};

  const toggleCollapsible = () => {
    updateState('collapsible', id, { isOpen: !isOpen });
  };

  return (
    <div>
      <button
        className="flex justify-between items-center w-full py-2 text-left"
        onClick={toggleCollapsible}
      >
        {trigger}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div className="pt-2">{children}</div>}
    </div>
  );
};
