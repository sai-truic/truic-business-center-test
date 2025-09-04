import React, { useState, useEffect } from 'react';
import { Form } from './ui/form';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-quill-new/dist/quill.snow.css';
import useInputState from './useInputState';
import HeaderSectionTitle from './ui/HeaderSectionTitle';
import ProgressBar from './BusinessPlanGenerator/ProgressBar';
import Modal from './BusinessPlanGenerator/Modal';
import Button from './BusinessPlanGenerator/Button';
import SectionContent from './BusinessPlanGenerator/SectionContent';
import { getPlaceholderForCurrentSection } from './BusinessPlanGenerator/utils';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import PDFPreview from './OperatingAgreementTool/PDFPreview';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

const BusinessPlanGenerator = () => {
  const {
    businessPlanGeneratorData,
    setBusinessPlanGeneratorData,
    setBusinessPlanGeneratorFlag,
  } = useInputState();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // Add this line

  const handleInfoClick = (info, title) => {
    setModalContent(info);
    setModalTitle(title || 'Information');
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentSection === 8 && isAgreedToTerms) {
      setIsLoading(true);
      setError(null);
      try {
        // Simulating an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setBusinessPlanGeneratorData((prevData) => ({
          ...prevData,
          __submit: 'True',
        }));
        console.log('Form submitted');
        // Generate PDF
        const response = await fetch('/api/generate-bp-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(businessPlanGeneratorData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url); // Set the PDF URL here
      } catch (err) {
        setError(
          'An error occurred while submitting the form. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const nextSection = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (currentSection < 8) {
      setPdfUrl(null); // Reset PDF URL when navigating away from section 8
      setIsAgreedToTerms(false); // Disable the checkbox when navigating away
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (currentSection === 8) {
      setPdfUrl(null); // Reset PDF URL when navigating away from section 8
      setIsAgreedToTerms(false); // Disable the checkbox when navigating away
    }
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  useEffect(() => {
    if (currentSection !== 8) {
      setPdfUrl(null); // Ensure PDF URL is reset when not in section 8
      setIsAgreedToTerms(false); // Reset the checkbox when not in section 8
    }
  }, [currentSection]);

  useEffect(() => {
    setCurrentPlaceholder(getPlaceholderForCurrentSection(currentSection));
  }, [currentSection]);

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Welcome section */}
      <div className="p-9 mb-8 text-black bg-gradient-to-r from-[#F59E0B] to-[#F27227] shadow-lg rounded-xl">
        <div className='flex flex-row align-middle mb-3'>
          <BriefcaseIcon className="inline me-3 text-white" width="40" height="40"></BriefcaseIcon>
          <h1 className="flex flex-row align-middle text-2xl md:text-3xl text-white">
            Business Plan Generator
          </h1>
        </div>
        <p className="text-xl font-semibold">
          Create a business plan that meets your needs.
        </p>
        <p className='text-lg'>
          We’ll walk you through the essential components, from the executive summary to financial projections, providing you with templates, examples, and insights to create a compelling business plan that impresses stakeholders and guides your business to success.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <Form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="transition-all duration-300"
          >
            <ProgressBar
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />

            <SectionContent
              currentSection={currentSection}
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
              setModalContent={setModalContent}
              setModalTitle={setModalTitle}
              setModalOpen={setModalOpen}
              previousSection={previousSection}
              nextSection={nextSection}
            />

            {currentSection === 0 ? (
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="col-start-4">
                    <Button
                      btn_type="button"
                      onClick={nextSection}
                      className="w-full flex items-center justify-center bg-[#C6500C] hover:bg-[#C6500C] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-base"
                    >
                      Next
                      <ChevronRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {currentSection > 0 && currentSection < 7 && (
                    <Button
                      btn_type="button"
                      onClick={previousSection}
                      className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-base order-1 md:order-1"
                    >
                      <ChevronLeft className="mr-2" size={20} />
                      Back
                    </Button>
                  )}
                  {currentSection > 0 && currentSection < 7 && (
                    <>
                      <Button
                        btn_type="button"
                        onClick={async () => {
                          console.log('Saving...');
                          await setBusinessPlanGeneratorData(prevData => ({
                            ...prevData,
                            __submit: "True"
                          }));
                        }}
                        className="flex items-center justify-center bg-[#C6500C] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-base order-3 md:order-2"
                      >
                        Save
                      </Button>
                      <Button
                        btn_type="button"
                        onClick={async () => {
                          console.log('Saving...');
                          // Set submit flag to trigger save
                          await setBusinessPlanGeneratorData(prevData => ({
                            ...prevData,
                            __submit: "True"
                          }));
                          // Wait briefly for save to complete
                          setTimeout(() => {
                            nextSection();
                          }, 500);
                        }}
                        className="flex items-center justify-center bg-[#F7931E] hover:bg-[#C6500C] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-base order-4 md:order-3"
                      >
                        Save & Continue
                      </Button>
                    </>
                  )}
                  {currentSection < 7 && (
                    <Button
                      btn_type="button"
                      onClick={nextSection}
                      className="flex items-center justify-center bg-[#F7931E] hover:bg-[#C6500C] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-base order-2 md:order-4"
                    >
                      Next
                      <ChevronRight className="ml-2" size={20} />
                    </Button>
                  )}
                </div>
              </div>
            )}
            {currentSection === 8 && (
              <>
                <div className="mt-4 flex justify-center">
                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={isAgreedToTerms}
                      onChange={(e) => setIsAgreedToTerms(e.target.checked)}
                      className="form-checkbox h-4 w-4 text-[#F7931E] transition-all duration-200 ease-in-out rounded border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200"
                    />
                    <span>
                      I agree to the{" "}
                      <a 
                        href="/terms-of-use" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#F7931E] hover:text-orange-600 underline"
                      >
                        terms and conditions
                      </a>
                    </span>
                  </label>
                </div>
                <div className="mt-4 flex justify-center">
                  <motion.button
                    whileHover={{ scale: isAgreedToTerms ? 1.05 : 1 }}
                    whileTap={{ scale: isAgreedToTerms ? 0.95 : 1 }}
                    type="submit"
                    className={`px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold text-white rounded-full shadow-lg 
                        focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300
                        ${
                          isAgreedToTerms
                            ? 'bg-[#C6500C] cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    disabled={isLoading || !isAgreedToTerms}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Generating Business Plan...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FileText className="mr-2" />
                        Generate Business Plan
                      </span>
                    )}
                  </motion.button>
                </div>
                {pdfUrl && isAgreedToTerms && <PDFPreview pdfUrl={pdfUrl} />}
              </>
            )}
          </motion.div>
        </Form>
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-5 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md text-center text-sm sm:text-base md:text-lg"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        content={modalContent}
      />
    </div>
  );
};

export default BusinessPlanGenerator;
