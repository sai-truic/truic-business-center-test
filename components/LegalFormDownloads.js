import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocumentTextIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { FileText, Users, UserCog, Building, FileSignature, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { DocumentIcon } from '@heroicons/react/24/outline';

const LegalFormDownloads = () => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1366 });

  const [categories, setCategories] = useState([
    {
      name: 'Sample Operating Agreement',
      icon: <DocumentTextIcon className="w-6 h-6 text-[#F7931E]" />,
      forms: [
        { name: 'Single Member Operating Agreement', file: 'https://utfs.io/f/af6d13f1-371f-4e86-968c-157668e31b76-400oi9.pdf', icon: <FileText className="w-5 h-5 text-[#F7931E]" /> },
        { name: 'Multi-Member Operating Agreement (Member Managed)', file: 'https://utfs.io/f/e3e2b25e-31b2-41f1-8b9c-2ea8d538b1d5-jx5dcw.pdf', icon: <Users className="w-5 h-5 text-[#F7931E]" /> },
        { name: 'Multi-Member Operating Agreement (Manager Managed)', file: 'https://utfs.io/f/792ccd6c-5637-47c7-ab32-d49c4dcb76fe-t53m9a.pdf', icon: <UserCog className="w-5 h-5 text-[#F7931E]" /> },
        { name: 'Custom Operating Agreement', file: 'custom', icon: <UserCog className="w-5 h-5 text-[#F7931E]" /> }
      ],
    },
    {
      name: 'LLC Resolutions',
      icon: <DocumentTextIcon className="w-6 h-6 text-[#F7931E]" />,
      forms: [
        { name: 'Bank Resolution', file: 'https://utfs.io/f/25c6c4cf-98a2-466f-aa54-b972bef897a7-r75m86.pdf', icon: <Building className="w-5 h-5 text-[#F7931E]" /> },
        { name: 'Member Resolution Template', file: 'https://utfs.io/f/d6de7f86-1d85-41ce-a0a4-c96bf03431c7-3podeo.pdf', icon: <FileSignature className="w-5 h-5 text-[#F7931E]" /> },
      ],
    },
    {
      name: 'HIRING Documents',
      icon: <DocumentTextIcon className="w-6 h-6 text-[#F7931E]" />,
      forms: [
        { name: 'Employment Contract', file: 'https://utfs.io/f/f5699e8e-169a-4bd8-9084-f35488336215-dh63an.pdf', icon: <FileText className="w-5 h-5 text-[#F7931E]" /> },
        { name: 'Independent Contractor Service Agreement (ICSA)', file: 'https://utfs.io/f/88c6ef23-741d-4db9-8f34-c368398a15c8-y0qp1m.pdf', icon: <FileSignature className="w-5 h-5 text-[#F7931E]" /> },
        { name: 'Non-Disclosure Agreement (NDA)', file: 'https://utfs.io/f/04764ec7-902f-4846-9fdf-b4770d97b43b-4hgbhn.pdf', icon: <Shield className="w-5 h-5 text-[#F7931E]" /> },
      ],
    },
  ]);

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedFormName, setSelectedFormName] = useState('');
  const [showPdfOnMobile, setShowPdfOnMobile] = useState(false);

  useEffect(() => {
    if (categories.length > 0 && categories[0].forms.length > 0) {
      const firstForm = categories[0].forms[0];
      setSelectedPdf(firstForm.file);
      setSelectedFormName(firstForm.name);
    }
  }, []);

  const handleSelectPdf = (file, name) => {
    if (isMobileOrTablet) {
      if (file === 'custom') {
        console.log('Open custom operating agreement component');
      } else if (file) {
        window.open(file, '_blank');
      }
    } else {
      setSelectedPdf(file);
      setSelectedFormName(name);
      setShowPdfOnMobile(true);
    }
  };

  const handleViewPdf = (file, name) => {
    if (file === 'custom') {
      const event = new CustomEvent('openOperatingAgreement');
      window.dispatchEvent(event);
    } else if (isMobileOrTablet) {
      if (file) {
        setSelectedPdf(file);
        setSelectedFormName(name);
        window.open(file, '_blank');
      }
    } else {
      handleSelectPdf(file, name);
    }
  };

  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isBottom = scrollTop + clientHeight >= scrollHeight - 20;
        setShowScrollIndicator(scrollHeight > clientHeight);
        setIsAtBottom(isBottom);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight } = scrollRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      setShowScrollIndicator(scrollHeight > clientHeight);
    }
  }, [categories]);

  const FormList = () => (
    <Card className="w-full h-full shadow-lg bg-white rounded-xl flex flex-col relative border border-gray-200">
      <CardContent className="flex-grow p-0 overflow-hidden relative">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="grid gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6 pb-20" ref={contentRef}>
            {categories.map((category, index) => (
              <div key={index} className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-950 mb-2 text-center">{category.name}</h3>
                {category.forms.map((form, formIndex) => (
                  <motion.div
                    key={formIndex}
                    className={`p-3 sm:p-4 rounded-xl transition-all shadow-sm ${
                      selectedPdf === form.file
                        ? 'border border-orange-200 shadow-lg w-full text-left transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100/50 text-neutral-950 font-medium'
                        : 'border border-gray-200 shadow-sm w-full text-left transition-all duration-300 font-medium bg-white text-gray-600 hover:border-orange-200 hover:bg-orange-50/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <div className="flex-shrink-0">
                          {React.cloneElement(form.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-[#F7931E]" })}
                        </div>
                        <span className="text-xs sm:text-sm md:text-base ml-2 sm:ml-3 font-semibold">{form.name}</span>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleViewPdf(form.file, form.name)}
                          className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#C6500C] rounded-xl shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 w-full justify-center focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          {form.file === 'custom' ? (
                            'View'
                          ) : form.file ? (
                            <>
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View PDF
                            </>
                          ) : (
                            'Sign Up'
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  isAtBottom ? scrollToTop() : scrollToBottom();
                }}
              >
                <AnimatePresence mode="wait">
                  {isAtBottom ? (
                    <motion.div
                      key="chevron-up"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronUp className="text-[#F7931E] w-8 h-8" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chevron-down"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="text-[#F7931E] w-8 h-8 animate-bounce" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );

  const PdfViewer = () => (
    <Card className="w-full h-full shadow-lg bg-white rounded-xl flex flex-col border border-gray-200">
      <CardContent className="p-0 flex-grow flex flex-col">
        {selectedPdf ? (
          <>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-4 border-b border-orange-200 flex items-center rounded-t-xl flex-shrink-0">
              <button 
                onClick={() => setShowPdfOnMobile(false)} 
                className="mr-3 lg:hidden"
              >
                <ArrowLeftIcon className="w-6 h-6 text-[#F7931E]" />
              </button>
              <h3 className="text-xl font-bold text-neutral-950">{selectedFormName}</h3>
            </div>
            <div className="flex-grow">
              <iframe
                src={`${selectedPdf}#view=FitH`}
                className="w-full h-full border-0 rounded-b-xl"
                title="PDF Viewer"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[#F7931E] bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl">
            <DocumentTextIcon className="w-24 h-24 text-[#F7931E] mb-6" />
            <p className="text-2xl font-bold text-neutral-950">Select a PDF to view</p>
            <p className="text-lg mt-3 text-gray-600">Choose a document from the list</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6 lg:p-8">

      {/* Welcome section */}
      <div className="p-9 mb-8 text-black bg-gradient-to-r from-[#F59E0B] to-[#F27227] shadow-lg rounded-xl">
        <div className='flex flex-row align-middle mb-3'>
          <DocumentIcon className="inline me-3 text-white" width="40" height="40"></DocumentIcon>
          <h1 className="flex flex-row align-middle text-2xl md:text-3xl text-white">
            Free Legal Forms
          </h1>
        </div>
        <p className="text-xl font-semibold">
          Create and manage your limited liability company (LLC) with ease using our FREE LLC legal forms.
        </p>
        <p className='text-lg'>
          We provide all the free LLC forms, including operating agreements, banking resolutions, and employee contracts you need to start, run, and operate your business efficiently.
        </p>
      </div>


      {/* Main section */}
      <div className="main-content-panel-styling">
        <div className="absolute inset-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col xl:flex-row w-full max-w-9xl mx-auto gap-6 h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] md:h-[calc(100vh-5rem)] lg:h-[calc(100vh-8rem)] relative z-10"
        >
          <div className={`w-full xl:w-1/3 h-full ${showPdfOnMobile ? 'hidden xl:block' : 'block'}`}>
            <FormList />
          </div>
          <div className={`w-full xl:w-2/3 h-full ${showPdfOnMobile ? 'block' : 'hidden xl:block'}`}>
            <PdfViewer />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalFormDownloads;
