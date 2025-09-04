import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Table components:

 <Table id="userTable">
   <TableHeader>
     <TableRow>
       <TableHead>Name</TableHead>
       <TableHead>Email</TableHead>
     </TableRow>
   </TableHeader>
   <TableBody>
     <TableRow>
       <TableCell>John Doe</TableCell>
       <TableCell>john@example.com</TableCell>
     </TableRow>
     <TableRow>
       <TableCell>Jane Smith</TableCell>
       <TableCell>jane@example.com</TableCell>
     </TableRow>
   </TableBody>
 </Table>
*/

export const Table = ({ id, children, className = '' }) => {
  const { getState, updateState } = useInputState();
  
  const { customClass = className } = getState('table', id) || {};

  React.useEffect(() => {
    if (className !== customClass) {
      updateState('table', id, { customClass: className });
    }
  }, [id, className, customClass, updateState]);

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${customClass}`}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-50">
    <tr>{children}</tr>
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {children}
  </tbody>
);

export const TableRow = ({ children }) => <tr>{children}</tr>;

export const TableHead = ({ children, className = '' }) => (
  <th
    scope="col"
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
);
