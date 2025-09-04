import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

const OnboardingStepSix = ({ onPrevious, onNext, onSkip, onClose, handleButtonClick, updateOnboardingData, onboardingData }) => {
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    if (onboardingData && onboardingData.businessName) {
      setBusinessName(onboardingData.businessName);
    }
  }, [onboardingData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white rounded-lg shadow-xl"
    >
      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-indigo-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-indigo-900">Business Name</h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('OnboardingStepSixClose', onClose)}
          className="text-indigo-500 hover:text-indigo-700 focus:outline-none transition-colors duration-200"
        >
          <X size={24} />
        </motion.button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-6 sm:p-8 overflow-y-auto">
        <motion.h4 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-indigo-800 mb-4 text-center"
        >
          What is the name of your business?
        </motion.h4>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-base sm:text-lg text-indigo-700 text-center max-w-md leading-relaxed"
        >
          Or what would you like your business name to be? Don't worry, you can always change it later.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md"
        >
          <motion.input
            type="text"
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
              updateOnboardingData({ businessName: e.target.value });
            }}
            placeholder="Enter business name"
            className="w-full p-4 border-2 border-indigo-300 rounded-lg text-center focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300 shadow-md text-lg"
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>
        <AnimatePresence>
          {businessName && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 text-sm text-indigo-600 font-medium"
            >
              Great choice! "{businessName}" sounds like a fantastic business name.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 border-t border-indigo-200">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepSixPrevious', onPrevious)}
          className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepSixSkip', onSkip)}
          className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center"
        >
          <SkipForward size={18} className="mr-2" />
          Skip
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepSixNext', onNext)}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center"
        >
          Next
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OnboardingStepSix;
