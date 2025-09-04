import React from 'react';
import { X, ArrowRight } from 'lucide-react';

const ComparisonCard = ({ item, onRemove }) => {
  let logoUrl = '';
  try {
    const url = new URL(item.link);
    logoUrl = `https://logo.clearbit.com/${url.hostname}`;
  } catch (error) {
    console.error(`Invalid URL: ${item.link}`);
  }

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg border border-orange-100 flex flex-col h-full hover:shadow-xl transition-all duration-300 group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-200 to-orange-100 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {logoUrl && <img src={logoUrl} alt={`${item.title} logo`} className="w-8 h-8 object-contain mr-3" onError={(e) => e.target.style.display = 'none'} />}
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
        </div>
        <button
          onClick={() => onRemove(item.id, item.category)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-300"
          aria-label="Remove from comparison"
        >
          <X size={20} />
        </button>
      </div>
      <div className="mb-4">
        <span className="bg-gradient-to-r from-orange-100 to-orange-50 text-[#F7931E] text-xs font-semibold px-3 py-1 rounded-full inline-block shadow-sm">{item.category}</span>
      </div>
      <p className="text-gray-700 mb-2">{item.description}</p>
      <p className="text-yellow-500 font-bold mb-4">Rating: {item.rating}/5</p>
      
      <div className="flex-grow">
        <h4 className="font-semibold mb-2 text-neutral-950 flex items-center">
          <span className="p-1 bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-sm ring-1 ring-orange-100 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F7931E]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
          Key Features
        </h4>
        <ul className="list-disc pl-5 mb-4">
          {item.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-600 mb-1">{feature}</li>
          ))}
        </ul>
        
        <h4 className="font-semibold mb-2 text-neutral-950 flex items-center">
          <span className="p-1 bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-sm ring-1 ring-orange-100 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F7931E]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          Pros
        </h4>
        <ul className="list-disc pl-5 mb-4">
          {item.pros.map((pro, index) => (
            <li key={index} className="text-sm text-gray-600 mb-1">{pro}</li>
          ))}
        </ul>
        
        <h4 className="font-semibold mb-2 text-neutral-950 flex items-center">
          <span className="p-1 bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-sm ring-1 ring-orange-100 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F7931E]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </span>
          Cons
        </h4>
        <ul className="list-disc pl-5 mb-4">
          {item.cons.map((con, index) => (
            <li key={index} className="text-sm text-gray-600 mb-1">{con}</li>
          ))}
        </ul>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#F7931E] hover:text-orange-600 transition-colors duration-300 flex items-center group mt-4"
      >
        Learn More
        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
      </div>
    </div>
  );
};

export const ComparisonModal = ({ isOpen, onClose, items, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-orange-100 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-950">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F7931E] to-orange-600">
              Comparison
            </span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">{items.length} item{items.length !== 1 ? 's' : ''} selected</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item) => (
            <ComparisonCard 
              key={`${item.category}-${item.id}`} 
              item={item} 
              onRemove={() => onRemove(item.id, item.category)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
