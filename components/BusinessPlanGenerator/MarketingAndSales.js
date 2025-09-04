import renderFormField from '../renderFormField';
import SectionTitle from '../ui/SectionTitle';

const MarketingAndSales = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <div className="space-y-6">
      <SectionTitle
        infoText={`
          <h2 class="text-xl font-bold mb-4">Marketing & Sales Strategies</h2>
          <p class="mb-4">Describe how your company will focus on its customers through its marketing and sales strategies. Then, show how your company will reach its customers and how it will sell its products.</p>
          <p class="mb-4">Key elements to consider include:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2"><strong>Growth Strategy:</strong> How does your company plan to expand and increase its market presence?</li>
            <li class="mb-2"><strong>Customer Communication:</strong> What channels and methods will you use to engage with your target audience?</li>
            <li class="mb-2"><strong>Advertising Approach:</strong> How will you promote your product or service to attract potential customers?</li>
          </ul>
          <p class="italic">Remember, a well-crafted marketing and sales strategy is crucial for your business's success and growth.</p>
        `}
        infoTitle="Marketing & Sales Information"
        handleInfoClick={handleInfoClick}
      >
        Marketing & Sales
      </SectionTitle>

      {renderFormField(
        'textarea',
        'marketingAndSales.growPlan',
        'growthPlan',
        'What is your plan to grow your company?',
        'In this section, describe your overall strategy for expanding your business and increasing sales. Growth strategies may include your plans for acquiring other businesses, increasing your number of employees, or franchising your business.',
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
        'marketingAndSales.communicate',
        'customerCommunication',
        'How will you communicate with your customers?',
        'Determine the best way to reach your target audience and explain the benefits of your product or service. Communication tactics may include websites, social media, print and online advertising, strategic partnerships and sponsorships, and printed materials such as brochures, catalogs, or flyers. Successful communication strategies include a mix of promotion methods.',
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
        'marketingAndSales.selling',
        'salesStrategy',
        'How will you sell your product or service?',
        'Explain your strategy for selling your product or service by first defining your sales team. This may include determining how many salespeople you will use, if they are internal employees or external contractors, and what training and compensation they will receive. Also discuss sales activities, such as identifying and prioritizing groups of people that your company has identified as customers.',
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

export default MarketingAndSales;
