import React from 'react';                                                                                                                       
import { SectionTitle } from './common';                                                                                                         
import renderFormField from './../renderFormField';                                                                                              
import { Accordion } from './../ui/accordion';
import { ChevronDown } from 'lucide-react';

const ProfitLoss = ({ handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData }) => {
  return (
    <div className="space-y-6">
      <SectionTitle>Profit Loss</SectionTitle>
      {renderFormField('textarea', 
        'finacialProjections.profitLoss.profitLossAssumptions', 
        'profitLossAssumptions', 
        'What are the assumptions for your profit and loss spreadsheet?', 
        'Explain any documents, forecasts or other assumptions that you relied on to formulate your profit and loss projections. This may include assumptions about gross profit, operating expenses, taxes or dividends or owner draw.', 
        { 
          showToolbar: true,
          showPlaceholder: false,
          showLabel: true,
          usePlaceholderAsLabel: true
        },
        handleInfoClick, 
        businessPlanGeneratorData, 
      setBusinessPlanGeneratorData)}
      <Accordion type="single" collapsible>                                                                                                      
         <Accordion.Item value="profit-loss-projection">                                                                                          
           <Accordion.Trigger> 
            <div className="block text-sm font-medium text-gray-700 flex justify-between items-center w-full py-4 text-left border-b border-orange-200 hover:bg-orange-50/50 transition-colors duration-200 group">
              <span className="text-[#F7931E] font-semibold">Profit and Loss Projection</span>
              <ChevronDown className="h-5 w-5 text-[#F7931E] transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
            </Accordion.Trigger>                                                                                                                   
            <Accordion.Content>  
            {renderFormField('toggleableDataTable', 'finacialProjections.profitLoss.profitLossData', 'Profit and Loss Projection', '', '', {
              columns: [
                { id: 'item', header: 'Item', accessor: (row) => row.item },
                { id: 'profitLossYear1', header: 'Year 1', accessor: (row) => row.year1 },
                { id: 'profitLossYear2', header: 'Year 2', accessor: (row) => row.year2 },
                { id: 'profitLossYear3', header: 'Year 3', accessor: (row) => row.year3 },
              ],
              data: [
                { id: 'sales', item: 'Sales', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.sales', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.sales', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.sales', desc: 'The income from your products or services. This is also referred to as revenue.' },
                { id: 'costs', item: 'Costs/Good Sold', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.costs', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.costs', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.costs', desc: 'The cost of direct labor and direct materials.'},
                { id: 'grossProfit', item: 'Gross Profit', year1: '0.00', year2: '0.00', year3: '0.00', formula: "sales - costs", desc: 'Sales minus the costs of goods sold. This is also referred to as gross margin.' },
                { 
                  item: 'Operating Expenses',
                  year1: '0.00', 
                  year2: '0.00', 
                  year3: '0.00',
                  category: 1,
                  desc: 'The ongoing costs of running a business such as employee salaries, rent and utilities.',
                  items: [
                    { id: 'salary', item: 'Salary (Office & Overhead)', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.salary', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.salary', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.salary', desc: 'An amount of money or compensation paid to an employee by an employer in return for work performed.' },
                    { id: 'payroll', item: 'Payroll (taxes, etc.)', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.payroll', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.payroll', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.payroll', desc: 'The amount of payroll taxes paid by your company.' },
                    { id: 'outsideServices', item: 'Outside Services', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.outsideServices', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.outsideServices', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.outsideServices', desc: 'The amount paid for work done by sub-contractors or other contractors' },
                    { id: 'supplies', item: 'Supplies (office & operation)', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.supplies', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.supplies', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.supplies', desc: 'The amount paid for general purpose items (e.g. office supplies).' },
                    { id: 'maintenance', item: 'Repairs & Maintenance', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.maintenance', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.maintenance', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.maintenance', desc: 'The total amount paid required to complete repair and maintenance work.' },
                    { id: 'advertising', item: 'Advertising', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.advertising', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.advertising', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.advertising', desc: 'The amount paid for all company advertising efforts.' },
                    { id: 'carTravel', item: 'Car & delivery & travel', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.carTravel', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.carTravel', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.carTravel', desc: 'The total amount paid for use of cars, delivery services, and travel costs.' },
                    { id: 'accountingLegal', item: 'Accounting & legal', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.accountingLegal', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.accountingLegal', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.accountingLegal', desc: 'The amount paid for accounting and legal services.' },
                    { id: 'rent', item: 'Rent', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.rent', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.rent', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.rent', desc: 'The amount paid to cover rental costs.' },
                    { id: 'telephone', item: 'Telephone', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.telephone', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.telephone', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.telephone', desc: 'The amount paid for all telephone services.' },
                    { id: 'utilities', item: 'Utilities', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.utilities', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.utilities', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.utilities', desc: 'The total amount paid for all utility bills.' },
                    { id: 'insurance', item: 'Insurance', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.insurance', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.insurance', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.insurance', desc: 'The total amount paid for all insurance coverage.' },
                    { id: 'taxes', item: 'Taxes (real estate, etc.)', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.taxes', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.taxes', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.taxes', desc: 'The total amount paid for all taxes, except payroll taxes.' },
                    { id: 'interest', item: 'Interest', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.interest', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.interest', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.interest', desc: 'The total amount of interest paid on loans.' },
                    { id: 'depreciation', item: 'Depreciation', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.depreciation', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.depreciation', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.depreciation', desc: 'A method of allocating the cost of an asset over its useful life.' },
                    { id: 'otherExpenses', item: 'Other expenses', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.otherExpenses', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.otherExpenses', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.otherExpenses', desc: 'The total for miscellaneous costs that do not fit into any other category on this sheet.' },    
                    { id: 'totalExpenses', item: 'Total Expenses', year1: '0.00', year2: '0.00', year3: '0.00', formula: "salary + payroll + outsideServices + supplies + maintenance + advertising + carTravel + accountingLegal + rent + telephone + utilities + insurance + taxes + interest + depreciation + otherExpenses", desc: 'The total of all your operating expenses.' },
                    { id: 'netProfitBefore', item: 'Net Profit (before taxes)', year1: '0.00', year2: '0.00', year3: '0.00', formula: "grossProfit - totalExpenses", desc: 'Gross profit minus operating expenses before paying federal, state and local income taxes.' },
                    { id: 'incomeTaxes', item: 'Income Taxes', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.incomeTaxes', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.incomeTaxes', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.incomeTaxes', desc: 'The total amount of federal, state and local government taxes you pay.' },
                    { id: 'netProfitAfter', item: 'Net Profit (after taxes)', year1: '0.00', year2: '0.00', year3: '0.00', formula: "netProfitBefore - incomeTaxes", desc: 'The total profit that your company has earned after paying taxes.' },
                    { id: 'ownerDividends', item: 'Owner Draw/Dividends', year1: 'finacialProjections.profitLoss.profitLossData.profitLossYear1.ownerDividends', year2: 'finacialProjections.profitLoss.profitLossData.profitLossYear2.ownerDividends', year3: 'finacialProjections.profitLoss.profitLossData.profitLossYear3.ownerDividends', desc: 'The payments to investors or owners taken from your net profit after taxes. Dividends can take the form of cash, property, or stock.' },
                    { id: 'adjustedToRetained', item: 'Adjusted to Retained', year1: '0.00', year2: '0.00', year3: '0.00', formula: "netProfitAfter - ownerDividends", desc: 'Your remaining profit after taxes and distributions.' }
                  ]
                },
              ]
            }, handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData)}
           </Accordion.Content>                                                                                                                   
         </Accordion.Item>  
      </Accordion>
    </div>
  );
};

export default ProfitLoss;
