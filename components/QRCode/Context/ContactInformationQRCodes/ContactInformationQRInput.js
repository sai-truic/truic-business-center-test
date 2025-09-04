import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, UserCircle, Building2, MapPin, Globe, Info, Edit3, Contact } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import BaseQRInput from '../Common/BaseQRInput';
import { validateEmail } from '../../utils/validation';
import { ExamplesLightbox } from '../../ExamplesLightbox';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AutoResizeTextArea } from '../../components/AutoResizeTextArea';
import AIEditor from '@/components/ui/AIEditor';
import { useAtom } from 'jotai';
import { vCardStateAtom, meCardStateAtom, phoneNumberStateAtom, emailStateAtom, smsStateAtom } from '@/atoms/inputStateAtoms'

const CustomInput = ({ name, placeholder, onChange, className = '', type = 'text', error = '', ...props }) => (
  <div className="space-y-2">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={`w-full px-4 py-3.5 bg-orange-50 border-2 
        ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-orange-200'}
        rounded-lg shadow-sm focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 
        text-gray-700 placeholder-gray-400
        transition-all duration-200 
        hover:border-orange-300 hover:shadow-md 
        focus:outline-none ${className}`}
      {...props}
    />
    {error && (
      <p className="text-sm text-red-600 mt-1">{error}</p>
    )}
  </div>
);

// Helper function to strip HTML and format text
const stripHTMLAndFormat = (htmlString) => {
  if (!htmlString) return '';
  
  // Replace common HTML elements with appropriate line breaks
  let text = htmlString
    // Replace paragraph breaks with double newline
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    // Replace single breaks with newline
    .replace(/<br\s*\/?>/gi, '\n')
    // Replace paragraphs with their content
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n')
    // Remove all other HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Remove multiple consecutive line breaks
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Trim whitespace
    .trim();

  return text;
};

const ContactInformationQRInput = ({ type, handleInputChange }) => {
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [contactState, setContactState] = useAtom(
    type === 'VCard' ? vCardStateAtom :
    type === 'MeCard' ? meCardStateAtom : 
    type === 'Phone Number' ? phoneNumberStateAtom :
    type === 'Email' ? emailStateAtom :
    type === 'SMS' ? smsStateAtom :
    vCardStateAtom
  );

  const inputConfig = {
    'Phone Number': {
      label: 'Phone Number',
      placeholder: 'Enter your phone number...',
      name: 'PhoneNumber',
      icon: Phone,
      helperText: 'Create a QR code for your contact number',
      tooltip: 'Generate a QR code that allows direct calling when scanned',
      examples: ['+1 (555) 123-4567', '555-123-4567', '+44 20 7123 4567'],
      gradientFrom: 'from-[#F7931E]',
      gradientTo: 'to-orange-600',
      type: 'tel'
    },
    'Email': {
      label: 'Email Message',
      icon: Mail,
      helperText: 'Create a QR code that opens email composition',
      tooltip: 'Generate a QR code that opens email client when scanned',
      gradientFrom: 'from-[#F7931E]',
      gradientTo: 'to-orange-600',
      sections: [
        {
          title: 'Email Details',
          icon: Mail,
          fields: [
            { name: 'EmailEmails', placeholder: 'Recipient Email Address', type: 'email' },
            { name: 'EmailSubjects', placeholder: 'Email Subject', type: 'text' },
            { name: 'EmailMessages', placeholder: 'Enter your Email Message here...', type: 'textarea', useAIEditor: true }
          ]
        }
      ],
      examples: {
        emails: ['contact@business.com', 'support@company.com', 'info@example.com'],
        subjects: ['Product Inquiry', 'Support Request', 'General Question'],
        messages: [
          'I would like to learn more about your products and services.',
          'Please contact me regarding your business solutions.',
          'I am interested in scheduling a consultation.'
        ]
      }
    },
    'SMS': {
      label: 'SMS Message',
      icon: MessageSquare,
      helperText: 'Create a QR code for sending SMS messages',
      tooltip: 'Generate a QR code that opens SMS composition when scanned',
      gradientFrom: 'from-[#F7931E]',
      gradientTo: 'to-orange-600',
      sections: [
        {
          title: 'Message Details',
          icon: MessageSquare,
          fields: [
            { 
              name: 'SMSPhone', 
              placeholder: 'Recipient Phone Number', 
              type: 'tel',
              description: 'Enter a phone number to send the SMS to',
              examples: ['+1 (555) 123-4567', '+1 (555) 987-6543', '+1 (555) 246-8135']
            },
            { 
              name: 'SMSMessage', 
              placeholder: 'Message Content', 
              type: 'textarea',
              useAIEditor: true,
              description: 'Type the message you want to send',
              examples: [
                'Hi! Please call me back when you have a moment.',
                'Thanks for your business! Let us know if you need anything.',
                'Your appointment is confirmed for tomorrow.',
                'Meeting reminder: Team sync at 2 PM',
                'Order #12345 has been shipped!'
              ]
            }
          ]
        }
      ]
    },
    'vCard': {
      label: 'Digital Business Card',
      icon: UserCircle,
      helperText: 'Create your professional vCard QR code',
      tooltip: 'Generate a QR code containing your complete contact information',
      gradientFrom: 'from-[#F7931E]',
      gradientTo: 'to-orange-600',
      sections: [
        {
          title: 'Personal Information',
          icon: UserCircle,
          fields: [
            { name: 'vCardFN', placeholder: 'First Name', type: 'text', half: true },
            { name: 'vCardLN', placeholder: 'Last Name', type: 'text', half: true },
            { name: 'vCardEmail', placeholder: 'Email Address', type: 'email' },
            { name: 'vCardMobile', placeholder: 'Mobile Number', type: 'tel' },
            { name: 'vCardPhone', placeholder: 'Phone Number', type: 'tel', half: true },
            { name: 'vCardFax', placeholder: 'Fax Number', type: 'tel', half: true }
          ]
        },
        {
          title: 'Company Details',
          icon: Building2,
          fields: [
            { name: 'vCardCompany', placeholder: 'Company Name', type: 'text', half: true },
            { name: 'vCardDesignation', placeholder: 'Job Title', type: 'text', half: true }
          ]
        },
        {
          title: 'Address',
          icon: MapPin,
          fields: [
            { name: 'vCardStreet', placeholder: 'Street Address', type: 'text' },
            { name: 'vCardCity', placeholder: 'City', type: 'text', half: true },
            { name: 'vCardZip', placeholder: 'ZIP Code', type: 'text', half: true },
            { name: 'vCardState', placeholder: 'State/Province', type: 'text', half: true },
            { name: 'vCardCountry', placeholder: 'Country', type: 'text', half: true }
          ]
        },
        {
          title: 'Online Presence',
          icon: Globe,
          fields: [
            { name: 'vCardWebsite', placeholder: 'Website URL', type: 'url' }
          ]
        }
      ],
      examples: {
        fn: ['John', 'Sarah', 'Michael'],
        ln: ['Smith', 'Johnson', 'Williams'],
        email: ['john.smith@example.com', 'sarah.j@company.com', 'michael.w@business.com'],
        mobile: ['+1 (555) 123-4567', '+1 (555) 987-6543', '+1 (555) 246-8135'],
        phone: ['+1 (555) 234-5678', '+1 (555) 876-5432', '+1 (555) 135-7924'],
        fax: ['+1 (555) 345-6789', '+1 (555) 765-4321', '+1 (555) 924-6813'],
        company: ['Tech Solutions Inc.', 'Global Innovations LLC', 'Creative Designs Co.'],
        designation: ['Software Engineer', 'Marketing Director', 'Product Manager'],
        street: ['123 Main Street', '456 Business Ave', '789 Corporate Blvd'],
        city: ['New York', 'San Francisco', 'Chicago'],
        zip: ['10001', '94105', '60601'],
        state: ['NY', 'CA', 'IL'],
        country: ['United States', 'Canada', 'United Kingdom'],
        website: ['https://www.company.com', 'https://www.business.net', 'https://www.enterprise.org']
      }
    },
    'MeCard': {                                                                                                                                                           
      label: 'Personal Contact Card',                                                                                                                                     
      icon: UserCircle,                                                                                                                                                   
      helperText: 'Create a simple MeCard QR code',                                                                                                                       
      tooltip: 'Generate a QR code that creates a MeCard when scanned',                                                                                                   
      gradientFrom: 'from-[#F7931E]',                                                                                                                                      
      gradientTo: 'to-orange-600',
      sections: [                                                                                                                                                         
        {                                                                                                                                                                 
          title: 'Personal Information',                                                                                                                                  
          icon: UserCircle,                                                                                                                                               
          fields: [                                                                                                                                                       
            {                                                                                                                                                             
              name: 'MeCardFirstName',                                                                                                                                    
              placeholder: 'First Name',                                                                                                                                  
              type: 'text',                                                                                                                                               
              description: 'Enter your first name',                                                                                                                       
              examples: ['John', 'Jane', 'Robert']                                                                                                                        
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardLastName',                                                                                                                                     
              placeholder: 'Last Name',                                                                                                                                   
              type: 'text',                                                                                                                                               
              description: 'Enter your last name',                                                                                                                        
              examples: ['Smith', 'Johnson', 'Williams']                                                                                                                  
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardNickname',                                                                                                                                     
              placeholder: 'Nickname',                                                                                                                                    
              type: 'text',                                                                                                                                               
              description: 'Enter your nickname',                                                                                                                         
              examples: ['J', 'Bob', 'Mike']                                                                                                                              
            }, 
            //TODO                                                                                                                                                           
            // {                                                                                                                                                             
            //   name: 'MeCardBirthday',                                                                                                                                     
            //   placeholder: 'Birthday (mm/dd/yyyy)',                                                                                                                       
            //   type: 'text',                                                                                                                                               
            //   description: 'Enter your birthday',                                                                                                                         
            //   examples: ['01/01/1990', '12/31/1985']                                                                                                                      
            // }                                                                                                                                                             
          ]                                                                                                                                                               
        },                                                                                                                                                                
        {                                                                                                                                                                 
          title: 'Contact Information',                                                                                                                                   
          icon: Phone,                                                                                                                                                    
          fields: [                                                                                                                                                       
            {                                                                                                                                                             
              name: 'MeCardPhone1',                                                                                                                                       
              placeholder: 'Primary Phone Number',                                                                                                                        
              type: 'tel',                                                                                                                                                
              description: 'Enter your primary phone number',                                                                                                             
              examples: ['1235551234', '+1-234-567-8900']                                                                                                                 
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardPhone2',                                                                                                                                       
              placeholder: 'Secondary Phone Number',                                                                                                                      
              type: 'tel',                                                                                                                                                
              description: 'Enter your secondary phone number',                                                                                                           
              examples: ['1235551234', '+1-234-567-8900']                                                                                                                 
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardPhone3',                                                                                                                                       
              placeholder: 'Additional Phone Number',                                                                                                                     
              type: 'tel',                                                                                                                                                
              description: 'Enter an additional phone number',                                                                                                            
              examples: ['1235551234', '+1-234-567-8900']                                                                                                                 
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardWebsite',                                                                                                                                      
              placeholder: 'Website URL',                                                                                                                                 
              type: 'url',                                                                                                                                                
              description: 'Enter your website URL',                                                                                                                      
              examples: ['https://truic.com', 'https://example.com']                                                                                                      
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardEmail',                                                                                                                                        
              placeholder: 'Email Address',                                                                                                                               
              type: 'email',                                                                                                                                              
              description: 'Enter your email address',                                                                                                                    
              examples: ['jane@doe.com', 'contact@example.com']                                                                                                           
            }                                                                                                                                                             
          ]                                                                                                                                                               
        },                                                                                                                                                                
        {                                                                                                                                                                 
          title: 'Address',                                                                                                                                               
          icon: MapPin,                                                                                                                                                   
          fields: [                                                                                                                                                       
            {                                                                                                                                                             
              name: 'MeCardStreet',                                                                                                                                       
              placeholder: 'Street Address',                                                                                                                              
              type: 'text',                                                                                                                                               
              description: 'Enter your street address',                                                                                                                   
              examples: ['123 Sesame St', '456 Main St']                                                                                                                  
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardUnit',                                                                                                                                         
              placeholder: 'Apt/Suite/Other',                                                                                                                             
              type: 'text',                                                                                                                                               
              description: 'Enter apartment or suite number',                                                                                                             
              examples: ['1F', 'Suite 100', 'Apt 4B']                                                                                                                     
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardCity',                                                                                                                                         
              placeholder: 'City',                                                                                                                                        
              type: 'text',                                                                                                                                               
              description: 'Enter your city',                                                                                                                             
              examples: ['New York City', 'Los Angeles']                                                                                                                  
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardState',                                                                                                                                        
              placeholder: 'State or Region',                                                                                                                             
              type: 'text',                                                                                                                                               
              description: 'Enter your state or region',                                                                                                                  
              examples: ['Michigan', 'California']                                                                                                                        
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardZip',                                                                                                                                          
              placeholder: 'ZIP/Postal Code',                                                                                                                             
              type: 'text',                                                                                                                                               
              description: 'Enter your ZIP or postal code',                                                                                                               
              examples: ['12345', '90210']                                                                                                                                
            },                                                                                                                                                            
            {                                                                                                                                                             
              name: 'MeCardCountry',                                                                                                                                      
              placeholder: 'Country',                                                                                                                                     
              type: 'text',                                                                                                                                               
              description: 'Enter your country',                                                                                                                          
              examples: ['US', 'Canada']                                                                                                                                  
            }                                                                                                                                                             
          ]                                                                                                                                                               
        },                                                                                                                                                                
        {                                                                                                                                                                 
          title: 'Additional Information',                                                                                                                                
          icon: Info,                                                                                                                                                     
          fields: [                                                                                                                                                       
            {                                                                                                                                                             
              name: 'MeCardMemo',                                                                                                                                         
              placeholder: 'Memo/Note',                                                                                                                                   
              type: 'text',                                                                                                                                               
              description: 'Add a brief note or memo',                                                                                                                    
              examples: ['Is cool.', 'Available Mon-Fri']                                                                                                                 
            }                                                                                                                                                             
          ]                                                                                                                                                               
        }                                                                                                                                                                 
      ]   
    }
  };

  const config = inputConfig[type] || inputConfig['Phone Number'];

  const handleExampleClick = (field, example) => {
    handleInputChange(field, example);
    setIsExamplesOpen(false);
  };

  const handleChange = (event, fieldName) => {
    const value = event.target.value;

    // Save value persistently in Jotai
    setContactState((prevState) => ({
      ...prevState,
      [fieldName]: value,  
    }));

    // Ensure the QR generator updates dynamically
    handleInputChange(fieldName, value); 
};

const handleEditorChange = (value, fieldName) => {
  setContactState((prevState) => ({
    ...prevState,
    [fieldName]: value
  }));
  
  handleInputChange(fieldName, value);
};

  return (
    <div>
      <BaseQRInput
        config={config}
        handleInputChange={handleInputChange}
        renderContent={() => (
          <div className="space-y-6">
            {config.sections ? (
              // Render vCard sections
              config.sections.map((section, sectionIndex) => (
                <Disclosure key={sectionIndex} as="div" className="mt-4">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 py-4 text-left hover:from-orange-100 hover:to-orange-200/50 transition-all duration-200 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <section.icon className="w-5 h-5 text-[#F7931E]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Click to expand</p>
                          </div>
                        </div>
                        <ChevronDownIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-6 w-6 text-[#F7931E] transition-transform duration-200`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-4 bg-white rounded-lg shadow-sm p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className={field.half ? 'sm:col-span-1' : 'sm:col-span-2'}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                              {field.placeholder}
                            </Label>
                          </div>
                        </div>
                        {field.useAIEditor ? (
                          <AIEditor
                            key={fieldIndex}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={contactState[field.name] || ''}
                            onChange={(value) => handleEditorChange(value, field.name)}
                            className="p-1 sm:p-1 md:p-1 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 min-h-[100px] shadow-sm hover:shadow-md hover:border-orange-300"
                            showToolbar={false}
                          />
                        ) : (
                          <>
                          <CustomInput
                            key={fieldIndex}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={contactState[field.name] || ''}  // Load stored value from Jotai
                            onChange={(e) => handleChange(e, field.name)}
                            type={field.type}
                          />
                          </>
                        )}
                      </div>
                    ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))
            ) : (
              // Render default input for other types
              <>
                <CustomInput
                  name={config.name}
                  placeholder={config.placeholder}
                  value={contactState[config.name] || ''}  // Load stored value from Jotai
                  onChange={(e) => handleChange(e, config.name)}
                  type={config.type}
                />
              </>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ContactInformationQRInput;
