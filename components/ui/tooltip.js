import React from 'react';
import { Transition } from '@headlessui/react';
import useInputState from '../useInputState';

/*
This is how you can use the Tooltip component:

 <Tooltip id="helpTip" content="This is a helpful tip">
   <button>Hover me</button>
 </Tooltip>
*/

export const Tooltip = ({ id, children, content }) => {
  const { getState, updateState } = useInputState();
  
  const { isVisible = false } = getState('tooltip', id) || {};

  const handleMouseEnter = () => {
    updateState('tooltip', id, { isVisible: true });
  };

  const handleMouseLeave = () => {
    updateState('tooltip', id, { isVisible: false });
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      <Transition
        show={isVisible}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2">
          {content}
          <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
          </svg>
        </div>
      </Transition>
    </div>
  );
};
