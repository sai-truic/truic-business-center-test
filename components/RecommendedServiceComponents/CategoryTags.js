import React, { useState } from 'react';

export const CategoryTags = ({ categories, onCategoryClick }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(({ category, count, subFilters }) => (
          <div key={category} className="relative">
            <button
              onClick={() => {
                onCategoryClick(category);
                setExpandedCategory(expandedCategory === category ? null : category);
              }}
              className="px-3 py-2 bg-gradient-to-r from-orange-50 to-white text-[#F7931E] rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md group transform hover:scale-105 border border-orange-200 hover:border-orange-300 relative overflow-hidden"
            >
              {category} ({count})
            </button>
            {expandedCategory === category && subFilters.length > 0 && (
              <div className="absolute z-10 mt-2 w-56 bg-white border border-orange-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-3 bg-gradient-to-r from-[#F7931E] to-orange-600 border-b border-orange-200">
                  <span className="text-sm font-semibold text-white">Sub-filters:</span>
                </div>
                <div className="p-2">
                  {subFilters.map(({ feature, count }) => (
                    <button
                      key={feature}
                      onClick={() => onCategoryClick(category, feature)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-white hover:text-[#F7931E] transition-all duration-300 group relative"
                    >
                      {feature} ({count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
