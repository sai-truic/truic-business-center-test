// Persistent store for formula calculations
const formulaState = new Map();

export const setFormulaState = (rowId, values) => {
  formulaState.set(rowId, values);
};

export const getFormulaState = (rowId) => {
  return formulaState.get(rowId);
};

export const updateFormulaState = (rowId, key, value) => {
  const currentState = formulaState.get(rowId) || {};
  formulaState.set(rowId, {
    ...currentState,
    [key]: value
  });
};

export const clearFormulaState = () => {
  formulaState.clear();
};
