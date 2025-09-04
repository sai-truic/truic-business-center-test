import React from 'react';
import { ArrowRight } from 'lucide-react';

export const LearnMoreBox = ({ category, link }) => {
  if (!link) {
    return null;
  }

  const text = `Explore our comprehensive ${category.toLowerCase()} review`;
  
  return (
    <div className="mt-8 bg-gradient-to-r from-[#F7931E] to-orange-600 rounded-lg shadow-lg overflow-hidden group relative border border-orange-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></div>
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 sm:p-6 text-white relative z-10 group-hover:bg-opacity-10 transition-all duration-300 hover:pl-8"
      >
        <div className="flex items-center justify-between">
          <span className="text-base sm:text-lg font-semibold flex-grow pr-4 group-hover:tracking-wide transition-all duration-300">{text}</span>
          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
        </div>
      </a>
    </div>
  );
};
