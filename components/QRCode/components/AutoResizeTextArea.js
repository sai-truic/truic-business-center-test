import React, { useEffect, useRef } from 'react';

export const AutoResizeTextArea = ({ 
  value,
  onChange,
  className = '',
  minHeight = 100,
  maxHeight = 500,
  ...props
}) => {
  const textAreaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    // Reset height to allow shrinking
    textarea.style.height = 'auto';
    
    // Calculate new height
    const newHeight = Math.max(
      minHeight,
      Math.min(textarea.scrollHeight, maxHeight)
    );
    
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
    // Add resize listener
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, [value]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    adjustHeight();
  };

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={handleChange}
      className={`resize-none overflow-hidden ${className}`}
      style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
      {...props}
    />
  );
};

export default AutoResizeTextArea;
