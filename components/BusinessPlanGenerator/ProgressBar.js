import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    FileText,
    BookOpen,
    FileSpreadsheet,
    Building2,
    BarChart2,
    Package,
    TrendingUp,
    PiggyBank,
    CheckSquare,
} from 'lucide-react';

const ProgressBarSections = ({ currentSection, setCurrentSection }) => {
    const sectionLabels = [
        { label: 'Intro', icon: BookOpen, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Cover', icon: FileSpreadsheet, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Summary', icon: FileText, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Company', icon: Building2, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Market', icon: BarChart2, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Product', icon: Package, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Marketing', icon: TrendingUp, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Financials', icon: PiggyBank, color: 'from-[#F7931E] to-orange-500' },
        { label: 'Final', icon: CheckSquare, color: 'from-[#F7931E] to-orange-500' }
    ];

    const getVisibleSections = (currentIndex, totalSections, visibleCount) => {
        let start = Math.max(0, Math.min(currentIndex - Math.floor(visibleCount / 2), totalSections - visibleCount));
        let end = Math.min(start + visibleCount, totalSections);
        start = Math.max(0, end - visibleCount);
        return sectionLabels.slice(start, end);
    };

    const visibleMobileSections = useMemo(() => 
        getVisibleSections(currentSection, sectionLabels.length, 3),
    [currentSection]);

    const visibleTabletSections = useMemo(() => 
        getVisibleSections(currentSection, sectionLabels.length, 5),
    [currentSection]);

    const TabButton = ({ section, index, isCurrent }) => (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-300 flex-1 ${
                isCurrent
                ? `bg-gradient-to-r ${section.color} text-white shadow-lg hover:shadow-xl`
                : 'text-neutral-950 bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-[#F7931E] shadow-md hover:shadow-lg'
            }`}
            onClick={() => setCurrentSection(index)}
        >
            {React.createElement(section.icon, { className: "h-5 w-5 mb-1" })}
            <span className="text-xs font-medium truncate w-full text-center">{section.label}</span>
        </motion.button>
    );

    const ProgressBarSegment = ({ color, index, isCurrent, isCompleted }) => (
        <motion.button
            className={`h-3 flex-grow rounded-full cursor-pointer transition-all duration-300 ${
                isCompleted
                    ? `bg-gradient-to-r ${color} shadow-inner`
                    : 'bg-orange-50 hover:bg-orange-100 border-2 border-orange-200'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setCurrentSection(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={`h-full w-full bg-white bg-opacity-20 rounded-full ${isCurrent ? 'ring-2 ring-white' : ''}`}></div>
        </motion.button>
    );

    return (
        <div className="mb-8">
            <div className="flex flex-col justify-between items-center">
                <div className="w-full main-content-border p-2 shadow-md hover:shadow-xl transition-all duration-300">
                    {/* Mobile View */}
                    <div className="sm:hidden flex items-center">
                        <ChevronLeft 
                            className="h-6 w-6 text-neutral-950 hover:text-[#F7931E] cursor-pointer flex-shrink-0 transition-colors duration-200"
                            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                        />
                        <div className="flex flex-1 justify-between">
                            {visibleMobileSections.map((section, idx) => (
                                <TabButton 
                                    key={section.label} 
                                    section={section} 
                                    index={sectionLabels.findIndex(s => s.label === section.label)}
                                    isCurrent={section.label === sectionLabels[currentSection].label} 
                                />
                            ))}
                        </div>
                        <ChevronRight 
                            className="h-6 w-6 text-neutral-950 hover:text-[#F7931E] cursor-pointer flex-shrink-0 transition-colors duration-200"
                            onClick={() => setCurrentSection(Math.min(sectionLabels.length - 1, currentSection + 1))}
                        />
                    </div>

                    {/* Tablet View (including iPad Pro) */}
                    <div className="hidden sm:flex lg:hidden items-center">
                        <ChevronLeft 
                            className="h-6 w-6 text-neutral-950 hover:text-[#F7931E] cursor-pointer flex-shrink-0 transition-colors duration-200"
                            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                        />
                        <div className="flex flex-1 justify-between">
                            {visibleTabletSections.map((section, idx) => (
                                <TabButton 
                                    key={section.label} 
                                    section={section} 
                                    index={sectionLabels.findIndex(s => s.label === section.label)}
                                    isCurrent={section.label === sectionLabels[currentSection].label} 
                                />
                            ))}
                        </div>
                        <ChevronRight 
                            className="h-6 w-6 text-neutral-950 hover:text-[#F7931E] cursor-pointer flex-shrink-0 transition-colors duration-200"
                            onClick={() => setCurrentSection(Math.min(sectionLabels.length - 1, currentSection + 1))}
                        />
                    </div>

                    {/* Desktop View */}
                    <div className="hidden lg:flex justify-between items-center w-full py-2">
                        {sectionLabels.map((section, index) => (
                            <React.Fragment key={index}>
                                <TabButton 
                                    section={section} 
                                    index={index}
                                    isCurrent={index === currentSection} 
                                />
                                {index < sectionLabels.length - 1 && (
                                    <ChevronRight className={`h-4 w-4 mx-1 ${
                                        currentSection > index 
                                            ? 'text-[#F7931E]' 
                                            : currentSection === index
                                                ? 'text-orange-400'
                                                : 'text-orange-200'
                                    } transition-colors duration-200`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    
                    {/* Progress Bar (visible on all screen sizes) */}
                    <div className="flex w-full mt-2 relative">
                        {sectionLabels.map(({ color }, index) => (
                            <React.Fragment key={index}>
                                <ProgressBarSegment
                                    color={color}
                                    index={index}
                                    isCurrent={index === currentSection}
                                    isCompleted={currentSection >= index}
                                />
                                {index < sectionLabels.length - 1 && (
                                    <motion.div
                                        className={`h-3 w-1 rounded-full ${
                                            currentSection > index 
                                                ? 'bg-[#F7931E]' 
                                                : currentSection === index
                                                    ? 'bg-orange-400'
                                                    : 'bg-orange-200'
                                        } transition-colors duration-200`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-30 rounded-full pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBarSections;
