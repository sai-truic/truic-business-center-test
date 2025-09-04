
// handleSelectChange.js

const createHandleSelectChange = (user) => async (selectId, newValue, originalHandler) => {
    // Call the original handler if it exists
    if (originalHandler) {
      originalHandler(newValue);
    }
  
    // Log select change event to InfluxDB via API
    await fetch('/api/dataStorage/storeToInflux', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType: 'select_change',
        eventData: {
          selectId,
          newValue,
          userId: user?.id // Include the user ID
        }
      }),
    });
};

export default createHandleSelectChange;