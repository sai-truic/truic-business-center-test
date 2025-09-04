import React from 'react';
import renderFormField from '../renderFormField';

const ContactInfo = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Date Created */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="dateCreated" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            Date Created
          </label>
          {renderFormField(
            'datepicker',
            'coverPage.dateCreated',
            '',
            'Select Date',
            '',
            {
              inputProps: {
                className: 'py-2 sm:py-3 md:py-4 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                icon: 'Calendar',
                iconClassName: 'absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20',
              },
            },
            handleInfoClick,
            businessPlanGeneratorData,
            setBusinessPlanGeneratorData
          )}
        </div>
        {/* Email Address */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="emailAddress" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            Email Address
          </label>
          {renderFormField(
            'input',
            'coverPage.emailAddress',
            '',
            'Enter Email Address',
            '',
            {
              inputProps: {
                className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                icon: 'Mail',
                iconClassName: 'absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20',
              },
            },
            handleInfoClick,
            businessPlanGeneratorData,
            setBusinessPlanGeneratorData
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Phone Number */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="phoneNumber" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            Phone Number
          </label>
          {renderFormField(
            'input',
            'coverPage.phoneNumber',
            '',
            'Enter Phone Number',
            '',
            {
              inputProps: {
                className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                icon: 'PhoneIcon',
                iconClassName: 'absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20',
              },
            },
            handleInfoClick,
            businessPlanGeneratorData,
            setBusinessPlanGeneratorData
          )}
        </div>
        {/* Fax Number */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="faxNumber" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            Fax Number
          </label>
          {renderFormField(
            'input',
            'coverPage.faxNumber',
            '',
            'Enter Fax Number',
            '',
            {
              inputProps: {
                className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                icon: 'PrinterIcon',
                iconClassName: 'absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20',
              },
            },
            handleInfoClick,
            businessPlanGeneratorData,
            setBusinessPlanGeneratorData
          )}
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
