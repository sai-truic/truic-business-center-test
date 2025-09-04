import {
  Link2, Phone, Mail, MessageSquare, FileText,
  Youtube, Facebook, Twitter, Instagram, MapPin, Wifi,
  CreditCard, UserCircle, Linkedin
} from 'lucide-react';

export const qrCodeSections = [
  {
    name: 'URL',
    label: 'Website Links',
    description: 'Generate a QR code that opens a specific website',
    icon: Link2,
    theme: {
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      selectedBorder: 'border-blue-300',
      gradient: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-500',
      shadow: 'shadow-blue-100',
      ringColor: 'focus:ring-blue-400',
      solidBg: 'bg-blue-50'
    }
  },
  {
    name: 'vCard',
    label: 'Business Card',
    description: 'Create a professional vCard',
    icon: CreditCard,
    theme: {
      border: 'border-purple-200',
      hoverBorder: 'hover:border-purple-300',
      selectedBorder: 'border-purple-300',
      gradient: 'from-purple-50 to-pink-50',
      iconColor: 'text-purple-500',
      shadow: 'shadow-purple-100',
      ringColor: 'focus:ring-purple-400',
      solidBg: 'bg-purple-50'
    }
  },
  {
    name: 'MeCard',
    label: 'Personal Card',
    description: 'Create a simple contact card',
    icon: UserCircle,
    theme: {
      border: 'border-pink-200',
      hoverBorder: 'hover:border-pink-300',
      selectedBorder: 'border-pink-300',
      gradient: 'from-pink-50 to-rose-50',
      iconColor: 'text-pink-500',
      shadow: 'shadow-pink-100',
      ringColor: 'focus:ring-pink-400',
      solidBg: 'bg-pink-50'
    }
  },
  {
    name: 'Phone Number',
    label: 'Contact Number',
    description: 'Create a QR code to share your phone number',
    icon: Phone,
    theme: {
      border: 'border-green-200',
      hoverBorder: 'hover:border-green-300',
      selectedBorder: 'border-green-300',
      gradient: 'from-green-50 to-emerald-50',
      iconColor: 'text-green-500',
      shadow: 'shadow-green-100',
      ringColor: 'focus:ring-green-400',
      solidBg: 'bg-green-50'
    }
  },
  {
    name: 'Email',
    label: 'Email Address',
    description: 'Generate a QR code for your email address',
    icon: Mail,
    theme: {
      border: 'border-red-200',
      hoverBorder: 'hover:border-red-300',
      selectedBorder: 'border-red-300',
      gradient: 'from-red-50 to-orange-50',
      iconColor: 'text-red-500',
      shadow: 'shadow-red-100',
      ringColor: 'focus:ring-red-400',
      solidBg: 'bg-red-50'
    }
  },
  {
    name: 'Plain Text',
    label: 'Plain Text',
    description: 'Create a QR code containing any text message',
    icon: FileText,
    theme: {
      border: 'border-gray-200',
      hoverBorder: 'hover:border-gray-300',
      selectedBorder: 'border-gray-300',
      gradient: 'from-gray-50 to-slate-50',
      iconColor: 'text-gray-500',
      shadow: 'shadow-gray-100',
      ringColor: 'focus:ring-gray-400',
      solidBg: 'bg-gray-50'
    }
  },
  {
    name: 'SMS',
    label: 'Text Message',
    description: 'Create a QR code that opens a text message draft',
    icon: MessageSquare,
    theme: {
      border: 'border-yellow-200',
      hoverBorder: 'hover:border-yellow-300',
      selectedBorder: 'border-yellow-300',
      gradient: 'from-yellow-50 to-amber-50',
      iconColor: 'text-yellow-600',
      shadow: 'shadow-yellow-100',
      ringColor: 'focus:ring-yellow-400',
      solidBg: 'bg-yellow-50'
    }
  },
  {
    name: 'Geo Location',
    label: 'GPS Coordinates',
    description: 'Share exact GPS coordinates of a location',
    icon: MapPin,
    theme: {
      border: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-300',
      selectedBorder: 'border-emerald-300',
      gradient: 'from-emerald-50 to-teal-50',
      iconColor: 'text-emerald-500',
      shadow: 'shadow-emerald-100',
      ringColor: 'focus:ring-emerald-400',
      solidBg: 'bg-emerald-50'
    }
  },
  {
    name: 'Youtube',
    label: 'YouTube',
    description: 'Link directly to your YouTube channel or video',
    icon: Youtube,
    theme: {
      border: 'border-red-200',
      hoverBorder: 'hover:border-red-300',
      selectedBorder: 'border-red-300',
      gradient: 'from-red-50 to-rose-50',
      iconColor: 'text-red-600',
      shadow: 'shadow-red-100',
      ringColor: 'focus:ring-red-400',
      solidBg: 'bg-red-50'
    }
  },
  {
    name: 'Facebook',
    label: 'Facebook',
    description: 'Connect to your Facebook profile or page',
    icon: Facebook,
    theme: {
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      selectedBorder: 'border-blue-300',
      gradient: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      shadow: 'shadow-blue-100',
      ringColor: 'focus:ring-blue-400',
      solidBg: 'bg-blue-50'
    }
  },
  {
    name: 'Twitter',
    label: 'Twitter/X',
    description: 'Share your Twitter/X profile',
    icon: Twitter,
    theme: {
      border: 'border-sky-200',
      hoverBorder: 'hover:border-sky-300',
      selectedBorder: 'border-sky-300',
      gradient: 'from-sky-50 to-blue-50',
      iconColor: 'text-sky-500',
      shadow: 'shadow-sky-100',
      ringColor: 'focus:ring-sky-400',
      solidBg: 'bg-sky-50'
    }
  },
  {
    name: 'Instagram',
    label: 'Instagram',
    description: 'Share your Instagram profile',
    icon: Instagram,
    theme: {
      border: 'border-pink-200',
      hoverBorder: 'hover:border-pink-300',
      selectedBorder: 'border-pink-300',
      gradient: 'from-pink-50 to-rose-50',
      iconColor: 'text-pink-500',
      shadow: 'shadow-pink-100',
      ringColor: 'focus:ring-pink-400',
      solidBg: 'bg-pink-50'
    }
  },
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    description: 'Connect to your LinkedIn profile',
    icon: Linkedin,
    theme: {
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      selectedBorder: 'border-blue-300',
      gradient: 'from-blue-50 to-sky-50',
      iconColor: 'text-blue-600',
      shadow: 'shadow-blue-100',
      ringColor: 'focus:ring-blue-400',
      solidBg: 'bg-blue-50'
    }
  },
  {
    name: 'WiFi',
    label: 'WiFi Network',
    description: 'Share WiFi network credentials',
    icon: Wifi,
    theme: {
      border: 'border-teal-200',
      hoverBorder: 'hover:border-teal-300',
      selectedBorder: 'border-teal-300',
      gradient: 'from-teal-50 to-cyan-50',
      iconColor: 'text-teal-500',
      shadow: 'shadow-teal-100',
      ringColor: 'focus:ring-teal-400',
      solidBg: 'bg-teal-50'
    }
  },
];
