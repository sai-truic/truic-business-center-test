import React from 'react';
import useInputState from '../useInputState';
import { Label } from './label';

/*
This is how you can use the Checkbox component:

 <Checkbox id="terms" label="I agree to the terms and conditions" />
 <Checkbox id="newsletter" label="Subscribe to our newsletter" />
*/

export const Checkbox = React.forwardRef(({ id, label, className = '' }, ref) => {
  const { getState, updateState } = useInputState();
  
  const { checked = false } = getState('checkbox', id) || {};

  const handleChange = (e) => {
    updateState('checkbox', id, { checked: e.target.checked });
  };

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        ref={ref}
        className={`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 ${className}`}
      />
      {label && (
        <Label id={`${id}-label`} htmlFor={id}>
          {label}
        </Label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
