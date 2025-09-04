import renderFormField from '../renderFormField';
import SectionTitle from '../ui/SectionTitle';

const MarketResearch = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <div className="space-y-6">
      <SectionTitle
        infoText={`
          <h2 class="text-xl font-bold mb-4">Market Research: Understanding Your Business Landscape</h2>
          <p class="mb-4">Provide detailed information to demonstrate a solid understanding of the industry in which your business will operate. This section is crucial for:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2">Investors and lenders to assess your business's potential</li>
            <li class="mb-2">Your own strategic planning and decision-making</li>
          </ul>
          <p class="mb-4">Key components to include:</p>
          <ol class="list-decimal pl-6 mb-4">
            <li class="mb-2"><strong>Target Customer Description:</strong> Define your ideal customer profile</li>
            <li class="mb-2"><strong>Competitive Analysis:</strong> Identify and evaluate your competitors</li>
            <li class="mb-2"><strong>Legal Requirements:</strong> Outline regulations affecting your company and industry</li>
          </ol>
          <p class="italic mt-4">If you need further guidance, consider consulting with a business mentor who can offer specific advice tailored to your situation.</p>
        `}
        infoTitle="Market Research Information"
        handleInfoClick={handleInfoClick}
      >
        Market Research
      </SectionTitle>
      {/* Market Research Form Fields */}
      {renderFormField(
        'textarea',
        'marketResearch.industry',
        'industry',
        'Describe your industry',
        'In this section, provide more detail about the characteristics of your industry. You may also reference an expert analysis of trends in your industry and how your business is anticipating those changes.',
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
        'marketResearch.customers',
        'customers',
        'Describe your customers',
        'In this section, describe the characteristics and habits of your customers. What is their age range, income level, and other details that create a customer profile for your company?',
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
        'marketResearch.competitors',
        'competitors',
        'Who are your competitors?',
        'Describe the companies that will directly compete with your company in the marketplace. Include information on their size, products, sales offers, and advertising.',
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
        'marketResearch.advantages',
        'advantages',
        'What advantages do you have over your competition?',
        'Advantages can include your location, employees, target market, or unique product or how your service is presented or delivered.',
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
        'marketResearch.regulations',
        'regulations',
        'What regulations apply to your company?',
        'Cite any customer or government regulatory requirements affecting your business and how you will comply with those requirements. Also state how you will pay for compliance costs.',
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

export default MarketResearch;
