import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PencilSquareIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  fetchedData: any;
}

const MayLeaveCompany: React.FC<Props> = ({ register, setValue, fetchedData }) => {
  const [mayLeaveCompany, setMayLeaveCompany] = useState<string>(fetchedData?.mayLeaveCompany || 'No');
  const [votingType, setVotingType] = useState<string>(fetchedData?.shouldReceivePaymentWhenLeaving || 'Yes');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quillRef = useRef<typeof ReactQuill>(null);

  const [contents, setContents] = useState({
    No: `Members may not withdraw from the Company.`,
    YesYes: `Members shall have the unilateral right to withdraw at any time from the Company subject to the terms of this Operating Agreement and applicable law. <span class="text-[#F7931E] font-semibold">The withdrawing member shall be entitled to receive as a distribution, within reasonable time after withdrawal, the fair value of the member's interest in the Company as of the date of withdrawal.</span>`,
    YesNo: `Members shall have the unilateral right to withdraw at any time from the Company subject to the terms of this Operating Agreement and applicable law, <span class="text-[#F7931E] font-semibold">but shall be entitled to no compensation or payments of any kind for the member's interest in the Company.</span>`
  });

  const getContent = () => {
    if (mayLeaveCompany === 'No') return contents.No;
    if (votingType === 'Yes') return contents.YesYes;
    return contents.YesNo;
  };

  const [editedContent, setEditedContent] = useState<string>(getContent());

  useEffect(() => {
    setValue('mayLeaveCompany', mayLeaveCompany);
    setValue('shouldReceivePaymentWhenLeaving', votingType);
    if (fetchedData?.pdfSections?.membershipChanges?.section_5_3_desc) {
      const fetchedContent = fetchedData.pdfSections.membershipChanges.section_5_3_desc;
      setContents(prevContents => ({
        ...prevContents,
        [mayLeaveCompany === 'No' ? 'No' : votingType === 'Yes' ? 'YesYes' : 'YesNo']: fetchedContent
      }));
    }
    setEditedContent(getContent());
  }, [setValue, fetchedData]);

  useEffect(() => {
    setEditedContent(getContent());
    setValue('pdfSections.membershipChanges.section_5_3_desc', getContent(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [mayLeaveCompany])

  const handleVotingTypeChange = (newType: string) => {
    setVotingType(newType);
    setEditedContent(getContent());
    setValue('pdfSections.membershipChanges.section_5_3_desc', getContent(), {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('shouldReceivePaymentWhenLeaving', newType);
  };

  const handleModalOpen = () => {
    setEditedContent(getContent());
    setIsModalOpen(true);
  };

  const saveContent = () => {
    setContents(prevContents => ({
      ...prevContents,
      [mayLeaveCompany === 'No' ? 'No' : votingType === 'Yes' ? 'YesYes' : 'YesNo']: editedContent
    }));
    setValue('pdfSections.membershipChanges.section_5_3_desc', editedContent, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setIsModalOpen(false);
  };

  const resetContent = () => {
    const defaultContents = {
      No: `Members may not withdraw from the Company.`,
      YesYes: `Members shall have the unilateral right to withdraw at any time from the Company subject to the terms of this Operating Agreement and applicable law. <span class="text-[#F7931E] font-semibold">The withdrawing member shall be entitled to receive as a distribution, within reasonable time after withdrawal, the fair value of the member's interest in the Company as of the date of withdrawal.</span>`,
      YesNo: `Members shall have the unilateral right to withdraw at any time from the Company subject to the terms of this Operating Agreement and applicable law, <span class="text-[#F7931E] font-semibold">but shall be entitled to no compensation or payments of any kind for the member's interest in the Company.</span>`
    };

    setContents(defaultContents);
    localStorage.removeItem('pdfSections.membershipChanges.section_5_3_desc_no');
    localStorage.removeItem('pdfSections.membershipChanges.section_5_3_desc_yes_yes');
    localStorage.removeItem('pdfSections.membershipChanges.section_5_3_desc_yes_no');
    setEditedContent(getContent());
  };

  useEffect(() => {
    setEditedContent(getContent());
  }, [mayLeaveCompany, votingType, contents]);

  const handleContentChange = (value: string) => {
    setEditedContent(value);
  };

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
                Decide whether LLC members should have the option to voluntarily leave the company.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-lg sm:text-xl md:text-2xl text-neutral-950 font-semibold">
                  Allow members to leave
                </span>
                <div className="flex items-center justify-center sm:justify-end mt-2 sm:mt-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={mayLeaveCompany === 'Yes'}
                      onChange={(e) => {
                        const value = e.target.checked ? 'Yes' : 'No';
                        setMayLeaveCompany(value);
                        setValue('mayLeaveCompany', value);
                      }}
                    />
                    <div className="w-20 h-10 sm:w-24 sm:h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 sm:after:h-11 sm:after:w-11 after:transition-all peer-checked:bg-[#F7931E]"></div>
                    <span className="ml-3 text-base sm:text-lg font-medium text-neutral-950">
                      {mayLeaveCompany === 'Yes' ? 'Yes' : 'No'}
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
          {mayLeaveCompany === 'Yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border-l-4 border-[#F7931E]"
            >
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-950 font-semibold text-center">
                  Should departing members receive payment for their ownership stake?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-8 w-full">
                  <button
                    type="button"
                    className={`w-full sm:w-48 md:w-56 px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold transition-all duration-200 ${
                      votingType === 'Yes'
                        ? 'bg-[#F7931E] text-white shadow-lg hover:bg-orange-600 ring-4 ring-orange-300'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => handleVotingTypeChange('Yes')}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`w-full sm:w-48 md:w-56 px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold transition-all duration-200 ${
                      votingType === 'No'
                        ? 'bg-[#F7931E] text-white shadow-lg hover:bg-orange-600 ring-4 ring-orange-300'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => handleVotingTypeChange('No')}
                  >
                    No
                  </button>
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
            <Dialog.Title className="text-lg font-medium text-neutral-950">Member Exit Policy</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-700">
              Deciding whether members can leave the company and under what conditions is an important aspect of your LLC's operating agreement. This can affect the stability and continuity of your business.
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
              SECTION 5.3 - VOLUNTARY WITHDRAWAL
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

export default MayLeaveCompany;
