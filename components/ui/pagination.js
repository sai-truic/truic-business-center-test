import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Pagination component:

 <Pagination
   id="userListPagination"
   totalPages={10}
   onPageChange={(page) => console.log('Page changed to:', page)}
 />
*/

export const Pagination = ({ id, totalPages, onPageChange }) => {
  const { getState, updateState } = useInputState();
  
  const { currentPage = 1 } = getState('pagination', id) || {};

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (number) => {
    updateState('pagination', id, { currentPage: number });
    if (onPageChange) {
      onPageChange(number);
    }
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
