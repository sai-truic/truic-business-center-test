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

const TaxLiabilityPayments: React.FC<Props> = ({ register, setValue, fetchedData }) => {
  const [taxLiabilityPayment, setTaxLiabilityPayments] = useState<string>(fetchedData?.taxLiabilityPayment || 'No');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quillRef = useRef<typeof ReactQuill>(null);

  const [contents, setContents] = useState({
    Yes: `The Members, by resolution issued pursuant to this Operating Agreement, may make distributions to the Members from time to time in 
the total amount and in the proportions determined by vote pursuant to Section 2.2. Unless otherwise approved pursuant to Section 2.2, such 
distributions shall be allocated among the Members in proportion to each Member's LLC Unit Percentage. <span class='text-[#F7931E] 
font-semibold'>At a minimum, the Company shall distribute sufficient cash to the Members for the Members to timely pay when due (whether in 
estimated tax payments or with a tax return) all federal, state, and local income taxes resulting from the income of the Company being taxed 
to the Members.</span> No distribution shall be declared or made if, after making the distribution, the Company would not be able to pay its 
debts as they become due or the Company's total assets would be less than the sum of its total liabilities.`,
    No: `The Members, by resolution issued pursuant to this Operating Agreement, may make distributions to the Members from time to time in 
the total amount and in the proportions determined by vote pursuant to Section 2.2. Unless otherwise approved pursuant to Section 2.2, such 
distributions shall be allocated among the Members in proportion to each Member's LLC Unit Percentage. No distribution shall be declared or 
made if, after making the distribution, the Company would not be able to pay its debts as they become due or the Company's total assets would 
be less than the sum of its total liabilities.`
  });

  const getContent = () => {
    return taxLiabilityPayment === 'Yes' ? contents.Yes : contents.No;
  };

  const [editedContent, setEditedContent] = useState<string>(getContent());

  useEffect(() => {
    setValue('taxLiabilityPayment', taxLiabilityPayment);
    if (fetchedData?.pdfSections?.distributions?.section_4_2_desc) {
      const fetchedContent = fetchedData.pdfSections.distributions.section_4_2_desc;
      setContents(prevContents => ({
        ...prevContents,
        [taxLiabilityPayment]: fetchedContent
      }));
    }
    setEditedContent(getContent());
  }, [setValue, fetchedData, taxLiabilityPayment]);

  useEffect(() => {
    setEditedContent(getContent());
    setValue('pdfSections.distributions.section_4_2_desc', getContent(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [taxLiabilityPayment]);

  const handleModalOpen = () => {
    setEditedContent(getContent());
    setIsModalOpen(true);
  };

  const saveContent = () => {
    setContents(prevContents => ({
      ...prevContents,
      [taxLiabilityPayment]: editedContent
    }));
    setValue('pdfSections.distributions.section_4_2_desc', editedContent, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setIsModalOpen(false);
  };

  const resetContent = () => {
    const defaultContents = {
      Yes: `The Members, by resolution issued pursuant to this Operating Agreement, may make distributions to the Members from time to time in 
the total amount and in the proportions determined by vote pursuant to Section 2.2. Unless otherwise approved pursuant to Section 2.2, such 
distributions shall be allocated among the Members in proportion to each Member's LLC Unit Percentage. <span class='text-[#F7931E] 
font-semibold'>At a minimum, the Company shall distribute sufficient cash to the Members for the Members to timely pay when due (whether in 
estimated tax payments or with a tax return) all federal, state, and local income taxes resulting from the income of the Company being taxed 
to the Members.</span> No distribution shall be declared or made if, after making the distribution, the Company would not be able to pay its 
debts as they become due or the Company's total assets would be less than the sum of its total liabilities.`,
      No: `The Members, by resolution issued pursuant to this Operating Agreement, may make distributions to the Members from time to time in 
the total amount and in the proportions determined by vote pursuant to Section 2.2. Unless otherwise approved pursuant to Section 2.2, such 
distributions shall be allocated among the Members in proportion to each Member's LLC Unit Percentage. No distribution shall be declared or 
made if, after making the distribution, the Company would not be able to pay its debts as they become due or the Company's total assets would 
be less than the sum of its total liabilities.`
    };

    setContents(defaultContents);
    localStorage.removeItem('pdfSections.distributions.section_4_2_desc_yes');
    localStorage.removeItem('pdfSections.distributions.section_4_2_desc_no');
    setEditedContent(getContent());
  };

  const handleContentChange = (value: string) => {
    setEditedContent(value);
  };

  useEffect(() => {
    setEditedContent(getContent());
  }, [taxLiabilityPayment, contents]);

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
                Decide if the LLC should make payments to cover members' tax liabilities.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-lg sm:text-xl md:text-2xl text-neutral-950 font-semibold">
                  Cover Tax Liabilities
                </span>
                <div className="flex items-center justify-center sm:justify-end mt-2 sm:mt-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={taxLiabilityPayment === 'Yes'}
                      onChange={(e) => {
                        const value = e.target.checked ? 'Yes' : 'No';
                        setTaxLiabilityPayments(value);
                        setValue('taxLiabilityPayment', value);
                      }}
                    />
                    <div className="w-20 h-10 sm:w-24 sm:h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 sm:after:h-11 sm:after:w-11 after:transition-all peer-checked:bg-[#F7931E]"></div>
                    <span className="ml-3 text-base sm:text-lg font-medium text-neutral-950">
                      {taxLiabilityPayment === 'Yes' ? 'Yes' : 'No'}
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
      </motion.div>

      <Dialog open={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-medium text-neutral-950">Tax Liability Payments</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-700">
              Since an LLC is a <a href="https://howtostartanllc.com/what-is-an-llc#advantages-of-an-llc" target="_blank" rel="noopener
noreferrer" className="text-[#F7931E] hover:text-orange-600">pass-through entity</a>, LLC members are responsible for
paying taxes on the profits of the LLC. LLC members may wish to require that distributions cover any tax liabilities for which they are
responsible.
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
              SECTION 4.2 - DISTRIBUTIONS
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

export default TaxLiabilityPayments;
