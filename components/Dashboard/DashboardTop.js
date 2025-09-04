import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const DashboardTop = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:py-9 px-8 mb-8 rounded-xl shadow-lg bg-gradient-to-r from-[#F59E0B] to-[#F27227]"
    >
      {/* Welcome section */}
      <div className="p-6 md:py-9 px-8 text-center rounded-xl bg-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Welcome!
        </h1>
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Your entrepreneurial journey continues here
        </h1>
        <div className="space-y-2 max-w-2xl mx-auto">
          <p className="text-xl">
            This is your hub for growth, innovation, and success. Let’s make your business dreams a reality!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardTop;
