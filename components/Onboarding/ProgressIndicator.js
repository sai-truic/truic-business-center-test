import React from 'react';
import { motion } from 'framer-motion';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full bg-indigo-100 h-2 rounded-full overflow-hidden mb-6">
      <motion.div
        className="h-full bg-indigo-600"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default ProgressIndicator;
