import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the AlertDialog component:

 <AlertDialog 
   id="confirmDelete"
   title="Confirm Deletion"
   description="Are you sure you want to delete this item? This action cannot be undone."
   confirmLabel="Delete"
   cancelLabel="Cancel"
   onConfirm={() => handleDelete()}
   onCancel={() => console.log('Deletion cancelled')}
 />
 */

export const AlertDialog = ({ id, title, description, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
  const { getState, updateState } = useInputState();
  
  const { isOpen = false } = getState('alertDialog', id) || {};

  const openDialog = () => {
    updateState('alertDialog', id, { isOpen: true });
  };

  const closeDialog = () => {
    updateState('alertDialog', id, { isOpen: false });
  };

  const handleConfirm = () => {
    closeDialog();
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    closeDialog();
    if (onCancel) onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
