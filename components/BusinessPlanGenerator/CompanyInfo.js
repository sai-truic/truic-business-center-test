import React from 'react';
import { motion } from 'framer-motion';
import renderFormField from '../renderFormField';

const CompanyInfo = ({ businessPlanGeneratorData, setBusinessPlanGeneratorData, handleInfoClick }) => {
  return (
    <motion.div 
      className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Company Name */}
      <motion.div 
        className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
        <label htmlFor="companyName" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
          Company Name
        </label>
        {renderFormField(
          'input',
          'coverPage.name',
          '',
          'Enter your Company Name',
          '',
          {
            inputProps: {
              className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
              icon: 'Building2',
              iconClassName: 'absolute left-3 sm:left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20',
            }
          },
          handleInfoClick,
          businessPlanGeneratorData,
          setBusinessPlanGeneratorData
        )}
      </motion.div>
      {/* Owner Name */}
      <motion.div 
        className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1 border-2 border-orange-200 group hover:border-[#F7931E]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 transition-opacity duration-300 rounded-xl"></div>
        <label htmlFor="ownerName" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base relative z-10">
          Owner Name
        </label>
        {renderFormField(
          'input',
          'coverPage.ownerName',
          '',
          'Enter Owner Name',
          '',
          {
            inputProps: {
              className: 'p-2 sm:p-3 md:p-4 pl-12 sm:pl-12 md:pl-14 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
              icon: 'Building2',
              iconClassName: 'absolute left-3 sm:left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20',
            }
          },
          handleInfoClick,
          businessPlanGeneratorData,
          setBusinessPlanGeneratorData
        )}
      </motion.div>
    </motion.div>
  );
};

export default CompanyInfo;
