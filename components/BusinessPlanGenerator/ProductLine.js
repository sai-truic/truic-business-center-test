import renderFormField from '../renderFormField';
import SectionTitle from '../ui/SectionTitle';

const ProductLine = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <div className="space-y-6">
      <SectionTitle
        infoText={`
          <h2 class="text-xl font-bold mb-4">Product Line: Showcasing Your Offerings</h2>
          <p class="mb-4">Present information about the benefits of your product or service from the perspective of your customer. This section is crucial for:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2">Highlighting the unique value proposition of your offerings</li>
            <li class="mb-2">Demonstrating your understanding of customer needs and preferences</li>
            <li class="mb-2">Positioning your products or services in the market</li>
          </ul>
          <p class="mb-4">Key aspects to cover:</p>
          <ol class="list-decimal pl-6 mb-4">
            <li class="mb-2"><strong>Product/Service Description:</strong> What does your business offer?</li>
            <li class="mb-2"><strong>Pricing Structure:</strong> How are your offerings priced?</li>
            <li class="mb-2"><strong>Life Cycle Stage:</strong> Where are your products/services in their development?</li>
            <li class="mb-2"><strong>Intellectual Property:</strong> What rights do you have over your offerings?</li>
            <li class="mb-2"><strong>R&D Activities:</strong> How are you innovating and improving?</li>
          </ol>
          <p class="italic mt-4">Remember to answer each question below with a short, descriptive paragraph that highlights the benefits to your customers.</p>
        `}
        infoTitle="Product Line Information"
        handleInfoClick={handleInfoClick}
      >
        Product Line
      </SectionTitle>
      {renderFormField(
        'textarea',
        'productLine.product',
        'productService',
        'What product or service will your company provide?',
        'What does your business sell? What are its advantages?',
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
        'productLine.pricingStructure',
        'pricingStructure',
        'Describe your pricing structure',
        'Present all of the different ways that your company will offer its product or service and the price of each product or service package.',
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
        'productLine.lifeCycle',
        'lifeCycleStage',
        'In which life cycle stage is your product or service?',
        'In this section, explain what stage of development your product or service is in. Are you testing or building prototypes? Is it already on the market? If so, how long has it been on the market? Also, explain any factors that may affect its future life cycle.',
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
        'productLine.propertyRights',
        'intellectualProperty',
        'What intellectual property rights do you have for your product or service?',
        'List any existing, pending, or anticipated copyright or patent filings here. Disclose any aspects of your product or service that may be classified as trade secrets. Also, list any information pertaining to existing legal agreements such as nondisclosure or non-compete agreements.',
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
        'productLine.researchDevelopment',
        'researchDevelopment',
        'What research and development (R&D) activities are you performing or planning?',
        'List any R&D activities that you are involved in or are planning for your product or service. Include any preliminary or expected results. Also, mention R&D efforts of others in your industry related to your product or service.',
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

export default ProductLine;
