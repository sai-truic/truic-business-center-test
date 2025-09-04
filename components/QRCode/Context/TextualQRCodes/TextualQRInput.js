import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { textualQRStateAtom } from '@/atoms/inputStateAtoms';
import { Link2, FileText, Notebook, AlertCircle } from 'lucide-react';
import BaseQRInput from '../Common/BaseQRInput';
import { AutoResizeTextArea } from '../../components/AutoResizeTextArea';
import { validateHttpsUrl } from '../../utils/validation';
import AIEditor from '@/components/ui/AIEditor';

const CustomInput = ({ name, placeholder, onChange, className = '', error = '', type = 'text', ...props }) => (
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

const CustomTextArea = ({ name, placeholder, onChange, className = '', ...props }) => (
  <AutoResizeTextArea
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    className={`w-full px-4 py-3.5 bg-orange-50 border-2 border-orange-200 
    rounded-lg shadow-sm focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 
    text-gray-700 placeholder-gray-400
    transition-all duration-200 
    hover:border-orange-300 hover:shadow-md 
    focus:outline-none ${className}`}
    minHeight={150}
    maxHeight={400}
    {...props}
  />
);

const ExamplesSection = ({ examples, onExampleClick }) => (
  <div className="mt-6 bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
    <div className="flex items-center gap-2 mb-3">
      <AlertCircle className="w-4 h-4 text-[#F7931E]" />
      <span className="text-sm font-medium text-gray-700">Helpful Examples</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {examples.map((example, index) => (
        <button
          key={index}
          onClick={() => onExampleClick(example)}
          className="px-4 py-2 text-sm font-medium text-gray-600 
          bg-white hover:bg-orange-50 hover:text-[#F7931E]
          rounded-lg transition-all duration-200 
          shadow-sm hover:shadow-md border-2 border-orange-200 hover:border-[#F7931E]
          transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {example}
        </button>
      ))}
    </div>
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

const TextualQRInput = ({ type, handleInputChange }) => {
  const inputConfig = {
    'URL': {
      label: 'Website URL',
      placeholder: 'Enter your website URL here...',
      name: 'URL',
      icon: Link2,
      helperText: 'Enter the complete URL including https://',
      tooltip: 'Generate a QR code that links directly to your website',
      useTextArea: false,
      examples: ['https://example.com', 'https://mywebsite.com/blog'],
      gradientFrom: 'from-[#F7931E]',
      gradientTo: 'to-orange-600'
    },
    'Plain Text': {
      label: 'Text Content',
      placeholder: 'Enter your text message here...',
      name: 'PlainText',
      icon: FileText,
      helperText: 'Type any text you want to encode in the QR code',
      tooltip: 'Create a QR code containing any text message or information',
      useTextArea: true,
      examples: ['Welcome to our store!', 'Special offer: 20% off'],
      gradientFrom: 'from-[#F7931E]',
      gradientTo: 'to-orange-600'
    },
    'Apple Notes': {
      label: 'Notes Content',
      placeholder: 'Enter your Apple Notes content here...',
      name: 'AppleNotes',
      icon: Notebook,
      helperText: 'Enter the text you want to save in Apple Notes',
      tooltip: 'Generate a QR code that creates a new note in Apple Notes when scanned',
      useTextArea: true,
      examples: ['Shopping list', 'Meeting agenda'],
      gradientFrom: 'from-[#F7931E]',
      gradientTo: 'to-orange-600'
    }
  };

  const config = inputConfig[type] || inputConfig['Plain Text'];

  const [inputError, setInputError] = useState('');

  const [textualState, setTextualState ] = useAtom(textualQRStateAtom);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log("Value:", value);
    console.log("Config Name:", config.name);
    setTextualState(prev => ({ ...prev, [config.name]: value }));
    handleInputChange(config.name, value);
    handleInputChange('ValueText', value);
  };

  const handleBlur = () => {
    if (config.name === 'URL') {
      const url = textualState[config.name] || '';
      if (!validateHttpsUrl(url)) {
        setInputError('Please enter a valid HTTPS URL (e.g., https://example.com)');
      } else {
        setInputError('');
      }
    }
  };

  const handleExampleClick = (example) => {
    if (example) {
      handleInputChange(config.name, example);
    }
  };

  return (
    <BaseQRInput
      config={config}
      handleInputChange={handleInputChange}
      renderContent={() => (
        <div className="space-y-6">
          {config.useTextArea ? (
            <AIEditor
            aiEnabled={false}
            placeholder={config.placeholder}
            value={textualState[config.name] || ''}
            onChange={(value) => {
              setTextualState(prev => ({ ...prev, [config.name]: value }));  // Store AIEditor value
              handleInputChange(config.name, stripHTMLAndFormat(value))
            }}
            className="p-1 sm:p-1 md:p-1 form-input block w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 min-h-[100px] shadow-sm hover:shadow-md hover:border-orange-300"
            showToolbar={false}
          />
          ) : (
            <CustomInput
              name={config.name}
              placeholder={config.placeholder}
              value={textualState[config.name] || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={inputError}
              type={config.name === 'URL' ? 'url' : 'text'}
            />
          )}
          
          {/* {config.examples && (
            <ExamplesSection 
              examples={config.examples} 
              onExampleClick={handleExampleClick}
            />
          )} */}
        </div>
      )}
    />
  );
};

export default TextualQRInput;
