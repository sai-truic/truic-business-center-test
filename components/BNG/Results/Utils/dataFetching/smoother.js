/**
 * Utilities for smoothing stream processing
 * 
 * This implementation ensures business names appear gradually in the UI,
 * rather than all at once, creating a better user experience.
 */

/**
 * Throttled processor for adding streaming results
 * to ensure counter increments smoothly
 */
class SmoothProcessor {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.delay = 50; // ms between processing items (matching epicbusinessnames implementation)
    this.processedItems = new Set(); // Track processed items to avoid duplicates
  }

  /**
   * Add a batch of items to the processing queue
   * @param {Array} items - Items to add to the queue
   */
  addItems(items) {
    if (!items || !Array.isArray(items)) {
      console.warn("Invalid items provided to smooth processor:", items);
      return;
    }
    
    // Filter out duplicates before adding to queue
    const newItems = items.filter(item => {
      // For objects with name property
      if (item && typeof item === 'object' && item.name) {
        return !this.processedItems.has(item.name);
      }
      // For string items
      else if (typeof item === 'string') {
        return !this.processedItems.has(item);
      }
      // Invalid items
      return false;
    });
    
    // Add new items to queue
    this.queue.push(...newItems);
    console.log(`Added ${newItems.length} unique items to processing queue`);
    
    // Start processing if not already running
    if (!this.isProcessing && this.queue.length > 0) {
      console.log("Starting smooth processor with queue length:", this.queue.length);
      this.processNext();
    }
  }

  /**
   * Process the next item in the queue
   */
  processNext() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      console.log("Smooth processor queue empty, stopping");
      return;
    }

    this.isProcessing = true;
    const item = this.queue.shift();
    
    // Mark the item as processed to avoid duplicates
    if (item) {
      if (typeof item === 'object' && item.name) {
        this.processedItems.add(item.name);
      } else if (typeof item === 'string') {
        this.processedItems.add(item);
      }
    }
    
    // Process the item (call the callback)
    if (this.callback && typeof this.callback === 'function') {
      try {
        this.callback(item);
      } catch (error) {
        console.error("Error in smooth processor callback:", error);
      }
    }
    
    // Schedule the next item with dynamic timing
    // Random delay between this.delay and this.delay*1.5 for natural feel
    const randomDelay = Math.floor(this.delay + (Math.random() * this.delay * 0.5));
    setTimeout(() => {
      this.processNext();
    }, randomDelay);
  }

  /**
   * Set the callback to execute for each item
   * @param {Function} callback - Function to call for each item
   */
  setCallback(callback) {
    this.callback = callback;
  }

  /**
   * Set the delay between processing items
   * @param {number} ms - Milliseconds to wait between items
   */
  setDelay(ms) {
    this.delay = ms;
  }

  /**
   * Clear the processing queue (for stopping when limits are reached)
   */
  clearQueue() {
    console.log("SmoothProcessor: Clearing queue with", this.queue.length, "remaining items");
    this.queue = [];
    this.isProcessing = false;
  }
  
  /**
   * Reset the processor (clear processed items tracking)
   */
  reset() {
    console.log("SmoothProcessor: Full reset");
    this.queue = [];
    this.isProcessing = false;
    this.processedItems.clear();
  }
}

// Create and export a singleton instance
export const smoothProcessor = new SmoothProcessor();