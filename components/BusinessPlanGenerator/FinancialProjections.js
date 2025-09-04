import React, { useState } from 'react';
import { HeaderSectionTitle } from './common';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';
import ProfitLoss from './ProfitLoss';
import CashFlow from './CashFlow';
import BalanceSheet from './BalanceSheet';
import BreakEvenAnalysis from './BreakEvenAnalysis';

const FinancialProjections = ({ 
  handleInfoClick, 
  businessPlanGeneratorData, 
  setBusinessPlanGeneratorData, 
  setModalContent, 
  setModalTitle, 
  setModalOpen,
  previousSection,
  nextSection 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    { full: 'Profit & Loss', short: 'P&L' },
    { full: 'Cash Flow', short: 'Cash' },
    { full: 'Balance Sheet', short: 'Balance' },
    { full: 'Break-Even Analysis', short: 'Break-Even' }
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      nextSection();
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      previousSection();
    }
  };

  const renderSection = () => {
    const commonProps = {
      handleInfoClick,
      businessPlanGeneratorData,
      setBusinessPlanGeneratorData,
      onNext: handleNext,
      onBack: handleBack
    };

    switch(currentSection) {
      case 0:
        return <ProfitLoss {...commonProps} />;
      case 1:
        return <CashFlow {...commonProps} />;
      case 2:
        return <BalanceSheet {...commonProps} />;
      case 3:
        return <BreakEvenAnalysis {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-center">
        <HeaderSectionTitle>FINANCIAL PROJECTIONS</HeaderSectionTitle>
        <button
          type="button" 
          className="ml-2 text-blue-500 hover:text-blue-700"
          onClick={() => {
            setModalContent(`
              <h2 class="text-2xl font-bold mb-4">Financial Projections: The Foundation of Your Business Plan</h2>
              
              <p class="mb-4">This section is crucial for investors and lenders as it demonstrates:</p>
              <ul class="list-disc pl-6 mb-4">
                <li>Your company's solid financial foundation</li>
                <li>Ability to meet financial obligations</li>
                <li>Maintenance of positive cash flow</li>
              </ul>

              <p class="mb-4"><strong>Note:</strong> If you lack financial information, research industry statistics to estimate profits and costs. For assistance, contact your local Small Business Development Center (SBDC) or SCORE through the <a href="https://www.sba.gov/local-assistance" class="text-blue-600 hover:underline">SBA.gov Local Assistance tool</a>.</p>

              <h3 class="text-xl font-semibold mb-2">Key Components</h3>
              <p class="mb-2">This section includes four essential spreadsheets:</p>
              <ol class="list-decimal pl-6 mb-4">
                <li><strong>Profit and Loss Projection:</strong> Demonstrates your company's ability to generate net profit (your bottom line). Also known as an income statement.</li>
                <li><strong>Cash Flow Projection:</strong> Illustrates the operating, investing, and financing activities by detailing cash inflows and outflows.</li>
                <li><strong>Projected Balance Sheet:</strong> Estimates required resources, their allocation, and financing methods.</li>
                <li><strong>Breakeven Analysis:</strong> Indicates when your business will cover all expenses and start generating profit.</li>
              </ol>

              <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                <p class="font-bold">Pro Tip:</p>
                <p>Regularly update your financial projections to reflect the most current data and market conditions. This practice ensures your business plan remains a valuable, living document.</p>
              </div>
            `);
            setModalTitle("Financial Projections Information");
            setModalOpen(true);
          }}
        >
          <Info size={20} />
        </button>
      </div>

      <div className="w-full">
        <nav className="w-full" aria-label="Breadcrumb">
          <ol className="flex w-full justify-between items-center px-4">
            {sections.map((section, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="w-6 h-6 text-gray-400 hidden md:block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                )}
                <button
                  onClick={() => setCurrentSection(index)}
                  className={`text-sm font-medium cursor-pointer hover:text-indigo-700 transition-colors duration-200 ${
                    currentSection === index
                      ? 'text-indigo-600'
                      : 'text-gray-500'
                  }`}
                >
                  <span className="hidden md:inline">{section.full}</span>
                  <span className="md:hidden">{section.short}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          <div
            className="h-2 bg-[#F7931E] hover:bg-orange-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {renderSection()}

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center bg-[#F7931E] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-base order-1 md:order-1"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back
          </button>
          <button
            onClick={async () => {
              console.log('Saving...');
              await setBusinessPlanGeneratorData(prevData => ({
                ...prevData,
                __submit: "True"
              }));
            }}
            className="flex items-center justify-center bg-[#F7931E] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-base order-3 md:order-2"
          >
            Save
          </button>
          <button                                                                                                                           
             onClick={async () => {                                                                                                          
               console.log('Saving...');                                                                                                     
               // Set submit flag to trigger save                                                                                            
               await setBusinessPlanGeneratorData(prevData => ({                                                                             
                 ...prevData,                                                                                                                
                 __submit: "True"                                                                                                            
               }));                                                                                                                          
               // Wait briefly for save to complete                                                                                          
               setTimeout(() => {                                                                                                            
                handleNext();                                                                                                            
               }, 500);                                                                                                                      
             }}                                                                                                                              
             className="flex items-center justify-center bg-gray-200 text-white hover:bg-orange-600 font-semibold py-3 px-6 rounded-lg       
 shadow-md transition duration-300 text-base order-4 md:order-3"                                                                             
           >                                                                                                                                 
             Save & Continue                                                                                                                 
           </button>  
          <button
            onClick={handleNext}
            className="flex items-center justify-center bg-gray-200 text-white hover:bg-orange-600 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-base order-2 md:order-4"
          >
            Next
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialProjections;
