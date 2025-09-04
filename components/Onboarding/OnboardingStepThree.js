import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

const options = [
  { id: 1, label: 'I need an idea for my business', icon: '💡' },
  { id: 2, label: 'I am planning my business', icon: '📝' },
  { id: 3, label: 'I am ready to form my business', icon: '🏢' },
  { id: 4, label: 'I am growing my business', icon: '📈' },
];

const OnboardingStepThree = ({ onPrevious, onNext, onSkip, onClose, handleButtonClick, updateOnboardingData, onboardingData }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (onboardingData && onboardingData.businessStage) {
      const option = options.find(opt => opt.label === onboardingData.businessStage);
      if (option) {
        setSelectedOption(option.id);
      }
    }
  }, [onboardingData]);

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
    updateOnboardingData({ businessStage: options.find(option => option.id === optionId).label });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-indigo-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-indigo-900">Business Stage</h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('OnboardingStepThreecloseX', onClose)}
          className="text-indigo-500 hover:text-indigo-700 focus:outline-none transition-colors duration-200"
        >
          <X size={24} />
        </motion.button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-6 sm:p-8 overflow-y-auto">
        <h4 className="text-xl sm:text-2xl font-semibold text-indigo-800 mb-4 text-center">What stage is your business at?</h4>
        <p className="mb-8 text-base sm:text-lg text-indigo-700 text-center max-w-md leading-relaxed">
          This will allow us to pair you with the best guides, tools, and resources that fit your needs.
        </p>
        <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 border-2 ${
                selectedOption === option.id 
                  ? 'border-indigo-500 bg-indigo-100 shadow-indigo-200' 
                  : 'border-gray-300 bg-white hover:border-indigo-300'
              } rounded-lg text-left hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl`}
              style={{
                boxShadow: selectedOption === option.id 
                  ? '0 4px 6px -1px rgba(99, 102, 241, 0.1), 0 2px 4px -1px rgba(99, 102, 241, 0.06)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
              onClick={() => handleButtonClick('OnboardingStepThreeBusinessIdea' + String(option.id), () => handleSelectOption(option.id))}
            >
              <div className="flex items-center">
                <span className="text-3xl mr-4">{option.icon}</span>
                <span className="text-sm sm:text-base font-medium text-gray-800">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 border-t border-indigo-200">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepThreePrevious', onPrevious)}
          className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepThreeSkip', onSkip)}
          className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center"
        >
          <SkipForward size={18} className="mr-2" />
          Skip
        </motion.button>
        <motion.button
          whileHover={selectedOption ? { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" } : {}}
          whileTap={selectedOption ? { scale: 0.95 } : {}}
          onClick={() => handleButtonClick('OnboardingStepThreeNext', onNext)}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center ${
            selectedOption ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!selectedOption}
        >
          Next
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OnboardingStepThree;
