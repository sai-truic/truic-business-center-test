import React from 'react';
import { motion } from 'framer-motion';
import { Accordion } from '../ui/accordion';
import { FaUserTie, FaExclamationTriangle } from 'react-icons/fa';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import OwnershipCalculator from './OwnershipCalculator';
import MembershipManagement from './MembershipManagement';
import ManagementType from './ManagementType';
import CriticalMatters from './CriticalMatters';
import FinancialMatters from './FinancialMatters';
import MultiMemberReviewAndAccept from './MultiMemberReviewAndAccept';

const MultiMemberSection: React.FC<{ register: any, control: any, setValue: any, fetchedData: any }> = ({ register, control, setValue, fetchedData }) => {
  return (
    <motion.div
      key="multi-member"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
    >
      <OwnershipCalculator register={register} setValue={setValue} fetchedData={fetchedData} />
      <MembershipManagement register={register} control={control} setValue={setValue} fetchedData={fetchedData} />
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 shadow-lg">
        <Accordion type="single" collapsible>
          <Accordion.Item value="management-type">
            <Accordion.Trigger className="w-full text-left flex justify-between items-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center">
                <FaUserTie className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E] mr-3" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 pr-4">
                  <span className="bg-clip-text text-neutral-950 bg-[#C6500C]">
                    Management Type
                  </span>
                </h3>
              </div>
              <ChevronDownIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E]" />
            </Accordion.Trigger>
            <Accordion.Content className="pt-4 space-y-6">
              <ManagementType register={register} setValue={setValue} fetchedData={fetchedData} />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 shadow-lg">
        <Accordion type="single" collapsible>
          <Accordion.Item value="critical-matters">
            <Accordion.Trigger className="w-full text-left flex justify-between items-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center">
                <FaExclamationTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E] mr-3" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 pr-4">
                  <span className="bg-clip-text text-neutral-950 bg-[#C6500C]">
                    Critical Matters
                  </span>
                </h3>
              </div>
              <ChevronDownIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E]" />
            </Accordion.Trigger>
            <Accordion.Content className="pt-4 space-y-6">
              <CriticalMatters register={register} setValue={setValue} fetchedData={fetchedData} />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
      <FinancialMatters register={register} setValue={setValue} fetchedData={fetchedData} />
      <MultiMemberReviewAndAccept register={register} fetchedData={fetchedData} />
    </motion.div>
  );
};

export default MultiMemberSection;
