import React, { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';

const SidebarItem = ({
  item,
  isOpen,
  isDesktop,
  handleClick,
  toggleSubItems,
  subItemVisibility,
  getIconComponent,
  isActive
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    const rect = iconRef.current.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.a
        href="#"
        onClick={() => {
          handleClick(item.key);
          toggleSubItems(item.key);
        }}
        className={`border-[1px] border-[#E4E4E7] flex items-center space-x-3 p-3 transition-all duration-300 hover:shadow-[0_0_15px_rgba(247,147,30,0.1)] rounded-lg group shadow-sm focus-visible:outline-truicDarkOrange${
          isOpen ? '' : ` ${isActive ? ' bg-truicDarkOrange' : ''} justify-center`
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={iconRef}>
          {getIconComponent(item.icon, item.style, isActive, isOpen)}
        </div>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden whitespace-nowrap text-sm sm:text-base${
              isActive ? ' text-truicDarkOrange font-extrabold' : ' text-neutral-950 font-medium '
            }`}
          >
            {item.label}
          </motion.span>
        )}
        {item.subItems && (
          <ChevronDownIcon
            className={`${
              isOpen ? 'block' : 'hidden'
            } h-5 w-5 ml-auto text-neutral-950 transition-transform duration-300 ease-in-out ${
              subItemVisibility[item.key] ? 'rotate-180' : ''
            }`}
            onClick={() => toggleSubItems(item.key)}
          />
        )}
      </motion.a>
      {!isOpen && showTooltip && (
        <Tooltip position={tooltipPosition}>{item.label}</Tooltip>
      )}
      <AnimatePresence>
        {isOpen && subItemVisibility[item.key] && item.subItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.subItems.map((subItem) => (
              <motion.a
                href="#"
                key={subItem.key}
                onClick={() => handleClick(subItem.key)}
                className={`flex items-center space-x-2 p-2 ml-6 transition-all duration-300 hover:bg-orange-100/30 hover:border-neutral-950/50 hover:shadow-[0_0_10px_rgba(247,147,30,0.1)] rounded-lg group relative backdrop-blur-sm bg-white/5 border-[1px] border-neutral-950/30 hover:bg-gradient-to-r hover:from-white/10 hover:to-transparent`}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  {getIconComponent(subItem.icon)}
                  {!isOpen && (
                    <div
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <div className="relative">
                        <div className="bg-white/90 backdrop-blur-sm text-neutral-950 text-sm rounded-md py-2 px-3 shadow-lg border-[1px] border-neutral-950/30 hover:shadow-[0_0_10px_rgba(247,147,30,0.1)]">
                          {subItem.label}
                        </div>
                        <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-white/90"></div>
                      </div>
                    </div>
                  )}
                </div>
                {isOpen && (
                  <span className="text-neutral-950 font-medium">{subItem.label}</span>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default SidebarItem;
