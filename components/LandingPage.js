import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import Link from 'next/link';
import Hero from './LandingPage/Hero';
import Features from './LandingPage/Features';
import SmallBusinessCourses from './LandingPage/Services';
import Contact from './LandingPage/Contact';
import Footer from './LandingPage/Footer';
import LegalForms from './LandingPage/LegalForms'; 
import RecommendedServices from './LandingPage/RecommendedServices';
import ScrollToTopButton from './LandingPage/ScrollToTopButton';
import SectionNavigation from './LandingPage/SectionNavigation';

const formatItemName = (name) => {
    return name.split('\\n').map((line, index) => (
        <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
        </React.Fragment>
    ));
};

const LandingPage = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TRUIC Business Center",
        "url": "https://www.truic.com/business-center",
        "logo": "https://www.truic.com/logo.png",
        "description": "TRUIC Business Center offers comprehensive tools and resources for small businesses, including LLC formation, operating agreement generators, business courses, and expert guidance.",
        "sameAs": [
            "https://www.facebook.com/TRUIC",
            "https://twitter.com/TRUIC",
            "https://www.linkedin.com/company/truic"
        ]
    };

    // Example of how you might use formatItemName in your component
    const renderDataTableItem = (item) => (
        <div key={item.id} className="data-table-item">
            <span className="item-name">{formatItemName(item.name)}</span>
            <span className="item-value">{item.value}</span>
        </div>
    );
    const pageTitle = "TRUIC Business Center - Small Business Resources and Tools";
    const pageDescription = "Access comprehensive tools and resources for small businesses, including operating agreement generators, business courses, and expert guidance.";
    const [activeSection, setActiveSection] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        Events.scrollEvent.register('begin', function() {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function() {
            console.log("end", arguments);
        });

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'features', 'small-business-courses', 'legal-forms', 'recommended-services', 'contact'];
            let current = '';

            for (let section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section;
                        break;
                    }
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const menuItems = [
        { name: 'Start an LLC', link: 'https://howtostartanllc.com/form-an-llc' },
        { name: 'Operating Agreement', link: 'https://howtostartanllc.com/free-operating-agreement-template' },
        { name: 'Best LLC Services', link: 'https://howtostartanllc.com/reviews/llc-formation-top-five' },
    ];

    const [showSignIn, setShowSignIn] = useState(false);
    const handleSignIn = () => {
        setShowSignIn(true);
        scroll.scrollTo('contact', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -50 // Adjust this value as needed to account for any fixed headers
        });
    };

    const handleSignUp = () => {
        setShowSignIn(false);
        scroll.scrollTo('contact', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -50 // Adjust this value as needed to account for any fixed headers
        });
    };

    const MenuItems = ({ isMobile = false }) => (
        <>
          <Link href="/sign-in" passHref>
              <motion.div 
                  className={`bg-[#DB6300] text-white hover:bg-[#C55A00] px-2 sm:px-4 py-2 sm:py-4 rounded-lg text-base sm:text-lg font-extrabold transition duration-300 flex items-center shadow-md hover:shadow-lg ${isMobile ? 'w-full mb-2' : ''} glossy-button`}
                  initial={isMobile ? { x: -50, opacity: 0 } : {}}
                  animate={isMobile ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: menuItems.length * 0.1 }}
              >
                  <a onClick={() => setIsMenuOpen(false)} className="flex items-center w-full">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                      Sign In
                  </a>
              </motion.div>
          </Link>
          <Link href="/sign-up" passHref>
              <motion.div 
                  className={`bg-[#DB6300] text-white px-2 sm:px-5 py-2 sm:py-4 rounded-lg text-base sm:text-lg font-extrabold hover:bg-[#C55A00] transition duration-300 shadow-md hover:shadow-lg flex items-center ${isMobile ? 'w-full' : ''} glossy-button`}
                  initial={isMobile ? { x: -50, opacity: 0 } : {}}
                  animate={isMobile ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: (menuItems.length + 1) * 0.1 }}
              >
                  <a onClick={() => setIsMenuOpen(false)} className="flex items-center w-full">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      Sign Up
                  </a>
              </motion.div>
          </Link>
        </>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-[#EAEAEA] to-[#E5E5E5] animate-gradient-x">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="small business tools, LLC formation, operating agreement generator, business courses, entrepreneurship resources, startup guidance, legal documents for business, TRUIC" />
                <link rel="canonical" href="https://www.truic.com/business-center" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>
            <nav className="fixed top-0 left-0 right-0 bg-[#15162A] shadow-lg z-50 animate-gradient-x">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a 
                        href="https://howtostartanllc.com/"
                        className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105" 
                    >
                        <img 
                            src="https://truic.com/wwwroot/images/footer/truic-white.png" 
                            alt="Business Center Logo" 
                            className="h-12 md:h-16"
                        />
                    </a>
                    <div className="hidden xl:flex items-center space-x-2 xl:space-x-4">
                        <MenuItems />
                    </div>
                    <div className="xl:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-[#FEFAF7] focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 w-4/5 md:w-2/3 lg:w-1/2 h-full bg-gradient-to-r from-[#2D5569] via-[#346277] to-[#3F7085] shadow-lg z-50 overflow-y-auto"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center p-6 border-b border-indigo-800">
                                <img 
                                    src="https://howtostartanllc.com/images/full-logo.svg" 
                                    alt="Business Center Logo" 
                                    className="h-10"
                                />
                                <button 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white focus:outline-none"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-grow overflow-y-auto">
                                <div className="p-6">
                                    <MenuItems isMobile />
                                </div>
                            </div>
                            <div className="p-6 border-t border-indigo-800">
                                <p className="text-indigo-300 text-sm">© 2023 Business Center. All rights reserved.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/*<SectionNavigation activeSection={activeSection} />*/}
            <div className="container mx-auto px-6 pt-24 md:max-w-full">
                <Element name="hero" id="hero"><Hero onGetStarted={handleSignUp} /></Element>
                <Element name="features" id="features"><Features /></Element>
                {/* <Element name="small-business-courses" id="small-business-courses"><SmallBusinessCourses /></Element>
                <Element name="legal-forms" id="legal-forms"><LegalForms /></Element>
                <Element name="recommended-services" id="recommended-services"><RecommendedServices /></Element> */}
                <Element name="contact" id="contact">
                    <Contact showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
                </Element>
            </div>

            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default LandingPage;
