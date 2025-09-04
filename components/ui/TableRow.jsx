import React from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { evaluateFormula } from './formulaEvaluator';

export const TableRow = ({ 
  row, 
  rowIndex, 
  depth = 0,
  columns,
  isEditable,
  expandedRows,
  toggleRowExpansion,
  handleCellChange,
  gridData,
  stateValue,
  localData,
  columnsWithFormulas,
  setHasReloaded,
  handleInfoClick
}) => {
  const isExpandable = row.category === 1 && row.items && row.items.length > 0;
  const isExpanded = expandedRows[rowIndex];
  const paddingLeft = depth * 20;

  const InfoIcon = ({ desc, item }) => (
    <div 
      className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 hover:from-orange-100 hover:via-orange-200 hover:to-orange-300 shadow-sm hover:shadow transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100 border border-orange-200/50 hover:border-orange-300 transform hover:scale-105" 
      onClick={(e) => {
        e.stopPropagation();
        handleInfoClick(desc || `Formula: ${row.formula}`, item);
      }}
      title="Click for more information"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-3.5 w-3.5 text-[#F7931E] hover:text-orange-600" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    </div>
  );

  if (row.id === 'breakEvenSales') {
    const result = evaluateFormula(row.formula, localData);
    const formattedValue = typeof row.specialFormatting === 'function' 
      ? row.specialFormatting(result.outputValue)
      : result.outputValue;
    return (
      <tr key={rowIndex} className={`${depth > 0 ? 'bg-orange-50/30' : ''} hover:bg-orange-50/50 transition-colors duration-200`}>
        <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
          <span style={{ paddingLeft: paddingLeft }} className="whitespace-pre-wrap text-[#F7931E] font-semibold">
            {`${row.item}: $${formattedValue}`}
          </span>
        </td>
      </tr>
    );
  }

  return (
    <React.Fragment>
      <tr className={`${depth > 0 ? 'bg-orange-50/30' : ''} ${isExpandable ? 'font-bold' : ''} hover:bg-orange-50/50 transition-colors duration-200`}>
        {columns.map((column, colIndex) => (
          <td key={colIndex} className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis border-b border-orange-100">
            <div className="flex items-start">
              {colIndex === 0 && isExpandable && (
                <button onClick={() => toggleRowExpansion(rowIndex)} className="mr-2 flex-shrink-0 mt-1 text-[#F7931E] hover:text-orange-600 transition-colors duration-200">
                  {isExpanded ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                </button>
              )}
              <div className="flex-grow" style={{ paddingLeft: colIndex === 0 ? paddingLeft : 0 }}>
                {colIndex === 0 || !isExpandable ? (
                  isEditable && colIndex !== 0 && !row.formula && !columnsWithFormulas[column.accessor] ? (
                    <input
                      type="text"
                      value={(() => {
                        if (gridData[`${rowIndex}_${colIndex}`] !== undefined) {
                          return gridData[`${rowIndex}_${colIndex}`];
                        } 
                        const accessorValue = column.accessor(row);
                        
                        if (typeof accessorValue === 'string' && accessorValue.includes('.')) {
                          try {
                            const path = accessorValue.split('.');
                            let value = stateValue;
                            for (let key of path) {
                              value = value[key];
                              if (value === undefined) {
                                return "0.00";
                              }
                            }
                            return value;
                          } catch {
                            return "0.00";
                          }
                        }
                        return accessorValue !== undefined ? accessorValue : "0.00";
                      })()}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value, setHasReloaded)}
                      onFocus={(e) => {
                        if (e.target.value === "0.00") {
                          e.target.select();
                        }
                      }}
                      className="border w-full border-orange-200 rounded-md shadow-sm focus:border-[#F7931E] focus:ring focus:ring-orange-200 focus:ring-opacity-50 bg-orange-50/50"
                    />
                  ) : row.formula ? (
                    <span className="text-[#F7931E] font-semibold">
                      {(() => {
                        if (typeof row.specialFormatting === 'function') {
                          const value = column.accessor(row);
                          return row.specialFormatting(value);
                        } else {
                          try {
                            const value = column.accessor(row);
                            if (value !== undefined && value !== null) {
                              return value.toString();
                            }
                            const columnName = typeof column.accessor === 'string' ? 
                              column.accessor : 
                              column.accessor.toString().match(/row\.(\w+)/)?.[1] || 'unknown';
                            return row[columnName]?.toString() || '0.00';
                          } catch (error) {
                            console.error('Error rendering formula cell:', error);
                            return '0.00';
                          }
                        }
                      })()}
                    </span>
                  ) : (
                    <div className="relative group min-h-[24px]">
                      <div className="flex flex-col">
                        {(() => {
                          const content = column.accessor(row)?.toString() || '';
                          const lines = content.split('\n');
                          
                          return (
                            <div className="leading-relaxed">
                              {lines.map((line, lineIndex) => (
                                <div key={lineIndex} className="flex items-center space-x-2">
                                  <span>{line}</span>
                                  {colIndex === 0 && row.desc && lineIndex === lines.length - 1 && (
                                    <InfoIcon desc={row.desc} item={row.item} />
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </td>
        ))}
      </tr>
      {isExpanded && isExpandable && row.items && (
        JSON.parse(JSON.stringify(row.items)).map((subItem, subIndex) => (
          <TableRow
            key={`${rowIndex}-${subIndex}`}
            row={subItem}
            rowIndex={`${rowIndex}-${subIndex}`}
            depth={depth + 1}
            columns={columns}
            isEditable={isEditable}
            expandedRows={expandedRows}
            toggleRowExpansion={toggleRowExpansion}
            handleCellChange={handleCellChange}
            gridData={gridData}
            stateValue={stateValue}
            localData={localData}
            columnsWithFormulas={columnsWithFormulas}
            setHasReloaded={setHasReloaded}
            handleInfoClick={handleInfoClick}
          />
        ))
      )}
    </React.Fragment>
  );
};
