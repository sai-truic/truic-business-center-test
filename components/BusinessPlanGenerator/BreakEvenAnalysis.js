import React from 'react';
import { SectionTitle } from './common';
import renderFormField from './../renderFormField';
import { Accordion } from './../ui/accordion';
import { ChevronDown } from 'lucide-react';

const BreakEvenAnalysis = ({ handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData }) => {
  return (
    <div className="space-y-6">
      <SectionTitle 
        infoText={`
          <h2 class="text-xl font-bold mb-4">Break Even Analysis: Understanding Your Business's Profitability Point</h2>
          <p class="mb-4">A break even analysis is a crucial financial tool that helps you determine when your business will become profitable. It indicates the point at which your total revenue equals your total costs, meaning you're neither making a profit nor incurring a loss.</p>
          <p class="mb-4">Key components of a Break Even Analysis include:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2"><strong>Fixed Costs:</strong> Expenses that remain constant regardless of sales volume (e.g., rent, salaries)</li>
            <li class="mb-2"><strong>Variable Costs:</strong> Expenses that change in proportion to sales volume (e.g., raw materials, direct labor)</li>
            <li class="mb-2"><strong>Sales Price:</strong> The price at which you sell your product or service</li>
          </ul>
          <p class="mb-4">The break even point is calculated using the following formula:</p>
          <p class="mb-4 font-semibold">Break Even Point = Fixed Costs / (Sales Price - Variable Costs)</p>
          <p class="italic mt-4">Fill out the cells in the table below, and your break even point will be automatically calculated for you. This will help you understand how many units you need to sell or how much revenue you need to generate to cover all your costs.</p>
        `} 
        infoTitle="Break Even Analysis Information">
        Break Even Analysis
      </SectionTitle>
      {renderFormField('textarea', 
        'finacialProjections.breakEven.breakEvenAssumptions', 
        'breakEvenAssumptions', 
        'What are the assumptions for your break-even spreadsheet?',
        'Explain any documents, forecasts or other assumptions that you relied on to formulate your break-even analysis. This may include assumptions about your current and future costs, such as raw materials, labor, and operating expenses.', 
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
        <Accordion.Item value="breakeven-analysis">
          <Accordion.Trigger>
            <div className="block text-sm font-medium text-gray-700 flex justify-between items-center w-full py-4 text-left border-b border-orange-200 hover:bg-orange-50/50 transition-colors duration-200 group">
              <span className="text-[#F7931E] font-semibold">Direct Costs Projections</span>
              <ChevronDown className="h-5 w-5 text-[#F7931E] transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            {renderFormField('toggleableDataTable', 'finacialProjections.breakEven.breakEvenData', 'Break Even Analysis', '', '', {
              columns: [
                { id: 'item', header: 'Direct Costs', accessor: (row) => row.item },
                { id: 'fixedCosts', header: 'Fixed Costs ($)', accessor: (row) => row.fixed },
                { id: 'variableCosts', header: 'Variable Costs (%)', accessor: (row) => row.variable }
              ],
              data: [
                {
                  item: "Direct Costs",
                  fixed: '0.00', 
                  variable: '0.00', 
                  category: 1,
                  items: [
                    { id: 'goodCost', item: 'Cost of Goods Sold', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.goodCost', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.goodCost', desc: 'The amount of production cost that was required to produce the inventory that was sold.' },
                    { id: 'inventory', item: 'Inventory', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.inventory', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.inventory', desc: 'The total value of assets held by the company for sale. These assets include finished goods, and works in progress.' },
                    { id: 'rawMaterial', item: 'Raw Materials', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.rawMaterial', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.rawMaterial', desc: 'The total value of raw materials owned by the company.' },
                    { id: 'directLabor', item: 'Direct Labor', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.directLabor', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.directLabor', desc: 'The total cost of employees that work for the company on an hourly pay schedule including payroll taxes.' },
                    { id: 'totalDirectCosts', item: 'Total Direct Costs', fixed: '0.00', variable: '0.00', formula: 'goodCost + inventory + rawMaterial + directLabor', desc: 'Business costs, such as overhead and staff, which change based on the volume at which you produce products, or the volume of your sales.' },
                  ]
                },
                { 
                  item: 'Indirect Costs', 
                  fixed: '0.00', 
                  variable: '0.00', 
                  category: 1,
                  items: [
                    { id: 'salaries', item: 'Salaries', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.salaries', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.salaries', desc: 'The cost of employees that work for the company on a salaried pay scale including payroll taxes.' },
                    { id: 'supplies', item: 'Supplies', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.supplies', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.supplies', desc: 'Total amount spent for all company supplies.' },
                    { id: 'maintenance', item: 'Repairs & Maintenance', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.maintenance', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.maintenance', desc: 'The total amount paid required to complete repair and maintenance work.' },
                    { id: 'advertising', item: 'Advertising', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.advertising', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.advertising', desc: 'The amount paid for all company advertising efforts.' },
                    { id: 'travel', item: 'Car, delivery & travel', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.travel', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.travel', desc: 'The total amount paid for use of cars, delivery services, and travel costs.' },
                    { id: 'rent', item: 'Rent', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.rent', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.rent', desc: 'The amount paid to cover rental costs.' },
                    { id: 'telephone', item: 'Telephone', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.telephone', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.telephone', desc: 'The amount paid for all telephone services.' },
                    { id: 'utilities', item: 'Utilities', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.utilities', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.utilities', desc: 'The total amount paid for all utility bills.' },
                    { id: 'insurance', item: 'Insurance', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.insurance', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.insurance', desc: 'The total amount paid for all insurance coverage.' },
                    { id: 'taxes', item: 'Taxes (real estate, etc.)', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.taxes', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.taxes', desc: 'The total amount paid for all taxes, except payroll taxes.' },
                    { id: 'interest', item: 'Interest', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.interest', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.interest', desc: 'The total amount of interest paid on loans.' },
                    { id: 'depreciation', item: 'Depreciation', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.depreciation', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.depreciation', desc: 'The amount of money that is lost due to the aging of materials, assets, etc.' },
                    { id: 'otherCost', item: 'Other Costs', fixed: 'finacialProjections.breakEven.breakEvenData.fixedCosts.otherCost', variable: 'finacialProjections.breakEven.breakEvenData.variableCosts.otherCost', desc: 'The total for miscellaneous costs that do not fit into any other category on this sheet.' },
                    { id: 'totalIndirectCosts', item: 'Total Indirect Costs', fixed: '0.00', variable: '0.00', formula: 'salaries + supplies + maintenance + advertising + travel + rent + telephone + utilities + insurance + taxes + interest + depreciation + otherCost', desc: 'Business costs, such as rent or utilities, that do not change based on the volume of production or sales.' },
                  ]
                },
                { 
                  id: 'breakEvenSales', 
                  item: 'BreakEvenSales', 
                  description: 'Total Fixed Costs/(1-Total Variable Costs/100)', 
                  formula: '(totalDirectCosts.fixed + totalIndirectCosts.fixed) / (1 - ((totalDirectCosts.variable + totalIndirectCosts.variable) / 100))',
                  desc: 'The revenue required for your company to cover costs. This amount is known as the \'break even\' point.',
                  specialFormatting: (value) => {
                    const numValue = parseFloat(value);
                    return isNaN(numValue) ? '$0.00' : `${numValue.toFixed(2)}`;
                  },
                  fixed: '0.00',                                                                                                           
                  variable: '0.00',
                  outputValue: '0.00'
                }
              ]
            }, handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData)}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default BreakEvenAnalysis;
