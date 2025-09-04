import React from 'react';
import { SectionTitle } from './common';
import renderFormField from './../renderFormField';
import { Accordion } from './../ui/accordion';
import { ChevronDown } from 'lucide-react';

const BalanceSheet = ({ handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData }) => {
  return (
    <div className="space-y-6">
      <SectionTitle 
        infoText={`
          <h2 class="text-xl font-bold mb-4">Balance Sheet: Your Business's Financial Snapshot</h2>
          <p class="mb-4">A projected balance sheet provides a comprehensive view of your business's financial health at a specific point in time. It's crucial for:</p>
          <ul class="list-disc pl-6 mb-4">
            <li class="mb-2">Assessing your company's financial position</li>
            <li class="mb-2">Identifying potential financial risks and opportunities</li>
            <li class="mb-2">Making informed business decisions</li>
          </ul>
          <p class="mb-4">Key components of the Balance Sheet include:</p>
          <ol class="list-decimal pl-6 mb-4">
            <li class="mb-2"><strong>Assets:</strong> What your business owns (e.g., cash, inventory, equipment)</li>
            <li class="mb-2"><strong>Liabilities:</strong> What your business owes (e.g., loans, accounts payable)</li>
            <li class="mb-2"><strong>Equity:</strong> The owner's stake in the business (Assets - Liabilities)</li>
          </ol>
          <p class="italic mt-4">Using your profit and loss and cash flow spreadsheets, project your balance sheet for the end of your first year. Enter the amounts for each section (assets, liabilities, and equity) in the table below.</p>
        `} 
        infoTitle="Balance Sheet Information"
        handleInfoClick={handleInfoClick}>
        Balance Sheet
      </SectionTitle>
      
      {renderFormField('textarea', 
        'finacialProjections.balanceSheet.balanceSheetAssumptions', 
        'balanceSheetAssumptions', 
        'What are the assumptions for your balance sheet spreadsheet?', 
        'Explain any documents, forecasts or other assumptions that you relied on to formulate your Balance Sheet statement. This may include assumptions about the value of your assets, and your liabilities, debt and equity.', 
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
            {renderFormField('datepicker', 'finacialProjections.balanceSheet.balanceSheetStartDate', 'balanceSheetStart', 'Start Date', '', {
              allowFutureDates: true,
              inputProps: {
                className: 'py-2 sm:py-3 md:py-4 form-input block w-full rounded-lg bg-orange-50 border border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm md:text-base transition-all duration-200 relative z-10',
                icon: 'Calendar',
                iconClassName: 'absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl z-20'
              },
            }, handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData)}
          </div>
          <div className="flex-1">
            {renderFormField('datepicker', 'finacialProjections.balanceSheet.balanceSheetEndDate', 'balanceSheetEnd', 'End Date', '', {
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
        <Accordion.Item value="balance-sheet-projection">
          <Accordion.Trigger>
            <div className="block text-sm font-medium text-gray-700 flex justify-between items-center w-full py-4 text-left border-b border-orange-200 hover:bg-orange-50/50 transition-colors duration-200 group">
              <span className="text-[#F7931E] font-semibold">Balance Sheet Projections</span>
              <ChevronDown className="h-5 w-5 text-[#F7931E] transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            {renderFormField('toggleableDataTable', 'finacialProjections.balanceSheet.balanceSheetData', 'Balance Sheet Projections', '', '', {
              columns: [
                { id: 'item', header: 'BALANCE SHEET ASSETS', accessor: (row) => row.item },
                { id: 'balanceSheetStart', header: 'Start Date', accessor: (row) => row.start },
                { id: 'balanceSheetEnd', header: 'End Date', accessor: (row) => row.end }
              ],
              data: [
                { id: 'cashInBank', item: 'Cash in bank', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.cashInBank', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.cashInBank', desc: 'The total amount of funds your company has deposited in your account.' },
                { id: 'accountsReceiveable', item: 'Accounts receivable', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.accountsReceiveable', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.accountsReceiveable', desc: 'The total amount of money that is owed to you.' },
                { id: 'inventory', item: 'Inventory', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.inventory', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.inventory', desc: 'The total value of assets held by the company for sale. These assets include finished goods, works in progress or raw materials.' },
                { id: 'prepaidExpenses', item: 'Prepaid Expenses', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.prepaidExpenses', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.prepaidExpenses', desc: 'The total value of assets that will not be expensed until a future date.' },
                { id: 'deposit', item: 'Deposits', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.deposit', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.deposit', desc: 'The total amount of prepaid deposits for your company.' },
                { id: 'otherCurrent', item: 'Other current Assets', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.otherCurrent', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.otherCurrent', desc: 'The total value of any other assets held by your company that do not fit into any of the above categories.' },
                { id: 'totalCurrentAssets', item: 'Total Current Assets', start: '0.00', end: '0.00', formula: 'cashInBank + accountsReceiveable + inventory + prepaidExpenses + deposit + otherCurrent', desc: 'The sum of the Cash In Bank, Accounts Receivable, Inventory, Prepaid Expenses, and Other Current Assets fields.' },
                { 
                  item: 'Fixed Assets', 
                  start: '0.00', 
                  end: '0.00', 
                  category: 1,
                  items: [
                    { id: 'equipment', item: 'Machinery & Equipment', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.equipment', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.equipment', desc: 'Total value of machinery & equipment owned by your company.' },
                    { id: 'furniture', item: 'Furniture & Fixtures', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.furniture', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.furniture', desc: 'Total value of furniture and other fixtures owned by your company.' },
                    { id: 'leaseholder', item: 'Leaseholder improvements', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.leaseholder', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.leaseholder', desc: 'Total value of all improvements made by your company to its location(s).' },
                    { id: 'buildings', item: 'Land & Buildings', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.buildings', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.buildings', desc: 'Total value of all land and buildings owned by your company.' },
                    { id: 'otherFix', item: 'Other fixed assets', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.otherFix', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.otherFix', desc: 'Total value of other fixed assets that do not fit into any of the above categories (e.g. vehicles, etc.)' },
                    { id: 'totalFixedAssets', item: 'Total Fixed Assets\n(net of depreciation)', start: '0.00', end: '0.00', formula: 'equipment + furniture + leaseholder + buildings + otherFix', desc: 'The sum of the Fixed Assets, Machinery & Equipment, Furniture & Fixtures, Leaseholder Improvements, Land & Buildings, and Other Fixed Assets fields.' }
                  ]
                },
                {
                  item: 'Other Assets',
                  start: '0.00',
                  end: '0.00',
                  category: 1,
                  items: [
                    { id: 'intangibles', item: 'Intangibles', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.intangibles', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.intangibles', desc: 'The value of non-physical assets owned by your company. (e.g. intellectual property, etc.)' },
                    { id: 'others', item: 'Other', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.others', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.others', desc: 'The value of any other intangibles that do not fit into the above categories.' },
                    { id: 'totalOtherAssets', item: 'Total Other Assets', start: '0.00', end: '0.00', formula: 'intangibles + others', desc: 'The sum of the Intangibles, Deposits, and Other fields.' },
                    { id: 'totalAssets', item: 'Total Assets', start: '0.00', end: '0.00', formula: 'totalCurrentAssets + totalFixedAssets + totalOtherAssets', desc: 'The sum of the Current, Fixed and Other assets.' }
                  ]
                },
                {
                  item: 'Liabilities & Equity - Current Liabilities',
                  start: '0.00',
                  end: '0.00',
                  category: 1,
                  items: [
                    { id: 'ap', item: 'Accounts Payable', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.ap', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.ap', desc: 'The total amount of money that the company owes to its creditors.' },
                    { id: 'interest', item: 'Interest Payable', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.interest', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.interest', desc: 'The total amount of interest that is due to be paid within one year.' },
                    { id: 'taxes', item: 'Taxes Payable', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.taxes', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.taxes', desc: 'The total amount of taxes that are due to be paid within one year.' },
                    { id: 'notes', item: 'Notes, short term\n(due in 12 months)', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.notes', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.notes', desc: 'The total value of all short term loans owed by your company.' },
                    { id: 'currentPart', item: 'Current part, long-term debt', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.currentPart', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.currentPart', desc: 'Total payment owed in long term debt for the stated time period of the balance sheet.' },
                    { id: 'totalCurrentLiabilities', item: 'Total Current Liabilities', start: '0.00', end: '0.00', formula: 'ap + interest + taxes + notes + currentPart', desc: 'The sum of the Accounts Payable, Interest Payable, Taxes Payable, Notes, Short Term, and Current Part, Long Term Debt fields.' },
                  ]
                },
                {
                  item: 'Long Term Debt',
                  start: '0.00',
                  end: '0.00',
                  category: 1,
                  items: [
                    { id: 'bankLoan', item: 'Bank loans payable', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.bankLoan', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.bankLoan', desc: 'Debts that can be paid off in more than one year these include bonds, pensions, and product warranties.' },
                    { id: 'notesPay', item: 'Notes payable to stockholders', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.notesPay', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.notesPay', desc: 'Total amount owed by your company in stockholder notes.' },
                    { id: 'less', item: 'LESS: short-term portion', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.less', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.less', desc: 'The total value of company stock that has been sold, but is not owned by the company.' },
                    { id: 'otherLong', item: 'Other long-term debt', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.otherLong', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.otherLong', desc: 'The total amount of any other long term debt that does not fit into the above categories.' },
                    { id: 'totalLongTermDebt', item: 'Total Long-Term Debt', start: '0.00', end: '0.00', formula: 'bankLoan + notesPay - less + otherLong', desc: 'The sum of the Bank Loans Payable, Notes Payable to Stockholders, Less: Short Term Position, and Other Long Term Debt fields.' },
                    { id: 'totalLiabilities', item: 'Total Liabilities', start: '0.00', end: '0.00', formula: 'totalCurrentLiabilities + totalLongTermDebt', desc: 'The sum of the Total Current Liabilities and Total Long Term Debt fields.' },
                  ]
                },
                {
                  item: 'Owners Equity',
                  start: '0.00',
                  end: '0.00',
                  category: 1,
                  items: [
                    { id: 'commonStock', item: 'Common Stock', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.commonStock', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.commonStock', desc: 'The amount of capital that has been invested into the company.' },
                    { id: 'retained', item: 'Retained Earnings', start: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetStart.retained', end: 'finacialProjections.balanceSheet.balanceSheetData.balanceSheetEnd.retained', desc: 'The amount of net income that is retained by the company instead of being paid as dividends to investors at the end of the time period noted on the balance sheet.' },
                    { id: 'totalOwnersEquity', item: 'Total Owners Equity', start: '0.00', end: '0.00', formula: 'commonStock + retained', desc: 'The sum of the Invested Capital, Retained Earnings (Beginning), and Retained Earnings (Current) fields.' },
                    { id: 'totalLiabilitiesEquity', item: 'Total Liabilities & Equity', start: '0.00', end: '0.00', formula: 'totalLiabilities + totalOwnersEquity', desc: 'The sum of the Total Liabilities and Total Owner\'s Equity fields.' }
                  ]
                }
              ]
            }, handleInfoClick, businessPlanGeneratorData, setBusinessPlanGeneratorData)}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default BalanceSheet;
