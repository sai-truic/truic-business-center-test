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

const TransferOwnership: React.FC<Props> = ({ register, setValue, fetchedData }) => {
  const [transferOwnership, setTransferOwnership] = useState<string>(fetchedData?.transferOrSellOwnership || 'No');
  const [votingType, setVotingType] = useState<string>(fetchedData?.voteToTransferOrSellUnits || 'Majority');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quillRef = useRef<typeof ReactQuill>(null);

  const [contents, setContents] = useState({
    No: `A Member may not sell, transfer, assign, encumber, pledge, convey, or otherwise dispose of part or all of Member's membership interest.`,
    YesMajority: `A Member may voluntarily sell, transfer, assign, encumber, pledge, convey, or otherwise dispose of part or all of Member's membership interest, but only upon a <span class="text-[#F7931E] font-semibold">Majority</span> vote allowing the transfer and admitting the new Member in accordance with this Operating Agreement, if the new Member does not already hold LLC Units in the Company.`,
    YesUnanimous: `A Member may voluntarily sell, transfer, assign, encumber, pledge, convey, or otherwise dispose of part or all of Member's membership interest, but only upon a <span class="text-[#F7931E] font-semibold">Unanimous</span> vote allowing the transfer and admitting the new Member in accordance with this Operating Agreement, if the new Member does not already hold LLC Units in the Company.`
  });

  const getContent = () => {
    if (transferOwnership === 'No') return contents.No;
    if (votingType === 'Majority') return contents.YesMajority;
    return contents.YesUnanimous;
  };

  const [editedContent, setEditedContent] = useState<string>(getContent());

  useEffect(() => {
    setValue('transferOrSellOwnership', transferOwnership);
    setValue('voteToTransferOrSellUnits', votingType);
    if (fetchedData?.pdfSections?.membershipChanges?.section_5_2_desc) {
      const fetchedContent = fetchedData.pdfSections.membershipChanges.section_5_2_desc;
      setContents(prevContents => ({
        ...prevContents,
        [transferOwnership === 'No' ? 'No' : votingType === 'Majority' ? 'YesMajority' : 'YesUnanimous']: fetchedContent
      }));
    }
    setEditedContent(getContent());
  }, [setValue, fetchedData]);

  useEffect(() => {
    setEditedContent(getContent());
    setValue('pdfSections.membershipChanges.section_5_2_desc', getContent(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [transferOwnership])

  const handleVotingTypeChange = (newType: string) => {
    setVotingType(newType);
    setEditedContent(getContent());
    setValue('pdfSections.membershipChanges.section_5_2_desc', getContent(), {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('voteToTransferOrSellUnits', newType);
  };

  const handleModalOpen = () => {
    setEditedContent(getContent());
    setIsModalOpen(true);
  };

  const saveContent = () => {
    setContents(prevContents => ({
      ...prevContents,
      [transferOwnership === 'No' ? 'No' : votingType === 'Majority' ? 'YesMajority' : 'YesUnanimous']: editedContent
    }));
    setValue('pdfSections.membershipChanges.section_5_2_desc', editedContent, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setIsModalOpen(false);
  };

  const resetContent = () => {
    const defaultContents = {
      No: `A Member may not sell, transfer, assign, encumber, pledge, convey, or otherwise dispose of part or all of Member's membership interest.`,
      YesMajority: `A Member may voluntarily sell, transfer, assign, encumber, pledge, convey, or otherwise dispose of part or all of Member's membership interest, but only upon a <span class="text-[#F7931E] font-semibold">Majority</span> vote allowing the transfer and admitting the new Member in accordance with this Operating Agreement, if the new Member does not already hold LLC Units in the Company.`,
      YesUnanimous: `A Member may voluntarily sell, transfer, assign, encumber, pledge, convey, or otherwise dispose of part or all of Member's membership interest, but only upon a <span class="text-[#F7931E] font-semibold">Unanimous</span> vote allowing the transfer and admitting the new Member in accordance with this Operating Agreement, if the new Member does not already hold LLC Units in the Company.`
    };

    setContents(defaultContents);
    localStorage.removeItem('pdfSections.membershipChanges.section_5_2_desc_no');
    localStorage.removeItem('pdfSections.membershipChanges.section_5_2_desc_yes_majority');
    localStorage.removeItem('pdfSections.membershipChanges.section_5_2_desc_yes_unanimous');
    setEditedContent(getContent());
  };

  useEffect(() => {
    setEditedContent(getContent());
  }, [transferOwnership, votingType, contents]);

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
                Determine if LLC members should have the ability to transfer or sell their ownership stakes.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-lg sm:text-xl md:text-2xl text-neutral-950 font-semibold">
                  Allow ownership transfer
                </span>
                <div className="flex items-center justify-center sm:justify-end mt-2 sm:mt-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={transferOwnership === 'Yes'}
                      onChange={(e) => {
                        const value = e.target.checked ? 'Yes' : 'No';
                        setTransferOwnership(value);
                        setValue('transferOrSellOwnership', value);
                      }}
                    />
                    <div className="w-20 h-10 sm:w-24 sm:h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 sm:after:h-11 sm:after:w-11 after:transition-all peer-checked:bg-[#F7931E]"></div>
                    <span className="ml-3 text-base sm:text-lg font-medium text-neutral-950">
                      {transferOwnership === 'Yes' ? 'Yes' : 'No'}
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
          {transferOwnership === 'Yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border-l-4 border-[#F7931E]"
            >
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-950 font-semibold text-center">
                  How should the LLC vote to transfer or sell LLC units?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-8 w-full">
                  <button
                    type="button"
                    className={`w-full sm:w-48 md:w-56 px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold transition-all duration-200 ${
                      votingType === 'Majority'
                        ? 'bg-[#F7931E] text-white shadow-lg hover:bg-orange-600 ring-4 ring-orange-300'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => handleVotingTypeChange('Majority')}
                  >
                    Majority
                  </button>
                  <button
                    type="button"
                    className={`w-full sm:w-48 md:w-56 px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold transition-all duration-200 ${
                      votingType === 'Unanimous'
                        ? 'bg-[#F7931E] text-white shadow-lg hover:bg-orange-600 ring-4 ring-orange-300'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => handleVotingTypeChange('Unanimous')}
                  >
                    Unanimous
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
            <Dialog.Title className="text-lg font-medium text-neutral-950">Transfer of LLC Units</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-700">
              Often, the original owners of an LLC know and trust each other. There may come a time, however, that one or more of the owners wishes to sell some or all of their LLC Units to an outside party.
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
              SECTION 5.2 - TRANSFER OF LLC UNITS
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

export default TransferOwnership;
