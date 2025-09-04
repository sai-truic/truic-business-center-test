import React from 'react';
import { motion } from 'framer-motion';

const ReasonCard = ({ title, description, icon }) => {
    return (
        <motion.div
            className="bg-gradient-to-br from-[#FEFAF7] via-[#F9F9F9] to-[#F4F4F4] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 relative overflow-hidden hover:bg-gradient-to-br hover:from-[#F9F9F9] hover:via-[#F4F4F4] hover:to-[#FEFAF7] glossy-card border border-gray-200"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-[#F4A262] to-[#E5700F] rounded-full p-3 w-14 h-14 flex items-center justify-center mr-4 relative z-10 shadow-md hover:shadow-lg transition-shadow duration-300">
                    {React.cloneElement(icon, { className: "w-8 h-8 text-[#FEFAF7]" })}
                </div>
                <h3 className="text-2xl font-bold text-[#38657A] relative z-10 border-b-2 border-[#38657A] pb-1 tracking-wide text-shadow-sm">{title}</h3>
            </div>
            <p className="text-[#595959] leading-relaxed relative z-10 mt-4 tracking-wide text-shadow-sm">{description}</p>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    return (
        <section aria-labelledby="why-choose-us-heading" className="mb-10 py-24 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-[#F4F4F4] relative overflow-hidden border border-white border-opacity-40">
            <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 text-[#212429] relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Why Choose Us
            </motion.h2>
            <p className="text-xl text-center mb-12 text-[#595959]">Learn why TRUiC is the preferred choice for entrepreneurs and small business owners.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto px-6 relative z-10">
                <ReasonCard 
                    title="Expertise"
                    description="Our team of seasoned professionals brings years of experience in business formation and management."
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                />
                <ReasonCard 
                    title="Comprehensive Solutions"
                    description="From LLC formation to ongoing support, we offer end-to-end services to meet all your business needs."
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                />
                <ReasonCard 
                    title="Customer-Centric Approach"
                    description="We prioritize your success, offering personalized guidance and support every step of the way."
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                />
            </div>
        </section>
    );
};

export default WhyChooseUs;
