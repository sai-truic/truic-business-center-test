import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const SectionNavigation = ({ activeSection }) => {
    const sections = [
        { id: 'features', name: 'Features', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
        { id: 'small-business-courses', name: 'Courses', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
        { id: 'legal-forms', name: 'Legal Forms', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { id: 'recommended-services', name: 'Services', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
        { id: 'contact', name: 'Contact', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    ];

    return (
        <motion.div 
            className="fixed left-4 top-1/3 transform -translate-y-1/2 z-50 hidden lg:flex flex-col space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            {sections.map((section) => (
                <Link
                    key={section.id}
                    to={section.id}
                    spy={true}
                    smooth={true}
                    offset={-70} 
                    duration={500}
                >
                    <motion.div
                        className={`flex items-center p-2 rounded-full cursor-pointer ${
                            activeSection === section.id
                                ? 'border bg-[#38657A] text-white shadow-2xl'
                                : 'bg-white text-[#38657A] hover:bg-[#38657A] hover:text-white shadow-2xl'
                        } transition-colors duration-300 relative group`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {section.icon}
                        <span className="ml-2 hidden group-hover:block absolute left-full pl-2 whitespace-nowrap bg-white text-[#38657A] rounded px-2 py-1 text-sm">
                            {section.name}
                        </span>
                    </motion.div>
                </Link>
            ))}
        </motion.div>
    );
};

export default SectionNavigation;
