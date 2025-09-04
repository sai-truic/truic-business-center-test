import React from 'react';

const OnboardingStepOne = ({ handleButtonClick, onNext, onSkip, onClose }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-end p-4">
        <button
          onClick={() => handleButtonClick('OnboardingStepOnecloseX', onClose)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto min-h-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 mb-4">
          <span className="text-gray-500 text-3xl">&#9654;</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">Welcome to Business Center!</h3>
        <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </p>
      </div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={() => handleButtonClick('OnboardingStepOneskip', onSkip)} 
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 text-sm sm:text-base"
        >
          Skip
        </button>
        <button 
          onClick={() => handleButtonClick('OnboardingStepOnenext', onNext)} 
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStepOne;
