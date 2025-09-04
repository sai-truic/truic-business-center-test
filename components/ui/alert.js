import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Alert component:

 <Alert 
   id="successAlert" 
   type="success" 
   message="Operation completed successfully!" 
   onClose={() => console.log('Alert closed')}
 />
 <Alert 
   id="errorAlert" 
   type="error" 
   message="An error occurred. Please try again." 
   onClose={() => console.log('Alert closed')}
 />
 */

export const Alert = ({ id, type = 'info', message, onClose }) => {
  const { getState, updateState } = useInputState();
  
  const { visible = true } = getState('alert', id) || {};

  const handleClose = () => {
    updateState('alert', id, { visible: false });
    if (onClose) onClose();
  };

  if (!visible) return null;

  const alertStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div className={`border-l-4 p-4 ${alertStyles[type]}`} role="alert">
      <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      <p>{message}</p>
      <button 
        onClick={handleClose}
        className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-bold"
      >
        &times;
      </button>
    </div>
  );
};
