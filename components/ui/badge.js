import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Badge component:

 <Badge id="status" variant="success">Active</Badge>
 <Badge id="priority" variant="danger">High</Badge>
 <Badge id="category" variant="primary">Feature</Badge>
*/

export const Badge = ({ id, children, variant = 'default', className = '' }) => {
  const { getState, updateState } = useInputState();

  const { variant: storedVariant = variant, content: storedContent = children } = getState('badge', id) || {};

  React.useEffect(() => {
    if (variant !== storedVariant || children !== storedContent) {
      updateState('badge', id, { variant, content: children });
    }
  }, [id, variant, children, storedVariant, storedContent, updateState]);

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[storedVariant]} ${className}`}>
      {storedContent}
    </span>
  );
};
