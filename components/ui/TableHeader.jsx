import React from 'react';

export const TableHeader = ({ columns, columnWidths, handleMouseDown }) => {
  return (
    <thead className="bg-orange-50">
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-[#F7931E] uppercase tracking-wider relative border-b border-orange-200"
            style={{ width: columnWidths[index] }}
          >
            <div className="truncate font-semibold">{column.header}</div>
            {index < columns.length - 1 && (
              <div
                className="absolute top-0 right-0 bottom-0 w-1 bg-orange-200 cursor-col-resize hover:bg-[#F7931E] transition-colors duration-200"
                onMouseDown={() => handleMouseDown(index)}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
