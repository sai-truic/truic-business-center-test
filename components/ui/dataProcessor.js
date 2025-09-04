export const getRowValuesWithKeys = (row) => {
    return Object.entries(row)
      .filter(([key]) => 
        key !== 'id' && 
        key !== 'item' && 
        key !== 'items' && 
        key !== 'category' && 
        key !== 'formula'
      )
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  };
  
  export const processEntry = (entry, data, stateValue) => {
    // console.log("Entry :", entry)
    if (entry.formula && entry.id !== "breakEvenSales") {
      // Check if it's a column formula (contains dots)
      if (entry.formula.includes('.')) {
        const columnFormulaParts = entry.formula.split(/[-+*/]/).map(part => part.trim());
        console.log("Column Formula Parts :", columnFormulaParts)
        const values = {};
        
        columnFormulaParts.forEach(part => {
          const [rowId, columnId] = part.split('.');
          const relatedEntry = findRelatedEntry(rowId, data);
          if (relatedEntry && relatedEntry[columnId]) {
            values[part] = parseFloat(relatedEntry[columnId]) || 0;
          }
        });

        const calculatedValue = calculateValue(entry.formula, values);
        entry.value = calculatedValue;
        return;
      }

      // Regular row-based formula processing
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
          Object.keys(relatedEntry).forEach(key => {
            if (key !== 'id' && key !== 'item' && key !== 'items' && key !== 'category' && key !== 'formula') {
              let value = 0;
              if (typeof relatedEntry[key] === 'string') {
                const path = relatedEntry[key].split('.');
                value = stateValue;
                for (let key of path) {
                  value = value[key];
                  if (value === undefined) {
                    value = 0;
                    break;
                  }
                }
              } else {
                value = parseFloat(relatedEntry[key]) || 0;
              }
              if (!values[key]) {
                values[key] = {};
              }
              values[key][part] = value;
            }
          });
        }
      });
  
      const calculateValue = (expression, values) => {
        const replacedExpression = expression.replace(/(\w+)/g, (match) => {
          return values[match] !== undefined ? values[match] : 0;
        });
        try {
          return new Function('return ' + replacedExpression)();
        } catch (error) {
          return 0;
        }
      };
  
      Object.keys(values).forEach(key => {
        const calculatedValue = calculateValue(entry.formula, values[key]);
        entry[key] = calculatedValue;
        if (!Object.isExtensible(stateValue)) {
          stateValue = { ...stateValue };
        }
        if (stateValue[entry.id]) {
          stateValue[entry.id][key] = calculatedValue;
        } else {
          stateValue[entry.id] = { [key]: calculatedValue };
        }
      });
    }
  };
