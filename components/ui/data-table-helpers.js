export const processEntry = (entry, data, stateValue) => {
  if (entry.formula) {
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

export const updateDependentCellsRecursively = (data, evaluateFormula) => {
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

export const updateDependentCells = (data, evaluateFormula) => {
  return data.map(row => {
    if (row.formula) {
      const result = evaluateFormula(row.formula, data);
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
      return {
        ...row,
        items: row.items.map(item => {
          if (item.formula) {
            const result = evaluateFormula(item.formula, data);
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
        })
      };
    }
    return row;
  });
};
