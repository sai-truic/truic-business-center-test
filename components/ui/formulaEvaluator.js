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
