import React from 'react';
import { Transition } from '@headlessui/react';
import useInputState from '../useInputState';

/*
This is how you can use the Popover component:

 <Popover
   id="userPopover"
   trigger={<button>Click me</button>}
   content={<div>Popover content here</div>}
 />
*/

export const Popover = ({ id, trigger, content }) => {
  const { getState, updateState } = useInputState();
  
  const { isOpen = false } = getState('popover', id) || {};

  const togglePopover = () => {
    updateState('popover', id, { isOpen: !isOpen });
  };

  return (
    <div className="relative">
      <div onClick={togglePopover}>{trigger}</div>
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
