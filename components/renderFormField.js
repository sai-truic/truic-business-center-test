import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Input } from './ui/input';
import { Address } from './ui/address';
import { City } from './ui/city';
import { Country } from './ui/country';
import { CustomDatePicker } from './ui/date-picker-2';
import { Select, SelectItem } from './ui/select';
import { Combobox } from './ui/combobox';
import AIEditor from './ui/AIEditor';
import { ToggleableDataTable } from './ui/ToggleableDataTable.js';

const renderFormField = (type, id, name, placeholder, info = '', options = {
  showLabel: true,
  showPlaceholder: true,
  ...options
}, handleInfoClick, stateValue, setStateValue, aiEditorClassName = '') => {
  const inputProps = options?.inputProps || {};
  const commonInputClasses = "w-full px-4 py-2 text-gray-700 bg-white border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-[#F7931E] transition duration-150 ease-in-out hover:border-orange-300";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const inputWrapperClasses = "mt-1";
  const [hasReloaded, setHasReloaded] = useState(true);
  // console.log(`Rendering field ${id} with current value:`, id.split('.').reduce((obj, key) => obj && obj[key], stateValue));

  const handleChange = (value, shouldUpsert = false) => {
    // Update the state                                                                                                                              
    setStateValue((prevState) => {                                                                                                                       
      // console.log("Prev State :", prevState);                                                                                                         
      const newState = JSON.parse(JSON.stringify(prevState)); // Deep clone
      let keys;
      if (type === "toggleableDataTable") {
        const dataTableId = id + "."+ Object.keys(value)[0].toString()
        keys = dataTableId.split('.');
      } else {
        keys = id.split('.');
      }
      // console.log("Keys :", keys)                                                                                                                
      let current = newState;                                                                                                                         
      for (let i = 0; i < keys.length - 1; i++) {                                                                                                        
        if (!current[keys[i]]) {                                                                                                                         
          current[keys[i]] = {};                                                                                                                         
        }                                                                                                                                                
        current = current[keys[i]];                                                                                                                      
      }                                                                                                                                                
      if (typeof current[keys[keys.length - 1]] === 'object' && current[keys[keys.length - 1]] !== null) {                                               
        // If the value is an object (like in the case of profitLossData), merge it
        if (type === "toggleableDataTable") {
          current[keys[keys.length - 1]] = { ...current[keys[keys.length - 1]], ...Object.values(value)[0].toString() };
        } else {
          current[keys[keys.length - 1]] = { ...current[keys[keys.length - 1]], ...value };
        }                                                                                            
      } else {     
        if (type === "toggleableDataTable") {
          current[keys[keys.length - 1]] = Object.values(value)[0].toString();
        } else {
          current[keys[keys.length - 1]] = value;
        }                                                                                                                                                                                                                                               
      }                                                                                                                                                  
      // console.log(`New state for ${id}:`, newState);                                                                                                  
      return newState;                                                                                                                                   
    });                                                                                                                                                  
  };

  const formatLabel = (str, options) => {
    if (options?.usePlaceholderAsLabel && placeholder) {
      return placeholder;
    }
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  switch (type) {
    case 'input':
      return (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label htmlFor={id} className={labelClasses}>
              {formatLabel(name)}
            </label>
            {info && (
              <div 
                className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer" 
                onClick={() => handleInfoClick(info, formatLabel(name))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className={inputWrapperClasses}>
            <Input 
              id={id} 
              name={name} 
              placeholder={placeholder} 
              value={id.split('.').reduce((obj, key) => obj && obj[key], stateValue) || ''}
              onChange={handleChange}
              className={`${commonInputClasses} ${inputProps.className || ''}`}
              {...inputProps}
            />
          </div>
        </div>
      );
    case 'address':
    case 'city':
    case 'country':
      return (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label htmlFor={id} className={labelClasses}>
              {formatLabel(name)}
            </label>
            {info && (
              <div 
                className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer" 
                onClick={() => handleInfoClick(info, formatLabel(name))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className={inputWrapperClasses}>
            {type === 'address' && <Address 
              id={id} 
              name={name} 
              placeholder={placeholder} 
              value={id.split('.').reduce((obj, key) => obj && obj[key], stateValue) || ''}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 bg-white border border-orange-200 text-gray-900 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent focus:caret-[#F7931E] hover:border-orange-300"
              {...inputProps}
            />}
            {type === 'city' && <City 
              id={id} 
              name={name} 
              placeholder={placeholder} 
              value={id.split('.').reduce((obj, key) => obj && obj[key], stateValue) || ''}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 bg-white border border-orange-200 text-gray-900 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent focus:caret-[#F7931E] hover:border-orange-300"
              {...inputProps}
            />}
            {type === 'country' && <Country 
              id={id} 
              name={name} 
              placeholder={placeholder} 
              value={id.split('.').reduce((obj, key) => obj && obj[key], stateValue) || ''}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 bg-white border border-orange-200 text-gray-900 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent focus:caret-[#F7931E] hover:border-orange-300"
              {...inputProps}
            />}
          </div>
        </div>
      );
    case 'textarea':
      return (
        <div className="mb-4">
          {options.showLabel && (
            <div className="flex items-center">
              <label htmlFor={id} className={labelClasses}>
                {formatLabel(name, options)}
              </label>
              {info && (
                <div 
                  className="mb-1 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer" 
                  onClick={() => handleInfoClick(info, formatLabel(name))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          )}
          <div className={inputWrapperClasses}>
            {/*console.log("AI Editor Id :", id.split("."))*/}
            {/*console.log("AI Editor Value :", id.split('.').reduce((obj, key) => obj && obj[key], stateValue))*/}
            <AIEditor
              aiEnabled={false}
              placeholder={options.showPlaceholder ? placeholder : ""}
              value={id.split('.').reduce((obj, key) => obj && obj[key], stateValue) || ''}
              onChange={(value) => handleChange(value)}
              className={aiEditorClassName || `p-2 sm:p-3 md:p-4 pl-8 sm:pl-10 md:pl-12 form-input block w-full rounded-lg bg-orange-50 border border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 min-h-[100px] shadow-sm hover:shadow-md hover:border-orange-300`}
              icon="Edit3"
              iconClassName="absolute left-3 sm:left-4 top-4 transform text-[#F7931E] text-lg sm:text-xl"
              showToolbar={options?.showToolbar !== false}
            />
          </div>
        </div>
      );
    case 'datepicker':
      return (
        <div className="mb-4">
          <label htmlFor={id} className={labelClasses}>
            {formatLabel(name)}
          </label>
          <div className={inputWrapperClasses}>
              <CustomDatePicker
                id={id}
                selected={id.split('.').reduce((obj, key) => obj && obj[key], stateValue)}
                onSelect={(date) => handleChange(date)}
                className={options?.inputProps?.className || `${commonInputClasses} cursor-pointer`}
                inputProps={{
                  ...options?.inputProps,
                  icon: options?.inputProps?.icon,
                  iconClassName: options?.inputProps?.iconClassName
                }}
                icon={options?.inputProps?.icon}
                iconClassName={options?.inputProps?.iconClassName}
                allowFutureDates={options?.allowFutureDates}
              />
          </div>
        </div>
      );
    case 'select':
      return (
        <div className="mb-4">
          <label htmlFor={id} className={labelClasses}>
            {formatLabel(name)}
          </label>
          <div className={inputWrapperClasses}>
            <Select 
              id={id} 
              name={name} 
              placeholder={placeholder}
              value={id.split('.').reduce((obj, key) => obj && obj[key], stateValue) || ''}
              onValueChange={handleChange}
              className={commonInputClasses}
            >
              {Array.isArray(options) && options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      );
    case 'combobox':
      return (
        <div className="mb-4">
          <label htmlFor={id} className={labelClasses}>
            {formatLabel(name)}
          </label>
          <div className={inputWrapperClasses}>
            <Combobox
              id={id}
              options={options.value}
              placeholder={placeholder}
              onSelect={(option) => handleChange(option.value)}
              value={id.split('.').reduce((obj, key) => obj && obj[key], stateValue) || ''}
              className={options?.inputProps?.className}
            />
          </div>
        </div>
      );
    case 'toggleableDataTable':
      return (
        <ToggleableDataTable
          id={id}
          columns={options.columns}
          data={options.data}
          onDataChange={(value) => handleChange(value)}
          stateValue={stateValue}
          hasReloaded={hasReloaded}
          setHasReloaded={setHasReloaded}
          handleInfoClick={handleInfoClick}
        />
      );
    default:
      return null;
  }
};

export default renderFormField;
