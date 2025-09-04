import React, { useState } from 'react';

const options = [
  'No idea what I`m doing',
  'Started looking into it',
  'I`ve been working on a business plan',
  'I have a finalized business plan'
];

const OnboardingStepFive = ({ onPrevious, onNext, onSkip, onClose, handleButtonClick }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg sm:text-xl font-semibold">Question 4 of 6</h2>
        <button
          onClick={() => handleButtonClick('OnboardingStepFiveClose', onClose)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-start p-4 sm:p-6 overflow-y-auto">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          What is your level of experience with business planning?
        </h3>
        <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`p-4 border-2 ${
                selectedOption === option ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } rounded-md hover:bg-gray-50 transition-colors duration-200`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={() => handleButtonClick('OnboardingStepFivePrevious', onPrevious)} 
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 text-sm sm:text-base"
        >
          Previous
        </button>
        <button 
          onClick={() => handleButtonClick('OnboardingStepFiveSkip', onSkip)} 
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 text-sm sm:text-base"
        >
          Skip
        </button>
        <button 
          onClick={() => handleButtonClick('OnboardingStepFiveNext', onNext)} 
          className={`w-full sm:w-auto px-4 py-2 rounded-md text-sm sm:text-base ${
            selectedOption ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!selectedOption}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStepFive;