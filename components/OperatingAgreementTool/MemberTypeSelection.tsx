import React, { useState, useEffect } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberTypeSelectionProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  setCurrentMemberType: (memberType: string) => void;
}

const MemberTypeSelection: React.FC<MemberTypeSelectionProps> = ({ register, watch, setValue, setCurrentMemberType }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const memberType = watch("memberType");

  useEffect(() => {
    if (memberType) {
      setCurrentMemberType(memberType);
    }
  }, [memberType, setCurrentMemberType]);

  const handleMemberTypeChange = (type: string) => {
    setValue("memberType", type);
    setCurrentMemberType(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex flex-col justify-center items-center p-8 border border-[#E4E4E7] rounded-xl"
    >
      <div className="flex items-start mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold mr-3">
          Choose Your LLC Member Type
        </h3>
        <button
          type="button"
          className="flex-shrink-0 text-[#F7931E] hover:text-orange-600 focus:outline-none transition-colors duration-200"
          onClick={() => setIsInfoModalOpen(true)}
        >
          <InformationCircleIcon className="w-7 h-7" />
        </button>
      </div>
      <p className="text-center text-gray-600 mb-8 max-w-2xl text-lg">
        LLCs can be owned by one or more people, known as "Members." Select the type that best describes your LLC structure:
      </p>
      <div className="flex flex-col sm:flex-row w-full justify-center space-y-6 sm:space-y-0 sm:space-x-8">
        {['single-member', 'multi-member'].map((type) => (
          <label key={type} className="flex-1">
            <input
              type="radio"
              value={type}
              checked={memberType === type}
              onChange={() => handleMemberTypeChange(type)}
              className="absolute opacity-0 w-0 h-0"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer
                transition-all duration-300 ease-in-out
                ${
                  memberType === type
                    ? 'bg-[#C6500C] text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md hover:shadow-lg'
                }
              `}
            >
              <span className="text-4xl mb-4">
                {type === 'single-member' ? '👤' : '👥'}
              </span>
              <span className="text-xl font-semibold mb-2">
                {type === 'single-member' ? 'Single-Member' : 'Multi-Member'}
              </span>
              <span className="text-base mt-2 text-center">
                {type === 'single-member' ? 'One owner' : 'Multiple owners'}
              </span>
            </motion.div>
          </label>
        ))}
      </div>

      <AnimatePresence>
        {isInfoModalOpen && (
          <Dialog
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            static
            open={isInfoModalOpen}
            onClose={() => setIsInfoModalOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              >
                <Dialog.Title className="text-2xl font-bold text-neutral-950 mb-4">LLC Member Types</Dialog.Title>
                <Dialog.Description className="mt-2 text-gray-600">
                  <p className="mb-4">
                    In a <strong>single member LLC</strong>, the sole owner has full control over all affairs of the company. No other individuals or entities have ownership in the company.
                  </p>
                  <p>
                    In a <strong>multi-member LLC</strong>, multiple owners control the LLC, sharing responsibilities and profits according to their agreed-upon structure.
                  </p>
                </Dialog.Description>
                <button
                  type="button"
                  className="mt-6 w-full rounded-md bg-[#C6500C] px-4 py-2 text-sm font-medium text-white hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-200"
                  onClick={() => setIsInfoModalOpen(false)}
                >
                  Close
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemberTypeSelection;
