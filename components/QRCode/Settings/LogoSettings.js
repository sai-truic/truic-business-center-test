import React, { useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Upload, X, Image as ImageIcon, Settings2, Maximize, Palette } from 'lucide-react';
import { QRInput } from '../QRForms/QRInput';
import useInputState from '@/components/useInputState';
import { motion, AnimatePresence } from 'framer-motion';

export const LogoSettings = ({ handleInputChange }) => {
  const { setLogoURL } = useInputState();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = React.useState('upload');

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    setError('');
    // Create a new FileReader instance
    const reader = new FileReader();
    
    // Set up the onload handler
    reader.onload = () => {
      // Create a new image to process
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        // Make background transparent
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0);
        
        // Convert to PNG with transparency
        const transparentDataUrl = canvas.toDataURL('image/png');
        setPreviewUrl(transparentDataUrl);
        if (typeof handleInputChange === 'function') {
          // Update both preview and actual logo URL
          handleInputChange('LogoURL', transparentDataUrl);
          handleInputChange('ValueText', transparentDataUrl);
        }
      };
      img.src = reader.result;
    };

    // Handle any errors
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setError('Failed to process image file');
    };

    // Log the data URL and read the file
    reader.onloadend = () => {
      console.log("Logo Data URL:", reader.result);
      setPreviewUrl(reader.result);
      if (typeof handleInputChange === 'function') {
        // Update both preview and actual logo URL
        handleInputChange('LogoURL', reader.result);
        handleInputChange('ValueText', reader.result); // Ensure the value is passed through
      }
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setPreviewUrl(null);
    if (typeof handleInputChange === 'function') {
      handleInputChange('LogoURL', '');
      handleInputChange('LogoWidth', '');
      handleInputChange('LogoHeight', '');
      handleInputChange('CenterLogo', false);
    }
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 py-4 text-left hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ImageIcon className="w-5 h-5 text-[#F7931E]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-950">Logo Settings</h3>
                <p className="text-sm text-gray-600 mt-0.5 font-medium tracking-wide">Customize your QR code logo</p>
              </div>
            </div>
            <ChevronDownIcon className={`${open ? 'rotate-180 transform' : ''} h-6 w-6 text-[#F7931E] transition-transform duration-200`} />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="mt-4 bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-xl shadow-lg border-2 border-orange-200 hover:border-[#F7931E] transition-all duration-300 space-y-6">
                {/* Logo Upload Section */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-neutral-950">
                      Upload Logo
                    </label>
                    {previewUrl && (
                      <button
                        onClick={removeLogo}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                  
                  {previewUrl ? (
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <img
                        src={previewUrl}
                        alt="Logo preview"
                        className="w-full h-full object-contain rounded-xl border-2 border-orange-200 shadow-lg hover:border-[#F7931E] hover:shadow-xl transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <label className="relative cursor-pointer bg-white rounded-xl border-2 border-dashed border-orange-200 p-8 
                        hover:border-[#F7931E] hover:bg-orange-50/30 
                        transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                        focus-within:ring-4 focus-within:ring-orange-500 focus-within:ring-offset-2">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-8 w-8 text-[#F7931E]" />
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
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                {/* Logo Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="col-span-1 sm:col-span-1">
                    <QRInput
                      label={"Width"}
                      type={'text'}
                      name={"LogoWidth"}
                      placeholder={"Auto"}
                      handleInputChange={(name, value) => {
                        handleInputChange(name, value);
                        // Force re-render with new dimensions by creating a new data URL
                        if (previewUrl) {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = parseInt(value) || 48;
                            canvas.height = parseInt(document.querySelector('input[name="LogoHeight"]')?.value) || 48;
                            const ctx = canvas.getContext('2d');
                            // Make background transparent
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            // Enable image smoothing for better quality
                            ctx.imageSmoothingEnabled = true;
                            ctx.imageSmoothingQuality = 'high';
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            setPreviewUrl(canvas.toDataURL('image/png'));
                          };
                          img.src = previewUrl;
                        }
                      }}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1">
                    <QRInput
                      label={"Height"} 
                      type={'text'}
                      name={"LogoHeight"}
                      placeholder={"Auto"}
                      handleInputChange={(name, value) => {
                        handleInputChange(name, value);
                        // Force re-render with new dimensions by creating a new data URL
                        if (previewUrl) {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = parseInt(document.querySelector('input[name="LogoWidth"]')?.value) || 48;
                            canvas.height = parseInt(value) || 48;
                            const ctx = canvas.getContext('2d');
                            // Make background transparent
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            // Enable image smoothing for better quality
                            ctx.imageSmoothingEnabled = true;
                            ctx.imageSmoothingQuality = 'high';
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            setPreviewUrl(canvas.toDataURL('image/png'));
                          };
                          img.src = previewUrl;
                        }
                      }}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1">
                    <QRInput
                      label={"Center Logo"}
                      type={'checkbox'}
                      name={"CenterLogo"}
                      placeholder={""}
                      handleInputChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default LogoSettings;
