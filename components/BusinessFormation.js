import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';

// Commenting out previous implementation components
/*
import { FaDownload, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import AccordionItem from './Sidebar/Accordian';
import NameYourBusiness from './SmallBusinessJourney/NameYourBusiness';
import GetARegisteredAgent from './SmallBusinessJourney/GetARegisteredAgent';
import FileWithTheState from './SmallBusinessJourney/FileWithTheState';
import CreateAnOperatingAgreement from './SmallBusinessJourney/CreateAnOperatingAgreement';
import GetAnEINSection from './SmallBusinessJourney/GetAnEINSection';
*/

const BusinessFormation = () => {
  // Commenting out previous implementation state
  /*
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({
    selectState: false,
    nameYourBusiness: false,
    getRegisteredAgent: false,
    fileWithState: false,
    createOperatingAgreement: false,
    getEIN: false
  });

  const updateProgress = () => {
    const steps = Object.values(completedSteps);
    const completedCount = steps.filter(step => step).length;
    const newProgress = Math.round((completedCount / steps.length) * 100);
    setProgress(newProgress);
  };

  const toggleStep = (step) => {
    setCompletedSteps(prev => {
      const newState = { ...prev, [step]: !prev[step] };
      return newState;
    });
  };

  React.useEffect(() => {
    updateProgress();
  }, [completedSteps]);
  */

  const nonprofitIframeRef = useRef(null);
  const llcIframeRef = useRef(null);

  // Set up iframe resizer
  useEffect(() => {
    // Add styles to fix z-index issues and improve mobile experience
    const addZIndexStyles = () => {
      if (typeof document === 'undefined') return;
      
      const style = document.createElement('style');
      style.textContent = `
        /* Fix for iframe dropdown menus */
        iframe {
          z-index: auto !important;
        }
        
        /* Make dropdowns appear on top */
        .dropdown-menu, 
        .select-dropdown, 
        [role="listbox"], 
        [role="combobox"],
        .select-items,
        .select__menu,
        .select-options {
          z-index: 9999 !important;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .dropdown-menu, 
          .select-dropdown, 
          [role="listbox"], 
          [role="combobox"],
          .select-items,
          .select__menu,
          .select-options {
            width: 100% !important;
            max-width: 100% !important;
            min-width: unset !important;
            left: 0 !important;
            right: 0 !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    };
    
    // Configure iframe-resizer with mobile optimizations
    const setupIframeResizer = () => {
      // Configuration optimized for all devices including mobile
      const iframeConfig = {
        checkOrigin: false,
        scrolling: false,
        sizeWidth: true, // Enable width resizing for better mobile display
        widthCalculationMethod: 'rightMostElement', // Ensure width calculation captures all content
        heightCalculationMethod: 'lowestElement', // Best for capturing all content height
        warningTimeout: 0, // Prevent timeouts on slow mobile connections
        onResized: (data) => {
          // Handle post-resize adjustments if needed
          if (data.iframe && data.width) {
            // Ensure the iframe's parent container adapts to size changes
            data.iframe.style.maxWidth = '100%';
          }
        }
      };
      
      if (window.iFrameResize && nonprofitIframeRef.current) {
        window.iFrameResize(iframeConfig, '#nonprofit_formation');
      }
      
      if (window.iFrameResize && llcIframeRef.current) {
        window.iFrameResize(iframeConfig, '#llc_formation');
      }
    };
    
    // Apply styles
    const cleanup = addZIndexStyles();
    
    // Check if iFrameResize is already loaded
    if (window.iFrameResize) {
      setupIframeResizer();
    } else {
      // Script will handle this once loaded
      window.setupIframeResizer = setupIframeResizer;
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto space-y-8 p-4 sm:p-6">
      {/* Load the iframe-resizer script */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.setupIframeResizer) {
            window.setupIframeResizer();
          }
        }}
      />
      
      {/* Add small script to help with iframe dropdowns */}
      <Script
        id="iframe-dropdown-fix"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Enhanced helper to ensure dropdowns in iframes work on all devices
            (function() {
              // Handle dropdown visibility in iframes
              window.addEventListener('message', function(event) {
                if (event.data && event.data.type === 'dropdown-opened') {
                  const iframe = document.getElementById(event.data.iframeId);
                  if (iframe) {
                    // Ensure any parent elements don't clip the dropdown
                    let parent = iframe.parentElement;
                    while (parent) {
                      parent.style.overflow = 'visible';
                      parent = parent.parentElement;
                    }
                  }
                }
              });
              
              // Add mobile-specific optimizations
              function optimizeForMobile() {
                // Check if we're on a mobile device
                const isMobile = window.matchMedia('(max-width: 768px)').matches;
                
                if (isMobile) {
                  // Find all iframes and apply mobile-specific styles
                  const iframes = document.querySelectorAll('iframe');
                  iframes.forEach(iframe => {
                    // Add message to iframe about being on mobile
                    if (iframe.contentWindow) {
                      try {
                        iframe.contentWindow.postMessage({ type: 'on-mobile-device' }, '*');
                      } catch (e) {
                        // Ignore cross-origin issues
                      }
                    }
                    
                    // Optimize container styles
                    if (iframe.parentElement) {
                      iframe.parentElement.style.width = '100%';
                      iframe.parentElement.style.maxWidth = '100vw';
                      iframe.parentElement.style.overflow = 'visible';
                    }
                  });
                }
              }
              
              // Run on page load
              window.addEventListener('DOMContentLoaded', optimizeForMobile);
              window.addEventListener('load', optimizeForMobile);
              
              // Also run on resize
              window.addEventListener('resize', optimizeForMobile);
            })();
          `
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full rounded-xl p-8 bg-gradient-to-r from-[#F5A623] to-[#F15A29] text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <svg className="w-12 h-12 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00.496-1.868l-7-4zM8 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3z" clipRule="evenodd"></path>
          </svg>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Business Formation Guide</h1>
        </div>
        <div>
            <p className="text-xl mb-2 text-black">Generate business entity formation documents for your business.</p>
            <p className="opacity-90 text-black">
              Starting a business? We'll guide you through the formation process step by step. Choose from the available business formation tools below.
            </p>
            <p className="mt-4 font-medium hover:underline text-black">
              <a href="https://howtostartanllc.com/choosing-a-business-structure" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors duration-200 w-fit">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                Read this article to understand what business structure to go with
              </a>
            </p>
          </div>
      </motion.div>

      {/* Adding iframe widgets as per requirements */}
      <div className="w-full space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd"></path>
              </svg>
              LLC Formation Tool
            </h2>
            <p className="text-blue-100 mt-2">Start your Limited Liability Company with our comprehensive formation guide</p>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 mb-4">Enter keywords related to your business and select your state to generate available business names with domain availability.</p>
            <div className="w-full bg-gray-50 rounded-lg p-2">
              <iframe 
                id="llc_formation"
                ref={llcIframeRef}
                src="https://truic-lookups.vercel.app/?data_base=llc_formation&amp;expanded=false&amp;type=single_result"
                style={{
                  width: '100%',
                  minHeight: '500px',
                  border: 'none',
                  borderRadius: '0.5rem'
                }}
                scrolling="no"
                title="LLC Formation Guide"
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path>
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
              </svg>
              Nonprofit Formation Tool
            </h2>
            <p className="text-purple-100 mt-2">Create your 501(c)(3) nonprofit organization with step-by-step guidance</p>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 mb-4">Complete the form below to generate the necessary documents for your nonprofit organization.</p>
            <div className="w-full bg-gray-50 rounded-lg p-2">
              <iframe 
                id="nonprofit_formation"
                ref={nonprofitIframeRef}
                src="https://truic-lookups.vercel.app/?data_base=nonprofit_formation&amp;expanded=false&amp;type=single_result"
                style={{
                  width: '100%',
                  minHeight: '500px',
                  border: 'none',
                  borderRadius: '0.5rem'
                }}
                scrolling="no"
                title="Nonprofit Formation Tool"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Previous implementation commented out
      <div className="w-full space-y-4 sm:space-y-6">
        <AccordionItem 
          title={
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center">
                <span className={`mr-3 text-xl ${completedSteps.selectState ? 'text-green-500' : 'text-gray-400'}`}>
                  <FaCheckCircle onClick={() => toggleStep('selectState')} className="cursor-pointer" />
                </span>
                Choose Your Business Structure
              </span>
              <span className="text-sm bg-orange-100 text-[#F7931E] px-2 py-1 rounded-full">Step 1</span>
            </div>
          }
        >
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Select the right business structure for your needs:</h3>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#F7931E] mr-2">
                  <FaArrowRight />
                </div>
                <div>
                  <span className="font-medium">LLC (Limited Liability Company)</span>: Most popular option with personal liability protection and flexible tax options.
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#F7931E] mr-2">
                  <FaArrowRight />
                </div>
                <div>
                  <span className="font-medium">Corporation</span>: Formal structure with shares, good for raising capital but more compliance requirements.
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#F7931E] mr-2">
                  <FaArrowRight />
                </div>
                <div>
                  <span className="font-medium">Sole Proprietorship</span>: Simplest form but offers no liability protection.
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#F7931E] mr-2">
                  <FaArrowRight />
                </div>
                <div>
                  <span className="font-medium">Partnership</span>: Good for multiple owners but typically lacks liability protection.
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <button className="bg-[#F7931E] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                Take Our Business Structure Quiz
              </button>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem 
          title={
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center">
                <span className={`mr-3 text-xl ${completedSteps.nameYourBusiness ? 'text-green-500' : 'text-gray-400'}`}>
                  <FaCheckCircle onClick={() => toggleStep('nameYourBusiness')} className="cursor-pointer" />
                </span>
                Name Your Business
              </span>
              <span className="text-sm bg-orange-100 text-[#F7931E] px-2 py-1 rounded-full">Step 2</span>
            </div>
          }
        >
          <NameYourBusiness />
        </AccordionItem>

        <AccordionItem 
          title={
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center">
                <span className={`mr-3 text-xl ${completedSteps.getRegisteredAgent ? 'text-green-500' : 'text-gray-400'}`}>
                  <FaCheckCircle onClick={() => toggleStep('getRegisteredAgent')} className="cursor-pointer" />
                </span>
                Get a Registered Agent
              </span>
              <span className="text-sm bg-orange-100 text-[#F7931E] px-2 py-1 rounded-full">Step 3</span>
            </div>
          }
        >
          <GetARegisteredAgent />
        </AccordionItem>

        <AccordionItem 
          title={
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center">
                <span className={`mr-3 text-xl ${completedSteps.fileWithState ? 'text-green-500' : 'text-gray-400'}`}>
                  <FaCheckCircle onClick={() => toggleStep('fileWithState')} className="cursor-pointer" />
                </span>
                File with the State
              </span>
              <span className="text-sm bg-orange-100 text-[#F7931E] px-2 py-1 rounded-full">Step 4</span>
            </div>
          }
        >
          <FileWithTheState />
        </AccordionItem>

        <AccordionItem 
          title={
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center">
                <span className={`mr-3 text-xl ${completedSteps.createOperatingAgreement ? 'text-green-500' : 'text-gray-400'}`}>
                  <FaCheckCircle onClick={() => toggleStep('createOperatingAgreement')} className="cursor-pointer" />
                </span>
                Create Governance Documents
              </span>
              <span className="text-sm bg-orange-100 text-[#F7931E] px-2 py-1 rounded-full">Step 5</span>
            </div>
          }
        >
          <CreateAnOperatingAgreement />
        </AccordionItem>

        <AccordionItem 
          title={
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center">
                <span className={`mr-3 text-xl ${completedSteps.getEIN ? 'text-green-500' : 'text-gray-400'}`}>
                  <FaCheckCircle onClick={() => toggleStep('getEIN')} className="cursor-pointer" />
                </span>
                Get an EIN
              </span>
              <span className="text-sm bg-orange-100 text-[#F7931E] px-2 py-1 rounded-full">Step 6</span>
            </div>
          }
        >
          <GetAnEINSection />
        </AccordionItem>
      </div>
      */}
    </div>
  );
};

export default BusinessFormation;