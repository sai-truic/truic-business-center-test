import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { getRelevantFeatures } from './utils';

export const FeatureFilter = ({ category, items, selectedFeatures, onFeatureToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);

  const relevantFeatures = getRelevantFeatures(category, items);

  return (
    <div className="mb-8 bg-gray-100 p-6 rounded-lg border border-gray-300">
      <button
        onClick={() => setIsDesktopOpen(!isDesktopOpen)}
        className="w-full flex justify-between items-center mb-4 text-xl font-semibold text-gray-800"
      >
        <span>Filter by Features:</span>
        {isDesktopOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isDesktopOpen && (
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {Object.keys(relevantFeatures).map((feature) => (
              <button
                key={feature}
                onClick={() => onFeatureToggle(feature)}
                className={`px-3 py-2 rounded-lg flex items-center justify-between text-sm ${
                  selectedFeatures.includes(feature) 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                } transition-all duration-300`}
              >
                <span className="truncate font-medium">{feature}</span>
                <span className={`ml-1 ${
                  selectedFeatures.includes(feature) 
                    ? 'bg-blue-400' 
                    : 'bg-gray-200'
                } rounded-full px-2 py-1 text-xs`}>
                  {relevantFeatures[feature].length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg flex justify-between items-center"
        >
          <span>Select Features ({selectedFeatures.length})</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {isOpen && (
          <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {Object.keys(relevantFeatures).map((feature) => (
              <button
                key={feature}
                onClick={() => onFeatureToggle(feature)}
                className={`w-full px-4 py-2 text-left text-sm ${
                  selectedFeatures.includes(feature)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } border-b border-gray-200 last:border-b-0`}
              >
                {feature} ({relevantFeatures[feature].length})
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
