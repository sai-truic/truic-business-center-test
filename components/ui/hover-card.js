import React from 'react';
import { Transition } from '@headlessui/react';
import useInputState from '../useInputState';

/*
This is how you can use the HoverCard component:

 <HoverCard
   id="userHoverCard"
   trigger={<button>Hover me</button>}
   content={<div>User details here</div>}
 />
*/

export const HoverCard = ({ id, trigger, content }) => {
  const { getState, updateState } = useInputState();
  
  const { isOpen = false } = getState('hoverCard', id) || {};

  const handleMouseEnter = () => {
    updateState('hoverCard', id, { isOpen: true });
  };

  const handleMouseLeave = () => {
    updateState('hoverCard', id, { isOpen: false });
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {trigger}
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="absolute z-10 w-64 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-5 bg-white">
              {content}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};
