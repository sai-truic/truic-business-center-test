import React, { useRef, useEffect } from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Textarea component:

 <Textarea id="description" name="description" placeholder="Enter description" required rows={5} />
 <Textarea id="comments" name="comments" placeholder="Enter comments" required />
 */

export const Textarea = React.forwardRef(({ id, name, placeholder, required, rows = 3 }, ref) => {
  const { getState, updateState } = useInputState();
  const textareaRef = useRef(null);
  
  const value = getState('textarea', id)?.value || '';
  const height = getState('textarea', id)?.height;

  const handleTextareaChange = (e) => {
    updateState('textarea', id, {
      value: e.target.value,
      height: textareaRef.current.scrollHeight
    });
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${newHeight}px`;
      updateState('textarea', id, { height: newHeight });
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={(node) => {
        textareaRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      id={id}
      name={name}
      value={value}
      onChange={handleTextareaChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      style={{ height: height ? `${height}px` : 'auto' }}
      className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
    />
  );
});
