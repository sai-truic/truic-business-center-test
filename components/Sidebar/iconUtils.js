import * as HeroIconsSolid from '@heroicons/react/24/solid';
import * as HeroIconsOutline from '@heroicons/react/24/outline';
import * as LucideIcons from 'lucide-react';
import React from 'react';

export const getIconComponent = (iconName, iconStyle, isActive, isOpen, options = {}) => {
  const {
    size = '6',
    color = `${isActive ? `${isOpen ? 'truicDarkOrange' : 'white'}` : 'neutral-950'}`,
    className = '',
  } = options;

  // Try to find the icon in HeroIcons first
  let IconComponent;
  if (iconStyle === 'Outline'){
    IconComponent = HeroIconsOutline[iconName];
  }else{
    IconComponent = HeroIconsSolid[iconName];
  }
  
  // If not found in HeroIcons, try Lucide
  if (!IconComponent) {
    IconComponent = LucideIcons[iconName];
  }

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in either HeroIcons or Lucide`);
    return null;
  }

  const defaultClassName = `h-${size} w-${size} text-${color} ${className}`;
  
  return <IconComponent className={defaultClassName} />;
};
