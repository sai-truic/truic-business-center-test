import renderFormField from '../renderFormField';
import SectionTitle from '../ui/SectionTitle';

const ExecutiveSummary = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <div>
      <SectionTitle
        infoText={`
          <p class="mb-4">An executive summary is an introduction to your business. This section should be clear, concise and to the point. We recommend that you revisit this section to review your work after completing the other sections of the business plan to assure consistency and maintain accuracy.</p>
          <p class="mb-4">The key elements of an executive summary include descriptions of:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2">Your company</li>
            <li class="mb-2">Products or services you sell</li>
            <li class="mb-2">Your audience and ideal customer</li>
            <li class="mb-2">Future of your business and your industry</li>
          </ul>
          <p class="mb-4">Fill out the information below to create the Executive Summary section of your business plan. Click "Save" when you are finished (or if you want to logout) or click "Save & Continue" to move to the next section of your business plan.</p>
        `}
        infoTitle="Executive Summary Information"
        handleInfoClick={handleInfoClick}
      >
        Executive Summary
      </SectionTitle>

      {/* Executive Summary Form Fields */}
      <div className="space-y-6">
        {renderFormField(
          'textarea',
          'executiveSummary.products',
          'productService',
          'What product or service will your business provide?',
          'Describe your product or service and make the case for why your product will be successful. How does your product or service fulfill your customer need in a unique way?',
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

        {renderFormField(
          'textarea',
          'executiveSummary.targetCustomers',
          'targetCustomers',
          'Who are your target customers?',
          'Describe the ideal customer for your business and why your product or service will be valuable to them.',
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

        {renderFormField(
          'textarea',
          'executiveSummary.goals',
          'companyGoals',
          'What goals do you have for your company?',
          'Briefly describe your primary goals for your company, including our future plans',
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
    </div>
  );
};

export default ExecutiveSummary;
