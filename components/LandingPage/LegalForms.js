import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { DocumentTextIcon } from '@heroicons/react/24/solid';

const LegalFormCard = ({ title, description, icon }) => (
    <motion.div
        className="bg-gradient-to-br from-[#FEFAF7] via-[#F9F9F9] to-[#F4F4F4] p-6 sm:p-8 rounded-2xl shadow-xl
        hover:shadow-2xl transition duration-300 relative overflow-hidden hover:bg-gradient-to-br hover:from-[#F9F9F9]
        hover:via-[#F4F4F4] hover:to-[#FEFAF7] glossy-card border border-gray-200"
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
        <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-[#F4A262] to-[#E5700F] rounded-full p-2 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center 
            justify-center mr-3 sm:mr-4 relative z-10 shadow-md hover:shadow-lg transition-shadow duration-300">
                {React.cloneElement(icon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-[#FEFAF7]" })}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#38657A] relative z-10 border-b-2 border-[#38657A] pb-1
            tracking-wide text-shadow-sm">{title}</h3>
        </div>
        <p className="text-sm sm:text-base text-[#595959] leading-relaxed relative z-10 mt-3 sm:mt-4 tracking-wide text-shadow-sm">{description}</p>
    </motion.div>
);

const LegalForms = () => {
    return (
        <section aria-labelledby="legal-forms-heading" className="mb-10 py-16 sm:py-24 rounded-3xl shadow-2xl bg-gradient-to-br 
        from-white to-[#F4F4F4] relative overflow-hidden border border-white border-opacity-40">
            <motion.h2
                id="legal-forms-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16
                text-[#212429] relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Free Legal Forms
            </motion.h2>
            <motion.p
                className="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-[#595959] max-w-3xl mx-auto px-4 sm:px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
            >
                Access a wide range of <span className="text-[#38657A] font-semibold">customizable legal forms</span> 
                and templates for your <span className="text-[#38657A] font-semibold">business needs</span>.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mb-12 sm:mb-16">
                <LegalFormCard
                    title="Operating Agreement"
                    description="Customize your LLC's operating agreement with our easy-to-use template."
                    icon={<DocumentTextIcon />}
                />
                <LegalFormCard
                    title="Non-Disclosure Agreement"
                    description="Protect your business secrets with our comprehensive NDA template."
                    icon={<DocumentTextIcon />}
                />
                <LegalFormCard
                    title="Employment Contract"
                    description="Create fair and legally compliant employment contracts for your team."
                    icon={<DocumentTextIcon />}
                />
                <LegalFormCard
                    title="Service Agreement"
                    description="Draft clear service agreements to set expectations with your clients."
                    icon={<DocumentTextIcon />}
                />
                <LegalFormCard
                    title="LLC Resolution"
                    description="Document important company decisions with our LLC resolution template."
                    icon={<DocumentTextIcon />}
                />
                <LegalFormCard
                    title="Privacy Policy"
                    description="Ensure compliance with privacy laws using our customizable policy template."
                    icon={<DocumentTextIcon />}
                />
            </div>
            <div className="flex justify-center px-4 sm:px-6">
                <Link
                    to="contact"
                    smooth={true}
                    duration={800}
                    offset={-50}
                    className="w-full sm:w-auto"
                >
                    <motion.button
                        className="w-full sm:w-auto bg-[#DB6300] text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-lg 
                        text-base sm:text-lg md:text-xl font-bold sm:font-extrabold hover:bg-[#C55A00] transition duration-300 
                        shadow-lg transform hover:scale-105 backdrop-blur-sm hover:shadow-xl glossy-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign up for full access
                    </motion.button>
                </Link>
            </div>
        </section>
    );
};

export default LegalForms;