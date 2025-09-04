export const evaluateFormula = (formula, data, cache = new Map()) => {
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

      try {
        const result = new Function('return ' + replacedExpr)();
        return isNaN(result) ? 0 : result;
      } catch (error) {
        console.error('Error evaluating expression:', error, 'Expression:', replacedExpr);
        return 0;
      }
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

export const createDependencyGraph = (data) => {
  const graph = new Map();
  
  const addDependencies = (entry) => {
    if (entry.formula) {
      const dependencies = entry.formula.match(/\b\w+(?=\.)/g) || [];
      graph.set(entry.id, new Set(dependencies));
    } else {
      graph.set(entry.id, new Set());
    }
    
    if (entry.items) {
      entry.items.forEach(addDependencies);
    }
  };

  data.forEach(addDependencies);
  return graph;
};

export const getProcessingOrder = (dependencyGraph) => {
  const visited = new Set();
  const temp = new Set();
  const order = [];

  const visit = (nodeId) => {
    if (temp.has(nodeId)) {
      throw new Error('Circular dependency detected');
    }
    if (!visited.has(nodeId)) {
      temp.add(nodeId);
      const dependencies = dependencyGraph.get(nodeId) || new Set();
      dependencies.forEach(visit);
      temp.delete(nodeId);
      visited.add(nodeId);
      order.push(nodeId);
    }
  };

  for (const nodeId of dependencyGraph.keys()) {
    if (!visited.has(nodeId)) {
      visit(nodeId);
    }
  }

  return order.reverse();
};

export const processFormulaDependencies = (data, startId, cache = new Map()) => {
  const dependencyGraph = createDependencyGraph(data);
  const processOrder = getProcessingOrder(dependencyGraph);
  
  const findAndProcessEntry = (id, entries) => {
    for (const entry of entries) {
      if (entry.id === id) {
        if (entry.formula) {
          const result = evaluateFormula(entry.formula, data, cache);
          Object.keys(entry).forEach(key => {
            if (key !== 'id' && key !== 'item' && key !== 'items' && key !== 'category' && key !== 'formula') {
              entry[key] = result[key] || 0;
            }
          });
        }
        return true;
      }
      if (entry.items && findAndProcessEntry(id, entry.items)) {
        return true;
      }
    }
    return false;
  };

  processOrder.forEach(id => {
    if (dependencyGraph.get(id).has(startId)) {
      findAndProcessEntry(id, data);
    }
  });

  return data;
};
