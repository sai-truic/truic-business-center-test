import React from 'react';
import renderFormField from '../renderFormField';
import SectionTitle from '../ui/SectionTitle';

const CompanyDescription = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <div>
      <SectionTitle
        infoText={`
          <p class="mb-4">Provide a high-level review of your business that will help readers and potential investors understand your business model. Elements include:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2">Key employees of your business, such as the CEO, President and Vice President</li>
            <li class="mb-2">Mission statement</li>
            <li class="mb-2">Details about the products or services your business will provide</li>
            <li class="mb-2">Qualities that will make your business a success</li>
          </ul>
          <p class="italic mt-4">This section should give a clear and concise overview of your business, highlighting its unique aspects and potential for success.</p>
        `}
        infoTitle="Company Description Information"
        handleInfoClick={handleInfoClick}
      >
        Company Description
      </SectionTitle>

      {/* Company Description Form Fields */}
      <div className="space-y-6">
        {renderFormField(
          'textarea',
          'companyDescription.mission',
          'missionStatement',
          'What is your mission statement?',
          "Your mission statement is an expression of your company's values and represents the reason why you want to start this business.",
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
          'companyDescription.prinicpleMembers',
          'prinicpleMembers',
          'Who are the principal members of your company and what are their roles?',
          'Who is your management team and how is it organized? How are tasks and responsibilities distributed throughout your business?',
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
          'companyDescription.legalStructure',
          'legalStructure',
          'What is the legal structure of your company?',
          'Present information on the legal structure of your business; for example, is your business an LLC, sole proprietorship, partnership, or other legal entity.',
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

export default CompanyDescription;
