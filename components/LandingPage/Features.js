import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, details }) => {
    return (
        <motion.div
            className="bg-gradient-to-br from-[#FEFAF7] via-[#F9F9F9] to-[#F4F4F4] p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 relative overflow-hidden hover:bg-gradient-to-br hover:from-[#F9F9F9] hover:via-[#F4F4F4] hover:to-[#FEFAF7] glossy-card border border-gray-200"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-[#F4A262] to-[#E5700F] rounded-full p-3 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mr-4 relative z-10 shadow-md hover:shadow-lg transition-shadow duration-300">
                    {React.cloneElement(icon, { className: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FEFAF7]" })}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#38657A] relative z-10 border-b-2 border-[#38657A] pb-1 tracking-wide text-shadow-sm">{title}</h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-[#595959] leading-relaxed relative z-10 mt-4 tracking-wide text-shadow-sm">{description}</p>
            {details && (
                <div className="mt-6 bg-white bg-opacity-50 rounded-xl p-4 shadow-inner">
                    <ul className="space-y-2">
                        {details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-[#DB6300] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#38657A] font-medium">{detail}</span>
                            </li>
                        ))}
                    </ul>
                    {title === "Small Business Course" && (
                        <p className="mt-4 text-[#DB6300] font-bold text-lg">The best part? It's completely free!</p>
                    )}
                </div>
            )}
        </motion.div>
    );
};

const Features = () => {
    return (
        <section aria-labelledby="features-heading" className="mb-10 py-16 sm:py-20 md:py-24 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-[#F4F4F4] relative overflow-hidden border border-white border-opacity-40">
            <motion.h2 
                id="features-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16 text-[#212429] relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                How We Help Your Business Grow
            </motion.h2>
            <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-[#595959] max-w-4xl mx-auto px-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
            >
                We provide a <span className="font-semibold text-[#38657A]">comprehensive suite</span> of small business tools and resources designed to <span className="font-semibold text-[#DB6300]">support your entrepreneurial journey</span>, from LLC formation to ongoing growth. Our expert-crafted solutions empower you to <span className="font-semibold text-[#38657A]">build, manage, and scale</span> your business with confidence.
            </motion.p>
            <div className="grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <FeatureCard 
                    title="Small Business Course"
                    description="Free course that will walk you through the entire process of business formation from idea to launch."
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    details={[
                        "Over 100 videos",
                        "Downloadable worksheets to fill out as you plan your business",
                        "Exclusive deals and discounts for business services"
                    ]}
                />
                <FeatureCard 
                    title="Free Business Tools"
                    description="Access our powerful Operating Agreement Tool, with more essential business tools coming soon to help you manage and scale your business effectively."
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
                    details={[
                        "Operating Agreement Tool",
                        "More essential business tools coming soon!"
                    ]}
                />
                <FeatureCard 
                    title="Recommended Services & Discounts"
                    description="Get personalized recommendations and exclusive discounts on essential business services."
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
                />
                <FeatureCard 
                    title="Free Legal Forms"
                    description="Access a wide range of customizable legal forms and templates for your business needs."
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                />
            </div>
        </section>
    );
};

export default Features;
