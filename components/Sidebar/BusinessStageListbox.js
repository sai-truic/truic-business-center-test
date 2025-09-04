import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Listbox, Portal } from '@headlessui/react';

// Move this outside the component to maintain consistent references
const businessStages = [
  { id: 1, label: 'I need an idea for my business', icon: '💡' },
  { id: 2, label: 'I am planning my business', icon: '📝' },
  { id: 3, label: 'I am ready to form my business', icon: '🏢' },
  { id: 4, label: 'I am growing my business', icon: '📈' },
];

const BusinessStageListbox = ({ selectedStage, onStageSelect }) => {
  const findStageByLabel = (label) =>
    businessStages.find((stage) => stage.label === label) || null;
  const selectedStageObject =
    typeof selectedStage === 'string' ? findStageByLabel(selectedStage) : selectedStage;
  const listboxRef = useRef(null);

  return (
    <Listbox value={selectedStageObject} onChange={(stage) => onStageSelect(stage.label)}>
      {({ open }) => (
        <div className="relative mt-1 w-full" ref={listboxRef}>
          <motion.div
            initial={false}
            animate={{
              boxShadow: open
                ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              scale: open ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <Listbox.Button className="py-4 border-2 border-indigo-100 hover:border-indigo-300 relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-12 text-left shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:text-base transition-all duration-200">
              <span className="block truncate">
                {selectedStageObject
                  ? `${selectedStageObject.icon} ${selectedStageObject.label}`
                  : 'Select a stage'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
          </motion.div>
          <AnimatePresence>
            {open && (
              <Portal>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute z-50 w-full"
                  style={{
                    width: listboxRef.current ? `${listboxRef.current.offsetWidth}px` : '100%',
                    top: listboxRef.current
                      ? `${listboxRef.current.getBoundingClientRect().bottom + window.scrollY}px`
                      : '0',
                    left: listboxRef.current
                      ? `${listboxRef.current.getBoundingClientRect().left + window.scrollX}px`
                      : '0',
                  }}
                >
                  <Listbox.Options
                    static
                    className="border border-indigo-100 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm md:text-base"
                  >
                    {businessStages.map((stage, index) => (
                      <Listbox.Option
                        key={stage.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                            active
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                              : 'text-gray-900'
                          }`
                        }
                        value={stage}
                      >
                        {({ selected, active }) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                          >
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {stage.icon} {stage.label}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-indigo-600'
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </motion.div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </motion.div>
              </Portal>
            )}
          </AnimatePresence>
        </div>
      )}
    </Listbox>
  );
};

export default BusinessStageListbox;
