import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PencilSquareIcon, InformationCircleIcon, CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  fetchedData: any;
}

const ProfitAllocation: React.FC<Props> = ({ register, setValue, fetchedData }) => {
  const [profitAllocation, setProfitAllocation] = useState<string>(fetchedData?.profitLossDetails?.profitLossPattern || 'By LLC Unit');
  const [profitLossDistributionDetails, setProfitLossDistributionDetails] = useState<string>(fetchedData?.profitLossDetails?.profitLossDistributionDetails || '');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quillRef = useRef<typeof ReactQuill>(null);

  const [contents, setContents] = useState({
    ByLLCUnit: `Except as may be required by the Internal Revenue Code (Title 26 of the United States Code) or the Treasury Regulations (Title 26 of the Code of Federal Regulations) or this Operating Agreement, net profits, net losses, and other items of income, gain, loss, deduction and credit of the Company shall be allocated among the Members in proportion to each Member's <span class="text-[#F7931E] font-semibold">LLC Unit Percentage</span>.`,
    Other: `${profitLossDistributionDetails}<br><br>Notwithstanding, allocations shall additionally be made per the requirements of the Internal Revenue Code (Title 26 of the United States Code) and the Treasury Regulations (Title 26 of the Code of Federal Regulations).`
  });

  const getContent = () => {
    return profitAllocation === 'By LLC Unit' ? contents.ByLLCUnit : contents.Other;
  };

  const [editedContent, setEditedContent] = useState<string>(getContent());

  useEffect(() => {
    setValue('profitLossDetails.profitLossPattern', profitAllocation);
    setValue('profitLossDetails.profitLossDistributionDetails', profitLossDistributionDetails);
    if (fetchedData?.pdfSections?.distributions?.section_4_1_desc) {
      const fetchedContent = fetchedData.pdfSections.distributions.section_4_1_desc;
      setContents(prevContents => ({
        ...prevContents,
        [profitAllocation === 'By LLC Unit' ? 'ByLLCUnit' : 'Other']: fetchedContent
      }));
    }
    setEditedContent(getContent());
  }, [setValue, fetchedData, profitAllocation, profitLossDistributionDetails]);

  useEffect(() => {
    setEditedContent(getContent());
    setValue('pdfSections.distributions.section_4_1_desc', getContent(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [profitAllocation, profitLossDistributionDetails]);

  const handleModalOpen = () => {
    setEditedContent(getContent());
    setIsModalOpen(true);
  };

  const saveContent = () => {
    setContents(prevContents => ({
      ...prevContents,
      [profitAllocation === 'By LLC Unit' ? 'ByLLCUnit' : 'Other']: editedContent
    }));
    setValue('pdfSections.distributions.section_4_1_desc', editedContent, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setIsModalOpen(false);
  };

  const resetContent = () => {
    const defaultContents = {
      ByLLCUnit: `Except as may be required by the Internal Revenue Code (Title 26 of the United States Code) or the Treasury Regulations (Title 26 of the Code of Federal Regulations) or this Operating Agreement, net profits, net losses, and other items of income, gain, loss, deduction and credit of the Company shall be allocated among the Members in proportion to each Member's <span class="text-[#F7931E] font-semibold">LLC Unit Percentage</span>.`,
      Other: `${profitLossDistributionDetails}<br><br>Notwithstanding, allocations shall additionally be made per the requirements of the Internal Revenue Code (Title 26 of the United States Code) and the Treasury Regulations (Title 26 of the Code of Federal Regulations).`
    };

    setContents(defaultContents);
    localStorage.removeItem('pdfSections.distributions.section_4_1_desc_by_llc_unit');
    localStorage.removeItem('pdfSections.distributions.section_4_1_desc_other');
    setEditedContent(getContent());
  };

  const handleContentChange = (value: string) => {
    setEditedContent(value);
  };

  useEffect(() => {
    setEditedContent(getContent());
  }, [profitAllocation, profitLossDistributionDetails, contents]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const Quill = require('react-quill-new').Quill;
      const Block = Quill.import('blots/block');
      const Inline = Quill.import('blots/inline');

      class SpanBlot extends Inline {
        static create(value: string): HTMLElement {
          let node = super.create();
          node.setAttribute('class', value);
          return node;
        }

        static formats(node: HTMLElement): string | undefined {
          return node.getAttribute('class') || undefined;
        }
      }
      SpanBlot.blotName = 'span';
      SpanBlot.tagName = 'span';

      Quill.register(SpanBlot);
    }
  }, []);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'bold', 'italic', 'underline', 'list', 'bullet', 'span'
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg w-full"
      >
        <div className="flex flex-col space-y-6 md:space-y-8">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 space-y-2">
              <p className="text-neutral-950 text-base sm:text-lg md:text-xl font-normal italic">
                Decide how profits and losses should be allocated among LLC members.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-lg sm:text-xl md:text-2xl text-neutral-950 font-semibold">
                  Profit Allocation Method
                </span>
                <div className="flex items-center justify-center sm:justify-end mt-2 sm:mt-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={profitAllocation === 'Other'}
                      onChange={(e) => {
                        const value = e.target.checked ? 'Other' : 'By LLC Unit';
                        setProfitAllocation(value);
                        setValue('profitLossDetails.profitLossPattern', value);
                      }}
                    />
                    <div className="w-20 h-10 sm:w-24 sm:h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 sm:after:h-11 sm:after:w-11 after:transition-all peer-checked:bg-[#F7931E]"></div>
                    <span className="ml-3 text-base sm:text-lg font-medium text-neutral-950">
                      {profitAllocation === 'Other' ? 'Other' : 'By LLC Unit'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-[#F7931E] bg-orange-100 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              onClick={() => setIsInfoModalOpen(true)}
            >
              <InformationCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Learn More
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-[#F7931E] bg-orange-100 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              onClick={handleModalOpen}
            >
              <PencilSquareIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Edit Details
            </button>
          </div>
        </div>

        <AnimatePresence>
          {profitAllocation === 'Other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border-l-4 border-[#F7931E]"
            >
              <div className="flex flex-col items-start space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3">
                  <CurrencyDollarIcon className="h-8 w-8 text-[#F7931E]" />
                  <h3 className="text-lg sm:text-xl md:text-2xl text-neutral-950 font-semibold">
                    Describe your custom profit and loss allocation method:
                  </h3>
                </div>
                <div className="w-full">
                  <div className="relative">
                    <DocumentTextIcon className="absolute top-3 left-3 h-5 w-5 text-[#F7931E]" />
                    <textarea
                      className="w-full px-10 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-[#F7931E] transition-colors shadow-sm text-neutral-950"
                      placeholder='Explain how profits and losses should be distributed'
                      rows={4}
                      value={profitLossDistributionDetails}
                      onChange={(e) => {
                        setProfitLossDistributionDetails(e.target.value);
                        setValue('profitLossDetails.profitLossDistributionDetails', e.target.value);
                      }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-neutral-950 italic flex items-center">
                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                    Describe your custom method for allocating profits and losses among LLC members
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Dialog open={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-medium text-neutral-950">Profit and Loss Allocation</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-700">
              As the LLC conducts business, it will accumulate profits, losses, and other items of income, credit, and the like. As part of
              your accounting, these items will be divvied up between the members. These distributions are often based on the Member's LLC Unit Percentage
              but may be allocated in other ways.
            </Dialog.Description>
            <button
              type="button"
              className="mt-4 rounded-md bg-[#F7931E] px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={() => setIsInfoModalOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-white shadow-xl flex flex-col">
            <Dialog.Title className="text-center text-lg font-medium text-neutral-950 px-6 py-4 border-b border-orange-200">
              SECTION 4.1 - ALLOCATIONS
            </Dialog.Title>
            <div className="px-6 py-4 flex-grow overflow-hidden flex flex-col">
              <ReactQuill
                value={editedContent || ''}
                onChange={handleContentChange}
                theme="snow"
                modules={modules}
                formats={formats}
                className="flex-grow"
              />
            </div>
            <div className="flex justify-end space-x-2 bg-orange-50 px-4 py-3 rounded-b-lg mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-white text-sm font-medium text-[#F7931E] hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md border border-orange-300 transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-orange-300 text-sm font-medium text-[#F7931E] hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md border border-transparent transition-colors duration-200"
                onClick={resetContent}
              >
                Reset
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#F7931E] text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md border border-transparent transition-colors duration-200"
                onClick={saveContent}
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfitAllocation;
