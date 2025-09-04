import React from 'react';
import { MapPin, Building, Globe, Hash } from 'lucide-react';
import renderFormField from '../renderFormField';

const AddressInfo = React.forwardRef(({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }, ref) => {
  return (
    <div ref={ref} className="space-y-6">
      <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl border-2 border-orange-200 group hover:border-[#F7931E]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
        <label htmlFor="address" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
          Address
        </label>
        <div className="relative">
          <MapPin className="absolute mt-1 left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20" />
          {renderFormField(
            'address',
            'coverPage.address',
            '',
            'Enter Address',
            '',
            {
              inputProps: {
                className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
              },
            },
            handleInfoClick,
            businessPlanGeneratorData,
            setBusinessPlanGeneratorData
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        {/* City */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="city" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            City
          </label>
          <div className="relative">
            <Building className="absolute mt-1 left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20" />
            {renderFormField(
              'city',
              'coverPage.city',
              '',
              'Enter City',
              '',
              {
                inputProps: {
                  className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                },
                address: businessPlanGeneratorData['coverPage']['address'],
              },
              handleInfoClick,
              businessPlanGeneratorData,
              setBusinessPlanGeneratorData
            )}
          </div>
        </div>
        {/* State */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="state" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            State
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20" />
            {renderFormField(
              'combobox',
              'coverPage.state',
              '',
              'Select State',
              '',
              {
                inputProps: {
                  className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                },
                value: [
                  { value: 'AL', label: 'Alabama' },
                  { value: 'AK', label: 'Alaska' },
                  { value: 'AZ', label: 'Arizona' },
                  { value: 'AR', label: 'Arkansas' },
                  { value: 'CA', label: 'California' },
                  { value: 'CO', label: 'Colorado' },
                  { value: 'CT', label: 'Connecticut' },
                  { value: 'DE', label: 'Delaware' },
                  { value: 'FL', label: 'Florida' },
                  { value: 'GA', label: 'Georgia' },
                  { value: 'HI', label: 'Hawaii' },
                  { value: 'ID', label: 'Idaho' },
                  { value: 'IL', label: 'Illinois' },
                  { value: 'IN', label: 'Indiana' },
                  { value: 'IA', label: 'Iowa' },
                  { value: 'KS', label: 'Kansas' },
                  { value: 'KY', label: 'Kentucky' },
                  { value: 'LA', label: 'Louisiana' },
                  { value: 'ME', label: 'Maine' },
                  { value: 'MD', label: 'Maryland' },
                  { value: 'MA', label: 'Massachusetts' },
                  { value: 'MI', label: 'Michigan' },
                  { value: 'MN', label: 'Minnesota' },
                  { value: 'MS', label: 'Mississippi' },
                  { value: 'MO', label: 'Missouri' },
                  { value: 'MT', label: 'Montana' },
                  { value: 'NE', label: 'Nebraska' },
                  { value: 'NV', label: 'Nevada' },
                  { value: 'NH', label: 'New Hampshire' },
                  { value: 'NJ', label: 'New Jersey' },
                  { value: 'NM', label: 'New Mexico' },
                  { value: 'NY', label: 'New York' },
                  { value: 'NC', label: 'North Carolina' },
                  { value: 'ND', label: 'North Dakota' },
                  { value: 'OH', label: 'Ohio' },
                  { value: 'OK', label: 'Oklahoma' },
                  { value: 'OR', label: 'Oregon' },
                  { value: 'PA', label: 'Pennsylvania' },
                  { value: 'RI', label: 'Rhode Island' },
                  { value: 'SC', label: 'South Carolina' },
                  { value: 'SD', label: 'South Dakota' },
                  { value: 'TN', label: 'Tennessee' },
                  { value: 'TX', label: 'Texas' },
                  { value: 'UT', label: 'Utah' },
                  { value: 'VT', label: 'Vermont' },
                  { value: 'VA', label: 'Virginia' },
                  { value: 'WA', label: 'Washington' },
                  { value: 'WV', label: 'West Virginia' },
                  { value: 'WI', label: 'Wisconsin' },
                  { value: 'WY', label: 'Wyoming' },
                ],
              },
              handleInfoClick,
              businessPlanGeneratorData,
              setBusinessPlanGeneratorData
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Country */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="country" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            Country
          </label>
          <div className="relative">
            <Globe className="absolute mt-1 left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20" />
            {renderFormField(
              'country',
              'coverPage.country',
              '',
              'Enter Country',
              '',
              {
                inputProps: {
                  className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                },
              },
              handleInfoClick,
              businessPlanGeneratorData,
              setBusinessPlanGeneratorData
            )}
          </div>
        </div>
        {/* Zip Code */}
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
          <label htmlFor="zipCode" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
            Zip Code
          </label>
          <div className="relative">
            <Hash className="absolute mt-1 left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20" />
            {renderFormField(
              'input',
              'coverPage.zipCode',
              '',
              'Enter Zip Code',
              '',
              {
                inputProps: {
                  className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                },
              },
              handleInfoClick,
              businessPlanGeneratorData,
              setBusinessPlanGeneratorData
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

AddressInfo.displayName = 'AddressInfo';

export default AddressInfo;
