import React, { useState, useEffect } from 'react';
import useInputState from '../useInputState';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, BuildingOfficeIcon, FlagIcon, RocketLaunchIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid';
import StateCombobox from './StateCombobox';
import BusinessStageListbox from './BusinessStageListbox';

const SettingsDialog = ({ isOpen, onClose }) => {
  const { getState, updateState } = useInputState();
  const onboardingData = getState('onboarding', 'data');

  // console.log("Onboarding Data :", onboardingData)

  const [formState, setFormState] = useState({
    formationState: onboardingData?.businessState || null,
    businessStage: onboardingData?.businessStage || null,
    businessName: onboardingData?.businessName || '',
  });

  // console.log('Form State :', formState)

  useEffect(() => {
    setFormState({
      formationState: onboardingData?.businessState || null,
      businessStage: onboardingData?.businessStage || null,
      businessName: onboardingData?.businessName || '',
    });
  }, [onboardingData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateState('onboarding', 'data', formState);
    onClose();
  };

  const handleStateSelect = (state) => {
    setFormState((prev) => ({ ...prev, formationState: state }));
  };

  const handleStageSelect = (stage) => {
    setFormState((prev) => ({ ...prev, businessStage: stage }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto pt-20 sm:pt-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-[102] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 text-left overflow-y-auto shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transform transition-all sm:my-8 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl w-11/12 sm:w-full max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-6rem)] border border-indigo-200"
          >
            <h3 className="text-4xl font-extrabold text-indigo-800 mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">
                Business Settings
              </span>
            </h3>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-indigo-600 hover:text-indigo-800 focus:outline-none transition-colors duration-200"
            >
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
            <form onSubmit={handleSubmit} className="mt-6 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] mb-6 sm:mb-8 transform hover:scale-105 transition-all duration-300 hover:shadow-[0_20px_35px_-5px_rgba(0,0,0,0.2),0_10px_15px_-5px_rgba(0,0,0,0.1)] border border-indigo-100 hover:border-indigo-300"
              >
                <label htmlFor="formationState" className="block text-xl font-bold text-indigo-800 flex items-center mb-4">
                  <FlagIcon className="h-10 w-10 mr-4 text-indigo-600" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">
                    Formation State
                  </span>
                </label>
                <div className="mt-3">
                  {console.log("Formation State :", formState.formationState)}
                  <StateCombobox
                    selectedState={formState.formationState}
                    onStateSelect={handleStateSelect}
                    onOpenChange={() => {}}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] mb-8 transform hover:scale-105 transition-all duration-300 hover:shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              >
                <label htmlFor="businessStage" className="block text-xl font-bold text-indigo-800 flex items-center mb-4">
                  <RocketLaunchIcon className="h-10 w-10 mr-4 text-indigo-600" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">
                    Business Stage
                  </span>
                </label>
                <div className="mt-3">
                  {console.log("Business Stage :", formState.businessStage)}
                  <BusinessStageListbox
                    selectedStage={formState.businessStage}
                    onStageSelect={handleStageSelect}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] mb-8 transform hover:scale-105 transition-all duration-300 hover:shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              >
                <label htmlFor="businessName" className="block text-xl font-bold text-indigo-800 flex items-center mb-4">
                  <BuildingLibraryIcon className="h-10 w-10 mr-4 text-indigo-600" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">
                    Business Name
                  </span>
                </label>
                <div className="relative rounded-md shadow-sm mt-3">
                  <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-400" />
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={formState.businessName}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-3 py-4 bg-white border-2 border-indigo-100 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all duration-200 hover:border-indigo-300 hover:shadow-lg"
                    placeholder="Enter your business name"
                  />
                </div>
              </motion.div>
              <motion.div 
                className="mt-10 flex justify-end space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-base font-medium text-indigo-700 bg-white border-2 border-indigo-500 rounded-full shadow-md hover:bg-indigo-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Save Changes
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsDialog;
