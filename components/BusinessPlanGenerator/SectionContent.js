// SectionContent.js

import React from 'react';
import { Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

import IntroductoryText from './IntroductoryText';
import CoverPage from './CoverPage.js';
import ExecutiveSummary from './ExecutiveSummary.js';
import CompanyDescription from './CompanyDescription.js';
import MarketResearch from './MarketResearch.js';
import ProductLine from './ProductLine.js';
import MarketingAndSales from './MarketingAndSales.js';
import FinancialProjections from './FinancialProjections';
import FinalPoints from './FinalPoints';

const SectionContent = ({
  currentSection,
  businessPlanGeneratorData,
  setBusinessPlanGeneratorData,
  handleInfoClick,
  setModalContent,
  setModalTitle,
  setModalOpen,
  previousSection,
  nextSection,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentSection === 0 && (
          <Transition
            as="div"
            show={currentSection === 0}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>
              <IntroductoryText />
            </div>
          </Transition>
        )}

        {currentSection === 1 && (
          <Transition
            as="div"
            show={currentSection === 1}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <CoverPage
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
            />
          </Transition>
        )}

        {currentSection === 2 && (
          <Transition
            as="div"
            show={currentSection === 2}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ExecutiveSummary
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
            />
          </Transition>
        )}

        {currentSection === 3 && (
          <Transition
            as="div"
            show={currentSection === 3}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <CompanyDescription
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
            />
          </Transition>
        )}

        {currentSection === 4 && (
          <Transition
            as="div"
            show={currentSection === 4}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MarketResearch
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
            />
          </Transition>
        )}

        {currentSection === 5 && (
          <Transition
            as="div"
            show={currentSection === 5}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ProductLine
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
            />
          </Transition>
        )}

        {currentSection === 6 && (
          <Transition
            as="div"
            show={currentSection === 6}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MarketingAndSales
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
            />
          </Transition>
        )}

        {currentSection === 7 && (
          <Transition
            as="div"
            show={currentSection === 7}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <FinancialProjections
              handleInfoClick={handleInfoClick}
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              setModalContent={setModalContent}
              setModalTitle={setModalTitle}
              setModalOpen={setModalOpen}
              previousSection={previousSection}
              nextSection={nextSection}
            />
          </Transition>
        )}

        {currentSection === 8 && (
          <Transition
            as="div"
            show={currentSection === 8}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <FinalPoints
              businessPlanGeneratorData={businessPlanGeneratorData}
              setBusinessPlanGeneratorData={setBusinessPlanGeneratorData}
              handleInfoClick={handleInfoClick}
              previousSection={previousSection}
            />
          </Transition>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionContent;
