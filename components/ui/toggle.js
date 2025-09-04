import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Toggle component:

 <Toggle id="darkMode" label="Dark Mode" />
*/

export const Toggle = ({ id, label }) => {
  const { getState, updateState } = useInputState();
  
  const { checked = false } = getState('toggle', id) || {};

  const handleChange = () => {
    updateState('toggle', id, { checked: !checked });
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
        />
        <div className={`w-10 h-6 bg-gray-200 rounded-full shadow-inner ${checked ? 'bg-blue-500' : ''}`}></div>
        <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform duration-300 ease-in-out ${checked ? 'transform translate-x-full' : ''}`}></div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>}
    </label>
  );
};
