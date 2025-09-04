import React from 'react';
import { Star, Check, ArrowRight } from 'lucide-react';

export const ToolCard = ({ id, category, title, link, description, rating, features, onCompare, isCompared }) => {
  let logoUrl = '';
  try {
    const url = new URL(link);
    logoUrl = `https://logo.clearbit.com/${url.hostname}`;
  } catch (error) {
    console.error(`Invalid URL: ${link}`);
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border ${isCompared ? 'border-[#F7931E]' : 'border-gray-200'} hover:border-orange-300 flex flex-col h-full relative group`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-200 to-orange-100 rounded-lg blur opacity-0 transition duration-300"></div>
      <div className="relative z-10">
      <div className="flex flex-col h-[180px]">
        <div className="flex items-center mb-2">
          {logoUrl && <img src={logoUrl} alt={`${title} logo`} className="w-10 h-10 object-contain mr-3" onError={(e) => e.target.style.display = 'none'} />}
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-[#F7931E] hover:underline transition-colors duration-300 relative group flex items-center">
            {title}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Click to visit website
            </span>
          </a>
        </div>
        <div className="mb-2">
          <span className="bg-orange-100 text-[#F7931E] text-xs font-semibold px-3 py-1 rounded-full inline-block">{category}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">{description}</p>
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600">{rating}/5</span>
        </div>
      </div>
      <div className="flex-grow flex flex-col mb-3 text-sm bg-gradient-to-br from-orange-50 via-orange-100/50 to-white p-4 rounded-lg shadow-sm border border-orange-200 transition-all duration-300 hover:shadow-md">
        <h4 className="font-semibold mb-3 text-neutral-950 flex items-center text-base">
          <Check size={18} className="mr-2 text-[#F7931E] flex-shrink-0" />
          Key Features
        </h4>
        <ul className="space-y-2 flex-grow">
          {features && features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <span className="text-[#F7931E] mr-2 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">•</span>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-2 flex justify-between items-center">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F7931E] hover:text-orange-600 transition-colors duration-300 text-sm font-medium flex items-center"
        >
          Learn More
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
        <button
          onClick={() => onCompare(id, category)}
          className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
            isCompared 
              ? 'bg-[#F7931E] text-white hover:bg-orange-600' 
              : 'bg-orange-100 text-[#F7931E] hover:bg-orange-200'
          }`}
        >
          {isCompared ? 'Remove' : 'Compare'}
        </button>
      </div>
      </div>
    </div>
  );
};
