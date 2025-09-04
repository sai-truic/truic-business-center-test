import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Accordion } from '../ui/accordion';
import { ToolCard } from './ToolCard';
import { LearnMoreBox } from './LearnMoreBox';
import { motion } from 'framer-motion';

export const ServiceSection = ({ category, link, items, icon: Icon, onCompare, comparedItems, isExpanded, isAllCategory, sortOption }) => {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      } else if (sortOption === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [items, sortOption]);

  const content = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedItems.map(item => (
        <ToolCard
          key={item.id}
          id={item.id}
          category={category}
          title={item.title}
          link={item.link}
          description={item.description}
          rating={item.rating}
          features={item.features}
          onCompare={onCompare}
          isCompared={comparedItems.some(i => i.id === item.id && i.category === category)}
        />
      ))}
    </div>
  );

  const sectionContent = (
    <>
      {content}
      <LearnMoreBox category={category} link={link} />
    </>
  );

  if (isAllCategory) {
    return (
      <Accordion type="single" collapsible className="mb-6" defaultValue={isExpanded ? category : undefined}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion.Item value={category}>
            <Accordion.Trigger className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg w-full text-left flex justify-between items-center p-4 sm:p-6 hover:shadow-xl transition-all duration-300 ring-1 ring-orange-100">
              {({ isOpen }) => (
                <>
                  <div className="flex items-center">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E] mr-3" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 pr-4">
                      {category}
                    </h3>
                  </div>
                  <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-[#F7931E]" />
                  </div>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.Content className="pt-4 space-y-6">
              {sectionContent}
            </Accordion.Content>
          </Accordion.Item>
        </motion.div>
      </Accordion>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8 bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-lg ring-1 ring-orange-100"
      >
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-[#F7931E] mr-3 sm:mr-4" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950">Recommended {category} Services</h2>
          </div>
          {sectionContent}
        </div>
      </motion.div>
    );
  }
};
