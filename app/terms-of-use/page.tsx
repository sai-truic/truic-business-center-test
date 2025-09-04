"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/LandingPage/Footer';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function TermsOfUse() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MenuItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <Link href="/sign-in">
        <motion.button 
          onClick={() => setIsMenuOpen(false)}
          className={`bg-[#DB6300] text-white hover:bg-[#C55A00] px-2 sm:px-4 py-2 sm:py-4 rounded-lg text-base sm:text-lg font-extrabold transition duration-300 flex items-center shadow-md hover:shadow-lg ${isMobile ? 'w-full mb-2' : ''} glossy-button`}
          initial={isMobile ? { x: -50, opacity: 0 } : {}}
          animate={isMobile ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          Sign In
        </motion.button>
      </Link>
      <Link href="/sign-up">
        <motion.button 
          onClick={() => setIsMenuOpen(false)}
          className={`bg-[#DB6300] text-white px-2 sm:px-5 py-2 sm:py-4 rounded-lg text-base sm:text-lg font-extrabold hover:bg-[#C55A00] transition duration-300 shadow-md hover:shadow-lg flex items-center ${isMobile ? 'w-full' : ''} glossy-button`}
          initial={isMobile ? { x: -50, opacity: 0 } : {}}
          animate={isMobile ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          Sign Up
        </motion.button>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-[#EAEAEA] to-[#E5E5E5] flex flex-col animate-gradient-x">
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#264653] via-[#2D5569] to-[#38657A] shadow-lg z-50 animate-gradient-x">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a 
            href="https://howtostartanllc.com/"
            className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105" 
          >
            <img 
              src="https://howtostartanllc.com/images/full-logo.svg" 
              alt="TRUIC Logo" 
              className="h-12 w-auto mr-3"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            <MenuItems />
            <Link href="/">
              <motion.button className="bg-[#DB6300] text-white hover:bg-[#C55A00] px-4 py-4 rounded-lg text-lg font-extrabold transition duration-300 flex items-center shadow-md hover:shadow-lg glossy-button">
                <FaHome className="mr-2" />
                Home
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden bg-[#1F4A5F] px-6 py-4 space-y-3"
          >
            <MenuItems isMobile={true} />
            <Link href="/">
              <motion.button 
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#DB6300] text-white hover:bg-[#C55A00] px-4 py-4 rounded-lg text-lg font-extrabold transition duration-300 flex items-center shadow-md hover:shadow-lg w-full glossy-button"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FaHome className="mr-2" />
                Home
              </motion.button>
            </Link>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Terms of Use</h1>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Use License</h2>
              <p className="text-gray-600 mb-6">
                Permission is granted to temporarily download one copy of the materials on TRUIC&apos;s website for personal, non-commercial transitory viewing only.
              </p>

              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Disclaimer</h2>
              <p className="text-gray-600 mb-6">
                The materials on TRUIC&apos;s website are provided on an &apos;as is&apos; basis. TRUIC makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Limitations</h2>
              <p className="text-gray-600 mb-6">
                In no event shall TRUIC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TRUIC&apos;s website, even if TRUIC or a TRUIC authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Use, please contact us at our website.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}