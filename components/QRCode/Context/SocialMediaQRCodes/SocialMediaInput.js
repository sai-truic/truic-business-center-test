import React, { useRef, useEffect } from 'react';
import { Youtube, Twitter, Facebook, Instagram, Globe, Share2, MessageSquare, Link, Info } from 'lucide-react';
import BaseQRInput from '../Common/BaseQRInput';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { validateSocialMediaUrl } from '../../utils/validation';
import { ExamplesLightbox } from '../../ExamplesLightbox';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AutoResizeTextArea } from '../../components/AutoResizeTextArea';
import useInputState from '@/components/useInputState';
import { useAtom } from 'jotai';
import { socialMediaStateAtom } from '@/atoms/inputStateAtoms';

const CustomInput = ({ name, placeholder, onChange, className = '', type = 'text', socialMediaType, ...props }) => {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const isInitialMount = useRef(true);

  // Reset value and error when social media type changes
  useEffect(() => {
    if (!isInitialMount.current) {
      setValue('');
      setError('');
    } else {
      isInitialMount.current = false;
    }
  }, [socialMediaType]);

  const validateTimeout = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (validateTimeout.current) {
      clearTimeout(validateTimeout.current);
    }

    validateTimeout.current = setTimeout(() => {
      if (type === 'email' && !validateEmail(newValue)) {
        setError('Please enter a valid email address');
        onChange(e); // Still call onChange but with invalid email
      } else if (type === 'tel' && newValue && !validatePhoneNumber(newValue)) {
        setError('Please enter a valid phone number');
        onChange(e); // Still call onChange but with invalid phone
      } else {
        setError('');
        onChange(e);
      }
    }, 500);
  };

  return (
    <div className="space-y-2">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
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
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

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

const SocialMediaInput = ({ type, handleInputChange, inputValues }) => {
  const { setQrMenuSelected } = useInputState();
  const [socialState, setSocialState] = useAtom(socialMediaStateAtom)
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [disabledFields, setDisabledFields] = useState({
    Youtube: { url: false, username: false },
    Twitter: { url: false, username: false }, 
    Instagram: { url: false, username: false },
    LinkedIn: { url: false, username: false }
  });

  const [inputMessages, setInputMessages] = useState({
    Youtube: '',
    Twitter: '',
    Instagram: '',
    LinkedIn: ''
  });

  // Reset messages when type changes
  useEffect(() => {
    setInputMessages(prev => ({
      ...prev,
      [type]: ''
    }));
  }, [type]);

  const inputConfig = {
    'Youtube': {
      label: 'YouTube Profile',
      icon: Youtube,
      helperText: 'Create a QR code for your YouTube channel or video',
      tooltip: 'Generate a QR code that links to your YouTube content',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-rose-600',
      sections: [
        {
          title: 'Channel Information',
          icon: Youtube,
          fields: [
            { 
              name: 'YoutubeURL', 
              placeholder: 'Channel or Video URL', 
              type: 'url',
              description: 'Enter your YouTube channel or video URL',
              examples: [
                'https://youtube.com/c/channelname',
                'https://youtube.com/watch?v=videoID',
                'https://youtu.be/shortURL'
              ]
            },
            { 
              name: 'YoutubeID', 
              placeholder: 'Channel Username/ID', 
              type: 'text',
              description: 'Enter your YouTube username or channel ID',
              examples: ['@username', 'ChannelName', 'UCxxxxxxxxxxxxxxxx']
            }
          ]
        }
      ]
    },
    'Twitter': {
      label: 'Twitter Profile',
      icon: Twitter,
      helperText: 'Create a QR code for your Twitter profile',
      tooltip: 'Generate a QR code that links to your Twitter account',
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-sky-500',
      sections: [
        {
          title: 'Profile Information',
          icon: Twitter,
          fields: [
            { 
              name: 'TwitterURL', 
              placeholder: 'Profile URL', 
              type: 'url',
              description: 'Enter your Twitter profile URL',
              examples: [
                'https://twitter.com/username',
                'https://x.com/username'
              ]
            },
            { 
              name: 'TwitterUserName', 
              placeholder: 'Username', 
              type: 'text',
              description: 'Enter your Twitter username (without @)',
              examples: ['username', 'handle', 'brandname']
            }
          ]
        }
      ]
    },
    'Instagram': {
      label: 'Instagram Profile',
      icon: Instagram,
      helperText: 'Create a QR code for your Instagram profile',
      tooltip: 'Generate a QR code that links to your Instagram account',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-500',
      sections: [
        {
          title: 'Profile Information',
          icon: Instagram,
          fields: [
            { 
              name: 'InstagramURL', 
              placeholder: 'Profile URL', 
              type: 'url',
              description: 'Enter your Instagram profile URL',
              examples: [
                'https://instagram.com/username',
                'https://www.instagram.com/username'
              ]
            },
            { 
              name: 'InstagramUserName', 
              placeholder: 'Username', 
              type: 'text',
              description: 'Enter your Instagram username (without @)',
              examples: ['username', 'brandname', 'company']
            }
          ]
        }
      ]
    },
    'Facebook': {
      label: 'Facebook Profile',
      icon: Facebook,
      helperText: 'Create a QR code for your Facebook profile or page',
      tooltip: 'Generate a QR code that links to your Facebook presence',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-blue-700',
      sections: [
        {
          title: 'Profile Information',
          icon: Facebook,
          fields: [
            { 
              name: 'Facebook', 
              placeholder: 'Profile/Page URL', 
              type: 'url',
              description: 'Enter your Facebook profile or page URL',
              examples: [
                'https://facebook.com/username',
                'https://fb.com/pagename',
                'https://facebook.com/pages/pagename'
              ]
            }
          ]
        }
      ]
    },
    'LinkedIn': {
      label: 'LinkedIn Profile',
      icon: Globe,
      helperText: 'Create a QR code for your LinkedIn profile',
      tooltip: 'Generate a QR code that links to your LinkedIn presence',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-sky-500',
      sections: [
        {
          title: 'Profile Information',
          icon: Share2,
          fields: [
            { 
              name: 'LinkedInURL', 
              placeholder: 'Profile URL', 
              type: 'url',
              description: 'Enter your LinkedIn profile URL',
              examples: [
                'https://linkedin.com/in/username',
                'https://www.linkedin.com/company/companyname'
              ]
            },
            { 
              name: 'LinkedInID', 
              placeholder: 'Username/ID', 
              type: 'text',
              description: 'Enter your LinkedIn username or company ID',
              examples: ['username', 'company-name', 'personal-brand']
            }
          ]
        }
      ]
    }
  };

  const config = inputConfig[type] || inputConfig['Youtube'];

  const buildSocialUrl = (type, urlValue, usernameValue) => {
    if (!urlValue && !usernameValue) return '';
    
    // If full URL is provided, use it directly
    if (urlValue) return urlValue;

    // Build URL from username
    switch(type) {
      case 'Youtube':
        return `https://youtube.com/${usernameValue.startsWith('@') ? usernameValue : '@' + usernameValue}`;
      case 'Twitter':
        return `https://twitter.com/${usernameValue.replace('@', '')}`;
      case 'Instagram':
        return `https://instagram.com/${usernameValue.replace('@', '')}`;
      case 'LinkedIn':
        return `https://linkedin.com/in/${usernameValue}`;
      default:
        return urlValue || '';
    }
  };

  const handleChange = (event, config_name) => {
    const value = event.target.value;
    console.log("Output Name:", config_name);
    console.log("Output Value:", value);

    console.log("Config Name :", config_name)
    setSocialState((prev) => ({...prev, [config_name]: value}))
    if (config_name === "YoutubeURL") {
        setQrMenuSelected("Youtube")
        handleInputChange("Youtube", value);
    } else if (config_name === "YoutubeID") {
        setQrMenuSelected("Youtube")
        const youtubeUrl = `https://www.youtube.com/watch?v=${value}`;
        handleInputChange("Youtube", youtubeUrl);
    } else if (config_name === "TwitterURL") {
        setQrMenuSelected("Twitter")
        handleInputChange("Twitter", value);
    } else if (config_name === "TwitterUserName") {
        setQrMenuSelected("Twitter")
        const twitterUrl = `https://twitter.com/${value}`;  // Using twitter.com instead of x.com for better compatibility
        handleInputChange("Twitter", twitterUrl);
    } else if (config_name === "InstagramURL") {
        setQrMenuSelected("Instagram")
        handleInputChange("Instagram", value);
    } else if (config_name === "InstagramUserName") {
        setQrMenuSelected("Instagram")
        const instagramUrl = `https://www.instagram.com/${value}`;
        handleInputChange("Instagram", instagramUrl);
    } else if (config_name === "LinkedInURL") {
        setQrMenuSelected("LinkedIn")
        handleInputChange("LinkedIn", value);
    } else if (config_name === "LinkedInID") {
        setQrMenuSelected("LinkedIn")
        const linkedInUrl = `https://www.linkedin.com/in/${value}`;
        handleInputChange("LinkedIn", linkedInUrl);
    } else if (config_name === "Facebook") {
        setQrMenuSelected("Facebook")
        if (value.startsWith('http')) {
            handleInputChange("Facebook", value);
        } else {
            const facebookUrl = `https://www.facebook.com/${value}`;
            handleInputChange("Facebook", facebookUrl);
        }
    }


    // Determine which social media and field type (url or username)
    const socialMedia = config_name.replace(/URL|ID|UserName/g, '');
    const isUrl = config_name.includes('URL');
    
    // Update disabled states based on value
    if (value) {
      setDisabledFields(prev => ({
        ...prev,
        [socialMedia]: {
          url: !isUrl,
          username: isUrl
        }
      }));
      setInputMessages(prev => ({
        ...prev,
        [socialMedia]: `Using ${isUrl ? 'URL' : 'username'} input method. Clear this field to use the other method.`
      }));
    } else {
      // If value is empty, enable both fields
      setDisabledFields(prev => ({
        ...prev,
        [socialMedia]: {
          url: false,
          username: false
        }
      }));
      setInputMessages(prev => ({
        ...prev,
        [socialMedia]: ''
      }));
    }

    // Validate URL if it's a URL field and has a value
    if (isUrl && value.trim()) {
      if (!validateSocialMediaUrl(value, socialMedia)) {
        // Show error in the UI
        setInputMessages(prev => ({
          ...prev,
          [socialMedia]: `Please enter a valid ${socialMedia} URL with https://`
        }));
        handleInputChange(config_name, ''); // Clear invalid value
        return;
      }
    } else if (!value.trim()) {
      // Clear message if field is empty
      setInputMessages(prev => ({
        ...prev,
        [socialMedia]: ''
      }));
    }
    
    // Validate Facebook URL
    if (type === 'Facebook' && value) {
      if (!validateSocialMediaUrl(value, 'Facebook')) {
        setInputMessages(prev => ({
          ...prev,
          Facebook: `Please enter a valid Facebook URL with https://`
        }));
        handleInputChange(config_name, ''); // Clear invalid value
        return;
      }
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
                                  className="ml-2 inline-flex items-center rounded-full p-1 text-[#F7931E] hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                                >
                                  <Info className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="space-y-2">
                                <CustomInput
                                  name={field.name}
                                  placeholder={field.placeholder}
                                  onChange={(e) => handleChange(e, field.name)}
                                  type={field.type}
                                  socialMediaType={type}
                                  disabled={disabledFields[type]?.[field.name.toLowerCase().includes('url') ? 'url' : 'username']}
                                  className={`${disabledFields[type]?.[field.name.toLowerCase().includes('url') ? 'url' : 'username'] 
                                    ? 'bg-orange-50/50 cursor-not-allowed text-gray-500' 
                                    : ''}`}
                                />
                                {/* TO DO: Re-enable the message below. This code displays a messsage in cases that it should not. */}
                                {/* {(disabledFields[type]?.[field.name.toLowerCase().includes('url') ? 'url' : 'username'] || 
                                  (inputMessages[type] && ((field.name.includes('URL') && field.type === 'url') || type === 'Facebook'))) && (
                                  <p className={`text-sm italic ${inputMessages[type]?.includes('valid') && !disabledFields[type]?.[field.name.toLowerCase().includes('url') ? 'url' : 'username'] ? 'text-red-500' : 'text-gray-500'}`}>
                                    {(inputMessages[type]?.includes('valid') && field.type === 'url') ? inputMessages[type] : (() => {
                                      const isUrl = field.name.toLowerCase().includes('url');
                                      switch(type) {
                                        case 'Youtube':
                                          return isUrl 
                                            ? "This field is disabled. Clear the channel username/ID to enter a YouTube URL instead."
                                            : "This field is disabled. Clear the YouTube URL to enter a channel username/ID instead.";
                                        case 'Twitter':
                                          return isUrl 
                                            ? "This field is disabled. Clear the Twitter handle to enter a profile URL instead."
                                            : "This field is disabled. Clear the profile URL to enter a Twitter handle instead.";
                                        case 'Instagram':
                                          return isUrl 
                                            ? "This field is disabled. Clear the Instagram username to enter a profile URL instead."
                                            : "This field is disabled. Clear the profile URL to enter an Instagram username instead.";
                                        case 'LinkedIn':
                                          return isUrl 
                                            ? "This field is disabled. Clear the LinkedIn ID to enter a profile URL instead."
                                            : "This field is disabled. Clear the profile URL to enter a LinkedIn ID instead.";
                                        default:
                                          return "This field is disabled. Clear the other field to use this input method instead.";
                                      }
                                    })()}
                                  </p>
                                )} */}
                              </div>
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
          description={currentField.description || `Choose from these example ${currentField.placeholder.toLowerCase()}:`}
          examples={currentField.examples || []}
          onSelect={(example) => handleInputChange(currentField.name, example)}
        />
      )}
    </div>
  );
};

export default SocialMediaInput;
