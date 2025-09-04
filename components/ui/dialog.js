// In src/components/ui/dialog.js
import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Dialog component:

 <Dialog id="myDialog">
   <DialogContent>
     <DialogHeader>
       <DialogTitle>Dialog Title</DialogTitle>
     </DialogHeader>
     <p>Dialog content goes here.</p>
     <DialogFooter>
       <Button id="closeDialog" onClick={() => updateState('dialog', 'myDialog', { isOpen: false })}>Close</Button>
     </DialogFooter>
   </DialogContent>
 </Dialog>
*/

export const Dialog = ({ id, children }) => {
  const { getState, updateState } = useInputState();
  
  const { isOpen = false } = getState('dialog', id) || {};

  const handleClose = () => {
    updateState('dialog', id, { isOpen: false });
  };

  if (!isOpen) return null;

  return (
    <div className="dialog show">
      <div className="overlay" onClick={handleClose}></div>
      <div className="content">{children}</div>
    </div>
  );
};

export const DialogContent = ({ children }) => <div className="dialog-content">{children}</div>;

export const DialogHeader = ({ children }) => <div className="dialog-header">{children}</div>;

export const DialogTitle = ({ children }) => <h4 className="dialog-title">{children}</h4>;

export const DialogFooter = ({ children }) => <div className="dialog-footer">{children}</div>;
