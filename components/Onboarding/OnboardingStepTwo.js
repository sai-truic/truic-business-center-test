import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';
import USAMap from 'react-usa-map';
import { motion, AnimatePresence } from 'framer-motion';

const stateAbbreviations = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
};

const OnboardingStepTwo = ({ handleButtonClick, onNext, onSkip, onClose, updateOnboardingData, onboardingData }) => {
  const [selectedState, setSelectedState] = useState(onboardingData.businessState || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredState, setHoveredState] = useState('');

  const filteredStates = useMemo(() => {
    return Object.keys(stateAbbreviations).filter(state => state.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    updateOnboardingData({ businessState: state });
  };

  useEffect(() => {
    if (onboardingData.businessState) {
      setSelectedState(onboardingData.businessState);
    }
  }, [onboardingData.businessState]);

  const mapHandler = (event) => {
    const stateAbbr = event.target.dataset.name;
    const stateName = Object.keys(stateAbbreviations).find(key => stateAbbreviations[key] === stateAbbr);
    handleStateSelect(stateName);
  };

  const statesCustomConfig = () => {
    const config = {};
    Object.keys(stateAbbreviations).forEach(state => {
      const abbreviation = stateAbbreviations[state];
      config[abbreviation] = {
        fill: selectedState === state ? '#6366F1' : '#E5E7EB',
        clickHandler: mapHandler,
        onMouseEnter: () => setHoveredState(state),
        onMouseLeave: () => setHoveredState('')
      };
    });
    return config;
  };

  const customLabels = () => {
    const labels = {};
    Object.entries(stateAbbreviations).forEach(([state, abbr]) => {
      labels[abbr] = { 
        parent: 'g', 
        element: 'text', 
        content: state, 
        attrs: { 
          'font-size': '8', 
          'font-weight': 'bold', 
          fill: '#4B5563',
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'opacity': hoveredState === state ? '1' : '0',
          'transition': 'opacity 0.3s ease'
        } 
      };
    });
    return labels;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full overflow-hidden bg-white rounded-2xl shadow-lg"
    >
      {/* Header section */}
      <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center rounded-t-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 tracking-tight leading-tight">Welcome to Our Business Center</h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">Let's embark on your entrepreneurial journey together!</p>
        <button
          onClick={() => handleButtonClick('OnboardingStepOnecloseX', onClose)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-indigo-200 focus:outline-none transition-colors duration-200"
        >
          <span className="text-2xl sm:text-4xl">&times;</span>
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 bg-gradient-to-b from-transparent to-indigo-50 opacity-30"></div>
      </div>

      {/* Main content section */}
      <div className="flex-grow flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto min-h-0 space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-5xl xl:max-w-6xl mx-auto">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-center text-indigo-900 tracking-tight leading-tight">Where is your business based?</h3>
        <p className="mb-4 sm:mb-6 text-base sm:text-lg md:text-xl text-indigo-700 text-center max-w-md sm:max-w-lg md:max-w-2xl leading-relaxed">
          Let us know your business location so we can tailor our resources and guidance to your specific state regulations and opportunities.
        </p>

        {/* Search input */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl relative">
          <input
            type="text"
            placeholder="Search states or click on the map"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 sm:p-4 md:p-5 pl-10 sm:pl-12 md:pl-14 text-base sm:text-lg border-2 border-indigo-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300 shadow-md"
          />
          <Search className="absolute left-3 sm:left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
        </div>

        {/* Search results */}
        <AnimatePresence>
        {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white border-2 border-indigo-200 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto"
            >
              {filteredStates.map((state) => (
                <button
                  key={state}
                  onClick={() => handleStateSelect(state)}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 transition-colors duration-200 text-sm sm:text-base"
                >
                  {state}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map container */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto overflow-hidden">
          <style>
            {`
              .us-state-map {
                filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
              }
              .us-state-map path {
                cursor: pointer;
                transition: all 0.3s ease;
                stroke: #000;
                stroke-width: 0.5;
              }
              .us-state-map path:hover {
                fill: #4F46E5 !important;
                transform: scale(1.05);
                filter: drop-shadow(0px 0px 8px rgba(79, 70, 229, 0.6));
                z-index: 1000;
              }
              .us-state-map g:hover {
                z-index: 1000;
              }
              .us-state-map text {
                pointer-events: none;
                font-family: 'Arial', sans-serif;
                font-size: 10px !important;
                font-weight: bold;
                fill: #4B5563;
                text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8);
                transition: all 0.3s ease;
                opacity: 0;
              }
              .us-state-map g:hover text {
                fill: #FFFFFF;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(0, 0, 0, 0.5);
                font-size: 14px !important;
                opacity: 1;
              }
            `}
          </style>
          <div className="w-full h-full">
            <USAMap 
              customize={statesCustomConfig()} 
              onClick={mapHandler}
              width="100%"
              height="auto"
              title="Select your state"
              labelFunction={customLabels}
            />
          </div>
        </div>

        {/* Selected state display */}
        <AnimatePresence>
          {selectedState && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-lg font-semibold text-indigo-600 flex items-center space-x-2"
            >
              <MapPin size={20} />
              <span>Selected State: {selectedState}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Footer section */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 border-t border-indigo-200 bg-white bg-opacity-70 backdrop-blur-lg rounded-b-2xl shadow-lg">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepTwoSkip', onSkip)}
          className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center"
        >
          <SkipForward size={18} className="mr-2" />
          Skip
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepTwoNext', onNext)}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center ${
            selectedState
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!selectedState}
        >
          {selectedState ? 'Continue' : 'Select a State'}
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OnboardingStepTwo;
