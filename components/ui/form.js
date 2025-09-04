import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Form components:

 <Form id="registrationForm" onSubmit={handleSubmit}>
   <FormField id="username" label="Username">
     <Input id="username" name="username" placeholder="Enter username" required />
   </FormField>
   <FormField id="email" label="Email">
     <Input id="email" name="email" type="email" placeholder="Enter email" required />
   </FormField>
   <FormMessage id="formError" type="error">Please fill in all required fields.</FormMessage>
   <Button id="submitButton" type="submit">Register</Button>
 </Form>
*/

export const Form = ({ id, onSubmit, children }) => {
  const { updateState } = useInputState();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateState('form', id, { submitted: true });
    if (onSubmit) onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
    </form>
  );
};

export const FormField = ({ id, label, children }) => {
  const { getState, updateState } = useInputState();
  
  const { label: storedLabel = label } = getState('formField', id) || {};

  React.useEffect(() => {
    if (label !== storedLabel) {
      updateState('formField', id, { label });
    }
  }, [id, label, storedLabel, updateState]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{storedLabel}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
};

export const FormMessage = ({ id, children, type = 'error' }) => {
  const { getState, updateState } = useInputState();

  const { message = children } = getState('formMessage', id) || {};

  React.useEffect(() => {
    if (children !== message) {
      updateState('formMessage', id, { message: children, type });
    }
  }, [id, children, message, type, updateState]);

  const colors = {
    error: 'text-red-600',
    success: 'text-green-600',
    info: 'text-blue-600',
  };

  return <p className={`mt-2 text-sm ${colors[type]}`}>{message}</p>;
};
