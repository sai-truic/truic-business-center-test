import React from 'react';
import { HelpCircle } from 'lucide-react';

const SectionTitle = ({ children, infoText, infoTitle, handleInfoClick }) => (
  <div className="border-b-2 border-orange-200 pb-2 mb-4">
    <div className="flex items-center">
      <h2 className="text-2xl font-semibold text-[#F7931E]">{children}</h2>
      {infoText && (
        <button
          type="button"
          className="ml-2 text-[#F7931E] hover:text-orange-600 transition-colors duration-200"
          onClick={() => handleInfoClick(infoText, infoTitle)}
        >
          <HelpCircle size={20} />
        </button>
      )}
    </div>
  </div>
);

export default SectionTitle;
