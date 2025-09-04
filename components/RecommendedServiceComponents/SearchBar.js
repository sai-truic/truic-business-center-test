import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronUp, ChevronDown, Layers, Building2, FileText, ShieldCheck, Calculator, Newspaper, Phone, DollarSign, CreditCard, Circle, Filter } from 'lucide-react';

export const SearchBar = ({ onSearch, categories, activeCategory, onCategoryChange, sortOption, onSortChange, searchFilters, onSearchFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'All': return <Layers size={20} />;
      case 'Banking': return <Building2 size={20} />;
      case 'Formation': return <FileText size={20} />;
      case 'Insurance': return <ShieldCheck size={20} />;
      case 'Accounting': return <Calculator size={20} />;
      case 'Press Release': return <Newspaper size={20} />;
      case 'Business Phone': return <Phone size={20} />;
      case 'Business Loans': return <DollarSign size={20} />;
      case 'Payroll': return <CreditCard size={20} />;
      default: return <Circle size={20} />;
    }
  };

  const getSearchPlaceholder = () => {
    if (searchFilters.length === 3) return "Search services...";
    return `Search services by ${searchFilters.join(', ')}...`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <div className="flex items-center bg-white rounded-lg border border-orange-200 focus-within:ring-2 focus-within:ring-[#F7931E] shadow-md hover:shadow-lg transition-all duration-300">
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`ml-2 p-2 rounded-l-md focus:outline-none transition-all duration-200 ${
                isFilterOpen 
                  ? 'bg-gradient-to-r from-[#F7931E] to-orange-600 text-white shadow-inner' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
              }`}
              aria-label="Filter search"
            >
              <Filter size={20} />
            </button>
            {isFilterOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-orange-100 rounded-lg shadow-lg overflow-hidden z-10">
                <div className="p-3 bg-gradient-to-r from-[#F7931E] to-orange-500 border-b border-orange-200">
                  <span className="text-sm font-semibold text-white">Search in:</span>
                </div>
                {['title', 'description', 'features'].map((filter) => (
                  <label key={filter} className="flex items-center px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors duration-150">
                    <input
                      type="checkbox"
                      checked={searchFilters.includes(filter)}
                      onChange={() => onSearchFilterChange(filter)}
                      className="form-checkbox h-5 w-5 text-[#F7931E] rounded focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-150"
                    />
                    <span className="ml-3 text-sm text-gray-700 capitalize">{filter}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="relative flex-grow flex items-center">
            <Search className="absolute left-3 text-gray-400 pointer-events-none" size={20} />
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full p-4 pl-10 pr-4 rounded-r-lg focus:outline-none bg-transparent text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="relative sm:w-72">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 bg-white text-gray-800 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#F7931E] flex items-center justify-between shadow-md hover:bg-orange-50 transition-all duration-300 group"
        >
          <div className="flex items-center">
            {getCategoryIcon(activeCategory)}
            <span className="ml-2 font-medium truncate">{activeCategory}</span>
          </div>
          {isOpen ? <ChevronUp size={20} className="text-[#F7931E]" /> : <ChevronDown size={20} className="text-[#F7931E]" />}
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-orange-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm flex items-center ${
                  activeCategory === category
                    ? 'bg-orange-50 text-[#F7931E] font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                } transition-colors duration-150 ease-in-out`}
              >
                {getCategoryIcon(category)}
                <span className="ml-2">{category}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative sm:w-48">
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="w-full px-4 py-4 bg-white text-gray-800 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#F7931E] flex items-center justify-between shadow-md hover:bg-orange-50 transition-all duration-300 group"
        >
          <span className="font-medium truncate">Sort by: {sortOption === 'rating' ? 'Rating' : 'Name'}</span>
          {isSortOpen ? <ChevronUp size={20} className="text-[#F7931E]" /> : <ChevronDown size={20} className="text-[#F7931E]" />}
        </button>
        {isSortOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-orange-200 rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => {
                onSortChange('rating');
                setIsSortOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm ${
                sortOption === 'rating'
                  ? 'bg-orange-50 text-[#F7931E] font-medium'
                  : 'text-gray-700 hover:bg-orange-50'
              } transition-colors duration-150 ease-in-out`}
            >
              Rating
            </button>
            <button
              onClick={() => {
                onSortChange('name');
                setIsSortOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm ${
                sortOption === 'name'
                  ? 'bg-orange-50 text-[#F7931E] font-medium'
                  : 'text-gray-700 hover:bg-orange-50'
              } transition-colors duration-150 ease-in-out`}
            >
              Name
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
