import React from 'react';
import { Accordion } from '../ui/accordion';
import { FaUsers, FaUserFriends, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import AdmitNewMembers from './AdmitNewMembers';
import TransferOwnership from './TransferOwnership';
import MayLeaveCompany from './MayLeaveCompany';

const MembershipManagement: React.FC<{ register: any, control: any, setValue: any, fetchedData: any }> = ({ register, control, setValue, fetchedData }) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 shadow-lg">
      <Accordion type="single" collapsible>
        <Accordion.Item value="membership-management">
          <Accordion.Trigger
            className="w-full text-left flex justify-between items-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center">
              <FaUsers className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E] mr-3" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 pr-4">
                <span className="bg-clip-text text-neutral-950 bg-[#C6500C]">
                  Membership Management
                </span>
              </h3>
            </div>
            <ChevronDownIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E] transition-transform duration-300" />
          </Accordion.Trigger>
          <Accordion.Content className="pt-4 space-y-6">
            <Accordion type="multiple" collapsible>
              <Accordion.Item value="new-member-admission" className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-[#F7931E]">
                <Accordion.Trigger
                  className="w-full text-left p-4 sm:p-6 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <FaUserFriends className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E] mr-3" />
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-950 pr-4">
                      New Member Admission
                    </h4>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E]" />
                </Accordion.Trigger>
                <Accordion.Content className="p-4 sm:p-6 pt-0">
                  <AdmitNewMembers register={register} setValue={setValue} fetchedData={fetchedData} />
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="ownership-transfer" className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-[#F7931E]">
                <Accordion.Trigger
                  className="w-full text-left p-4 sm:p-6 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <FaExchangeAlt className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E] mr-3" />
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-950 pr-4">
                      Ownership Transfer
                    </h4>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E]" />
                </Accordion.Trigger>
                <Accordion.Content className="p-4 sm:p-6 pt-0">
                  <TransferOwnership register={register} setValue={setValue} fetchedData={fetchedData} />
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="member-exit-policy" className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-[#F7931E]">
                <Accordion.Trigger
                  className="w-full text-left p-4 sm:p-6 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <FaSignOutAlt className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E] mr-3" />
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-950 pr-4">
                      Member Exit Policy
                    </h4>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7931E]" />
                </Accordion.Trigger>
                <Accordion.Content className="p-4 sm:p-6 pt-0">
                  <MayLeaveCompany register={register} setValue={setValue} fetchedData={fetchedData} />
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MembershipManagement;
