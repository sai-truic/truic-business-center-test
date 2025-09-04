import React, { useEffect, useRef } from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the ContextMenu component:

<ContextMenu
  id="myContextMenu"
  items={[
    { label: 'Option 1', onClick: () => console.log('Option 1 clicked') },
    { label: 'Option 2', onClick: () => console.log('Option 2 clicked') },
  ]}
>
  <div>Right-click me to open the context menu</div>
</ContextMenu>
*/

export const ContextMenu = ({ id, children, items }) => {
  const { getState, updateState } = useInputState();
  const menuRef = useRef(null);
  
  const { isOpen = false, position = { x: 0, y: 0 } } = getState('contextMenu', id) || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        updateState('contextMenu', id, { isOpen: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id, updateState]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    updateState('contextMenu', id, { 
      isOpen: true, 
      position: { x: e.clientX, y: e.clientY } 
    });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute bg-white border border-gray-200 rounded-md shadow-lg z-50"
          style={{ top: position.y, left: position.x }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                item.onClick();
                updateState('contextMenu', id, { isOpen: false });
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
