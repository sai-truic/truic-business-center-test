import React from 'react';
import { Transition } from '@headlessui/react';
import useInputState from '../useInputState';

/*
This is how you can use the Sonner component:

 <Sonner id="mainToaster" />

And to add a toast:

 const { updateState } = useInputState();
 updateState('sonner', 'mainToaster', {
   toasts: [
     ...existingToasts,
     { id: Date.now(), message: 'New toast message', type: 'info' }
   ]
 });
*/

export const Sonner = ({ id }) => {
  const { getState, updateState } = useInputState();
  
  const { toasts = [] } = getState('sonner', id) || {};

  const removeToast = (toastId) => {
    updateState('sonner', id, {
      toasts: toasts.filter(toast => toast.id !== toastId)
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {toasts.map(toast => (
        <Transition
          key={toast.id}
          show={true}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`mb-2 p-4 rounded-md shadow-md ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          } text-white`}>
            {toast.message}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export const useToast = (id) => {
  const { getState, updateState } = useInputState();

  return (message, type = 'info', duration = 3000) => {
    const { toasts = [] } = getState('sonner', id) || {};
    const newToast = { id: Date.now(), message, type };
    
    updateState('sonner', id, { toasts: [...toasts, newToast] });

    setTimeout(() => {
      const { toasts: currentToasts = [] } = getState('sonner', id) || {};
      updateState('sonner', id, {
        toasts: currentToasts.filter(toast => toast.id !== newToast.id)
      });
    }, duration);
  };
};
