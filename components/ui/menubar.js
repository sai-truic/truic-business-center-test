import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Menubar component:

 <Menubar
   id="mainMenu"
   items={[
     {
       label: 'File',
       submenu: [
         { label: 'New', onClick: () => console.log('New clicked') },
         { label: 'Open', onClick: () => console.log('Open clicked') },
         { label: 'Save', onClick: () => console.log('Save clicked') },
       ]
     },
     {
       label: 'Edit',
       submenu: [
         { label: 'Undo', onClick: () => console.log('Undo clicked') },
         { label: 'Redo', onClick: () => console.log('Redo clicked') },
         { label: 'Cut', onClick: () => console.log('Cut clicked') },
       ]
     },
   ]}
 />
*/

export const Menubar = ({ id, items }) => {
  const { getState, updateState } = useInputState();
  
  const { activeMenu = null } = getState('menubar', id) || {};

  const handleMouseEnter = (index) => {
    updateState('menubar', id, { activeMenu: index });
  };

  const handleMouseLeave = () => {
    updateState('menubar', id, { activeMenu: null });
  };

  return (
    <div className="flex bg-gray-100 p-2 rounded-lg">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <button
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {item.label}
          </button>
          {activeMenu === index && item.submenu && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              {item.submenu.map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href={subItem.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    subItem.onClick();
                  }}
                >
                  {subItem.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
