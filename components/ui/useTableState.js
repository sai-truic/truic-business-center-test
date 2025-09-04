import { useState, useRef, useEffect } from 'react';
import { processEntry } from './dataProcessor';

export const useTableState = (data, columns, stateValue) => {
  const [localData, setLocalData] = useState([...data]);

  useEffect(() => {
    const processInitialData = () => {
      const initialData = [...data];
      initialData.forEach(entry => {
        processEntry(entry, data, stateValue);
        if (entry.items && Array.isArray(entry.items)) {
          entry.items.forEach(subItem => {
            processEntry(subItem, data, stateValue);
          });
        }
      });
      setLocalData(initialData);
    };

    processInitialData();
  }, [data, stateValue]);

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
  const hasProcessedEntries = useRef(false);

  return {
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
  };
};
