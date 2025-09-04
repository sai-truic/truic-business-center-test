import React, { useState, forwardRef, useRef } from 'react';
import { XMarkIcon, CogIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '../../hooks/useDataStore';
import { useSafeUser } from '../useSafeUser';
import useInputState from '../useInputState';
import { useAtom } from 'jotai';
import { isSettingsOpenAtom } from '../../atoms/settingsAtomJotai';
import SidebarItem from './SidebarItem';
import { getIconComponent } from './iconUtils';
import SettingsDialog from './SettingsDialog';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';

const SidebarComponent = (
  {
    isOpen,
    setSidebarOption,
    sidebarOption,
    sidebarItems,
    closeSidebar,
    isMobile,
    isTablet,
    isDesktop
  },
  ref
) => {
  const [isSettingsOpen, setIsSettingsOpen] = useAtom(isSettingsOpenAtom);
  const [enabled, setEnabled] = useState(
    sidebarItems.reduce((acc, item) => ({ ...acc, [item.key]: true }), {})
  );
  const [subItemVisibility, setSubItemVisibility] = useState(
    sidebarItems.reduce((acc, item) => ({ ...acc, [item.key]: false }), {})
  );

  const cosmosStore = useDataStore('cosmosdb');
  const { user, isLoaded } = useSafeUser();
  const { updateState } = useInputState();

  const { data: fetchedOnboardingData, isLoading, error } = useQuery({
    queryKey: ['Onboarding', user?.id],
    queryFn: () => cosmosStore.fetch('Onboarding', `SELECT * FROM c WHERE c.userId = "${user?.id}"`),
    enabled: isLoaded && !!user,
  });

  // Handle onSuccess with useEffect
  React.useEffect(() => {
    if (fetchedOnboardingData && fetchedOnboardingData.length > 0) {
      updateState('onboarding', 'data', fetchedOnboardingData[0]);
      // console.log("Onboarding data set:", fetchedOnboardingData[0]);
    }
  }, [fetchedOnboardingData, updateState]);

  const handleClick = (key) => {
    // console.log('Set Sidebar Option :', key);
    setSidebarOption(key);
  };

  const toggleSubItems = (key) => {
    setSubItemVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // **Added Tooltip Logic for Settings Icon**
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
    <motion.aside
      ref={ref}
      initial={{ width: isOpen ? (isDesktop ? '18rem' : '0') : (isDesktop ? '6rem' : '0') }}
      animate={{ width: isOpen ? '18rem' : (isDesktop ? '6rem' : '0') }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 h-full min-w-[4rem] sm:min-w-[4.5rem] z-20 pt-14 border-[1px] border-neutral-950/30 bg-gradient-to-b from-orange-100/20 via-orange-50/10 to-transparent backdrop-blur-md shadow-[5px_0_15px_rgba(0,0,0,0.1)] ${
        isOpen ? 'overflow-y-auto' : 'overflow-visible'
      }`}
    >
      <AnimatePresence>
        {(isMobile || isTablet) && isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSidebar}
            className="absolute top-2 right-2 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 active:bg-white/5 text-neutral-950"
          >
            <XMarkIcon className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.ul
        className={`flex flex-col h-full mt-16 sm:mt-8 space-y-3 ${isOpen ? 'px-4' : 'p-2'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {sidebarItems.map(
          (item) =>
            enabled[item.key] && (
              <SidebarItem
                key={item.key}
                item={item}
                isOpen={isOpen}
                isDesktop={isDesktop}
                handleClick={handleClick}
                toggleSubItems={toggleSubItems}
                subItemVisibility={subItemVisibility}
                getIconComponent={getIconComponent}
                isActive={sidebarOption === item.key}
              />
            )
        )}
      </motion.ul>

      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </motion.aside>
  );
};

const Sidebar = forwardRef(SidebarComponent);
export default Sidebar;
