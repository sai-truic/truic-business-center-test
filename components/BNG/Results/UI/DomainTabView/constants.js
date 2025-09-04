/**
 * Constants used across the DomainTabView components
 */

// Default classes for the components
export const DEFAULT_CLASSES = {
  tabHeaderClasses: 'text-lg font-bold mb-0 text-center',
  tabContentClasses: 'bg-black p-0',
  tabButtonClasses: 'mt-0 px-4 py-2 rounded',
  closeButtonClasses: 'p-2 rounded-full text-black bg-white hover:bg-gray-300'
};

// Default colors
export const DEFAULT_COLORS = {
  background: '#000000',
  text: '#ffffff',
  header: '#000000',
  button: {
    background: '#DB3A00',
    border: '#ffffff', 
    text: '#ffffff'
  },
  table: {
    header: {
      background: '#000000',
      text: '#ffffff'
    },
    border: '#ffffff'
  },
  accordion: {
    header: {
      background: '#000000',
      text: '#ffffff',
      border: '#ffffff'
    }
  }
};

// Common domain extensions for reference
export const COMMON_EXTENSIONS = [
  '.com', 
  '.net', 
  '.org', 
  '.io', 
  '.co'
];

// Domain categories and their TLDs
export const domainCategories = {
  'Universal': ['.com', '.net', '.org', '.info', '.biz', '.co','.live','.site','.online'],
  'Tech and Dev': ['.io', '.tech', '.app', '.dev', '.cloud', '.ai', '.digital','.systems'],
  'Professional Services': ['.solutions', '.consulting', '.legal', '.lawyer','.accountant', '.finance', '.services', '.agency'],
  'Trade and Construction': ['.builders','.repair', '.plumbing', '.contractors','.construction','.house','.tools'],
  'Retail and Commerce': ['.shop', '.store', '.sale', '.fashion', '.style','.boutique','.gifts','.discount','.jewelery'],
  'Food and Beverage': ['.coffee', '.cafe','.restaurant','.bar','.pub','.kitchen','.wine','.beer'],
  'Creative and Media': ['.studio', '.design', '.media', '.photography','.video','.photos','.press'],
  'Community and Lifestyle': ['.club', '.travel','.social','.community','.life','.world','.events','.yoga','.health'],
  'Sustainability and Environment': ['.green','.energy','.organic']
};
