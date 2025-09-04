import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/components/RecommendedServiceComponents/services';
import { Building2, FileText, ShieldCheck, Calculator, Newspaper, Phone, DollarSign, CreditCard } from 'lucide-react';

const iconComponents = {
    Banking: Building2,
    Formation: FileText,
    Insurance: ShieldCheck,
    Accounting: Calculator,
    "Press Release": Newspaper,
    "Business Phone": Phone,
    "Business Loans": DollarSign,
    Payroll: CreditCard
};

const ServiceCard = ({ title, description, category, link, rating }) => {
    const IconComponent = iconComponents[category];
    return (
        <motion.div
            className="bg-gradient-to-br from-[#FEFAF7] via-[#F9F9F9] to-[#F4F4F4] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 relative overflow-hidden hover:bg-gradient-to-br hover:from-[#F9F9F9] hover:via-[#F4F4F4] hover:to-[#FEFAF7] glossy-card border border-gray-200"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-[#F4A262] to-[#E5700F] rounded-full p-3 w-14 h-14 flex items-center justify-center mr-4 relative z-10 shadow-md hover:shadow-lg transition-shadow duration-300">
                    {IconComponent && <IconComponent className="w-8 h-8 text-[#FEFAF7]" />}
                </div>
                <h3 className="text-2xl font-bold text-[#38657A] relative z-10 border-b-2 border-[#38657A] pb-1 tracking-wide text-shadow-sm">{title}</h3>
            </div>
            <p className="text-[#595959] leading-relaxed relative z-10 mt-4 tracking-wide text-shadow-sm mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <div>
                    {rating && rating > 0 && (
                        <span className="text-[#38657A] font-bold">Rating: {rating}/5</span>
                    )}
                </div>
                <motion.a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#D47335] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#C55A00] transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F4A262] focus:ring-opacity-50 glossy-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Learn More
                </motion.a>
            </div>
        </motion.div>
    );
};

const RecommendedServices = () => {
    const [activeTab, setActiveTab] = useState('Banking');
    const displayedCategories = ['Banking', 'Formation', 'Insurance', 'Accounting'];
    const otherCategories = services.filter(s => !displayedCategories.includes(s.category));

    return (
        <section aria-labelledby="recommended-services-heading" className="mb-10 py-24 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-[#F4F4F4] relative overflow-hidden border border-white border-opacity-40">
            <motion.h2 
                id="recommended-services-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 text-[#212429] relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Recommended Services & Discounts
            </motion.h2>
            <p className="text-xl text-center mb-12 text-[#595959] max-w-3xl mx-auto">Explore our curated selection of top-rated services to help your business thrive. Enjoy exclusive discounts and offers.</p>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-wrap justify-center mb-8">
                    {displayedCategories.map((category) => (
                        <motion.button
                            key={category}
                            className={`px-6 sm:px-8 py-3 sm:py-4 m-2 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                                activeTab === category
                                    ? 'bg-[#45758E] text-white'
                                    : 'bg-white text-[#38657A] hover:bg-gray-100'
                            } glossy-button`}
                            onClick={() => setActiveTab(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {services.find(s => s.category === activeTab)?.items.slice(0, 1).map(item => (
                            <ServiceCard
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                category={activeTab}
                                link={item.link}
                                rating={item.rating}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    className="mt-12 sm:mt-16 p-8 sm:p-10 bg-gradient-to-br from-[#38657A] to-[#4A7A94] rounded-2xl text-white text-center shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Unlock More Services</h3>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8">Sign up to access our full range of recommended services and exclusive discounts.</p>
                    <motion.button 
                        className="bg-[#DF7938] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-[#C55A00] transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F4A262] focus:ring-opacity-50 glossy-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign Up Now
                    </motion.button>
                </motion.div>

                <div className="mt-16 sm:mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[#38657A]">More Categories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                        {otherCategories.map((category) => (
                            <motion.div
                                key={category.category}
                                className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <p className="text-[#38657A] font-semibold text-base sm:text-lg text-center">{category.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecommendedServices;
