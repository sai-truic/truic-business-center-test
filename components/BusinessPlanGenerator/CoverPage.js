// CoverPage.js
import React from 'react';
import { HeaderSectionTitle } from './../ui/HeaderSectionTitle';
import CompanyInfo from './CompanyInfo';
import ContactInfo from './ContactInfo';
import AddressInfo from './AddressInfo';

const CoverPage = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <div className='space-y-6'>
      <div className="space-y-6 sm:space-y-8 main-content-border p-4 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
        <CompanyInfo
          businessPlanGeneratorData={businessPlanGeneratorData}
          setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
          handleInfoClick={handleInfoClick}
        />
        <ContactInfo
          businessPlanGeneratorData={businessPlanGeneratorData}
          setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
          handleInfoClick={handleInfoClick}
        />
        <AddressInfo
          businessPlanGeneratorData={businessPlanGeneratorData}
          setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
          handleInfoClick={handleInfoClick}
        />
      </div>
    </div>
  );
};

export default CoverPage;
