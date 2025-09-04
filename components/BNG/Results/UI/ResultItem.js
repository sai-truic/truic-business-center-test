import React from 'react';
import { motion } from 'framer-motion';

const ResultItem = ({ result, index, onClick }) => {
  // Safely get the business name or use a fallback
  const getBusinessName = () => {
    // Check if result exists and has a name property
    if (!result) {
      console.warn('Invalid result:', result);
      return 'BusinessName';
    }
    
    // Get the name from the result or use a default
    let name;
    if (typeof result === 'string') {
      name = result; // For epicbusinessnames style results
    } else if (typeof result === 'object' && result.name) {
      name = result.name;
    } else {
      console.warn('Invalid name in result:', result);
      return 'BusinessName';
    }
    
    // Only remove leading numbers if present, but otherwise keep name intact
    // This is simpler and matches epicbusinessnames approach
    return name.replace(/^\d+\.\s*/, '').trim();
  };

  const businessName = getBusinessName();

  // Simple card that shows domain tab on click
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col justify-center items-center h-full transition-all hover:shadow-xl p-4 bg-white border-2 border-gray-200 hover:border-orange-500 cursor-pointer rounded-lg group hover:-translate-y-1"
      style={{ minHeight: "80px" }}
      onClick={onClick}
    >
      <h3 className="text-sm sm:text-base break-words text-center font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
        {businessName}
      </h3>
    </motion.div>
  );
};

export default ResultItem;
