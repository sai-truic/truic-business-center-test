import React, { useState, useRef, useEffect } from 'react';

// A single accordion item
const AccordionItem = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [height, setHeight] = useState(defaultOpen ? 'auto' : '0px');
    const contentRef = useRef(null);

    // Toggle panel function
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
        setHeight(isOpen ? '0px' : `${contentRef.current.scrollHeight}px`);
    };

    // Effect to adjust height when window is resized
    useEffect(() => {
        function updateHeight() {
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
        window.addEventListener('resize', updateHeight);
        updateHeight();
        return () => window.removeEventListener('resize', updateHeight);
    }, [isOpen]);

    return (
        <div className="w-full border-b last:border-b-0">
            <button
                className={`flex items-center justify-between w-full px-5 py-3 text-left text-base font-medium transition-all duration-300 ease-in-out ${isOpen ? 'font-bold' : 'font-normal'}`}
                onClick={toggleAccordion}
            >
                <span className="flex-1">{isOpen ? '✓ ' : ''}{title}</span>
                <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
            </button>
            <div 
                ref={contentRef} 
                style={{ maxHeight: `${height}`, overflow: 'hidden', transition: 'max-height 0.3s ease' }}
            >
                <div className="px-5 pb-3 pt-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;