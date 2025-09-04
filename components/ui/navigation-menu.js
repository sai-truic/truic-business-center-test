import React from 'react';
import { Transition } from '@headlessui/react';
import useInputState from '../useInputState';

/*
This is how you can use the NavigationMenu component:

 <NavigationMenu
   id="mainNav"
   items={[
     { label: 'Home', content: <a href="/">Home</a> },
     { label: 'Products', content: (
       <>
         <a href="/products/category1">Category 1</a>
         <a href="/products/category2">Category 2</a>
       </>
     )},
     { label: 'About', content: <a href="/about">About Us</a> },
   ]}
 />
*/

export const NavigationMenu = ({ id, items }) => {
  const { getState, updateState } = useInputState();
  
  const { activeItem = null } = getState('navigationMenu', id) || {};

  const handleMouseEnter = (index) => {
    updateState('navigationMenu', id, { activeItem: index });
  };

  const handleMouseLeave = () => {
    updateState('navigationMenu', id, { activeItem: null });
  };

  return (
    <nav className="relative">
      <ul className="flex space-x-4">
        {items.map((item, index) => (
          <li key={index} className="relative">
            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.label}
            </button>
            <Transition
              show={activeItem === index}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {item.content && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {item.content}
                  </div>
                </div>
              )}
            </Transition>
          </li>
        ))}
      </ul>
    </nav>
  );
};
