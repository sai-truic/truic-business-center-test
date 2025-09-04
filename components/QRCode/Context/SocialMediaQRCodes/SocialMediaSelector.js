import { useState } from 'react';
import { 
  Youtube, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Globe, 
  Link2, 
  Share2,
  MessageSquare, 
  Info 
} from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import BaseQRInput from '../Common/BaseQRInput';
import { ExamplesLightbox } from '../../ExamplesLightbox';
import { Disclosure } from '@headlessui/react';

const socialOptions = [
  { 
    value: 'Youtube', 
    label: 'YouTube',
    description: 'Share your channel or videos',
    icon: Youtube,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    hoverBg: 'hover:bg-red-100',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-rose-600'
  },
  { 
    value: 'Twitter', 
    label: 'Twitter/X',
    description: 'Connect with your Twitter profile',
    icon: Twitter,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    hoverBg: 'hover:bg-blue-100',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-sky-500'
  },
  { 
    value: 'Facebook', 
    label: 'Facebook',
    description: 'Link to your profile or page',
    icon: Facebook,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-100',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-700'
  },
  { 
    value: 'Instagram', 
    label: 'Instagram',
    description: 'Share your Instagram presence',
    icon: Instagram,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    hoverBg: 'hover:bg-purple-100',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500'
  },
  { 
    value: 'LinkedIn', 
    label: 'LinkedIn',
    description: 'Professional networking profile',
    icon: Linkedin,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-100',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-sky-500'
  },
  { 
    value: 'Pinterest', 
    label: 'Pinterest',
    description: 'Share your Pinterest boards',
    icon: Globe,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    hoverBg: 'hover:bg-red-100',
    gradientFrom: 'from-red-600',
    gradientTo: 'to-red-700'
  },
  { 
    value: 'TikTok', 
    label: 'TikTok',
    description: 'Share your TikTok content',
    icon: Share2,
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-900',
    hoverBg: 'hover:bg-gray-100',
    gradientFrom: 'from-gray-900',
    gradientTo: 'to-gray-800'
  }
];

const inputConfig = {
  'Youtube': {
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
  'Facebook': {
    sections: [
      {
        title: 'Profile Information',
        icon: Facebook,
        fields: [
          { 
            name: 'FacebookURL', 
            placeholder: 'Profile/Page URL', 
            type: 'url',
            description: 'Enter your Facebook profile or page URL',
            examples: [
              'https://facebook.com/username',
              'https://fb.com/pagename',
              'https://facebook.com/pages/pagename'
            ]
          },
          { 
            name: 'FacebookUsername', 
            placeholder: 'Username/Page Name', 
            type: 'text',
            description: 'Enter your Facebook username or page name',
            examples: ['username', 'page.name', 'brand.official']
          }
        ]
      }
    ]
  },
  'Instagram': {
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
            name: 'InstagramUsername', 
            placeholder: 'Username', 
            type: 'text',
            description: 'Enter your Instagram username (without @)',
            examples: ['username', 'brand.official', 'company_name']
          }
        ]
      }
    ]
  },
  'LinkedIn': {
    sections: [
      {
        title: 'Profile Information',
        icon: Linkedin,
        fields: [
          { 
            name: 'LinkedInURL', 
            placeholder: 'Profile URL', 
            type: 'url',
            description: 'Enter your LinkedIn profile or company URL',
            examples: [
              'https://linkedin.com/in/username',
              'https://www.linkedin.com/company/companyname'
            ]
          },
          { 
            name: 'LinkedInUsername', 
            placeholder: 'Username/Company Name', 
            type: 'text',
            description: 'Enter your LinkedIn username or company name',
            examples: ['john-doe', 'company-name', 'brand-official']
          }
        ]
      },
      {
        title: 'Additional Information',
        icon: Info,
        fields: [
          { 
            name: 'LinkedInCustomText', 
            placeholder: 'Custom Message', 
            type: 'text',
            description: 'Add a custom message for profile visitors',
            examples: [
              'Let\'s connect on LinkedIn!',
              'View my professional profile',
              'Join our company network'
            ]
          }
        ]
      }
    ]
  },
  'Pinterest': {
    sections: [
      {
        title: 'Profile Information',
        icon: Globe,
        fields: [
          { 
            name: 'PinterestURL', 
            placeholder: 'Profile or Board URL', 
            type: 'url',
            description: 'Enter your Pinterest profile or board URL',
            examples: [
              'https://pinterest.com/username',
              'https://pinterest.com/username/boardname'
            ]
          },
          { 
            name: 'PinterestUsername', 
            placeholder: 'Username', 
            type: 'text',
            description: 'Enter your Pinterest username',
            examples: ['username', 'brandname', 'company_official']
          }
        ]
      },
      {
        title: 'Board Information',
        icon: Share2,
        fields: [
          { 
            name: 'PinterestBoard', 
            placeholder: 'Board Name', 
            type: 'text',
            description: 'Enter the name of your Pinterest board (optional)',
            examples: ['inspiration', 'products', 'portfolio']
          }
        ]
      }
    ]
  },
  'TikTok': {
    sections: [
      {
        title: 'Profile Information',
        icon: Share2,
        fields: [
          { 
            name: 'TikTokURL', 
            placeholder: 'Profile URL', 
            type: 'url',
            description: 'Enter your TikTok profile URL',
            examples: [
              'https://tiktok.com/@username',
              'https://www.tiktok.com/@username'
            ]
          },
          { 
            name: 'TikTokUsername', 
            placeholder: 'Username', 
            type: 'text',
            description: 'Enter your TikTok username (with @)',
            examples: ['@username', '@brand.official', '@company']
          }
        ]
      },
      {
        title: 'Content Information',
        icon: MessageSquare,
        fields: [
          { 
            name: 'TikTokVideo', 
            placeholder: 'Video URL', 
            type: 'url',
            description: 'Enter a specific TikTok video URL (optional)',
            examples: [
              'https://www.tiktok.com/@username/video/1234567890123456789',
              'https://vm.tiktok.com/XXXXXXXX/'
            ]
          }
        ]
      }
    ]
  }
};

const SocialMediaSelector = ({ handleInputChange }) => {
  const [selected, setSelected] = useState(socialOptions[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const handleSelection = (option) => {
    setSelected(option);
    setIsOpen(false);
    handleInputChange({
      target: {
        name: 'SocialType',
        value: option.value
      }
    });
  };

  const handleExampleClick = (field, example) => {
    handleInputChange(field, example);
    setIsExamplesOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Platform Selector */}

      {/* Input Fields */}
      <div className="mt-6">
        <BaseQRInput
          config={{
            ...selected,
            label: selected.label,
            icon: selected.icon,
            helperText: `Create a QR code for your ${selected.label} profile`,
            tooltip: `Generate a QR code that links to your ${selected.label} presence`
          }}
          handleInputChange={handleInputChange}
          renderContent={() => (
            <div className="space-y-6">
              {inputConfig[selected.value]?.sections.map((section, sectionIndex) => (
                <Disclosure key={sectionIndex} as="div" className="mt-4">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className={`flex w-full items-center justify-between rounded-lg bg-gradient-to-r ${selected.bgColor} px-4 py-4 text-left hover:${selected.hoverBg} transition-all duration-200 shadow-sm`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <section.icon className={`w-5 h-5 ${selected.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Click to expand</p>
                          </div>
                        </div>
                        <ChevronUpDownIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-6 w-6 ${selected.iconColor} transition-transform duration-200`}
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
                                  className={`ml-2 inline-flex items-center rounded-full p-1 ${selected.iconColor} hover:${selected.bgColor} transition-colors duration-200`}
                                >
                                  <Info className="h-4 w-4" />
                                </button>
                              </div>
                              {field.description && (
                                <p className="mt-1 text-xs text-gray-500">{field.description}</p>
                              )}
                              <Input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                className={`mt-1 w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 text-sm sm:text-base border-2 border-gray-200 focus:border-${selected.iconColor} rounded-lg shadow-sm transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white focus:ring-2 focus:ring-${selected.iconColor}/20`}
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
      </div>

      {/* Examples Lightbox */}
      {isExamplesOpen && currentField && (
        <ExamplesLightbox
          isOpen={isExamplesOpen}
          closeModal={() => setIsExamplesOpen(false)}
          title={`Example ${currentField.placeholder}`}
          description={currentField.description || `Choose from these example ${currentField.placeholder.toLowerCase()}:`}
          examples={currentField.examples || []}
          onSelect={(example) => handleExampleClick(currentField.name, example)}
        />
      )}
    </div>
  );
};

export { socialOptions };
export default SocialMediaSelector;
