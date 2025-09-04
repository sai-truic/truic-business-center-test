import React from 'react';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { useRouter } from 'next/navigation';

const MissionCard = ({ title, description, icon, details, router }) => {

    return (
        <motion.div
            className="bg-gradient-to-br from-[#FEFAF7] via-[#F9F9F9] to-[#F4F4F4] p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 relative overflow-hidden hover:bg-gradient-to-br hover:from-[#F9F9F9] hover:via-[#F4F4F4] hover:to-[#FEFAF7] glossy-card border border-gray-200"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            <Element name="contact">
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
                </div>
            )}
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <motion.button
                    onClick={() => router.push('/sign-in')}
                    className="bg-gradient-to-r from-[#DB6300] to-[#E5700F] hover:from-[#C55A00] hover:to-[#DB6300] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Sign In
                </motion.button>
                <motion.button
                    onClick={() => router.push('/sign-up')}
                    className="bg-gradient-to-r from-[#38657A] to-[#4A7A92] hover:from-[#2C5266] hover:to-[#38657A] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Sign Up
                </motion.button>
            </div>
            </Element>
        </motion.div>
    );
};

const Contact = () => {
    const router = useRouter();

    return (
        <section aria-labelledby="mission-heading" className="mb-10 py-16 sm:py-20 md:py-24 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-[#F4F4F4] relative overflow-hidden border border-white border-opacity-40">
            <motion.h2 
                id="mission-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16 text-[#212429] relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Our Mission at TRUiC
            </motion.h2>
            <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-[#595959] max-w-4xl mx-auto px-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
            >
                At <span className="font-semibold text-[#38657A]">The Really Useful Information Company</span>, we're dedicated to <span className="font-semibold text-[#DB6300]">empowering entrepreneurs</span> with the knowledge and tools they need to succeed. Our mission is to make business information <span className="font-semibold text-[#38657A]">accessible, actionable, and free</span> for everyone.
            </motion.p>
            <div className="grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                        <MissionCard 
                            title="Our Mission"
                            description="Our goal is to help you succeed by:"
                            icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                            details={[
                                "Making information accessible and actionable by providing free guides, videos, and templates.",
                                "Offering free tools like our Operating Agreement Creation tool to simplify and accelerate your business development.",
                                "Continuously expanding our resources to support entrepreneurs at every stage of their journey."
                            ]}
                            router={router}
                        />
            </div>
        </section>
    );
};

export default Contact;
