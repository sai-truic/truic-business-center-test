import React, { useState, useMemo } from 'react';
import { Search, X, Tag } from 'lucide-react';

const OnboardingStepSeven = ({ onPrevious, onFinish, onSkip, onClose, handleButtonClick }) => {
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const popularIndustries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Real Estate', 'Hospitality', 'Construction'
  ];

  const allIndustries = [
    ...popularIndustries,
    'Agriculture', 'Entertainment', 'Transportation', 'Energy',
    'Telecommunications', 'Legal Services', 'Food and Beverage',
    'Automotive', 'Aerospace', 'Pharmaceutical', 'Fashion', 'Media',
    'Sports', 'Fitness', 'Pet Care', 'Environmental Services'
  ];

  const filteredIndustries = useMemo(() => 
    allIndustries.filter(industry => 
      industry.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedIndustries.includes(industry)
    ),
    [searchTerm, selectedIndustries]
  );

  const handleIndustrySelect = (industry) => {
    setSelectedIndustries(prev => [...prev, industry]);
    setSearchTerm('');
  };

  const handleIndustryRemove = (industry) => {
    setSelectedIndustries(prev => prev.filter(i => i !== industry));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Question 6 of 6</h2>
        <button
          onClick={() => handleButtonClick('OnboardingStepSevenClose', onClose)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-start p-6 sm:p-8 overflow-y-auto">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-gray-900">What industries is your business in?</h3>
        <p className="mb-6 text-sm sm:text-base text-gray-600 text-center max-w-md leading-relaxed">
          Select all that apply. This will allow us to provide you with helpful articles and guides specific to your industries.
        </p>
        
        {selectedIndustries.length > 0 && (
          <div className="mb-6 flex flex-wrap justify-center gap-2 max-w-2xl">
            {selectedIndustries.map((industry) => (
              <div key={industry} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm">
                <Tag size={14} className="mr-1" />
                <span className="font-medium text-sm">{industry}</span>
                <button onClick={() => handleIndustryRemove(industry)} className="ml-1 focus:outline-none hover:bg-blue-200 rounded-full p-1 transition-colors duration-200">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="w-full max-w-2xl mb-6 text-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-700 uppercase tracking-wide">Popular Industries</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {popularIndustries.filter(industry => !selectedIndustries.includes(industry)).map((industry) => (
              <button
                key={industry}
                onClick={() => handleIndustrySelect(industry)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full max-w-md mb-4 relative">
          <input
            type="text"
            placeholder="Search for other industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-shadow duration-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        {searchTerm && (
          <div className="w-full max-w-md max-h-40 overflow-y-auto border border-gray-300 rounded-lg shadow-sm">
            {filteredIndustries.map((industry) => (
              <button
                key={industry}
                onClick={() => handleIndustrySelect(industry)}
                className="w-full p-3 text-left hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:bg-gray-100"
              >
                {industry}
              </button>
            ))}
            {filteredIndustries.length === 0 && (
              <p className="p-3 text-gray-500 text-center">No matching industries found</p>
            )}
          </div>
        )}
      </div>
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 border-t border-gray-200">
        <button 
          onClick={() => handleButtonClick('OnboardingStepSevenPrevious', onPrevious)} 
          className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Previous
        </button>
        <button 
          onClick={() => handleButtonClick('OnboardingStepSevenSkip', onSkip)} 
          className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Skip
        </button>
        <button 
          onClick={() => handleButtonClick('OnboardingStepSevenFinish', onFinish)} 
          className={`w-full sm:w-auto px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
            selectedIndustries.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={selectedIndustries.length === 0}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default OnboardingStepSeven;