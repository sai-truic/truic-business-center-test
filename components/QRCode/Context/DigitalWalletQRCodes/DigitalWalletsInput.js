import React, { useEffect} from 'react';
import { Wallet, DollarSign, MessageSquare, Lock, Info } from 'lucide-react';
import BaseQRInput from '../Common/BaseQRInput';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ExamplesLightbox } from '../../ExamplesLightbox';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAtom } from 'jotai';
import { digitalWalletsStateAtom } from '@/atoms/inputStateAtoms';

const DigitalWalletsInput = ({ type, handleInputChange }) => {
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [ walletState, setWalletState ] = useAtom(digitalWalletsStateAtom);
  const inputConfig = {
    'Bitcoin': {
      label: 'Bitcoin Wallet',
      icon: Wallet,
      helperText: 'Create a QR code for Bitcoin transactions',
      tooltip: 'Generate a QR code for Bitcoin payments',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-yellow-600',
      sections: [
        {
          title: 'Wallet Details',
          icon: Lock,
          fields: [
            { 
              name: 'bitcoinWallet', 
              placeholder: 'Wallet Address', 
              type: 'text',
              description: 'Enter your Bitcoin wallet address',
              examples: [
                '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
                '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
                'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'
              ]
            }
          ]
        },
        {
          title: 'Transaction Details',
          icon: DollarSign,
          fields: [
            { 
              name: 'bitcoinAmount', 
              placeholder: 'Amount in USD', 
              type: 'text',
              description: 'Enter the amount in USD',
              examples: ['100', '500', '1000']
            }
          ]
        },
        {
          title: 'Additional Information',
          icon: MessageSquare,
          fields: [
            { 
              name: 'bitcoinMessage', 
              placeholder: 'Transaction Message', 
              type: 'text',
              description: 'Add an optional message for this transaction',
              examples: [
                'Payment for services',
                'Monthly subscription',
                'Product purchase'
              ]
            }
          ]
        }
      ]
    },
    'BitcoinCash': {
      label: 'Bitcoin Cash Wallet',
      icon: Wallet,
      helperText: 'Create a QR code for Bitcoin Cash transactions',
      tooltip: 'Generate a QR code for Bitcoin Cash payments',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-emerald-600',
      sections: [
        {
          title: 'Wallet Details',
          icon: Lock,
          fields: [
            { 
              name: 'bitcoinCashWallet', 
              placeholder: 'Wallet Address', 
              type: 'text',
              description: 'Enter your Bitcoin Cash wallet address',
              examples: [
                'qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a',
                'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a'
              ]
            }
          ]
        },
        {
          title: 'Transaction Details',
          icon: DollarSign,
          fields: [
            { 
              name: 'bitcoinCashAmount', 
              placeholder: 'Amount in USD', 
              type: 'text',
              description: 'Enter the amount in USD',
              examples: ['100', '500', '1000']
            }
          ]
        },
        {
          title: 'Additional Information',
          icon: MessageSquare,
          fields: [
            { 
              name: 'bitcoinCashMessage', 
              placeholder: 'Transaction Message', 
              type: 'text',
              description: 'Add an optional message for this transaction',
              examples: [
                'Payment for services',
                'Monthly subscription',
                'Product purchase'
              ]
            }
          ]
        }
      ]
    },
    'Dash': {
      label: 'Dash Wallet',
      icon: Wallet,
      helperText: 'Create a QR code for Dash transactions',
      tooltip: 'Generate a QR code for Dash payments',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-indigo-600',
      sections: [
        {
          title: 'Wallet Details',
          icon: Lock,
          fields: [
            { 
              name: 'DashWallet', 
              placeholder: 'Wallet Address', 
              type: 'text',
              description: 'Enter your Dash wallet address',
              examples: [
                'XpESxaUmonkq8RaLLp46Brx2K39ggQe226',
                'Xm1d3kjpCDRe9MLFFv5cBRKGDUC1ZKyF1X'
              ]
            }
          ]
        },
        {
          title: 'Transaction Details',
          icon: DollarSign,
          fields: [
            { 
              name: 'DashAmount', 
              placeholder: 'Amount in USD', 
              type: 'text',
              description: 'Enter the amount in USD',
              examples: ['100', '500', '1000']
            }
          ]
        },
        {
          title: 'Additional Information',
          icon: MessageSquare,
          fields: [
            { 
              name: 'DashMessage', 
              placeholder: 'Transaction Message', 
              type: 'text',
              description: 'Add an optional message for this transaction',
              examples: [
                'Payment for services',
                'Monthly subscription',
                'Product purchase'
              ]
            }
          ]
        }
      ]
    },
    'Ether': {
      label: 'Ethereum Wallet',
      icon: Wallet,
      helperText: 'Create a QR code for Ethereum transactions',
      tooltip: 'Generate a QR code for Ethereum payments',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-violet-600',
      sections: [
        {
          title: 'Wallet Details',
          icon: Lock,
          fields: [
            { 
              name: 'EtherWallet', 
              placeholder: 'Wallet Address', 
              type: 'text',
              description: 'Enter your Ethereum wallet address',
              examples: [
                '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
              ]
            }
          ]
        },
        {
          title: 'Transaction Details',
          icon: DollarSign,
          fields: [
            { 
              name: 'EtherAmount', 
              placeholder: 'Amount in USD', 
              type: 'text',
              description: 'Enter the amount in USD',
              examples: ['100', '500', '1000']
            }
          ]
        },
        {
          title: 'Additional Information',
          icon: MessageSquare,
          fields: [
            { 
              name: 'EtherMessage', 
              placeholder: 'Transaction Message', 
              type: 'text',
              description: 'Add an optional message for this transaction',
              examples: [
                'Payment for services',
                'Monthly subscription',
                'Product purchase'
              ]
            }
          ]
        }
      ]
    },
    'Litecoin': {
      label: 'Litecoin Wallet',
      icon: Wallet,
      helperText: 'Create a QR code for Litecoin transactions',
      tooltip: 'Generate a QR code for Litecoin payments',
      gradientFrom: 'from-slate-500',
      gradientTo: 'to-gray-600',
      sections: [
        {
          title: 'Wallet Details',
          icon: Lock,
          fields: [
            { 
              name: 'LiteCoinWallet', 
              placeholder: 'Wallet Address', 
              type: 'text',
              description: 'Enter your Litecoin wallet address',
              examples: [
                'LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9',
                'LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9'
              ]
            }
          ]
        },
        {
          title: 'Transaction Details',
          icon: DollarSign,
          fields: [
            { 
              name: 'LiteCoinAmount', 
              placeholder: 'Amount in USD', 
              type: 'text',
              description: 'Enter the amount in USD',
              examples: ['100', '500', '1000']
            }
          ]
        },
        {
          title: 'Additional Information',
          icon: MessageSquare,
          fields: [
            { 
              name: 'LiteCoinMessage', 
              placeholder: 'Transaction Message', 
              type: 'text',
              description: 'Add an optional message for this transaction',
              examples: [
                'Payment for services',
                'Monthly subscription',
                'Product purchase'
              ]
            }
          ]
        }
      ]
    }
  };
  

  const config = inputConfig[type] || inputConfig['Bitcoin'];

  const handleChange = (eventOrValue, fieldName) => {
    let value;

    // If eventOrValue is an event, extract the value
    if (eventOrValue?.target) {
        value = eventOrValue.target.value;
    } else {
        // If it's a direct value (from onSelect), use it as is
        value = eventOrValue;
    }

    // Ensure fieldName is valid
    if (!fieldName) return;

    // Update Jotai state for digital wallets
    setWalletState((prev) => ({
        ...prev,
        [fieldName]: value
    }));

    // Ensure QR code updates properly
    if (handleInputChange) {
        handleInputChange(fieldName, value);
    }
};


  return (
    <div>
      <BaseQRInput
        config={config}
        handleInputChange={handleInputChange}
        renderContent={() => (
          <div className="space-y-6">
            {config.sections.map((section, sectionIndex) => (
              <Disclosure key={sectionIndex} as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50 px-4 py-4 text-left hover:from-orange-100 hover:to-yellow-100 transition-all duration-200 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <section.icon className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">Click to expand</p>
                        </div>
                      </div>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-6 w-6 text-orange-500 transition-transform duration-200`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-6 pb-4 bg-white rounded-b-lg shadow-sm">
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
                                className="ml-2 inline-flex items-center rounded-full p-1 text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                              >
                                <Info className="h-4 w-4" />
                              </button>
                            </div>
                            <Input
                              type={field.type}
                              id={field.name}
                              name={field.name}
                              placeholder={field.placeholder}
                              value={walletState[field.name] || ''}
                              onChange={(e) => handleChange(e, field.name)}
                              className="mt-1 w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 rounded-lg shadow-sm transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white focus:ring-2 focus:ring-orange-500/20"
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
        title={`Example ${currentField?.placeholder || ''}`}
        description={currentField?.description || ''}
        examples={currentField?.examples || []}
        onSelect={(example) => {
          handleChange(example, currentField?.name); // Use correct name and value
          setIsExamplesOpen(false);
        }}
      />
      )}
    </div>
  );
};

export default DigitalWalletsInput;
