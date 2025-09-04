import React from 'react';
import { MapPin, Navigation, Globe, Info } from 'lucide-react';
import BaseQRInput from '../Common/BaseQRInput';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ExamplesLightbox } from '../../ExamplesLightbox';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAtom } from 'jotai';
import { geoLocationStateAtom } from '@/atoms/inputStateAtoms';

const CustomInput = ({ name, placeholder, onChange, className = '', type = 'text', ...props }) => (
  <div className="space-y-2">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={`w-full px-4 py-3.5 bg-orange-50 border-2 border-orange-200 
      rounded-lg shadow-sm focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 
      text-gray-700 placeholder-gray-400
      transition-all duration-200 
      hover:border-orange-300 hover:shadow-md 
      focus:outline-none ${className}`}
      {...props}
    />
  </div>
);

export const GeoLocation = ({ handleInputChange }) => {
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [ geoState, setGeoState ] = useAtom(geoLocationStateAtom)

  const config = {
    label: 'GPS Coordinates',
    icon: MapPin,
    helperText: 'Create a QR code for a specific location',
    tooltip: 'Generate a QR code that opens location coordinates in maps',
    gradientFrom: 'from-[#F7931E]',
    gradientTo: 'to-orange-600',
    sections: [
      {
        title: 'Location Details',
        icon: Navigation,
        fields: [
          {
            name: 'Latitude',
            placeholder: 'Latitude',
            type: 'text',
            description: 'Enter the latitude coordinate',
            examples: ['40.7128', '51.5074', '-33.8688']
          },
          {
            name: 'Longitude',
            placeholder: 'Longitude',
            type: 'text',
            description: 'Enter the longitude coordinate',
            examples: ['-74.0060', '-0.1278', '151.2093']
          }
        ]
      }
    ]
  };

  const handleChange = (event, fieldName) => {
    const value = event.target.value;
    setGeoState((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
    handleInputChange(fieldName, value)
  };

  return (
    <div>
    <BaseQRInput
      config={config}
      handleInputChange={handleInputChange}
      renderContent={() => (
        <div className="space-y-6">
          {config.sections.map((section, sectionIndex) => (
            <Disclosure key={sectionIndex} defaultOpen={true} as="div" className="mt-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 py-4 text-left hover:from-orange-100 hover:to-orange-200/50 transition-all duration-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <section.icon className="w-5 h-5 text-[#F7931E]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Enter location coordinates</p>
                      </div>
                    </div>
                    <ChevronDownIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-6 w-6 text-[#F7931E] transition-transform duration-200`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-4 bg-white rounded-lg shadow-sm p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="col-span-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                              {field.placeholder}
                            </Label>
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentField(field);
                                setIsExamplesOpen(true);
                              }}
                              className="ml-2 inline-flex items-center rounded-full p-1 text-[#F7931E] hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                            >
                              <Info className="h-4 w-4" />
                            </button>                            
                          </div>                         
                          <CustomInput
                            name={field.name}
                            placeholder={field.placeholder}
                            value={geoState[field.name] || ''}
                            onChange={(e) => handleChange(e, field.name)}
                            type={field.type}
                          />
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      )}
    />
    {isExamplesOpen && currentField && (
        <ExamplesLightbox
          isOpen={isExamplesOpen}
          closeModal={() => setIsExamplesOpen(false)}
          title={`Example ${currentField.placeholder}`}
          description={currentField.description}
          examples={currentField.examples}
          onSelect={(example) => {
            handleChange({ target: { value: example } }, currentField.name);
            setIsExamplesOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default GeoLocation;
