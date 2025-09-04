'use client';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useDataStore } from '../../hooks/useDataStore';
import { FaFileAlt } from 'react-icons/fa';
import { useSafeUser } from '../useSafeUser';
import CompanyDetails from './CompanyDetails';
import MemberTypeSelection from './MemberTypeSelection';
import SingleMemberSection from './SingleMemberSection';
import MultiMemberSection from './MultiMemberSection';
import PDFPreview from './PDFPreview';
import useOperatingAgreement from './useOperatingAgreement';
import { NewspaperIcon } from '@heroicons/react/24/outline';

// Removed CosmosData interface - cosmos operations now handled in useOperatingAgreement hook

const OperatingAgreement: React.FC = () => {
  const { handleSubmit, register, setValue, watch, control } = useForm();
  const { user }: any = useSafeUser();
  const cosmosStore = useDataStore('cosmosdb', { userId: user?.id });
  const {
    currentMemberType,
    setCurrentMemberType,
    pdfUrl,
    isLoading,
    error,
    isAgreedToTerms,
    handleFormSubmit,
    fetchedAgreementData
  } = useOperatingAgreement(setValue, cosmosStore, control);

  // Removed handleCosmosOperations - this is now handled in useOperatingAgreement hook

  const isSmallMobile = useMediaQuery({ maxWidth: 639 });
  const isMobile = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const agreementData = fetchedAgreementData;

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-8" data-testid="operating-agreement">
      {/* Welcome section */}
      <div className="p-9 mb-8 text-black bg-gradient-to-r from-[#F59E0B] to-[#F27227] shadow-lg rounded-xl">
        <div className='flex flex-row align-middle mb-3'>
          <NewspaperIcon className="inline me-3 text-white" width="40" height="40"></NewspaperIcon>
          <h1 className="flex flex-row align-middle text-2xl md:text-3xl text-white">
            Operating Agreement Tool
          </h1>
        </div>
        <p className="text-xl font-semibold">
          Create a Custom Operating Agreement
        </p>
        <p className='text-lg'>
          We offer a customizable operating agreement tool as well as operating agreement templates for single-member LLCs and multi-member LLCs (including member-managed and manager-managed).
        </p>
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <form onSubmit={handleSubmit((data) => {
          console.log("Form data before submission:", data);
          handleFormSubmit(data);
        })} className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
          <CompanyDetails register={register} control={control} setValue={setValue} fetchedData={agreementData} />
          <div className="border-b-2 border-orange-200 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
            <MemberTypeSelection register={register} watch={watch} setValue={setValue} setCurrentMemberType={setCurrentMemberType} />
          </div>
          <AnimatePresence mode="wait">
            {currentMemberType === 'single-member' && (
              <SingleMemberSection register={register} />
            )}
            {currentMemberType === 'multi-member' && (
              <MultiMemberSection register={register} control={control} setValue={setValue} fetchedData={agreementData} />
            )}
          </AnimatePresence>
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-16">
            <motion.button
              whileHover={{ scale: isAgreedToTerms ? 1.05 : 1 }}
              whileTap={{ scale: isAgreedToTerms ? 0.95 : 1 }}
              type="submit"
              className={`px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold text-white rounded-xl shadow-lg 
              focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300
              ${isAgreedToTerms 
                ? 'bg-[#C6500C] cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={isLoading || !isAgreedToTerms}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaFileAlt className="mr-2" />
                  Generate PDF
                </span>
              )}
            </motion.button>
          </div>
        </form>
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-5 bg-orange-100 border-l-4 border-[#F7931E] text-orange-700 rounded-md text-center text-sm sm:text-base md:text-lg"
            >
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        {pdfUrl && <PDFPreview pdfUrl={pdfUrl} />}
      </motion.div>
    </div>
  );
};

export default OperatingAgreement;
