// Tooltip.js
import React from 'react';
import ReactDOM from 'react-dom';

const Tooltip = ({ children, position }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translateY(-50%)',
        zIndex: 9999,
      }}
    >
      <div className="bg-gray-800 text-white text-sm rounded-md py-2 px-3 shadow-lg">
        {children}
      </div>
      <div
        className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0"
        style={{
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '6px solid #1F2937', // Tailwind's gray-800
        }}
      ></div>
    </div>,
    document.body
  );
};

export default Tooltip;
