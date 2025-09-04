import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MenuItems } from './QRCode/MenuItems';
import { ContextForm } from './QRCode/Context/ContextForm';
import useInputState from './useInputState';
import { QRGenerateConditional } from './QRCode/QRGenerateConditional';
import { Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings } from './QRCode/Settings/Settings';
import { QRSettingsProvider, useQRSettings, dispatch } from './QRCode/Context/QRSettingsContext';
import { QrCodeIcon } from '@heroicons/react/24/outline';

const QRCodesContent = () => {
  const { qrCode, setQRCode } = useInputState();
  const inputValues = useRef({});
  const { state, dispatch } = useQRSettings(); // Now this is safe, as we're within the provider

  const handleDownloadImage = async () => {
    try {
      const qrCanvasElement = document.querySelector('#QRCode canvas');
      const frameText = document.querySelector('#QRCode button')?.textContent || 'Scan Me';

      if (!qrCanvasElement) {
        console.error('QR Code canvas not found');
        return;
      }

      // Create canvas with extra space for shadows
      const finalCanvas = document.createElement('canvas');
      const ctx = finalCanvas.getContext('2d');
      finalCanvas.width = 600; // Even larger canvas for better shadow effects
      finalCanvas.height = 700;

      // Clear background with a subtle gradient
      const bgGradient = ctx.createLinearGradient(0, 0, finalCanvas.width, finalCanvas.height);
      bgGradient.addColorStop(0, '#f8fafc'); // slate-50
      bgGradient.addColorStop(1, '#f1f5f9'); // slate-100
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

      // Center point for the card
      const centerX = finalCanvas.width / 2;
      const centerY = finalCanvas.height / 2;
      const cardWidth = 400;
      let cardHeight = state.frame.showLabel ? 500 : 400; // Use state.frame.showLabel
      const x = centerX - cardWidth / 2;
      const y = centerY - cardHeight / 2;

      //This code handles if frame is required or not
      if(state.frame.showFrame)
      {
        // Large outer shadow (darkest)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y + 15, cardWidth, cardHeight, 24);
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 25;
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();
  
      // Secondary shadow (softer)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y + 10, cardWidth, cardHeight, 24);
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 15;
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();
  
      // Card background layers
      // Bottom layer with texture
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, cardWidth, cardHeight, 24);
      const layerGradient = ctx.createLinearGradient(x, y, x, y + cardHeight);
      layerGradient.addColorStop(0, '#f8fafc');
      layerGradient.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = layerGradient;
      ctx.fill();
      ctx.restore();
  
      // Middle white layer
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, cardWidth - 4, cardHeight - 4, 22);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.03)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.restore();
  
      // Inner content area with subtle shadow
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x + 20, y + 20, cardWidth - 40, cardHeight - 40, 20);
      ctx.shadowColor = 'rgba(0, 0, 0, 0.04)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      
      // Add subtle gradient to inner content
      const innerGradient = ctx.createLinearGradient(x + 20, y + 20, x + 20, y + cardHeight - 40);
      innerGradient.addColorStop(0, '#FFFFFF');
      innerGradient.addColorStop(1, '#f8fafc');
      ctx.fillStyle = innerGradient;
      ctx.fill();
      ctx.restore();
      }
      

      // Draw QR code with shadow
      const qrSize = 300;
      const qrX = centerX - qrSize / 2;
      const qrY = y + 60;

      // QR code shadow
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 5;
      ctx.drawImage(qrCanvasElement, qrX, qrY, qrSize, qrSize);
      ctx.restore();

      if (state.frame.showLabel) { // Check the frame label state
        // Draw button
        const buttonWidth = cardWidth - 80;
        const buttonHeight = 50;
        const buttonX = centerX - buttonWidth / 2;
        const buttonY = y + cardHeight - 100;

        // Button outer shadow
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 12);
        ctx.fillStyle = '#C6500C';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 5;
        ctx.fill();
        ctx.restore();

        // Button text with slight shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px Karla, system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(frameText, centerX, buttonY + buttonHeight / 2);
        ctx.restore();
      }

      // Convert to blob with maximum quality
      finalCanvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'QRCode.png';

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error generating QR code image:', error);
    }
  };

  const handleInputChange = (name, value) => {
    if (name !== 'ValueText') {
      setQRCode((prevQRCode) => ({
        ...prevQRCode,
        [name]: value,
      }));
    }
    if (name === 'LogoURL') {
      // Update the logo state instantly in the context
      dispatch({
        type: 'UPDATE_LOGO_URL',
        payload: value,
      });
    } else {
      // Handle other state updates
      dispatch({
        type: `UPDATE_${name.toUpperCase()}`,
        payload: value,
      });
    }
  };
  

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">

      {/* Welcome section */}
      <div className="p-9 mb-8 text-black bg-gradient-to-r from-[#F59E0B] to-[#F27227] shadow-lg rounded-xl">
        <div className='flex flex-row align-middle mb-3'>
          <QrCodeIcon className="inline me-3 text-white" width="40" height="40"></QrCodeIcon>
          <h1 className="flex flex-row align-middle text-2xl md:text-3xl text-white">
            QR Code Generator
          </h1>
        </div>
        <p className="text-xl font-semibold">
          Get started generating your own QR Code.
        </p>
        <p className='text-lg'>
          We offer a customizable operating agreement tool as well as operating agreement templates for single-member LLCs and multi-member LLCs (including member-managed and manager-managed).
        </p>
      </div>

      {/*Main Content*/}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto main-content-panel-styling"
      >
        <div className="mb-6">
          <MenuItems />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <Card className="flex-grow">
              <CardContent className="p-4 sm:p-6">
                <ContextForm handleInputChange={handleInputChange} />
              </CardContent>
            </Card>

            <div className="mt-4 sm:mt-5 space-y-4">
              <Settings handleInputChange={handleInputChange} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col h-full"
          >
            <Card className="flex-grow">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">
                    Preview
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    Scan to test
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center">
                <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    id="QRCode"
                    className="w-full flex justify-center mb-4 sm:mb-12"
                  >
                    <QRGenerateConditional
                      inputValues={inputValues}
                      fgColor="#ffffff"
                      bgColor="transparent"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadImage}
                    className="w-full h-12 sm:h-14 bg-[#C6500C] text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-xl transition-colors text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Download
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const QRCodes = () => (
  <QRSettingsProvider>
    <QRCodesContent />
  </QRSettingsProvider>
);

export default QRCodes;
