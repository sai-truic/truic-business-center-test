import React from 'react';
import { Settings2, Image, Frame, Type } from 'lucide-react';
import { InputLayer } from './InputLayer';
import { motion } from 'framer-motion';
import useInputState from './../../useInputState';

export const ContextForm = ({ handleInputChange, inputValues }) => {
  const { qrMenuSelected, setShouldGenerate } = useInputState();
  const handleGenerate = () => {
    setShouldGenerate(true);
    handleInputChange('generateQR', true)
  }
  // Only show the form if a QR code type is selected
  if (!qrMenuSelected) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">
          Please select a QR code type from above to begin
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Content Input Section */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-sm">
            <Type className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              {qrMenuSelected}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter the content for your {qrMenuSelected.toLowerCase()} QR code
            </p>
          </div>
        </div>
        {/* Input Layer */}
        <div className="bg-white rounded-xl border-2 border-indigo-100 shadow-sm hover:border-indigo-200 transition-all duration-200 p-6">
          <InputLayer handleInputChange={handleInputChange} inputValues={inputValues} />
        </div>
      </div>
      
      
      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handleGenerate}
        className="w-full py-4 bg-[#C6500C] text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-lg"
      >
        Generate QR Code
      </motion.button>
    </div>
  );
};

export default ContextForm;
