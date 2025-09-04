import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import DomainCard from './DomainCard';

/**
 * Component for an accordion section for each domain category
 */
const DomainCategoryAccordion = ({ 
  category, 
  domains, 
  domainName, 
  onCheckDomain, 
  configProps = {} 
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <Disclosure key={category} as="div" defaultOpen={category === 'Universal'}>
        {({ open }) => (
          <>
            <Disclosure.Button 
              className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold focus:outline-none hover:bg-gray-100 transition-colors bg-white"
            >
              <span className="text-lg text-gray-800">{category} Domains ({domains.length})</span>
              <ChevronDownIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } h-5 w-5 text-gray-600 transition-transform`}
              />
            </Disclosure.Button>
            {open && (
              <div className="bg-gray-50 px-6 py-4">
                <div className="space-y-3">
                  {domains.map((domain, index) => (
                    <DomainCard 
                      key={index} 
                      domain={domain} 
                      domainName={domainName}
                      onCheckDomain={onCheckDomain}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default DomainCategoryAccordion;
