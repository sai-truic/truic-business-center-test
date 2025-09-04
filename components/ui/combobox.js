import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import useInputState from '../useInputState';

export const Combobox = ({ id, options = [], placeholder, onSelect, value, className }) => {
  const { getState, updateState } = useInputState();
  const [localState, setLocalState] = useState({
    isOpen: false,
    searchTerm: '',
    selectedOption: null
  });
  const prevOptionsRef = useRef();
  const initialRenderRef = useRef(true);
  const comboboxRef = useRef(null);

  useEffect(() => {
    if (initialRenderRef.current) {
      const storedState = getState('combobox', id);
      const initialState = storedState || {
        isOpen: false,
        searchTerm: value || '',
        selectedOption: value ? options.find(option => option.value === value) : null
      };
      setLocalState(initialState);
      initialRenderRef.current = false;
      prevOptionsRef.current = options;
    } else if (prevOptionsRef.current !== options) {
      const currentValue = localState.selectedOption?.value;
      if (currentValue !== value) {
        setLocalState(prevState => ({
          ...prevState,
          selectedOption: options.find(option => option.value === value) || null,
          searchTerm: value || prevState.searchTerm
        }));
      }
      prevOptionsRef.current = options;
    }
  }, [id, value, options]);

  // Debounce the updateState call to prevent rapid updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateState('combobox', id, localState);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [id, localState.searchTerm, localState.selectedOption]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setLocalState(prevState => ({
          ...prevState,
          isOpen: false
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const safeOptions = Array.isArray(options) ? options : [];

  const filteredOptions = safeOptions.filter((option) => {
    if (!option?.label || !localState?.searchTerm) return false;
    return option.label.toLowerCase().includes(String(localState.searchTerm).toLowerCase());
  });

  const handleSelect = useCallback((option) => {
    setLocalState(prevState => ({
      ...prevState,
      selectedOption: option,
      isOpen: false,
      searchTerm: option.label
    }));
    onSelect(option);
  }, [onSelect]);

  const handleSearchTermChange = useCallback((e) => {
    const newSearchTerm = e.target.value;
    setLocalState(prevState => ({
      ...prevState,
      searchTerm: newSearchTerm,
      isOpen: true,
      selectedOption: newSearchTerm === '' ? null : prevState.selectedOption
    }));
    if (newSearchTerm === '') {
      onSelect({ value: '', label: '' });
    }
  }, [onSelect]);

  const toggleOpen = useCallback(() => {
    setLocalState(prevState => ({
      ...prevState,
      isOpen: !prevState.isOpen
    }));
  }, []);

  const displayValue = localState?.searchTerm || '';

  return (
    <div className={`relative mt-1 ${className}`} ref={comboboxRef}>
      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
        <input
          type="text"
          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleSearchTermChange}
          onClick={() => {
            setLocalState(prevState => ({
              ...prevState,
              isOpen: true
            }));
          }}
        />
        <button
          type="button"
          onClick={toggleOpen}
          className="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
      <Transition
        show={localState.isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-teal-600 hover:text-white"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-500">
              No options found
            </li>
          )}
        </ul>
      </Transition>
    </div>
  );
};
