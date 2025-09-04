import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpDownIcon, CheckIcon, FlagIcon } from '@heroicons/react/24/solid';
import { Combobox } from '@headlessui/react';
import stateFlagsData from '../OperatingAgreementTool/stateFlagsData';

const states = Object.keys(stateFlagsData);

const StateCombobox = ({ selectedState, onStateSelect, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const [filteredStates, setFilteredStates] = useState(states);
  const optionsRef = useRef(null);
  const comboboxRef = useRef(null);

  useEffect(() => {
    const filterStates = () => {
      return query === ''
        ? states
        : states.filter((state) =>
            state.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
          );
    };
    setFilteredStates(filterStates());
  }, [query]);

  const scrollToTop = () => {
    if (optionsRef.current) {
      optionsRef.current.scrollTop = 0;
    }
  };

  return (
    <Combobox value={selectedState} onChange={onStateSelect}>
      {({ open }) => {
        useEffect(() => {
          onOpenChange(open);
          if (open) {
            scrollToTop();
          }
        }, [open]);

        return (
          <div className="relative mt-1 w-full" ref={comboboxRef}>
            <div className="border-2 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all duration-200 ease-in-out border-indigo-100 hover:border-indigo-300">
              <Combobox.Input
                className="w-full border-none py-4 pl-12 pr-12 text-sm sm:text-base leading-5 text-gray-900 focus:ring-0 placeholder-gray-400 bg-transparent"
                displayValue={(state) => state}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Select a state..."
              />
              {selectedState ? (
                <img
                  src={stateFlagsData[selectedState]}
                  alt={`${selectedState} flag`}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-4 border border-gray-300 shadow-sm rounded-sm"
                />
              ) : (
                <FlagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
              )}
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-indigo-400 hover:text-indigo-600 transition-colors duration-150 ease-in-out"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="border border-indigo-100 shadow-2xl absolute z-10 mt-1 w-full rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                  style={{
                    width: comboboxRef.current ? `${comboboxRef.current.offsetWidth}px` : '100%',
                  }}
                >
                  <Combobox.Options
                    static
                    ref={optionsRef}
                    className="max-h-60 overflow-auto text-base sm:text-sm scrollbar-hide"
                  >
                    {filteredStates.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        No states found.
                      </div>
                    ) : (
                      filteredStates.map((state) => (
                        <Combobox.Option
                          key={state}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-3 pl-12 pr-4 ${
                              active
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105 transition-all duration-200 ease-out rounded-md z-10'
                                : 'text-gray-900 bg-white hover:bg-indigo-50 transition-all duration-200 ease-in-out'
                            }`
                          }
                          value={state}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                <img
                                  src={stateFlagsData[state]}
                                  alt={`${state} flag`}
                                  className="inline-block w-6 h-4 mr-3 align-text-bottom border border-gray-300 shadow-sm rounded-sm"
                                />
                                {state}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-5 ${
                                    active ? 'text-white' : 'text-indigo-600'
                                  }`}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }}
    </Combobox>
  );
};

export default StateCombobox;
