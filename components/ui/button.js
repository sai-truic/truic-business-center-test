import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Button component:

 <Button id="submit" variant="primary">Submit</Button>
 <Button id="cancel" variant="secondary" disabled>Cancel</Button>
 <Button id="delete" variant="danger" onClick={() => handleDelete()}>Delete</Button>
*/

export const Button = ({ id, children, variant = 'default', disabled = false, onClick, className = '' }) => {
  const { getState, updateState } = useInputState();

  const { variant: storedVariant = variant, disabled: storedDisabled = disabled } = getState('button', id) || {};

  React.useEffect(() => {
    if (variant !== storedVariant || disabled !== storedDisabled) {
      updateState('button', id, { variant, disabled });
    }
  }, [id, variant, disabled, storedVariant, storedDisabled, updateState]);

  const variantClasses = {
    default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    primary: 'bg-[#F7931E] text-white hover:bg-orange-600',
    secondary: 'bg-orange-400 text-white hover:bg-orange-500',
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    orange: 'bg-gradient-to-r from-[#F7931E] to-orange-500 text-white hover:from-orange-600 hover:to-orange-600',
  };

  const handleClick = (e) => {
    if (!storedDisabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-md hover:shadow-lg transition-all duration-300 ${
        variantClasses[storedVariant]
      } ${storedDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      disabled={storedDisabled}
    >
      {children}
    </button>
  );
};
