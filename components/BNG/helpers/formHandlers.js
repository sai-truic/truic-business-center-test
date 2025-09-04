/**
 * Form input handlers for BNG components
 */

/**
 * Creates a handler for input field changes
 * @param {Function} setInputValue - State setter for input field
 * @returns {Function} Handler function for input field changes
 */
export const createHandleInputChange = (setInputValue) => (e) => {
  setInputValue(e.target.value);
};

/**
 * Creates a handler for location field changes
 * @param {Function} setLocationValue - State setter for location field
 * @returns {Function} Handler function for location field changes
 */
export const createHandleLocationChange = (setLocationValue) => (e) => {
  setLocationValue(e.target.value);
};