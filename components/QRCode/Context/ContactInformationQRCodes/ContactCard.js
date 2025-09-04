import { useState, useEffect } from 'react';
import { UserCircle, CreditCard } from 'lucide-react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import ContactInformationQRInput from './ContactInformationQRInput';
import useInputState from '@/components/useInputState';

const cardOptions = [
  {
    value: 'vCard',
    label: 'Virtual Business Card (vCard)',
    description: 'Full business contact information with company details',
    icon: CreditCard,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    hoverBg: 'hover:bg-purple-100'
  },
  {
    value: 'MeCard',
    label: 'Personal Contact Card (MeCard)',
    description: 'Simple personal contact information format',
    icon: UserCircle,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500',
    hoverBg: 'hover:bg-pink-100'
  }
];

export const ContactCard = ({ handleInputChange, initialSelection = 'vCard' }) => {
  // Find the initial option based on initialSelection                                                                                            
  const getInitialOption = () => {                                                                                                                
  if (initialSelection === 'vCard' || initialSelection === 'MeCard') {                                                                          
      return cardOptions.find(option => option.value === initialSelection) || cardOptions[0];                                                     
    }                                                                                                                                             
    return cardOptions[0]; // Default to first option (vCard)                                                                                     
  }; 
  const [selected, setSelected] = useState(getInitialOption());
  const [isOpen, setIsOpen] = useState(false);
  const { setQrMenuSelected } = useInputState();

  // Update selected option when initialSelection changes                                                                                         
  useEffect(() => {                                                                                                                               
      const newOption = cardOptions.find(option => option.value === initialSelection);                                                              
      if (newOption) {                                                                                                                              
        setSelected(newOption);                                                                                                                     
      }                                                                                                                                             
  }, [initialSelection]);

  const handleSelection = (option) => {
    setSelected(option);
    setIsOpen(false);
    setQrMenuSelected(option.value);
  };

  // console.log("Updated Menu Selected :", selected)

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Choose Contact Card Type</h2>
          <p className="mt-1 text-sm text-gray-500">
            Select the format that best suits your contact information needs
          </p>
        </div>

        <div className="relative mt-2">
          <button
            type="button"
            className="relative w-full rounded-lg bg-white py-4 pl-4 pr-10 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${selected.bgColor} mr-3`}>
                <selected.icon className={`h-5 w-5 ${selected.iconColor}`} />
              </div>
              <div className="flex flex-col text-left">
                <span className="block text-sm font-medium text-gray-900">
                  {selected.label}
                </span>
                <span className="block text-sm text-gray-500">
                  {selected.description}
                </span>
              </div>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-full rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="max-h-60 overflow-auto">
                {cardOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      className={`w-full text-left px-4 py-3 ${option.hoverBg} transition-colors duration-200 ${
                        selected.value === option.value ? option.bgColor : ''
                      }`}
                      onClick={() => handleSelection(option)}
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

      <div className="mt-6">
        <ContactInformationQRInput 
          type={selected.value} 
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ContactCard;
