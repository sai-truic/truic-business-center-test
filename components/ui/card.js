import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Card component:

<Card id="userCard" data={{ name: "John Doe", email: "john@example.com" }}>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>View and edit user details</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Name: {cardData?.name}</p>
    <p>Email: {cardData?.email}</p>
  </CardContent>
  <CardFooter>
    <button onClick={() => updateCard({ name: "Jane Doe" })}>
      Update Name
    </button>
  </CardFooter>
</Card>
*/

export const Card = ({ id, data, children, className = '' }) => {
  const { getState, updateState } = useInputState();
  
  const cardData = getState('card', id) || {};

  React.useEffect(() => {
    if (JSON.stringify(cardData) !== JSON.stringify({ ...data, rendered: true })) {
      updateState('card', id, { ...data, rendered: true });
    }
  }, [id, data, updateState, cardData]);

  const updateCard = React.useCallback((newData) => {
    updateState('card', id, newData);
  }, [id, updateState]);

  return (
    <div className={`rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-opacity-50 ${className}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { cardData, updateCard })
      )}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 border-b border-gray-100 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold leading-tight tracking-tight text-gray-900 transition-colors duration-200 ease-in-out group-hover:text-blue-600 ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <div className={`text-sm text-gray-500 transition-colors duration-200 ease-in-out group-hover:text-gray-600 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between p-6 bg-gray-50 rounded-b-xl transition-colors duration-200 ease-in-out ${className}`}>{children}</div>
);
