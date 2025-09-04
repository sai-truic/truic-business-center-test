import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container mx-auto px-4 w-full">
      {children}
    </div>
  );
};

export default Container;