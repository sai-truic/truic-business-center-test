// Cache for storing processed formula results
const formulaCache = new Map();

export const cacheFormulaResult = (rowId, columnId, value) => {
  const key = `${rowId}_${columnId}`;
  formulaCache.set(key, value);
};

export const getCachedFormulaResult = (rowId, columnId) => {
  const key = `${rowId}_${columnId}`;
  return formulaCache.get(key);
};

export const clearFormulaCache = () => {
  formulaCache.clear();
};
