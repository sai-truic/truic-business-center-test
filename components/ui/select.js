import React, { useEffect, useRef, useCallback } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import useInputState from '../useInputState';

export const Select = React.forwardRef(({ id, children, value, onValueChange, required, placeholder }, forwardedRef) => {
  const { getState, updateState } = useInputState();
  const internalRef = useRef(null);
  const ref = forwardedRef || internalRef;

  const selectState = getState('select', id) || {};
  const { displayValue = '', isOpen = false } = selectState;

  console.log(`Select state for ${id}:`, selectState); // Debug log

  const handleSelect = useCallback((newValue, label) => {
    console.log(`Selecting: ${newValue}, ${label}`); // Debug log
    updateState('select', id, { displayValue: label, isOpen: false, value: newValue });
    if (onValueChange) {
      onValueChange(newValue);
    }
  }, [id, onValueChange, updateState]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        updateState('select', id, { isOpen: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, id, updateState]);

  useEffect(() => {
    const selectedChild = React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.props.value === value
    );
    if (selectedChild) {
      updateState('select', id, { displayValue: selectedChild.props.children, value });
    } else {
      updateState('select', id, { displayValue: '', value: '' });
    }
  }, [id, value, children, updateState]);

  const toggleOpen = useCallback(() => {
    console.log(`Toggling open state. Current: ${isOpen}`); // Debug log
    updateState('select', id, prevState => ({
      ...prevState,
      isOpen: !prevState.isOpen
    }));
  }, [id, updateState]);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={toggleOpen}
        className="border relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span className="block truncate">
          {displayValue || placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { 
                onSelect: handleSelect,
                isSelected: child.props.value === selectState.value
              });
            }
            return child;
          })}
        </ul>
      )}
    </div>
  );
});

export const SelectItem = React.forwardRef(({ value, children, onSelect, isSelected }, ref) => (
  <li
    ref={ref}
    className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
      isSelected ? 'bg-amber-100 text-amber-900' : 'text-gray-900 hover:bg-amber-100'
    }`}
    onClick={() => onSelect(value, children)}
  >
    {children}
  </li>
));