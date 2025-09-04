import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import useInputState from '../useInputState';

/*
This is how you can use the Toast component:

 <Toast id="successToast" message="Operation successful" type="success" duration={3000} />
*/

export const Toast = ({ id, message, type = 'info', duration = 3000 }) => {
  const { getState, updateState } = useInputState();
  
  const { isVisible = true } = getState('toast', id) || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      updateState('toast', id, { isVisible: false });
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, updateState]);

  const bgColor = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  }[type];

  return (
    <Transition
      show={isVisible}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`${bgColor} text-white px-4 py-2 rounded-md shadow-md`}>
        {message}
      </div>
    </Transition>
  );
};

export const useToast = () => {
  const { getState, updateState } = useInputState();

  const addToast = (id, message, type, duration) => {
    updateState('toast', id, { message, type, duration, isVisible: true });
  };

  const removeToast = (id) => {
    updateState('toast', id, { isVisible: false });
  };

  return { addToast, removeToast };
};
