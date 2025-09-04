import React from 'react';
import renderFormField from '../renderFormField';
import SectionTitle from '../ui/SectionTitle';
import { ChevronLeft } from 'lucide-react';

const FinalPoints = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <div className="space-y-6">
      <SectionTitle
        infoText={`
          <h2 class="text-xl font-bold mb-4">Final Points: Wrapping Up Your Business Plan</h2>
          <p class="mb-4">This section allows you to include any additional information, insights, or summary statements that haven't been covered in previous sections. It's an opportunity to reinforce your business's strengths, vision, and commitment to success.</p>
          <p class="mb-4">Consider addressing:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2">Your long-term goals and growth plans</li>
            <li class="mb-2">Key partnerships or strategic alliances</li>
            <li class="mb-2">Any pending patents or proprietary technologies</li>
            <li class="mb-2">Corporate social responsibility initiatives</li>
          </ul>
          <p class="italic mt-4">Use this space to leave a lasting impression on investors, lenders, or anyone else who reads your business plan.</p>
        `}
        infoTitle="Final Points Information"
        handleInfoClick={handleInfoClick}
      >
        Final Points
      </SectionTitle>
      {renderFormField(
        'textarea',
        'finalPoints.additionalPoints',
        'additionalPoints',
        'Please provide any additional important points or summary statements for your business plan.',
        '',
        { 
          showToolbar: true,
          showPlaceholder: false,
          showLabel: true,
          usePlaceholderAsLabel: true
        },
        handleInfoClick,
        businessPlanGeneratorData,
        setBusinessPlanGeneratorData
      )}
    </div>
  );
};

const FinalPointsWithButtons = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick, previousSection }) => {
  return (
    <>
      <FinalPoints
        businessPlanGeneratorData={businessPlanGeneratorData}
        setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
        handleInfoClick={handleInfoClick}
      />
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <button
            onClick={previousSection}
            className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-base order-1"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back
          </button>
          <button
            onClick={async () => {
              console.log('Saving...');
              await setBusinessPlanGeneratorData(prevData => ({
                ...prevData,
                __submit: "True"
              }));
            }}
            className="flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-base order-2"
          >
            Save
          </button>
          <button
            onClick={async () => {
              console.log('Saving...');
              // Set submit flag to trigger save
              await setBusinessPlanGeneratorData(prevData => ({
                ...prevData,
                __submit: "True"
              }));
              // Wait briefly for save to complete
              setTimeout(() => {
                nextSection();
              }, 500);
            }}
            className="flex items-center justify-center bg-gray-200 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-base order-4 md:order-3"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default FinalPointsWithButtons;
