import React, { useState } from 'react';

const OnboardingStepFour = ({ onPrevious, onNext, onSkip, onClose, handleButtonClick }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    'Back office setup': false,
    'Branding': false,
    'Marketing': false,
    'Other': ''
  });

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option]
    }));
  };

  const handleOtherChange = (event) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      Other: event.target.value
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg sm:text-xl font-semibold">Question 3 of 6</h2>
        <button
          onClick={() => handleButtonClick('OnboardingStepFourClose', onClose)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-start p-4 sm:p-6 overflow-y-auto">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">What do you need the most help with?</h3>
        <p className="mb-6 text-sm text-gray-600 text-center">Select all that apply</p>
        <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {Object.keys(selectedOptions).slice(0, -1).map((option) => (
            <button
              key={option}
              className={`p-4 border-2 ${
                selectedOptions[option] ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } rounded-md transition-colors duration-200 hover:bg-gray-50`}
              onClick={() => handleButtonClick('OnboardingStepFourMostHelp' + option, () => handleOptionChange(option))}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="w-full max-w-md mb-4">
          <label htmlFor="other" className="block mb-2 text-sm text-gray-700">Other:</label>
          <input
            type="text"
            id="other"
            value={selectedOptions.Other}
            onChange={handleOtherChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter other options..."
          />
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={() => handleButtonClick('OnboardingStepFourPrevious', onPrevious)} 
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 text-sm sm:text-base"
        >
          Previous
        </button>
        <button 
          onClick={() => handleButtonClick('OnboardingStepFourSkip', onSkip)} 
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 text-sm sm:text-base"
        >
          Skip
        </button>
        <button 
          onClick={() => handleButtonClick('OnboardingStepFourNext', onNext)} 
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStepFour;