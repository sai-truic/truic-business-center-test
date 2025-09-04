import React, { useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import useInputState from '../useInputState';

/*
This is how you can use the DropdownMenu component:

 <DropdownMenu
   id="userMenu"
   trigger="User Menu"
   items={[
     { label: 'Profile', href: '/profile', onClick: () => console.log('Profile clicked') },
     { label: 'Settings', href: '/settings', onClick: () => console.log('Settings clicked') },
     { label: 'Logout', href: '/logout', onClick: () => console.log('Logout clicked') },
   ]}
 />
*/

export const DropdownMenu = ({ id, trigger, items }) => {
  const { getState, updateState } = useInputState();
  const dropdownRef = useRef(null);
  
  const { isOpen = false } = getState('dropdownMenu', id) || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        updateState('dropdownMenu', id, { isOpen: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id, updateState]);

  const toggleDropdown = () => {
    updateState('dropdownMenu', id, { isOpen: !isOpen });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {trigger}
        </button>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                  updateState('dropdownMenu', id, { isOpen: false });
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};
