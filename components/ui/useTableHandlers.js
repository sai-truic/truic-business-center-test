import { useEffect } from 'react';
import { evaluateFormula } from './formulaEvaluator';

export const useTableHandlers = ({
  tableRef,
  resizing,
  setResizing,
  columnWidths,
  setColumnWidths,
  setExpandedRows,
  localData,
  setLocalData,
  setGridData,
  columns,
  onDataChange
}) => {
  useEffect(() => {
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

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, columnWidths]);

  const handleMouseDown = (index) => {
    setResizing(index);
  };

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowIndex]: !prev[rowIndex]
    }));
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
      
      if (row.formula && !row.fixed && !row.variable) {
        const result = evaluateFormula(row.formula, updatedData);
        row.value = typeof result === 'number' ? result.toFixed(2) : result;
      }
      
      return row;
    };

    return updatedData.map((row, index) => updateCell(row, index));
  };

  const handleCellChange = (rowIndex, colIndex, value, setHasReloaded = () => {}) => {
    let filteredValue = value.toString().replace(/[^0-9]/g, '');
    // First check if empty and set to '0'
    filteredValue = filteredValue.length === 0 ? '0' : filteredValue;
    // If length > 1 and starts with 0, remove the leading 0
    filteredValue = filteredValue.length > 1 && filteredValue.startsWith('0') ? filteredValue.replace(/^0+/, '') : filteredValue;
    if (typeof setHasReloaded === 'function') {
      setHasReloaded(false);
    }
    setGridData(prevGridState => ({
      ...prevGridState,
      [`${rowIndex}_${colIndex}`]: filteredValue
    }));

    let parentIdx = -1;
    // Ensure we're working with the latest processed data
    const currentData = Array.isArray(localData) ? [...localData] : [];
    const newData = currentData.map((row, idx) => {
      if (typeof rowIndex === 'number' && idx === rowIndex) {
        const newRow = { ...row };
        const key = Object.keys(row)[colIndex + 1];
        newRow[key] = filteredValue;
        parentIdx = idx;
        return newRow;
      } else if (typeof rowIndex === 'string' && row.items) {
        const [parentIndex, childIndex] = rowIndex.split("-").map(Number);
        if (idx === parentIndex) {
          const newRow = { ...row };
          newRow.items = newRow.items.map((item, itemIdx) => {
            if (itemIdx === childIndex) {
              const newItem = { ...item };
              const key = Object.keys(item)[colIndex + 1];
              newItem[key] = filteredValue;
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
    // console.log("Updated Data :", updatedData)
    setLocalData(updatedData);

    let changedRow;
    try {
      changedRow = updatedData.find(row => row.id === newData[rowIndex].id);
    } catch {
      changedRow = updatedData[rowIndex.split("-")[0]]["items"][rowIndex.split("-")[1]];
    }

    if (changedRow) {
      const changedKey = Object.keys(changedRow)[colIndex + 1];
      const changedValue = changedRow[changedKey];
      const columnId = columns[colIndex].id;
      const path = typeof rowIndex === 'string' 
        ? rowIndex.split('-').reduce((acc, curr, idx) => idx === 0 ? columns[0].id : `${acc}.items[${curr}]`, '')
        : columns[0].id;
      // Only update the local state, don't trigger Cosmos DB upsert
      onDataChange({ [`${columnId}.${changedRow["id"]}`]: changedValue }, false);
    }
  };

  return {
    handleMouseDown,
    toggleRowExpansion,
    handleCellChange
  };
};
