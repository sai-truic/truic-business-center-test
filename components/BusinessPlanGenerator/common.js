import React from 'react';
import { HelpCircle } from 'lucide-react';

export const SectionTitle = ({ children, infoText, infoTitle, handleInfoClick }) => (
  <div className="border-b-2 border-orange-200">
    <div className="flex items-center">
      <h2 className="text-2xl font-semibold text-[#F7931E] pb-2">{children}</h2>
      {infoText && handleInfoClick && (
        <button
          type="button" 
          className="ml-2 mb-1 text-[#F7931E] hover:text-orange-600 transition-colors duration-200"
          onClick={() => handleInfoClick(infoText, infoTitle)}
        >
          <HelpCircle size={20} />
        </button>
      )}
    </div>
  </div>
);

export const HeaderSectionTitle = ({ children }) => (
  <h1 className="text-3xl text-center font-bold mb-4 mt-4 text-[#F7931E]">{children}</h1>
);
