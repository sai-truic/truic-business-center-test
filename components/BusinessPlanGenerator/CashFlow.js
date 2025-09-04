import React from 'react';
import { SectionTitle } from './common';
import renderFormField from './../renderFormField';
import { Accordion } from './../ui/accordion';
import { ChevronDown } from 'lucide-react';

const CashFlow = ({ handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData }) => {
  return (
    <div className="space-y-6">
      <SectionTitle 
        infoText={`
          <h2 class="text-xl font-bold mb-4">Cash Flow: The Lifeblood of Your Business</h2>
          <p class="mb-4">The Cash Flow spreadsheet is a crucial tool that illustrates how money moves in and out of your business. It serves several important purposes:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2">Identifies periods when expenses may be too high</li>
            <li class="mb-2">Helps determine opportunities for short-term investments during cash surpluses</li>
            <li class="mb-2">Highlights the capital investment needs of your business</li>
          </ul>
          <p class="mb-4">Key components of the Cash Flow spreadsheet include:</p>
          <ol class="list-decimal pl-6 mb-4">
            <li class="mb-2"><strong>Cash Receipts:</strong> Money coming into your business (e.g., sales, loans)</li>
            <li class="mb-2"><strong>Cash Paid Out:</strong> Money leaving your business (e.g., expenses, loan repayments)</li>
            <li class="mb-2"><strong>Cash Position:</strong> The difference between cash receipts and cash paid out</li>
          </ol>
          <p class="italic mt-4">Remember: A positive cash flow is essential for the long-term sustainability of your business. Regular monitoring and analysis of your cash flow can help you make informed financial decisions.</p>
        `} 
        infoTitle="Cash Flow Information">
        Cash Flow
      </SectionTitle>
      
      {renderFormField('textarea', 
        'finacialProjections.cashFlow.cashFlowAssumptions', 
        'cashFlowAssumptions', 
        'What are the assumptions for your cash flow spreadsheet?',
        'Explain any documents, forecasts or other assumptions that you relied on to formulate your cash flow spreadsheet. This may include assumptions about cash receipts, cash paid out, and borrowing costs.', 
        { 
          showToolbar: true,
          showPlaceholder: false,
          showLabel: true,
          usePlaceholderAsLabel: true
        },
        handleInfoClick, 
        businessPlanGeneratorData, 
      setBusinessPlanGeneratorData)}
      
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row space-y-4 sm:space-y-0 md:space-y-0 lg:space-y-0 sm:space-x-4 md:space-x-4 lg:space-x-4">
          <div className="flex-1">
            {renderFormField('datepicker', 'finacialProjections.cashFlow.cashFlowStartDate', 'cashFlowStart', 'Start Date', '', {
              allowFutureDates: true,
              inputProps: {
                className: 'py-2 sm:py-3 md:py-4 form-input block w-full rounded-lg bg-orange-50 border border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                icon: 'Calendar',
                iconClassName: 'absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20'
              },
            }, handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData)}
          </div>
          <div className="flex-1">
            {renderFormField('datepicker', 'finacialProjections.cashFlow.cashFlowEndDate', 'cashFlowEnd', 'End Date', '', {
              allowFutureDates: true,
              inputProps: {
                className: 'py-2 sm:py-3 md:py-4 form-input block w-full rounded-lg bg-orange-50 border border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                icon: 'Calendar',
                iconClassName: 'absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20'
              },
            }, handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData)}
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <Accordion.Item value="cash-flow-projection">
          <Accordion.Trigger>
            <div className="block text-sm font-medium text-gray-700 flex justify-between items-center w-full py-4 text-left border-b border-orange-200 hover:bg-orange-50/50 transition-colors duration-200 group">
              <span className="text-[#F7931E] font-semibold">Cash Flow Projections</span>
              <ChevronDown className="h-5 w-5 text-[#F7931E] transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="overflow-x-auto">
              {renderFormField('toggleableDataTable', 'finacialProjections.cashFlow.cashFlowData', 'Cash Flow Projections', '', '', {
                columns: [
                  { id: 'item', header: 'CATEGORY', accessor: (row) => row.item },
                  { id: 'cashFlowYear0', header: 'Pre Startup EST', accessor: (row) => row.pre },
                  { id: 'cashFlowYear1', header: 'Year 1', accessor: (row) => row.year1 },
                  { id: 'cashFlowYear2', header: 'Year 2', accessor: (row) => row.year2 },
                  { id: 'cashFlowYear3', header: 'Year 3', accessor: (row) => row.year3 },
                  { id: 'cashFlowTotal', header: 'Total Item EST', accessor: (row) => row.total, formula: 'pre + year1 + year2 + year3' },
                ],
                data: [
                  { id: 'cashOnHand', item: 'Cash on Hand (beginning of month)', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.cashOnHand', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.cashOnHand', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.cashOnHand', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.cashOnHand', total: '0.00', desc: 'The amount of money that is immediately available to you.' },
                  { 
                    item: 'Cash Receipts', 
                    pre: '0.00', 
                    year1: '0.00', 
                    year2: '0.00', 
                    year3: '0.00', 
                    total: '0.00',
                    category: 1,
                    items: [
                      { id: 'cashSales', item: 'Cash Sales', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.cashSales', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.cashSales', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.cashSales', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.cashSales', total: '0.00', desc: 'Total amount of sales paid for in cash.' },
                      { id: 'crAccounts', item: 'Collections from CR accounts', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.crAccounts', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.crAccounts', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.crAccounts', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.crAccounts', total: '0.00', desc: 'Total amount of sales paid for by credit.' },
                      { id: 'loanInjection', item: 'Loan/Cash Injection', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.loanInjection', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.loanInjection', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.loanInjection', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.loanInjection', total: '0.00', desc: 'Total amount of funds provided by loans or other cash injections.' },
                      { id: 'totalCashReceipts', item: 'Total Cash Receipts', pre: '0.00', year1: '0.00', year2: '0.00', year3: '0.00', total: '0.00', formula: 'cashSales + crAccounts + loanInjection', desc: 'Total amount from Cash Receipts, Cash Sales, Collections from CR Accounts, and Loan/Other Cash Injection.' },
                      { id: 'totalCashAvailable', item: 'Total Cash Available\n(before cash out)', pre: '0.00', year1: '0.00', year2: '0.00', year3: '0.00', total: '0.00', formula: 'cashOnHand + totalCashReceipts', desc: 'Total amount from Cash On Hand plus Total Cash Receipts.' }
                    ]
                  },
                  { 
                    item: 'Cash Paid Out', 
                    pre: '0.00', 
                    year1: '0.00', 
                    year2: '0.00', 
                    year3: '0.00', 
                    total: '0.00',
                    category: 1,
                    items: [
                      { id: 'purchase', item: 'Purchases', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.purchase', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.purchase', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.purchase', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.purchase', total: '0.00', desc: 'Total amount spent on obtaining merchandise for your company.'},
                      { id: 'grossWages', item: 'Gross wages (exact withdrawal)', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.grossWages', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.grossWages', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.grossWages', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.grossWages', total: '0.00', desc: 'Total pre-tax amount spent on employee wages.'},
                      { id: 'outsideServices', item: 'Outside services', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.outsideServices', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.outsideServices', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.outsideServices', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.outsideServices', total: '0.00', desc: 'The amount paid for work done by sub-contractors or other contractors.'},
                      { id: 'supplies', item: 'Supplies (office & operation)', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.supplies', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.supplies', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.supplies', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.supplies', total: '0.00', desc: 'Total amount spent for all company supplies.'},
                      { id: 'maintenance', item: 'Repairs & maintenance', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.maintenance', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.maintenance', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.maintenance', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.maintenance', total: '0.00', desc: 'The total amount paid required to complete repair and maintenance work.'},
                      { id: 'advertising', item: 'Advertising', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.advertising', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.advertising', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.advertising', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.advertising', total: '0.00', desc: 'The amount paid for all company advertising efforts.'},
                      { id: 'carTravel', item: 'Car, delivery & travel', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.carTravel', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.carTravel', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.carTravel', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.carTravel', total: '0.00', desc: 'The total amount paid for use of cars, delivery services, and travel costs.'},
                      { id: 'accountingLegal', item: 'Accounting & legal', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.accountingLegal', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.accountingLegal', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.accountingLegal', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.accountingLegal', total: '0.00', desc: 'The amount paid for accounting and legal services.'},
                      { id: 'rent', item: 'Rent', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.rent', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.rent', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.rent', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.rent', total: '0.00', desc: 'The amount paid to cover rental costs.'},
                      { id: 'telephone', item: 'Telephone', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.telephone', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.telephone', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.telephone', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.telephone', total: '0.00', desc: 'The amount paid for all telephone services.'},
                      { id: 'utilities', item: 'Utilities', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.utilities', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.utilities', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.utilities', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.utilities', total: '0.00', desc: 'The total amount paid for all utility bills.'},
                      { id: 'insurance', item: 'Insurance', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.insurance', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.insurance', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.insurance', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.insurance', total: '0.00', desc: 'The total amount paid for all insurance coverage.'},
                      { id: 'taxes', item: 'Taxes (real estate, etc.)', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.taxes', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.taxes', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.taxes', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.taxes', total: '0.00', desc: 'The total amount paid for all taxes, except payroll taxes.'},
                      { id: 'interest', item: 'Interest', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.interest', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.interest', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.interest', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.interest', total: '0.00', desc: 'The total amount of interest paid on loans.'},
                      { id: 'otherExpenses', item: 'Other expenses', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.otherExpenses', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.otherExpenses', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.otherExpenses', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.otherExpenses', total: '0.00', desc: 'The total for miscellaneous costs that do not fit into any other category on this sheet.'},
                      { id: 'subTotal', item: 'Subtotal', pre: '0.00', year1: '0.00', year2: '0.00', year3: '0.00', total: '0.00', formula: 'purchase + grossWages + outsideServices + supplies + maintenance + advertising + carTravel + accountingLegal + rent + telephone + utilities + insurance + taxes + interest + otherExpenses', desc: 'Total of the amounts for Purchases, Gross Wages, Outside Services, Supplies, Repairs & Maintenance, Advertising, Car Delivery & Travel, Accounting & Legal, Rent, Telephone, Utilities, Insurance, Taxes, Interest, and Other Expenses.' },
                      { id: 'loanPayment',item: 'Loan principal payment', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.loanPayment', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.loanPayment', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.loanPayment', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.loanPayment', total: '0.00', desc: 'Total amount spent on loan principal payments'},
                      { id: 'capitalPurchase', item: 'Capital purchase', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.capitalPurchase', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.capitalPurchase', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.capitalPurchase', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.capitalPurchase', total: '0.00', desc: 'Total amount spent on fixed assets (e.g. furniture, buildings, computer equipment, etc.)'},
                      { id: 'otherStartupCosts', item: 'Other startup costs', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.otherStartupCosts', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.otherStartupCosts', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.otherStartupCosts', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.otherStartupCosts', total: '0.00', desc: 'Total of miscellaneous expenses that do not fit into any other category.'},
                      { id: 'reserveEscrow', item: 'Reserve and/or Escrow', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.reserveEscrow', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.reserveEscrow', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.reserveEscrow', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.reserveEscrow', total: '0.00', desc: 'Total amount paid for loan reserve and escrow costs.'},
                      { id: 'otherWithdrawal', item: 'Others Withdrawal', pre: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear0.otherWithdrawal', year1: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear1.otherWithdrawal', year2: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear2.otherWithdrawal', year3: 'finacialProjections.cashFlow.cashFlowData.cashFlowYear3.otherWithdrawal', total: '0.00', desc: 'The amount of any other withdrawals from your accounts.'},
                      { id: 'totalCashPaidOut', item: 'Total Cash Paid Out', pre: '0.00', year1: '0.00', year2: '0.00', year3: '0.00', total: '0.00', formula: 'subTotal + loanPayment + capitalPurchase + otherStartupCosts + reserveEscrow + otherWithdrawal', desc: 'The Total of the Subtotal, Loan Principal Payment, Capital Purchase, Other Startup Costs, Reserve and/or Escrow, and Other Withdrawal fields.' },
                      { id: 'cashPosition', item: 'Cash Position\n(Year 3 must match\nEnd Date cash in Bank\non your Balance Sheet)', pre: '0.00', year1: '0.00', year2: '0.00', year3: '0.00', total: '0.00', formula: 'totalCashAvailable - totalCashPaidOut', desc: 'The total Total of the Cash On Hand and Total Cash Paid Out fields. This must match the End Date Cash in Bank entry for the Balance Sheet form on the next page.' },
                    ]
                  },
                ]
              }, handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData)}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default CashFlow;
