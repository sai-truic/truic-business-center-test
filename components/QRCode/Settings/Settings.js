import React, { useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Settings2, Upload, X, Palette, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQRSettings } from '../Context/QRSettingsContext';

export const Settings = ({ handleInputChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const { state, dispatch } = useQRSettings()

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    setError('');
    const reader = new FileReader();
    
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0);
        
        const transparentDataUrl = canvas.toDataURL('image/png');
        setPreviewUrl(transparentDataUrl);
        if (typeof handleInputChange === 'function') {
          handleInputChange('LogoURL', transparentDataUrl);
          handleInputChange('ValueText', transparentDataUrl);
        }
      };
      img.src = reader.result;
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setError('Failed to process image file');
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setPreviewUrl(null);
    if (typeof handleInputChange === 'function') {
      handleInputChange('LogoURL', '');
    }
  };

  const handleColorChange = (name, value) => {
    if (typeof handleInputChange === 'function') {
      handleInputChange(name, value);
      if (name === 'BgColor' || name === 'FgColor') {
        handleInputChange('updateColors', true);
      }
    }
  };

  const handleChange = (type, value) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  return (
    <div className="relative">
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-orange-50 to-orange-100/50 px-6 py-5 text-left hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Settings2 className="w-6 h-6 text-[#F7931E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-950">Settings</h3>
                  <p className="text-sm text-gray-600 mt-1">Customize QR code appearance</p>
                </div>
              </div>
              <ChevronDownIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-6 w-6 text-[#F7931E] transition-transform duration-300`}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div
                className={`
                  transition-all duration-300 ease-in-out
                  ${open ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}
                  overflow-hidden
                `}
              >
                <Disclosure.Panel static className="bg-white rounded-b-xl shadow-lg -mx-4 px-6">
                  <div className="py-8 space-y-10 overflow-y-auto scrollbar-hide">
                    {/* Logo Upload Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 rounded-xl shadow-xl border-2 border-orange-200 hover:border-[#F7931E] transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-white rounded-lg shadow-md">
                            <Upload className="w-6 h-6 text-[#F7931E]" />
                          </div>
                          <label className="text-lg font-bold text-neutral-950">
                            Upload Logo
                          </label>
                        </div>
                        {previewUrl && (
                          <button
                            onClick={removeLogo}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                            Remove
                          </button>
                        )}
                      </div>
                      
                      {previewUrl ? (
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <img
                            src={previewUrl}
                            alt="Logo preview"
                            className="w-full h-full object-contain rounded-xl border-2 border-orange-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center group">
                          <label className="relative cursor-pointer bg-white rounded-xl border-2 border-dashed border-orange-200 p-10 
                            hover:border-[#F7931E] hover:bg-orange-50/30 
                            transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                            focus-within:ring-4 focus-within:ring-orange-500 focus-within:ring-offset-2">
                            <div className="space-y-2 text-center">
                              <Upload className="mx-auto h-10 w-10 text-[#F7931E]" />
                              <div className="text-sm text-gray-600">
                                <span className="font-medium text-[#F7931E] hover:text-orange-600">
                                  Click to upload
                                </span>
                                {' '}or drag and drop
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 2MB
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileUpload}
                            />
                          </label>
                        </div>
                      )}
                      
                      {error && (
                        <p className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
                      )}
                    </motion.div>

                    {/* Colors Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 rounded-xl shadow-xl border-2 border-orange-200 hover:border-[#F7931E] transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-white rounded-lg shadow-md">
                          <Palette className="w-6 h-6 text-[#F7931E]" />
                        </div>
                        <h3 className="text-lg font-bold text-neutral-950">Colors</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="block text-sm font-bold text-neutral-950">
                            Background
                          </label>
                          <div className="relative group">
                            <input
                              type="color"
                              name="BgColor"
                              value={state.color.background}
                              onChange={(e) => {
                                handleChange('UPDATE_BACKGROUND_COLOR', e.target.value);
                                handleColorChange(e.target.name, e.target.value)
                              }}
                              className="h-14 w-full rounded-xl border-2 border-orange-200 shadow-lg 
                                transition-all duration-300 
                                hover:border-orange-300 focus:border-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/50 to-transparent pointer-events-none" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="block text-sm font-bold text-neutral-950">
                            Foreground
                          </label>
                          <div className="relative group">
                            <input
                              type="color"
                              name="FgColor"
                              value={state.color.foreground}
                              onChange={(e) => {
                                handleChange('UPDATE_FOREGROUND_COLOR', e.target.value);
                                handleColorChange(e.target.name, e.target.value)
                              }}
                              className="h-14 w-full rounded-xl border-2 border-orange-200 shadow-lg 
                                transition-all duration-300 
                                hover:border-orange-300 focus:border-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/50 to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Frame Text Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 rounded-xl shadow-xl border-2 border-orange-200 hover:border-[#F7931E] transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-white rounded-lg shadow-md">
                          <ImageIcon className="w-6 h-6 text-[#F7931E]" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Frame Text</h3>
                        </div>
                        <div className="mb-4">
                          <div className='flex items-center'>
                            <label htmlFor="showFrame" className="block text-base font-medium text-gray-700 me-4">
                              Show Frame
                            </label>
                            <input
                              type="checkbox"
                              id="ShowFrame"
                              name="ShowFrame"
                              checked={state.frame.showFrame}
                              onChange={(e) => handleChange('UPDATE_SHOW_FRAME', e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <p className="mt-1 mb-4 text-sm text-gray-500">
                            Show or hide the Frame around the QRCode image when downloaded
                          </p>
                          
                        <div className="flex items-center">
                          <label htmlFor="showLabel" className="block text-base font-medium text-gray-700 me-4">
                            Show Label
                          </label>
                          <input
                            type="checkbox"
                            id="ShowLabel"
                            name="ShowLabel"
                            checked={state.frame.showLabel}
                            onChange={(e) => handleChange('UPDATE_SHOW_FRAME_TEXT', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Show or hide the "Scan Me" label below QR code
                        </p>
                      </div>
                      <div className="relative group">
                        <label htmlFor="FrameText" className="block text-base font-medium text-gray-700">
                          Label Text
                        </label>
                        <input
                          type="text"
                          name="FrameText"
                          placeholder="Scan Me"
                          value={state.label.text}
                          onChange={(e) => handleChange('UPDATE_LABEL', e.target.value)}
                          className="w-full px-5 py-4 text-lg text-neutral-950 placeholder-gray-400 bg-white 
                            border-2 border-orange-200 rounded-xl 
                            focus:border-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2
                            transition-all duration-300
                            hover:border-orange-300 hover:shadow-lg"
                        />
                      </div>
                    </motion.div>
                  </div>
                </Disclosure.Panel>
              </div>
            </Transition>
          </div>
        )}
      </Disclosure>
      
      {/* Add subtle scroll shadows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent opacity-0 transition-opacity duration-200 group-scroll-top:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white to-transparent opacity-0 transition-opacity duration-200 group-scroll-bottom:opacity-100" />
    </div>
  );
};

export default Settings;
