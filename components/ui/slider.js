import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Slider component:

 <Slider
   id="volumeControl"
   min={0}
   max={100}
   step={1}
   defaultValue={50}
   onChange={(value) => console.log('New value:', value)}
 />
*/

export const Slider = ({ id, min = 0, max = 100, step = 1, defaultValue = 0, onChange }) => {
  const { getState, updateState } = useInputState();
  
  const { value = defaultValue } = getState('slider', id) || {};

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    updateState('slider', id, { value: newValue });
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        {value}
      </div>
    </div>
  );
};
