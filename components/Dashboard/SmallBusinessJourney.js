import React, { useState } from 'react';

const SmallBusinessJourney = () => {
  const steps = ['Idea', 'Plan', 'Form', 'Start', 'Run & Grow'];
  const [activeStep, setActiveStep] = useState('Idea'); // Set the initial active step

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Small Business Journey</h2>
        <span className="text-sm font-semibold">{`${(steps.indexOf(activeStep) + 1) / steps.length * 100}%`}</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-4 dark:bg-gray-700 mb-4">
        <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(steps.indexOf(activeStep) + 1) / steps.length * 100}%` }}></div>
      </div>
      <div>
        {steps.map((step, index) => (
          <div key={step} className={`flex items-center justify-between p-3 rounded-md mb-2 ${step === activeStep ? 'bg-green-100' : 'bg-gray-100'}`}
               onClick={() => handleStepClick(step)}>
            <span className="font-medium">{step}</span>
            <span className="text-gray-600">{'>'}</span>
          </div>
        ))}
      </div>
      {activeStep === 'Form' && <div>Hello, this is the Form step!</div>}
    </div>
  );
};

export default SmallBusinessJourney;