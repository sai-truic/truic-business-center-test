// handleButtonClick.js

const createHandleButtonClick = (user) => async (action, originalHandler) => {
    // Call the original handler
    if (originalHandler) {
      originalHandler();
    }
  
    // Log event to InfluxDB via API
    await fetch('/api/dataStorage/storeToInflux', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        eventType: 'button_click', 
        eventData: { 
          action, 
          userId: user?.id // Include the user ID
        } 
      }),
    });
  };
  
  export default createHandleButtonClick;
  