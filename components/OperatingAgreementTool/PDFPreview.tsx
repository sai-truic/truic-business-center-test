import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const PDFPreview: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  const [supportsEmbeddedPDF, setSupportsEmbeddedPDF] = useState(true);

  useEffect(() => {
    const checkPDFSupport = () => {
      const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      const isSupportedBrowser = /Chrome|Firefox|Safari|Opera/i.test(navigator.userAgent);
      setSupportsEmbeddedPDF(isDesktop && isSupportedBrowser);
    };

    checkPDFSupport();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'operating_agreement.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {pdfUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-950 mb-6 sm:mb-8 md:mb-10 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F7931E] to-orange-600">
              Generated PDF Preview
            </span>
          </h2>
          {supportsEmbeddedPDF ? (
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-300 w-full">
              <div className="w-full h-[70vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] relative">
                <object
                  data={`${pdfUrl}#view=FitH`}
                  type="application/pdf"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    minHeight: '100%',
                    minWidth: '100%',
                  }}
                >
                  <p className="text-center p-4">
                    Your browser doesn't support embedded PDFs.{' '}
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[#F7931E] hover:text-orange-600 hover:underline">
                      Click here to view the PDF
                    </a>
                  </p>
                </object>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900 via-transparent to-transparent opacity-20 pointer-events-none"></div>
            </div>
          ) : (
            <p className="text-center p-4 bg-white rounded-lg shadow-md">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[#F7931E] hover:text-orange-600 hover:underline">
                Click here to view the PDF
              </a>
            </p>
          )}
          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-6 py-3 bg-[#F7931E] text-white rounded-full shadow-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors duration-300"
            >
              <FaDownload />
              <span>Download PDF</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFPreview;
