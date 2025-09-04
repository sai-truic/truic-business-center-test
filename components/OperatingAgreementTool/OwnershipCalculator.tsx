import React, { useState, useEffect, useMemo } from 'react';
import { InformationCircleIcon, UserPlusIcon, UserMinusIcon, ChartPieIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion } from '../ui/accordion';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface Member {
  id: number;
  ownerName: string;
  unit: number;
}

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  fetchedData: any;
}

const OwnershipCalculator: React.FC<Props> = ({ register, setValue, fetchedData }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (fetchedData && fetchedData.multiMemberOwners) {
      setMembers(fetchedData.multiMemberOwners);
    } else {
      setMembers([
        { id: Date.now(), ownerName: '', unit: 50 },
        { id: Date.now() + 1, ownerName: '', unit: 50 },
      ]);
    }
  }, [fetchedData]);

  const isValid = useMemo(() => {
    return members.every(member => member.ownerName.trim() !== '' || member.unit === 0);
  }, [members]);

  const totalUnits = useMemo(() => {
    return isValid ? members.reduce((sum, member) => sum + member.unit, 0) : null;
  }, [members, isValid]);

  const handleNameChange = (id: number, newName: string) => {
    setMembers(prevMembers => {
      const updatedMembers = prevMembers.map(member =>
        member.id === id ? { ...member, ownerName: newName } : member
      );
      setValue('multiMemberOwners', updatedMembers);
      return updatedMembers;
    });
  };

  const handleUnitsChange = (id: number, newValue: string) => {
    setMembers(prevMembers => {
      const updatedMembers = prevMembers.map(member => {
        if (member.id === id) {
          const newUnits = newValue === '' ? 0 : parseInt(newValue, 10);
          return { ...member, unit: isNaN(newUnits) ? 0 : newUnits };
        }
        return member;
      });
      setValue('multiMemberOwners', updatedMembers);
      return updatedMembers;
    });
  };

  const addMember = () => {
    if (isValid) {
      const newMember = { id: Date.now(), ownerName: '', unit: 0 };
      setMembers([...members, newMember]);
      setValue('multiMemberOwners', [...members, newMember]);
    }
  };

  const deleteMember = (id: number) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    setValue('multiMemberOwners', updatedMembers);
  };

  return (
    <Accordion type="single" collapsible>
      <Accordion.Item value="ownership-calculator">
        <Accordion.Trigger className={cn(
          "w-full text-left flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6",
          "bg-gradient-to-r from-[#F7931E] to-orange-600 text-white rounded-t-3xl",
          "sm:text-left sm:items-center",
          "text-center items-center"
        )}>
          {({ isOpen }) => (
            <>
              <div className={cn(
                "flex items-center mb-2 sm:mb-0",
                "sm:flex-row",
                "flex-col"
              )}>
                <ChartPieIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-4 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold">LLC Ownership Distribution</h2>
                  <p className="text-sm sm:text-base text-orange-100">Define the owners of the LLC and their respective LLC units</p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} mt-2 sm:mt-0`}>
                <ChevronDownIcon className="w-8 h-8 sm:w-12 sm:h-12" />
              </div>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-b-3xl shadow-xl overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className={cn(
              "flex justify-between items-center mb-4 sm:mb-6",
              "sm:flex-row",
              "flex-col"
            )}>
              <button
                type="button"
                className={cn(
                  "text-[#F7931E] hover:text-orange-600 focus:outline-none transition-colors duration-200 flex items-center text-sm sm:text-base",
                  "sm:justify-start",
                  "justify-center w-full mb-2 sm:mb-0"
                )}
                onClick={() => setIsInfoModalOpen(true)}
              >
                <InformationCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
                <span>Learn about LLC Units</span>
              </button>
            </div>
            <AnimatePresence>
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center mb-4 bg-white p-3 sm:p-4 rounded-lg shadow-md",
                    "sm:items-center",
                    "items-center"
                  )}
                >
                  <input
                    type="text"
                    className={cn(
                      "flex-1 p-2 sm:p-3 mb-2 sm:mb-0 sm:mr-2 rounded-md border-2 focus:ring transition-all duration-200 w-full sm:w-auto",
                      "text-center sm:text-left",
                      member.unit > 0 && member.ownerName.trim() === '' 
                        ? "border-red-500 focus:border-red-700 focus:ring-red-200" 
                        : "border-orange-200 focus:border-[#F7931E] focus:ring-orange-200"
                    )}
                    placeholder="Full Name of Member"
                    value={member.ownerName}
                    onChange={(e) => handleNameChange(member.id, e.target.value)}
                  />
                  <div className={cn(
                    "flex items-center w-full sm:w-auto",
                    "sm:flex-row",
                    "flex-col"
                  )}>
                    <input
                      type="text"
                      className={cn(
                        "w-20 sm:w-24 p-2 sm:p-3 mr-2 rounded-md border-2 focus:ring transition-all duration-200",
                        "mb-2 sm:mb-0",
                        "text-center sm:text-left",
                        member.unit > 0 && member.ownerName.trim() === '' 
                          ? "border-red-500 focus:border-red-700 focus:ring-red-200" 
                          : "border-orange-200 focus:border-[#F7931E] focus:ring-orange-200"
                      )}
                      value={member.unit === 0 ? '' : member.unit.toString()}
                      onChange={(e) => handleUnitsChange(member.id, e.target.value)}
                    />
                    {isValid && totalUnits !== null && (
                      <span className="w-16 sm:w-20 text-center sm:text-right font-medium text-[#F7931E] text-base sm:text-lg mb-2 sm:mb-0">
                        {((member.unit / totalUnits) * 100).toFixed(2)}%
                      </span>
                    )}
                    {members.length > 2 && (
                      <button
                        type="button"
                        onClick={() => deleteMember(member.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-200 mt-2 sm:mt-0 sm:ml-2"
                      >
                        <UserMinusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className={cn(
              "flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 sm:mt-6",
              "sm:items-center",
              "items-center"
            )}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addMember();
                }}
                className={cn(
                  "flex items-center bg-[#F7931E] text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-200 mb-2 sm:mb-0",
                  "w-full sm:w-auto justify-center",
                  isValid ? "hover:bg-orange-600" : "opacity-50 cursor-not-allowed"
                )}
                disabled={!isValid}
              >
                <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Add a Member
              </button>
              {isValid && totalUnits !== null && (
                <div className="text-neutral-950 font-medium text-base sm:text-lg text-center sm:text-left">
                  <span>Total Units: {totalUnits}</span>
                  <span className="ml-2">100%</span>
                </div>
              )}
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>

      <Dialog open={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-4 sm:p-6 shadow-xl">
            <Dialog.Title className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3 sm:mb-4">
              <span className="bg-clip-text text-neutral-950 bg-[#C6500C]">
                Understanding LLC Units
              </span>
            </Dialog.Title>
            <Dialog.Description className="text-sm sm:text-base text-gray-700 space-y-3 sm:space-y-4">
              <p>
                LLC Units are a method of tracking ownership of the LLC. They determine member voting allocations and profit distributions.
              </p>
              <p>
                When a multi-member LLC is formed, a fixed number of LLC Units are allocated to the original members.
              </p>
              <p>
                Most LLCs start with 100 units split between the different members, but you can adjust this as needed.
              </p>
            </Dialog.Description>
            <button
              type="button"
              className="mt-4 sm:mt-6 w-full rounded-md bg-[#C6500C] px-3 py-2 sm:px-4 sm:py-2 text-base sm:text-lg font-medium text-white hover:from-orange-600 hover:to-orange-700 transition-colors duration-200"
              onClick={() => setIsInfoModalOpen(false)}
            >
              Got it
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Accordion>
  );
};

export default OwnershipCalculator;
