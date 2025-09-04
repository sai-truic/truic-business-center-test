"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSafeUser } from './useSafeUser';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserButton } from "@clerk/nextjs";
import Sidebar from './Sidebar/Sidebar';
import { useAtom } from 'jotai';
import { isSettingsOpenAtom } from '../atoms/settingsAtomJotai';
import dynamic from 'next/dynamic';
import Dashboard from './Dashboard/Dashboard';
import LLCFormation from './Dashboard/LLCFormation'
import createHandleButtonClick from './../Utils/handleButtonClick';
import createHandleSelectChange from './../Utils/handleSelectChange';
import BusinessNameGenerator from './BusinessNameGenerator';
import OperatingAgreement from './OperatingAgreementTool/OperatingAgreement';
import BusinessPlanGenerator from './BusinessPlanGenerator';
import SmallBusinessCourse from './SmallBusinessCourse'
import LegalFormDownloads from './LegalFormDownloads';
import RecommendedServices from './RecommendedServices'
import useInputState from './useInputState';
import { SignIn, SignUp } from "@clerk/nextjs";
import LandingPage from './LandingPage';
import QRCodes from './QRCodes'
import BusinessCenter from './LandingPage/BusinessCenter'
import BusinessFormation from './BusinessFormation'
                                                                                                                                    
const useMediaQuery = dynamic(() => import('react-responsive').then(mod => mod.useMediaQuery), { ssr: false });                     
                                                                                                                                    
export const BusinessCenterDashboard = () => {                                                                                      
    const { isLoaded, isSignedIn, user } = useSafeUser();                                                                               
    const { setUserId, sidebarOption, setSidebarOption } = useInputState();                                                                                                                                                          
    const [isSettingsOpen, setIsSettingsOpen] = useAtom(isSettingsOpenAtom);                                                
    const [isOpen, setIsOpen] = useState(false);                                                                                    
    const sidebarRef = useRef(null);                                                                                                
    const [isMobile, setIsMobile] = useState(false);                                                                                
    const [isTablet, setIsTablet] = useState(false);                                                                                
    const [isDesktop, setIsDesktop] = useState(true);                                                                               
    const [currentPage, setCurrentPage] = useState('landing');                                                                      
                                                                                                                                    
    useEffect(() => {                                                                                                               
        const handleResize = () => {                                                                                                
            setIsMobile(window.innerWidth < 768);                                                                                   
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);                                                      
            setIsDesktop(window.innerWidth >= 1024);                                                                                
        };                                                                                                                          
                                                                                                                                    
        handleResize();                                                                                                             
        window.addEventListener('resize', handleResize);                                                                            
        return () => window.removeEventListener('resize', handleResize);                                                            
    }, []); 

    const handleOpenOperatingAgreement = useCallback(() => {
        setSidebarOption('OperatingAgreement');
        if (isMobile || isTablet) {
            setIsOpen(false);
        }
    }, [isMobile, isTablet]);

    useEffect(() => {
        window.addEventListener('openOperatingAgreement', handleOpenOperatingAgreement);
        return () => {
            window.removeEventListener('openOperatingAgreement', handleOpenOperatingAgreement);
        };
    }, [handleOpenOperatingAgreement]);

    const toggleSidebar = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            setUserId(user.id);
        }
    }, [isLoaded, isSignedIn, user, setUserId]);

    useEffect(() => {
        setIsOpen(isDesktop);
    }, [isDesktop]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isSettingsOpen) {
            setIsOpen(false);
        } else if (isOpen) {
            setIsSettingsOpen(false);
        }
    }, [isSettingsOpen, isOpen]);

    const handleButtonClick = createHandleButtonClick(user);
    const handleSelectChange = createHandleSelectChange(user);

    const handleNavigation = (option) => {
        setSidebarOption(option);
        if (isMobile || isTablet) {
            setIsOpen(false);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        const renderPage = () => {
            switch (currentPage) {
                case 'landing':
                    return <BusinessCenter 
                        onSignIn={() => setCurrentPage('signin')}
                        onSignUp={() => setCurrentPage('signup')}
                        onLogoClick={() => setCurrentPage('landing')}
                    />;
                case 'signin':
                    return (
                        <div className="flex justify-center items-center py-16">
                            <SignIn appearance={{ elements: { footer: "hidden" } }} />
                        </div>
                    );
                case 'signup':
                    return (
                        <div className="flex justify-center items-center py-16">
                            <SignUp appearance={{ elements: { footer: "hidden" } }} />
                        </div>
                    );
                default:
                    return <LandingPage 
                        onSignIn={() => setCurrentPage('signin')}
                        onSignUp={() => setCurrentPage('signup')}
                        onLogoClick={() => setCurrentPage('landing')}
                    />;
            }
        };

        return (
            <div className="min-h-screen flex flex-col">
                {renderPage()}
            </div>
        );
    }

    const sidebarItems = [                                                                                                                 
        { key: 'Dashboard', label: 'Dashboard', icon: 'HomeIcon', style: 'Outline' },
        { key: 'BusinessFormation', label: 'Business Formation', icon: 'BuildingOfficeIcon', style: 'Outline' },
        { key: 'BusinessNameGenerator', label: 'Business Name Generator', icon: 'BuildingStorefrontIcon', style: 'Outline' },                                                                        
        { key: 'OperatingAgreement', label: 'Operating Agreement', icon: 'NewspaperIcon', style: "Outline" },                                        
        { key: 'BusinessPlanGenerator', label: 'Business Plan Generator', icon: 'BriefcaseIcon', style: "Outline" },
        { key: 'RecommendedServices', label: 'Recommended Services', icon: 'StarIcon', style: "Outline" },                                                   
        { key: 'Documents', label: 'Free Legal Forms', icon: 'DocumentIcon', style: "Outline" },                                                    
        { key: 'SmallBusinessCourse', label: 'Small Business Course', icon: 'AcademicCapIcon', style: "Outline" },     
        { key: 'QRCode', label: 'QRCode Generator', icon: 'QrCodeIcon', style: "Outline" },                                           
    ];

    const getSidebarOptionLabel = () => {
        const option = sidebarItems.find(item => item.key === sidebarOption);
        return option ? option.label : '';
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <header className={`flex justify-between items-center p-2 sm:p-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white z-30 relative border-b border-neutral-800/30 backdrop-blur-sm ${isSettingsOpen ? 'pointer-events-none' : ''}`}>
                <button 
                    onClick={toggleSidebar} 
                    className={`z-40 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 active:bg-white/5 ${isSettingsOpen ? 'opacity-50' : ''}`} 
                    disabled={isSettingsOpen}
                >
                    {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
                <div className={`ml-auto flex items-center ${isSettingsOpen ? 'opacity-50' : ''}`}>
                    <UserButton disabled={isSettingsOpen} />
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar 
                    ref={sidebarRef} 
                    isOpen={isOpen} 
                    setSidebarOption={setSidebarOption}
                    sidebarOption={sidebarOption}
                    sidebarItems={sidebarItems} 
                    handleButtonClick={handleButtonClick} 
                    closeSidebar={closeSidebar} 
                    isMobile={isMobile} 
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                />
                <div className={`flex-1 overflow-y-auto p-2 sm:p-4 ps-9 ${isDesktop && isOpen ? 'ml-72' : isDesktop ? 'ml-24' : 'ml-0 sm:ps-7 sm:pe-0'} transition-all duration-300`}>
                    {sidebarOption === 'Dashboard' ? (
                        <Dashboard 
                            handleButtonClick={handleButtonClick}
                            handleSelectChange={handleSelectChange}
                            onNavigate={handleNavigation} />
                    ) : sidebarOption === 'BusinessFormation' ? (
                        <BusinessFormation />
                    ) : sidebarOption === 'BusinessNameGenerator' ? (
                        <BusinessNameGenerator />
                    ) : sidebarOption === 'QRCode' ? (
                        <QRCodes />
                    ) : sidebarOption === 'OperatingAgreement' ? (
                        <OperatingAgreement />
                    ) : sidebarOption === 'BusinessModelCanvas' ? (
                        <BusinessModelCanvas />
                    ) : sidebarOption === 'Documents' ? (
                        <LegalFormDownloads />
                    ) : sidebarOption === 'SalesTaxCalculator' ? (
                        <SalesTaxCalculator />
                    ) : sidebarOption === 'BusinessPlanGenerator' ? (
                        <BusinessPlanGenerator />
                    ) : sidebarOption === 'SmallBusinessCourse' ? (
                        <SmallBusinessCourse />
                    ) : sidebarOption === 'RecommendedServices' ? (
                        <RecommendedServices />
                    ) : (
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-lg font-semibold">{getSidebarOptionLabel()}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessCenterDashboard;
