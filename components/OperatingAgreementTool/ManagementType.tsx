import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PencilSquareIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion } from './../ui/accordion';

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  fetchedData: any;
}

type ContentSections = {
  [key: string]: {
    MemberManaged: string;
    ManagerManaged: string;
  };
};

interface SectionContent {
  MemberManaged: string;
  ManagerManaged: string;
}

type ManagementTypeKey = 'MemberManaged' | 'ManagerManaged';

const ManagementType: React.FC<Props> = ({ register, setValue, fetchedData }) => {
  const [managementType, setManagementType] = useState<ManagementTypeKey>(
    (fetchedData?.multiMemberManagementDetails?.managementStyle as ManagementTypeKey) || 'MemberManaged'
  );
  const [appointedManagerName, setAppointedManagerName] = useState<string>(fetchedData?.multiMemberManagementDetails?.appointedManagerName || '');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [contents, setContents] = useState<Record<string, SectionContent>>({
    section_1_1: {
      MemberManaged: "The Company has been organized as a limited liability company managed by its members. The Company shall commence on the date of filing of the Articles of Organization and shall exist until the Company dissolves and its affairs are wound up in accordance with this Operating Agreement or applicable law.",
      ManagerManaged: "The Company has been organized as a Limited Liability Company managed by a Manager. The Company shall commence on the date of filing of the Articles of Organization and shall exist until the Company dissolves and its affairs are wound up in accordance with this Operating Agreement or applicable law."
    },
    section_2_1: {
      MemberManaged: `The Company shall be managed solely by <span class="text-[#F7931E] font-semibold">the Members</span>, who may be known as and hold any title(s) approved by a majority Vote in interest of LLC Units.`,
      ManagerManaged: `The Company shall be managed by a <span class="text-[#F7931E] font-semibold">Manager</span>, who may be known as and hold any title(s) approved by a majority Vote in interest of LLC Units. The initial appointed Manager is set forth below:<br /><br /><div style="text-align: center;"><span class="text-[#F7931E] font-semibold">${appointedManagerName}</span></div>`
    },
    section_2_3: {
      MemberManaged: "The Members agree with the Company and each other that no Member, acting individually, shall have the power or authority to act on behalf of or bind the LLC, to authorize any action to be taken by the LLC, to act as agent for the LLC, or to incur any liability or expense on behalf of the LLC, unless the power or authority has been delegated to the Member by a written resolution duly adopted by the Members in accordance with the provisions of this article and then only to the extent expressly provided for in the resolution. The Members may adopt resolutions appointing one or more Members sign on behalf of the Company to acquire, encumber, or convey real or personal property from any source and through any means; engage in any financial transactions on behalf of the Company, including opening, maintaining, or closing accounts, borrowing money, or the like; entering into contracts on behalf of the Company; commence, prosecute, or defend any legal proceedings in the Company's name; and carry on any other business or affairs of the Company not specifically provided herein, that is not in contravention of applicable law.",
      ManagerManaged: "Any and all decisions concerning the affairs of the Company shall, except as set forth in this Operating Agreement or applicable law, be made by the Manager alone. The Members may, by Vote in interest of LLC Units, remove the Manager at any time, for any reason or no reason whatsoever, with or without prior notice. The Manager may resign at any time with prior written notice to the Members. If the Manager is removed, resigns, or is unwilling or unable to continue serving as the Manager, the Members shall appoint a successor Manager by Vote in interest of LLC Units."
    }
  });

  const [editedContents, setEditedContents] = useState({
    section_1_1: '',
    section_2_1: '',
    section_2_3: ''
  });

  useEffect(() => {
    setValue('multiMemberManagementDetails.managementStyle', managementType);
    setValue('multiMemberManagementDetails.appointedManagerName', appointedManagerName);
    if (fetchedData?.pdfSections?.managementAndVoting) {
      const fetchedSections = fetchedData.pdfSections.managementAndVoting;
      setContents(prevContents => ({
        section_1_1: {
          ...prevContents.section_1_1,
          [managementType]: fetchedSections.section_1_1_desc || prevContents.section_1_1[managementType]
        },
        section_2_1: {
          ...prevContents.section_2_1,
          [managementType]: fetchedSections.section_2_1_desc || prevContents.section_2_1[managementType]
        },
        section_2_3: {
          ...prevContents.section_2_3,
          [managementType]: fetchedSections.section_2_3_desc || prevContents.section_2_3[managementType]
        }
      }));
    }
    updateEditedContents();
  }, [setValue, fetchedData]);

  const updateEditedContents = () => {
    setEditedContents({
      section_1_1: contents.section_1_1[managementType],
      section_2_1: contents.section_2_1[managementType],
      section_2_3: contents.section_2_3[managementType]
    });
  };

  useEffect(() => {
    updateEditedContents();
    setValue('pdfSections.managementAndVoting.section_1_1_desc', contents.section_1_1[managementType]);
    setValue('pdfSections.managementAndVoting.section_2_1_desc', contents.section_2_1[managementType]);
    setValue('pdfSections.managementAndVoting.section_2_3_desc', contents.section_2_3[managementType]);
  }, [managementType, contents, setValue]);

  const handleModalOpen = () => {
    updateEditedContents();
    setIsModalOpen(true);
  };

  const saveContent = () => {
    setContents(prevContents => ({
      section_1_1: {
        ...prevContents.section_1_1,
        [managementType]: editedContents.section_1_1
      },
      section_2_1: {
        ...prevContents.section_2_1,
        [managementType]: editedContents.section_2_1
      },
      section_2_3: {
        ...prevContents.section_2_3,
        [managementType]: editedContents.section_2_3
      }
    }));
    setValue('pdfSections.managementAndVoting.section_1_1_desc', editedContents.section_1_1);
    setValue('pdfSections.managementAndVoting.section_2_1_desc', editedContents.section_2_1);
    setValue('pdfSections.managementAndVoting.section_2_3_desc', editedContents.section_2_3);
    setIsModalOpen(false);
  };

  const resetContent = () => {
    updateEditedContents();
  };

  const handleContentChange = (section: string, value: string) => {
    setEditedContents(prev => ({
      ...prev,
      [section]: value
    }));
  };

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
        className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl p-6 sm:p-8 md:p-10 shadow-xl w-full border border-orange-200"
      >
        <div className="flex flex-col space-y-8 md:space-y-10">
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-neutral-950 font-bold">
                <span className="bg-clip-text text-neutral-950 bg-[#C6500C]">
                  Choose Management Type
                </span>
              </h2>
              <p className="text-neutral-950 text-lg sm:text-xl md:text-2xl font-normal">
                Decide how your LLC will be managed: by its members or by an appointed manager.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-4 shadow-md">
              <span className="text-lg sm:text-xl font-medium text-neutral-950 mb-4 sm:mb-0">
                {managementType === 'ManagerManaged' ? 'Manager-Managed' : 'Member-Managed'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={managementType === 'ManagerManaged'}
                  onChange={(e) => {
                    const value = e.target.checked ? 'ManagerManaged' : 'MemberManaged';
                    setManagementType(value as ManagementTypeKey);
                    setValue('multiMemberManagementDetails.managementStyle', value);
                  }}
                />
                <div className="w-24 h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-11 after:w-11 after:transition-all peer-checked:bg-[#F7931E]"></div>
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              type="button"
              className="flex items-center justify-center px-6 py-3 text-lg font-medium text-[#F7931E] bg-orange-100 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => setIsInfoModalOpen(true)}
            >
              <InformationCircleIcon className="w-6 h-6 mr-2" />
              Learn More
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-[#F7931E] rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={handleModalOpen}
            >
              <PencilSquareIcon className="w-6 h-6 mr-2" />
              Edit Details
            </button>
          </div>
        </div>

        <AnimatePresence>
          {managementType === 'ManagerManaged' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-white rounded-lg shadow-xl p-6 sm:p-8 border-l-4 border-[#F7931E]"
            >
              <div className="flex flex-col items-start space-y-6">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F7931E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 00-7-7z" />
                  </svg>
                  <h3 className="text-xl sm:text-2xl text-neutral-950 font-bold">
                    Who is the appointed manager?
                  </h3>
                </div>
                <div className="w-full space-y-2">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-lg border-2 border-orange-300 rounded-lg focus:outline-none focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 transition-all duration-200 shadow-sm"
                    placeholder='Full Name of Appointed Manager'
                    value={appointedManagerName}
                    onChange={(e) => {
                      setAppointedManagerName(e.target.value);
                      setValue('multiMemberManagementDetails.appointedManagerName', e.target.value);
                    }}
                  />
                  <p className="text-sm text-neutral-950 italic">Enter the full name of the person who will manage the LLC</p>
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
            <Dialog.Title className="text-lg font-medium text-neutral-950">LLC Management</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-700">
              LLCs may be managed directly by their members or by an appointed manager. Member-managed LLCs involve all members in day-to-day
              operations, while manager-managed LLCs delegate these responsibilities to a specific individual or group.
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
          <Dialog.Panel className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl flex flex-col max-h-[90vh]">
            <Dialog.Title className="text-center text-lg font-medium text-neutral-950 px-6 py-4 border-b border-orange-200">
              Edit Management and Voting Sections
            </Dialog.Title>
            <div className="px-6 py-4 flex-grow overflow-y-auto space-y-4">
              <Accordion type="single" collapsible>
                {Object.entries(editedContents).map(([section, content]) => (
                  <Accordion.Item value={section} key={section} className="border border-orange-200 rounded-lg overflow-hidden">
                    <Accordion.Trigger className="w-full">
                      {({ isOpen }) => (
                        <div className="flex justify-between items-center p-4 bg-orange-50 hover:bg-orange-100 transition-colors duration-200">
                          <span className="font-medium text-neutral-950">
                            {section === 'section_1_1' && 'SECTION 1.1 - COMPANY FORMATION AND DURATION'}
                            {section === 'section_2_1' && 'SECTION 2.1 - MANAGEMENT TYPE'}
                            {section === 'section_2_3' && 'SECTION 2.3 - MANAGER AUTHORITY'}
                          </span>
                          <span className="text-[#F7931E] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            ▼
                          </span>
                        </div>
                      )}
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div className="p-4 bg-white">
                        <ReactQuill
                          value={content}
                          onChange={(value) => handleContentChange(section, value)}
                          theme="snow"
                          modules={modules}
                          formats={formats}
                        />
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            <div className="flex justify-end space-x-2 bg-orange-50 px-4 py-3 rounded-b-lg">
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

export default ManagementType;
