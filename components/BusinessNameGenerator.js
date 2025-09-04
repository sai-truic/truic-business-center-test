import React from "react";
import { motion } from "framer-motion";
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import BNG from './BNG/BNG';

export const BusinessNameGenerator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white p-2 sm:p-4 md:p-6 lg:p-8" 
      data-testid="business-name-generator"
    >
      {/* Welcome section */}
      <div className="p-9 mb-8 text-black bg-gradient-to-r from-[#F59E0B] to-[#F27227] shadow-lg rounded-xl">
        <div className='flex flex-row align-middle mb-3'>
          <BuildingStorefrontIcon className="inline me-3 text-white" width="40" height="40"></BuildingStorefrontIcon>
          <h1 className="flex flex-row align-middle text-2xl md:text-3xl text-white">
            Business Name Generator
          </h1>
        </div>
        <p className="text-xl font-semibold">
          Generate unique and memorable names for your business.
        </p>
        <p className='text-lg'>
          Your business needs a name, and you need inspiration. TRUiC's AI-powered Business Name Generator will help you instantly brainstorm hundreds of unique business name ideas.
        </p>
      </div>

      {/* Main Content Area - Use BNGStateProvider to wrap BNG component */}
      <div className="main-content-panel-styling">
        <div className="absolute inset-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-center text-gray-600 text-lg leading-relaxed font-medium mb-8">
              Enter keywords related to your business and select your state to generate
              available business names with domain availability.
            </p>
            
            {/* Replace the iframe with the actual BNG component */}
            <BNG />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BusinessNameGenerator;