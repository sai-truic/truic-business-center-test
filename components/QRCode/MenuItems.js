import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { qrCodeSections } from './constants/qrCodeSections.js';
import { QRCodeTypeButton } from './components/QRCodeTypeButton';
import { ScrollIndicator } from './components/ScrollIndicator';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import useInputState from '../useInputState';

export const MenuItems = () => {
  const [selected, setSelected] = useState(qrCodeSections[0]); // URL is first item
  const scrollContainerRef = useRef(null);
  const { setQrMenuSelected } = useInputState();

  // Set default on mount
  React.useEffect(() => {
    setQrMenuSelected('URL');
    setSelected(qrCodeSections[0]);
  }, []);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    const newScrollPosition = direction === 'left'
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newScrollPosition);
    setTimeout(updateScrollButtons, 300);
  };

  const handleScrollContainer = (e) => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
      updateScrollButtons();
    }
  };

  return (
    <Card className="border-2 border-orange-200 shadow-xl bg-white/80 backdrop-blur-sm hover:border-[#F7931E] transition-all duration-300">
      <CardHeader className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center space-x-3"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <QrCode className="w-8 h-8 text-neutral-950" />
          </motion.div>
          <h2 className="text-2xl font-bold bg-clip-text text-neutral-950 bg-gradient-to-r from-[#F7931E] to-orange-600">
          Choose your QR code type and customize it to fit your needs
          </h2>
        </motion.div>
      </CardHeader>

      <CardContent>
        <div className="relative group">
          <ScrollIndicator 
            direction="left" 
            onClick={() => handleScroll('left')}
            isVisible={canScrollLeft}
          />
          <ScrollIndicator 
            direction="right" 
            onClick={() => handleScroll('right')}
            isVisible={canScrollRight}
          />
          
          <div className="overflow-hidden px-8 sm:px-12 lg:px-16">
            <motion.div
              ref={scrollContainerRef}
              onScroll={handleScrollContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex overflow-x-auto pb-3 sm:pb-4 gap-2 sm:gap-3 lg:gap-4 snap-x snap-mandatory 
                scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100
                px-2 py-1 rounded-xl scroll-smooth"
            >
              {qrCodeSections.map((section, index) => (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <QRCodeTypeButton
                    section={section}
                    isSelected={selected?.name === section.name}
                    onClick={() => {
                      setSelected(section);
                      switch(section.name) {
                        case 'Contact Card':                                                                                                                          
                          setQrMenuSelected('vCard');                                                                      
                          break;  
                        case 'Bitcoin':
                          setQrMenuSelected('Bitcoin');
                          break;
                        case 'Youtube':
                          setQrMenuSelected('Youtube');
                          break;
                        default:
                          setQrMenuSelected(section.name);
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItems;
