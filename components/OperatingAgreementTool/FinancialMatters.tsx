import React from 'react';
import { Accordion } from '../ui/accordion';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FaMoneyBillWave, FaChartPie, FaFileInvoiceDollar } from 'react-icons/fa';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import ProfitAllocation from './ProfitAllocation';
import TaxLiabilityPayments from './TaxLiabilityPayments';

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  fetchedData: any;
}

const FinancialMatters: React.FC<{ register: any, setValue: any, fetchedData: any }> = ({ register, setValue, fetchedData }) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 shadow-lg">
      <Accordion type="single" collapsible>
        <Accordion.Item value="financial-matters" className="bg-white rounded-lg shadow-md">
          <Accordion.Trigger className="w-full text-left flex justify-between items-center p-4 sm:p-6 hover:bg-gray-50 transition-all duration-300">
            {({ isOpen }) => (
              <>
                <div className="flex items-center">
                  <FaMoneyBillWave className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E] mr-3" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 pr-4">
                    <span className="bg-clip-text text-neutral-950 bg-[#C6500C]">
                      Financial Matters
                    </span>
                  </h3>
                </div>
                <ChevronDownIcon className={`h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content className="pt-4 space-y-6">
            <Accordion type="multiple" collapsible>
              <Accordion.Item value="profit-allocation" className="bg-white rounded-lg shadow-md border-l-4 border-[#F7931E]">
                <Accordion.Trigger className="w-full text-left p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 transition-all duration-300">
                  {({ isOpen }) => (
                    <>
                      <div className="flex items-center">
                        <FaChartPie className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E] mr-3" />
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-950 pr-4">
                          Profit Allocation
                        </h4>
                      </div>
                      <ChevronDownIcon className={`h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.Content className="p-4 sm:p-6 pt-0">
                  <ProfitAllocation register={register} setValue={setValue} fetchedData={fetchedData} />
                </Accordion.Content>
              </Accordion.Item>
              
              <Accordion.Item value="tax-liability-payments" className="bg-white rounded-lg shadow-md border-l-4 border-[#F7931E]">
                <Accordion.Trigger className="w-full text-left p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 transition-all duration-300">
                  {({ isOpen }) => (
                    <>
                      <div className="flex items-center">
                        <FaFileInvoiceDollar className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E] mr-3" />
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-950 pr-4">
                          Tax Liability Payments
                        </h4>
                      </div>
                      <ChevronDownIcon className={`h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.Content className="p-4 sm:p-6 pt-0">
                  <TaxLiabilityPayments register={register} setValue={setValue} fetchedData={fetchedData} />
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FinancialMatters;
