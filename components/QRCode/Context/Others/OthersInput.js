import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Info, ShieldCheck, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { usePopper } from 'react-popper';
import { Label } from '@/components/ui/label';
import BaseQRInput from '../Common/BaseQRInput';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ExamplesLightbox } from '../../ExamplesLightbox';
import { wifiStateAtom } from '@/atoms/inputStateAtoms';
import { useAtom } from 'jotai';

const CustomInput = ({ name, placeholder, onChange, className = '', type = 'text', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
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
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F7931E] hover:text-orange-600 transition-colors duration-200"
        >
          {showPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
};

const authOptions = [
  {
    value: 'WPA',
    label: 'WPA/WPA2',
    description: 'Most secure, recommended for home networks',
    icon: ShieldCheck,
    bgColor: 'bg-orange-50',
    iconColor: 'text-[#F7931E]',
    hoverBg: 'hover:bg-orange-100'
  },
  {
    value: 'WEP',
    label: 'WEP',
    description: 'Legacy security, not recommended',
    icon: Lock,
    bgColor: 'bg-orange-50',
    iconColor: 'text-[#F7931E]',
    hoverBg: 'hover:bg-orange-100'
  },
  {
    value: 'None',
    label: 'None (Open Network)',
    description: 'No security, public access',
    icon: Unlock,
    bgColor: 'bg-orange-50',
    iconColor: 'text-[#F7931E]',
    hoverBg: 'hover:bg-orange-100'
  }
];

const WifiQRInput = ({ handleInputChange }) => {
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [selectedAuth, setSelectedAuth] = useState(authOptions[0]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [wifiState, setWifiState] = useAtom(wifiStateAtom)
  const dropdownRef = useRef(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAuthOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
    ],
  });

  const handleAuthSelection = (option) => {
    setSelectedAuth(option);
    setIsAuthOpen(false);
    handleInputChange('wifiAuthentication', option.value);
  };

  const config = {
    label: 'WiFi Network',
    icon: Wifi,
    helperText: 'Create a QR code for WiFi network access',
    tooltip: 'Generate a QR code that connects to WiFi when scanned',
    gradientFrom: 'from-[#F7931E]',
    gradientTo: 'to-orange-600',
    sections: [
      {
        title: 'Network Details',
        icon: Wifi,
        fields: [
          {
            name: 'wifiName',
            placeholder: 'Network Name (SSID)',
            type: 'text',
            examples: ['MyHomeNetwork', 'Office_WiFi', 'Guest_Network', 'Home_5G', 'Visitor_Network']
          },
          {
            name: 'wifiPassword',
            placeholder: 'Password',
            type: 'password',
          }
        ]
      }
    ]
  };

  const handleChange = (event, config_name) => {
    const value = event.target.value;
    setWifiState((prev) => ({ ...prev, [config_name]: value }));
    handleInputChange(config_name, value); 
    const wifiSSID = event.target.form?.wifiName?.value || ""; 
    const wifiPass = event.target.form?.wifiPassword?.value || "";
    if (config_name === 'wifiName' || config_name === 'wifiPassword') {
        handleInputChange('ValueText', `WIFI:T:${selectedAuth.value};S:${wifiSSID};P:${wifiPass};H:false;;`);
    }
  }

  return (
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
                        <p className="text-sm text-gray-500 mt-0.5">Configure your WiFi network</p>
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
                        <div key={fieldIndex} className="space-y-2">
                          <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                            {field.placeholder}
                          </Label>
                          {field.description && (
                            <p className="text-xs text-gray-500">{field.description}</p>
                          )}
                          <CustomInput
                            name={field.name}
                            type={field.type || 'text'}
                            value = {wifiState[field.name] || ''}
                            placeholder={field.placeholder}
                            onChange={(e) => handleChange(e,field.name)}
                          />
                        </div>
                      ))}
                      
                      {/* Authentication Type Dropdown */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium text-gray-700">
                            Authentication Type
                          </Label>
                        </div>
                        <div className="relative mt-1" ref={dropdownRef}>
                          <button
                            ref={setReferenceElement}
                            type="button"
                            className="relative w-full rounded-lg bg-orange-50 py-4 pl-4 pr-10 border-2 border-orange-200 hover:border-orange-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 shadow-sm"
                            onClick={() => setIsAuthOpen(!isAuthOpen)}
                          >
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg ${selectedAuth.bgColor} mr-3`}>
                                <selectedAuth.icon className={`h-5 w-5 ${selectedAuth.iconColor}`} />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="block text-sm font-medium text-gray-900">
                                  {selectedAuth.label}
                                </span>
                                <span className="block text-sm text-gray-500">
                                  {selectedAuth.description}
                                </span>
                              </div>
                            </div>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <ChevronUpDownIcon className="h-5 w-5 text-[#F7931E]" aria-hidden="true" />
                            </span>
                          </button>

                          {isAuthOpen && (
                            <div
                              ref={setPopperElement}
                              style={styles.popper}
                              {...attributes.popper}
                              className="z-50 w-full rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <div className="max-h-[300px] overflow-auto">
                                {authOptions.map((option) => {
                                  const Icon = option.icon;
                                  return (
                                    <button
                                      key={option.value}
                                      className={`w-full text-left px-4 py-3 ${option.hoverBg} transition-colors duration-200 ${
                                        selectedAuth.value === option.value ? option.bgColor : ''
                                      }`}
                                      onClick={() => handleAuthSelection(option)}
                                    >
                                      <div className="flex items-center">
                                        <div className={`p-2 rounded-lg ${option.bgColor} mr-3`}>
                                          <Icon className={`h-5 w-5 ${option.iconColor}`} />
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="block text-sm font-medium text-gray-900">
                                            {option.label}
                                          </span>
                                          <span className="block text-sm text-gray-500">
                                            {option.description}
                                          </span>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      )}
    />
  );
};

export default WifiQRInput;
