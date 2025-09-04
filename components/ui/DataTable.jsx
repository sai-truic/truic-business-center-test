import React, { useRef, useEffect, useMemo, Fragment } from 'react';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import { useTableState } from './useTableState';
import { useTableHandlers } from './useTableHandlers';
import { processEntry } from './dataProcessor';
import { evaluateFormula } from './formulaEvaluator';

const deepCopyAndMap = (data) => {
  // Helper function to check if a string is a financialProjections reference
  const isFinancialReference = (value) => {
    return typeof value === 'string' && value.includes('finacialProjections');
  };

  // Helper function to handle numeric values
  const processValue = (value) => {
    if (typeof value === 'number') {
      return value;  // Keep numbers as is
    }
    if (isFinancialReference(value)) {
      return value;  // Keep financial references as is
    }
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return !isNaN(parsed) ? parsed : value;  // Convert numeric strings to numbers
    }
    return value;
  };

  return data.map(item => {
    // Create a new object to store the copied item
    const copiedItem = {};

    // Process each property in the item
    Object.keys(item).forEach(key => {
      if (key === 'items' && Array.isArray(item[key])) {
        // Recursively process nested items
        copiedItem[key] = deepCopyAndMap(item[key]);
      } else {
        // Process regular values
        copiedItem[key] = processValue(item[key]);
      }
    });

    return copiedItem;
  });
};

export const DataTable = ({ id, columns, data, isEditable, onDataChange, stateValue, hasReloaded, setHasReloaded, handleInfoClick }) => {
  const tableRef = useRef(null);

  // Process row formulas
  const processRowFormulas = (data) => {
    return data.map(row => {
      const newRow = { ...row };
      
      // Check if row has a formula property
      if (row.formula) {
        // console.log("Processing formula for row:", row.id); // Debug log
        const variables = row.formula.split(/[-+*/]/).map(part => part.trim());
        // console.log("Formula variables:", variables); // Debug log
        const values = variables.map(variable => {
          if (typeof row[variable] === 'string' && row[variable].includes('finacialProjections')) {
            const path = row[variable].split('.');
            let value = stateValue;
            for (const key of path) {
              value = value?.[key];
            }
            return parseFloat(value) || 0;
          }
          const gridKey = `${row.id}_${variable}`;
          if (gridData[gridKey] !== undefined) {
            return parseFloat(gridData[gridKey]) || 0;
          }
          return parseFloat(row[variable]) || 0;
        });

        if (values.some(v => v !== 0 || typeof v === 'number')) {
          if (row.id !== "breakEvenSales") {
            const result = new Function(...variables, `return ${row.formula}`)(...values);
            newRow.total = result.toFixed(2);
          }
        }
      }

      // Process nested items recursively
      if (newRow.items && Array.isArray(newRow.items)) {
        newRow.items = processRowFormulas(newRow.items);
      }

      return newRow;
    });
  };

  // Process column formulas
  const processColumnFormulas = (data, columns) => {
    // console.log("Data :", data)
    
    const processRow = (row) => {
      const newRow = { ...row };
      // console.log("Processing Row :", newRow)
      
      // Process formulas for the current row
      columns.forEach(column => {
        if (column.formula) {
          const variables = column.formula.split(/[-+*/]/).map(part => part.trim());
          // console.log("Variables :", variables)
          const values = variables.map(variable => {
            // Check if the variable is a financial projections reference
            if (typeof row[variable] === 'string' && row[variable].includes('finacialProjections')) {
              // Split the path and access nested stateValue
              const path = row[variable].split('.');
              let value = stateValue;
              for (const key of path) {
                value = value?.[key];
              }
              return parseFloat(value) || 0;
            }
            // Try to get value from gridData first
            const gridKey = `${row.id}_${variable}`;
            if (gridData[gridKey] !== undefined) {
              return parseFloat(gridData[gridKey]) || 0;
            }
            // Fallback to row value
            const rowValue = row[variable];
            return rowValue !== undefined ? parseFloat(rowValue) || 0 : 0;
          });
          // console.log("Values :", values)
          
          // Only calculate if we have valid values
          if (values.some(v => v !== 0 || typeof v === 'number')) {
            const result = new Function(...variables, `return ${column.formula}`)(...values);
            // console.log("Result :", result)
            // Extract accessor name from function or use direct accessor
            const accessorName = typeof column.accessor === 'function' 
              ? column.accessor.toString().match(/=>.*?\.(\w+)/)?.[1] 
              : column.accessor;
            // console.log("Column accessor:", accessorName);
            newRow[accessorName] = result.toFixed(2);
          }
        }
      });

      // Recursively process sub-items if they exist
      if (newRow.items && Array.isArray(newRow.items)) {
        newRow.items = newRow.items.map(processRow);
      }

      return newRow;
    };

    return data.map(processRow);
  };

  const processReferences = (data) => {
    return data.map(row => {
      const newRow = { ...row };
      // console.log("New Row :", newRow)
      
      // Process each field in the row
      Object.entries(newRow).forEach(([key, value]) => {
        if (key !== "id" && key !== "item" && key !== "formula" && key !== "specialFormatting") {
          if (typeof value === 'string') {
            const path = value.split('.');
            // console.log("Key :", key, "Value :", value)
            let resolvedValue = stateValue;
            for (const pathKey of path) {
              resolvedValue = resolvedValue?.[pathKey];
            }
            newRow[key] = resolvedValue || value || 0;
          }
        }
      });

      // Process nested items recursively
      if (newRow.items && Array.isArray(newRow.items)) {
        newRow.items = processReferences(newRow.items);
      }

      return newRow;
    });
  };


  const {
    localData,
    setLocalData,
    expandedRows,
    setExpandedRows,
    columnWidths,
    setColumnWidths,
    gridData,
    setGridData,
    resizing,
    setResizing,
    hasProcessedEntries
  } = useTableState(data, columns, stateValue);


  // Track reload state

  // Process the data with row formulas, column formulas, and resolve financial references
   // Process data with memoization                                                                 
   const processedWithRowFormulas = useMemo(() => processRowFormulas(localData), [localData]);      
   let processedData;
   processedData = useMemo(() => processColumnFormulas(processedWithRowFormulas, columns), [processedWithRowFormulas, columns]);
  // console.log("Processed Data :", processedData)
  
  let processedReferences;
  // console.log("Has Reloaded :", hasReloaded)
  if (hasReloaded) {
    processedReferences = processReferences(processedData);
    processedData = processedReferences
  } else {
    processedReferences = processedData;
  }
  // console.log("Processed References :", processedReferences)



  const {
    handleMouseDown,
    toggleRowExpansion,
    handleCellChange
  } = useTableHandlers({
    tableRef,
    resizing,
    setResizing,
    columnWidths,
    setColumnWidths,
    setExpandedRows,
    localData: processedData,
    setLocalData,
    setGridData,
    columns,
    onDataChange
  });

  useEffect(() => {
    if (!hasProcessedEntries.current) {
      data.forEach(entry => {
        processEntry(entry, data, stateValue);
        if (entry.items && Array.isArray(entry.items)) {
          entry.items.forEach(nestedItem => {
            processEntry(nestedItem, data, stateValue);
          });
        }
      });
      hasProcessedEntries.current = true;
    }
  }, []);

  // console.log("Columns :", columns)


  return (
    <div className="relative">
      <div className="lg:hidden">
        <div className="bg-orange-50 p-4 rounded-lg mb-3 shadow-sm border border-orange-200">
          <div className="flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F7931E] mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-[#F7931E] mb-1">Instructions</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Scroll horizontally to view all columns</li>
                <li>• Scroll vertically to see all entries</li>
                <li>• Tap on input fields to add or edit values</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-h-[80vh] overflow-auto scrollbar-custom touch-pan-x touch-pan-y" ref={tableRef}>
      <style jsx global>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
          border: 2px solid transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
        @media (max-width: 768px) {
          .scrollbar-custom::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
      <table className="min-w-full divide-y divide-orange-200 table-fixed sticky top-0">
        <TableHeader 
          columns={columns} 
          columnWidths={columnWidths}
          handleMouseDown={handleMouseDown}
        />
        <tbody className="bg-white divide-y divide-gray-200">
          {/*console.log("Local Data Before Deep Copy :", processedData)*/}
          {/*console.log("Local Data Deep Copy :", deepCopyAndMap(processedData))*/}
          {processedReferences.map((row, rowIndex) => (
            <Fragment key={rowIndex}>
            <TableRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              columns={columns}
              isEditable={isEditable}
              columnsWithFormulas={columns.reduce((acc, col) => {
                if (col.formula) {
                  acc[col.accessor] = true;
                }
                return acc;
              }, {})}
              expandedRows={expandedRows}
              toggleRowExpansion={toggleRowExpansion}
              handleCellChange={handleCellChange}
              gridData={gridData}
              stateValue={stateValue}
              localData={processedReferences}
              setHasReloaded={setHasReloaded}
              handleInfoClick={handleInfoClick}
            />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
