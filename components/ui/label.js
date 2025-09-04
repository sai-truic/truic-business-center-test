// In src/components/ui/label.js
import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Label component:

 <Label id="usernameLabel" htmlFor="username">Username</Label>
 <Label id="emailLabel" htmlFor="email">Email Address</Label>
*/

export const Label = ({ id, htmlFor, children, className }) => {
  const { getState, updateState } = useInputState();
  
  const { content = children } = getState('label', id) || {};

  React.useEffect(() => {
    if (children !== content) {
      updateState('label', id, { content: children });
    }
  }, [id, children, content, updateState]);

  return (
    <label                                                                                                                                                                   
    htmlFor={htmlFor}                                                                                                                                                      
    className={`block text-sm transition-colors duration-200 ease-in-out ${                                                                                                
      className || 'font-semibold text-gray-700 hover:text-gray-900'                                                                                                       
    }`}                                                                                                                                                                    
  >  
      {content}
    </label>
  );
};
