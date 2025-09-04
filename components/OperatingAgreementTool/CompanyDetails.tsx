import React, { useState, useMemo, useEffect } from 'react';
import { UseFormRegister, Control, Controller, UseFormSetValue } from 'react-hook-form';
import { FaBuilding, FaMapMarkerAlt, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import USAMap from 'react-usa-map';
import useInputState from '../useInputState';
// Add a type assertion for USAMap
const TypedUSAMap = USAMap as React.FC<{
  customize: { [stateKey: string]: { fill: string; clickHandler: (event: React.MouseEvent<SVGElement>) => void; onMouseEnter: () => void; onMouseLeave: () => void } };
  onClick: (event: React.MouseEvent<SVGElement>) => void;
  width: string;
  height: string;
  title: string;
  labelFunction: (stateCode: string) => { [key: string]: any };
  defaultFill: string;
}>;
import { motion, AnimatePresence } from 'framer-motion';
import stateFlagsData from './stateFlagsData';
import { CustomDatePicker } from '../ui/date-picker';

interface CompanyDetailsProps {
  register: UseFormRegister<any>;
  control?: Control<any>;
  setValue: UseFormSetValue<any>;
  fetchedData?: any;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ register, control, setValue, fetchedData }) => {               
  const { effectiveDate, setEffectiveDate, companyNameData, setCompanyNameData } = useInputState();
  const [selectedState, setSelectedState] = useState<string>('');                                                       
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoveredState, setHoveredState] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (fetchedData && !isInitialized) {
      setValue("companyName", fetchedData.companyName);
      if (fetchedData.companyName && fetchedData.companyName.trim() !== "") {
        setCompanyNameData(fetchedData.companyName.trim());
      } else {
        console.log("Fetched Data Company Name:", fetchedData.companyName);
      }
      let newFormattedDate;
      if (fetchedData.effectiveDate) {
        let formattedEffectiveDate = fetchedData.effectiveDate.split("-")
        if (formattedEffectiveDate[1].length == 1) {
          formattedEffectiveDate[1] = "0"+formattedEffectiveDate[1]
        }
        if (formattedEffectiveDate[2].length == 1) {
          formattedEffectiveDate[2] = "0"+formattedEffectiveDate[2]
        }
        newFormattedDate = formattedEffectiveDate.join("-")
      }
      setEffectiveDate(fetchedData.effectiveDate ? new Date(newFormattedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
      if (fetchedData.formationState) {
        setSelectedState(fetchedData.formationState);
        setSearchTerm(fetchedData.formationState);
        setValue("formationState", fetchedData.formationState);
      }
      setIsInitialized(true);
    }
  }, [fetchedData, setValue]);

  useEffect(() => {
    if (selectedState) {
      setValue("formationState", selectedState);
      setSearchTerm(selectedState);
    }
  }, [selectedState, setValue]);

  useEffect(() => {
    setValue("effectiveDate", effectiveDate);
  }, [effectiveDate]);

  const stateAbbreviations: { [key: string]: string } = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
  };

  const filteredStates = useMemo(() => {
    return Object.keys(stateAbbreviations).filter(state => state.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSearchTerm(state);
  };
                                                                                                                        
  const mapHandler = (event: any) => {                                                                                  
    const stateAbbr = event.target.dataset.name;                                                                        
    const stateName = Object.keys(stateAbbreviations).find(key => stateAbbreviations[key] === stateAbbr);               
    if (stateName) {                                                                                                    
      handleStateSelect(stateName);                                                                                     
    } else {                                                                                                            
      console.log('No matching state name found for abbreviation:', stateAbbr);                                         
    }                                                                                                                   
  };

  const statesCustomConfig = () => {
    const config: { [key: string]: any } = {};
    Object.keys(stateAbbreviations).forEach(state => {
      const abbreviation = stateAbbreviations[state];
      config[abbreviation] = {
        fill: selectedState === state ? '#F7931E' : '#E5E7EB',
        clickHandler: mapHandler,
        onMouseEnter: () => setHoveredState(state),
        onMouseLeave: () => setHoveredState(''),
      };
    });
    return config;
  };

  const customLabels = () => {
    const labels: { [key: string]: any } = {};
    Object.entries(stateAbbreviations).forEach(([state, abbr]) => {
      labels[abbr] = { 
        parent: 'g', 
        element: 'g',
        children: [
          {
            element: 'image',
            attributes: {
              href: stateFlagsData[state],
              x: '50%',
              y: '50%',
              height: '30',
              width: '45',
              transform: 'translate(-22.5, -15)',
              style: {
                opacity: hoveredState === state ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }
            }
          },
          {
            element: 'text',
            content: state,
            attributes: {
              x: '50%',
              y: '50%',
              'font-size': '8',
              'font-weight': 'bold',
              fill: '#4B5563',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              opacity: hoveredState === state ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }
          }
        ]
      };
    });
    return labels;
  };
                                                                                                                
  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      return date;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderDatePicker = () => {
    if (control) {
      return (
        <>
        <Controller
          name="effectiveDate"
          control={control}
          defaultValue={effectiveDate}
          render={({ field: { onChange, value } }) => {
            return (
              <CustomDatePicker
                className="p-2 sm:p-3 md:p-4 pl-8 sm:pl-10 md:pl-12 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200"
                selected={effectiveDate || null}
                onSelect={(date: Date | null) => {
                  if (date) {
                    const formattedDate = formatDate(date);
                    onChange(formattedDate);
                    setEffectiveDate(formattedDate);
                    setValue("effectiveDate", formattedDate);
                  }
                }}
                minDate={new Date(2010, 0, 1)}
                maxDate={new Date()}
              />
            );
          }}
        />
        </>
      );
    } else {
      return (
        <>
        <CustomDatePicker
          className="p-2 sm:p-3 md:p-4 pl-8 sm:pl-10 md:pl-12 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200"
          selected={effectiveDate ? formatDate(effectiveDate).split("T")[0] : null}
          onSelect={(date: Date) => setEffectiveDate(formatDate(date))}
          minDate={new Date(2010, 0, 1)}
          maxDate={new Date()}
        />
        </>
      );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 rounded-xl border border-[#E4E4E7]">
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-4 sm:mb-6 text-center">
        <span className="bg-clip-text">
          Company Details
        </span>
      </h2>
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1">
          <label htmlFor="companyName" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base">
            Company Name
          </label>
          <div className="relative">
            <FaBuilding className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl" />
            <input
              type="text"
              id="companyName"
              className="p-2 sm:p-3 md:p-4 pl-8 sm:pl-10 md:pl-12 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200"
              defaultValue={companyNameData}
              placeholder="Enter your Company Name"
              onChange={e => {
                if (e.target.value && e.target.value.trim() !== "") {
                  setCompanyNameData(e.target.value.trim());
                }
              }}
            />
          </div>
        </div>

        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex-1">
          <label htmlFor="effectiveDate" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base">
            Effective Date
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-10" />
            {renderDatePicker()}
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
        <div>
          <label htmlFor="state" className="block text-neutral-950 font-semibold mb-2 text-base sm:text-lg">
            State
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl" />
            <input
              type="text"
              placeholder="Search states or click on map"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedState('');
              }}
              className="p-2 sm:p-3 md:p-4 pl-8 sm:pl-10 md:pl-12 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200"
            />
          </div>
          <AnimatePresence>
            {searchTerm && !selectedState && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-2 w-full bg-white border-2 border-orange-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
              >
                {filteredStates.map((state) => (
                  <div
                    key={state}
                    onClick={(e) => {
                      e.preventDefault();
                      handleStateSelect(state);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 focus:outline-none focus:bg-orange-100 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
                  >
                    {state}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full overflow-hidden mx-auto lg:w-3/4 xl:w-2/3">
          <style>
            {`
              .us-state-map {
                filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
              }
              .us-state-map path {
                cursor: pointer;
                transition: all 0.3s ease;
                stroke: #4B5563;
                stroke-width: 1;
              }
              .us-state-map path:hover {
                fill: #F7931E !important;
                filter: drop-shadow(0px 0px 8px rgba(247, 147, 30, 0.6));
                z-index: 1000;
                stroke: #1F2937;
                stroke-width: 2;
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
          <TypedUSAMap 
            customize={statesCustomConfig()} 
            onClick={mapHandler}
            width="100%"
            height="auto"
            title="Select your state"
            labelFunction={customLabels}
            defaultFill="#E5E7EB"
          />
        </div>
        <AnimatePresence>
          {selectedState && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-xl font-semibold text-[#F7931E] flex items-center justify-center space-x-2 mt-4"
            >
              <FaMapMarkerAlt className="text-2xl" />
              <span>Selected State: {selectedState}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompanyDetails;
