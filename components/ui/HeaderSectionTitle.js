import React from 'react';

const HeaderSectionTitle = ({ children }) => (
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-indigo-800 mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
      {children}
    </span>
  </h1>
);

export default HeaderSectionTitle;
