import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

// New function to evaluate formulas
const evaluateFormula = (formula, data, cache = new Map()) => {
  // Add caching to prevent redundant calculations
  const cacheKey = JSON.stringify({ formula, data });
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const formulaContext = {};
    const processData = (entries) => {
      entries.forEach(row => {
        if (row.id) {
          formulaContext[row.id] = {};
          Object.keys(row).forEach(key => {
            if (key !== 'id' && key !== 'item' && key !== 'items' && key !== 'category') {
              formulaContext[row.id][key] = parseFloat(row[key]) || 0;
            }
          });
        }
        if (row.items) {
          processData(row.items);
        }
      });
    };

    processData(data);
    const contextColumns = Object.keys(formulaContext[Object.keys(formulaContext)[0]] || {});
    
    const evaluateExpression = (expr, column) => {
      const replacedExpr = expr.replace(/(\w+)\.(\w+)/g, (match, p1, p2) => {
        if (formulaContext.hasOwnProperty(p1) && formulaContext[p1].hasOwnProperty(p2)) {
          return parseFloat(formulaContext[p1][p2]) || 0;
        }
        return match;
      }).replace(/(\w+)(?![\w\s]*\()/g, (match, p1) => {
        if (formulaContext.hasOwnProperty(p1) && formulaContext[p1].hasOwnProperty(column)) {
          return parseFloat(formulaContext[p1][column]) || 0;
        }
        return p1;
      });
      
      const result = new Function('return ' + replacedExpr)();
      return isNaN(result) ? 0 : result;
    };

    const result = {};
    contextColumns.forEach(column => {
      result[column] = evaluateExpression(formula, column);
    });

    const outputValue = result['fixed'] || 0;
    const finalResult = {
      ...result,
      outputValue: outputValue.toFixed(2)
    };

    cache.set(cacheKey, finalResult);
    return finalResult;
  } catch (error) {
    console.error('Error evaluating formula:', error);
    return { outputValue: 'Error' };
  }
};

export const DataTable = ({ id, columns, data, isEditable, onDataChange, stateValue }) => {
  // console.log("State Value :", stateValue);
  // console.log("Data :", data);
  const processEntry = (entry) => {
    if (entry.formula) {
      console.log("Entry Formula :", entry.formula);

      const formulaParts = entry.formula.split(/[-+*/]/).map(part => part.trim());
      const values = {};

      const findRelatedEntry = (part, data) => {
        for (const entry of data) {
          if (entry.id === part) {
            return entry;
          }
          if (entry.items && Array.isArray(entry.items)) {
            const found = findRelatedEntry(part, entry.items);
            if (found) {
              return found;
            }
          }
        }
        return null;
      };

      formulaParts.forEach(part => {
        const relatedEntry = findRelatedEntry(part, data);
        if (relatedEntry) {
          // console.log(`Related Entry for ${part}:`, relatedEntry);
          Object.keys(relatedEntry).forEach(key => {
            if (key !== 'id' && key !== 'item' && key !== 'items' && key !== 'category' && key !== 'formula') {
              let value = 0;
              if (typeof relatedEntry[key] === 'string') {
                const path = relatedEntry[key].split('.');
                value = JSON.parse(JSON.stringify(stateValue));
                for (let key of path) {
                  value = value[key];
                  if (value === undefined) {
                    value = 0;
                    break;
                  }
                }
              } else {
                // Use the updated value from the related entry directly
                value = parseFloat(relatedEntry[key]) || 0;
              }
              // console.log(`Value for ${key} from stateValue:`, value);
              if (!values[key]) {
                values[key] = {};
              }
              values[key][part] = value;
            }
          });
        } else {
          console.warn(`No related entry found for ${part}`);
        }
      });

      const calculateValue = (expression, values) => {
        const replacedExpression = expression.replace(/(\w+)/g, (match) => {
          return values[match] !== undefined ? values[match] : 0;
        });
        try {
          return new Function('return ' + replacedExpression)();
        } catch (error) {
          // console.error('Error evaluating expression:', error);
          return 0;
        }
      };

      Object.keys(values).forEach(key => {
        const calculatedValue = calculateValue(entry.formula, values[key]);
        // console.log(`Calculated Value for ${key}:`, calculatedValue);

        // Update the data with the calculated value for any entry with a formula
        entry[key] = calculatedValue;
        // Update stateValue with the calculated value
        if (!Object.isExtensible(stateValue)) {
          stateValue = { ...stateValue }; // Create a new extensible object
        }
        if (stateValue[entry.id]) {
          stateValue[entry.id][key] = calculatedValue;
        } else {
          stateValue[entry.id] = { [key]: calculatedValue };
        }
      });
    }
  };

  const hasProcessedEntries = useRef(false);

  useEffect(() => {
    if (!hasProcessedEntries.current) {
      console.log("Inside to process data entry")
      data.forEach(entry => {
        processEntry(entry);

        // If the entry has nested items, iterate over them as well
        if (entry.items && Array.isArray(entry.items)) {
          entry.items.forEach(nestedItem => {
            processEntry(nestedItem);
          });
        }
      });
      hasProcessedEntries.current = true;
    }
  }, []);
  
  const [localData, setLocalData] = useState(() => {
    const initialData = [...data];
    console.log("Before Process Entry :", initialData)
    initialData.forEach(entry => processEntry(entry));
    return initialData;
  });
  // console.log("Local Data :", localData)
  const [expandedRows, setExpandedRows] = useState(() => {
    const initialState = {};
    data.forEach((row, index) => {
      if (row.category === 1 && row.items && row.items.length > 0) {
        initialState[index] = true;
      }
    });
    return initialState;
  });
  const [columnWidths, setColumnWidths] = useState(columns.map(() => `${100 / columns.length}%`));
  const [gridData, setGridData] = useState({});
  const [resizing, setResizing] = useState(null);
  const tableRef = useRef(null);

  // Use useMemo to compute updatedData without causing infinite loops
  const updatedData = useMemo(() => {
    return localData.map(row => {
      if (row.formula) {
        const result = evaluateFormula(row.formula, localData);
        return { 
          ...row, 
          ...Object.fromEntries(
            Object.keys(row)
              .filter(key => key !== 'id' && key !== 'item' && key !== 'items' && key !== 'category' && key !== 'formula')
              .map(key => [key, typeof result === 'object' ? result[key] : result])
          )
        };
      }
      if (row.items) {
        const updatedItems = row.items.map(item => {
          if (item.formula) {
            const result = evaluateFormula(item.formula, localData);
            // console.log("Result :", result)
            return { 
              ...item, 
              ...Object.fromEntries(
                Object.keys(item)
                  .filter(key => key !== 'id' && key !== 'item' && key !== 'items' && key !== 'category' && key !== 'formula')
                  .map(key => [key, typeof result === 'object' ? result[key] : result])
              )
            };
          }
          return item;
        });
        // console.log("Updated Items :", updatedItems)
        return { ...row, items: updatedItems };
      }
      return row;
    });
  }, [localData]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    // console.log("Local Data :", localData)
    // console.log("State Value :", stateValue)
    setGridData(prevGridState => ({
      ...prevGridState,
      [`${rowIndex}_${colIndex}`]: value
    }));
  
    let parentIdx = -1;
    const newData = localData.map((row, idx) => {
      if (typeof rowIndex === 'number' && idx === rowIndex) {
        const newRow = { ...row };
        const key = Object.keys(row)[colIndex+1];
        // console.log("Key :", key)
        newRow[key] = value;
        parentIdx = idx;
        return newRow;
      } else if (typeof rowIndex === 'string' && row.items) {
        const [parentIndex, childIndex] = rowIndex.split("-").map(Number);
        if (idx === parentIndex) {
          const newRow = { ...row };
          newRow.items = newRow.items.map((item, itemIdx) => {
            if (itemIdx === childIndex) {
              const newItem = { ...item };
              const key = Object.keys(item)[colIndex+1];
              newItem[key] = value;
              return newItem;
            }
            return item;
          });
          return newRow;
        }
      }
      return row;
    });

    const updatedData = updateDependentCellsRecursively(newData);
    setLocalData(updatedData);
    // console.log("Columns :", columns)
    let changedRow;
    try {
      changedRow = updatedData.find(row => row.id === newData[rowIndex].id);
    } catch {
      // console.log(updatedData[rowIndex.split("-")[0]]["items"][rowIndex.split("-")[1]])
      changedRow = updatedData[rowIndex.split("-")[0]]["items"][rowIndex.split("-")[1]];
    }
    // console.log("Object.keys(changedRow) :", changedRow)
    if (changedRow) {
      const changedKey = Object.keys(changedRow)[colIndex+1];
      const changedValue = changedRow[changedKey];
      const columnId = columns[colIndex].id;
      const path = typeof rowIndex === 'string' 
        ? rowIndex.split('-').reduce((acc, curr, idx) => idx === 0 ? columns[0].id : `${acc}.items[${curr}]`, '')
        : columns[0].id;
      onDataChange({ [`${columnId}.${changedRow["id"]}`]: changedValue });
    }
  };

  const updateDependentCellsRecursively = (data) => {
    const updatedData = [...data];
    const updateCell = (row, rowIndex) => {
      if (row.formula) {
        const result = evaluateFormula(row.formula, updatedData);
        Object.keys(row).forEach(key => {
          if (key !== 'id' && key !== 'item' && key !== 'items' && key !== 'category' && key !== 'formula') {
            row[key] = typeof result === 'object' ? result[key] : result;
          }
        });
      }
      if (row.items) {
        row.items = row.items.map((item, itemIndex) => {
          return updateCell(item, `${rowIndex}-${itemIndex}`);
        });
      }
      // Update formula-based rows that don't have their own values
      if (row.formula && !row.fixed && !row.variable) {
        const result = evaluateFormula(row.formula, updatedData);
        row.value = typeof result === 'number' ? result.toFixed(2) : result;
      }
      return row;
    };

    return updatedData.map((row, index) => updateCell(row, index));
  };

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowIndex]: !prev[rowIndex]
    }));
  };

  const handleMouseDown = (index) => {
    setResizing(index);
  };

  const handleMouseMove = (e) => {
    if (resizing !== null) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - tableRect.left) / tableRect.width) * 100;
      const newColumnWidths = [...columnWidths];
      newColumnWidths[resizing] = `${newWidth}%`;
      setColumnWidths(newColumnWidths);
    }
  };

  const handleMouseUp = () => {
    setResizing(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  const renderRow = (row, rowIndex, depth = 0) => {
    // if (row.id === "grossProfit") {
    //   console.log("Row in render Row :", row)
    // }
    const isExpandable = row.category === 1 && row.items && row.items.length > 0;
    const isExpanded = expandedRows[rowIndex];
    const paddingLeft = depth * 20;

    // Check if the row is BreakEvenSales
    if (row.id === 'breakEvenSales') {
      const result = evaluateFormula(row.formula, localData);
      const formattedValue = typeof row.specialFormatting === 'function' 
        ? row.specialFormatting(result.outputValue)
        : result.outputValue;
      return (
        <tr key={rowIndex} className={`${depth > 0 ? 'bg-gray-50' : ''}`}>
          <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
            <span style={{ paddingLeft: paddingLeft }} className="whitespace-pre-wrap">
              {`${row.item}: $${formattedValue}`}
            </span>
          </td>
        </tr>
      );
    }

    return (
      <React.Fragment key={rowIndex}>
        <tr className={`${depth > 0 ? 'bg-gray-50' : ''} ${isExpandable ? 'font-bold' : ''}`}>
          {columns.map((column, colIndex) => (
            <td key={colIndex} className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis" style={{ width: columnWidths[colIndex] }}>
              <div className="flex items-center">
                {colIndex === 0 && isExpandable && (
                  <button onClick={() => toggleRowExpansion(rowIndex)} className="mr-2 flex-shrink-0">
                    {isExpanded ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                  </button>
                )}
                <span style={{ paddingLeft: colIndex === 0 ? paddingLeft : 0 }} className="whitespace-pre-wrap">
                  {/*console.log("Grid Data :", gridData)*/}
                  {colIndex === 0 || !isExpandable ? (
                    isEditable && colIndex !== 0 && !row.formula ? (
                      <input
                        type="text"
                        value={(() => {
                          if (gridData[`${rowIndex}_${colIndex}`] !== undefined) {
                            return gridData[`${rowIndex}_${colIndex}`];
                          } else {
                            const path = column.accessor(row).split('.');
                            let value = stateValue;
                            for (let key of path) {
                              value = value[key];
                              if (value === undefined) {
                                return "0.00";
                              }
                            }
                            return value;
                          }
                        })()}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        onFocus={(e) => {
                          if (e.target.value === "0.00") {
                            e.target.select();
                          }
                        }}
                        className="border-2 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    ) : row.formula ? (
                      <span className="text-blue-600 font-semibold">
                        {/*console.log("Local Data :", localData)*/}
                        {/*console.log("Evaluated Formula :", evaluateFormula(row.formula, localData))*/}
                        {typeof row.specialFormatting === 'function' ? 
                          (() => {
                            const value = column.accessor(row);
                            const formattedValue = row.specialFormatting(value);
                            // console.log("Formatted Value:", formattedValue);
                            return formattedValue;
                          })() 
                          : (() => {
                              console.log("Test Row :",row)
                              console.log("Test Row Values :",Object.values(row))
                              const accessorSource = column.accessor.toString();
                              const columnNameMatch = accessorSource.match(/row\.(\w+)/);
                              const columnName = columnNameMatch ? columnNameMatch[1] : 'unknown';
                              // console.log("Test Column Name:", columnName);
                              const value = row[columnName];
                              console.log("Test Row:", row.item, "Value:", value);
                              return value !== undefined ? value.toString() : '';
                            })()}
                      </span>
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: column.accessor(row) !== undefined ? column.accessor(row).toString().replace(/\n/g, '<br>') : '' }} />
                    )
                  ) : null}
                </span>
              </div>
            </td>
          ))}
        </tr>
        {isExpanded && isExpandable && row.items && row.items.map((subItem, subIndex) => 
          renderRow(subItem, `${rowIndex}-${subIndex}`, depth + 1)
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="overflow-x-auto" ref={tableRef}>
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                style={{ width: columnWidths[index] }}
              >
                <div className="truncate">{column.header}</div>
                {index < columns.length - 1 && (
                  <div
                    className="absolute top-0 right-0 bottom-0 w-1 bg-gray-300 cursor-col-resize"
                    onMouseDown={() => handleMouseDown(index)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/*console.log("Local Data :", localData)*/}
          {localData.map((row, rowIndex) => renderRow(row, rowIndex))}
        </tbody>
      </table>
    </div>
  );
};

export const ToggleableDataTable = ({ id, columns, data, onDataChange, stateValue }) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div>
      <DataTable
        id={id}
        columns={columns}
        data={data}
        isEditable={true}
        onDataChange={onDataChange}
        stateValue={stateValue}
      />
    </div>
  );
};
