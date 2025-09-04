import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import useInputState from '../../useInputState';
import { useQRSettings } from '../Context/QRSettingsContext'; // Ensure this import is present

export const QRCodeGenerate = (props) => {
    const { state } = useQRSettings();
    console.log('state: ', state); // Use the context to access the state
    const { qrCode } = useInputState();
    const [processedLogoSettings, setProcessedLogoSettings] = useState(null);
    const [qrSize, setQrSize] = useState(
        Math.min(parseInt(props.Size) || 256, window.innerWidth < 640 ? 200 : 256)
    );

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setQrSize(Math.min(parseInt(props.Size) || 256, window.innerWidth < 640 ? 200 : 256));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [props.Size]);

    // Merge props with qrCode state, giving priority to props
    const mergedProps = { ...qrCode, ...props };
    console.log('Merged Props :', mergedProps);

    // Process logo image to ensure transparency
    const processLogoImage = async (logoUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const qrSize = parseInt(mergedProps.Size) || 256;
                const optimalSize = Math.floor(qrSize * 0.25);
                const logoWidth = parseInt(mergedProps.LogoWidth) || optimalSize;
                const logoHeight = parseInt(mergedProps.LogoHeight) || optimalSize;

                canvas.width = logoWidth;
                canvas.height = logoHeight;
                const ctx = canvas.getContext('2d');

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                ctx.beginPath();
                ctx.arc(
                    logoWidth / 2,
                    logoHeight / 2,
                    Math.min(logoWidth, logoHeight) / 2,
                    0,
                    Math.PI * 2
                );
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(img, 0, 0, logoWidth, logoHeight);

                const imageData = ctx.getImageData(0, 0, logoWidth, logoHeight);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    const x = (i / 4) % logoWidth;
                    const y = Math.floor(i / (4 * logoWidth));
                    const distance = Math.sqrt(
                        Math.pow(x - logoWidth / 2, 2) + Math.pow(y - logoHeight / 2, 2)
                    );
                    const maxDistance = Math.min(logoWidth, logoHeight) / 2;
                    if (distance > maxDistance * 0.8) {
                        const fadeOut =
                            1 - (distance - maxDistance * 0.8) / (maxDistance * 0.2);
                        imageData.data[i + 3] *= Math.max(0, Math.min(1, fadeOut));
                    }
                }
                ctx.putImageData(imageData, 0, 0);

                resolve(canvas.toDataURL('image/png'));
            };

            img.src = logoUrl;
        });
    };

    useEffect(() => {
        const updateLogoSettings = async () => {
            if (!state.logo.url) {
                setProcessedLogoSettings(null);
                return;
            }

            const qrSize = parseInt(mergedProps.Size) || 256;
            const optimalSize = Math.floor(qrSize * 0.25);
            const logoWidth = parseInt(mergedProps.LogoWidth) || optimalSize;
            const logoHeight = parseInt(mergedProps.LogoHeight) || optimalSize;
            const maxSize = Math.floor(qrSize * 0.25);
            const finalWidth = Math.min(logoWidth, maxSize);
            const finalHeight = Math.min(logoHeight, maxSize);

            try {
                const processedLogoUrl = await processLogoImage(state.logo.url);
                const settings = {
                    src: processedLogoUrl,
                    height: finalHeight,
                    width: finalWidth,
                    excavate: false,
                    x: mergedProps.CenterLogo
                        ? Math.floor((qrSize - finalWidth) / 2)
                        : mergedProps.LogoX || undefined,
                    y: mergedProps.CenterLogo
                        ? Math.floor((qrSize - finalHeight) / 2)
                        : mergedProps.LogoY || undefined,
                };
                setProcessedLogoSettings(settings);
            } catch (error) {
                console.error('Error processing logo:', error);
                setProcessedLogoSettings(null);
            }
        };

        updateLogoSettings();
    }, [
        state.logo.url,
        mergedProps.LogoHeight,
        mergedProps.LogoWidth,
        mergedProps.CenterLogo,
        mergedProps.Size,
    ]);

    return (
        <div id={props.id} className="flex flex-col items-center justify-center w-full px-4 sm:px-0">
            {state.frame.showFrame ? (
                <div className="relative w-full max-w-[300px] sm:max-w-md sm:w-[448px] transform hover:scale-[1.02] hover:rotate-1 transition-all duration-500 ease-out">
                {/* Enhanced 3D Shadow Effect - Adjusted for Mobile */}
                <div className="absolute inset-0 translate-y-2 sm:translate-y-4 scale-[0.96] rounded-2xl sm:rounded-3xl bg-black/30 blur-lg sm:blur-xl rotate-[-2deg]"></div>
                
                {/* Layered Frame Structure */}
                <div className="relative">
                    {/* Outer Frame Layers - Adjusted Insets for Mobile */}
                    <div className="absolute -inset-2 sm:-inset-4 rounded-2xl sm:rounded-3xl bg-orange-200 transform rotate-[-0.5deg] translate-y-0.5"></div>
                    
                    <div className="absolute -inset-2 sm:-inset-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-10 mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                                backgroundSize: '100px 100px'
                            }}>
                        </div>
                    </div>
                    
                    <div className="absolute -inset-2 sm:-inset-4 rounded-2xl sm:rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-100 to-orange-200"></div>
                        <div className="absolute inset-[2px] sm:inset-[3px] rounded-xl sm:rounded-[1.3rem] bg-gradient-to-br from-orange-50 to-white"></div>
                    </div>
                    
                    {/* Main Content Container */}
                    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg transform translate-z-0">
                        <div className="absolute inset-0 p-3 sm:p-6">
                            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/80 shadow-inner"></div>
                            <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-[0.02] mix-blend-multiply"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
                                    backgroundSize: '200px 200px'
                                }}>
                            </div>
                        </div>
                        
                        {/* Content Area with Adjusted Padding */}
                        <div className="relative p-4 sm:p-8 flex flex-col space-y-4 sm:space-y-6">
                            {/* QR Code Container */}
                            <div className="relative bg-gradient-to-br from-white to-orange-50/95 rounded-lg sm:rounded-xl shadow-lg transform translate-z-0">
                                <div className="absolute inset-0 rounded-lg sm:rounded-xl shadow-inner opacity-20"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-100/20 rounded-lg sm:rounded-xl"></div>
                                <div className="absolute inset-0 rounded-lg sm:rounded-xl backdrop-blur-[0.2px] bg-gradient-to-br from-white/10 to-transparent"></div>
                                
                                {/* QR Code with Adjusted Padding */}
                                <div className="relative bg-gradient-to-br from-white to-orange-50/95 rounded-lg sm:rounded-xl shadow-lg transform translate-z-0">
                                    <div className="relative p-3 sm:p-6 transform translate-z-0 flex items-center justify-center">
                                        <div className="flex items-center justify-center w-full h-full">
                                            <QRCodeCanvas
                                                id="qr-canvas"
                                                className="w-full h-full"
                                                value={mergedProps.ValueText || ""}
                                                size={qrSize}
                                                bgColor={mergedProps.BgColor || "#FFFFFF"}  // Apply background color
                                                fgColor={mergedProps.FgColor || "#000000"}  // Apply foreground color
                                                level={mergedProps.Level || "M"}
                                                includeMargin={false}
                                                imageSettings={processedLogoSettings}
                                                style={{
                                                    mixBlendMode: 'multiply',
                                                    filter: 'contrast(0.98) brightness(1.02)',
                                                    transform: 'translateZ(0)',
                                                    width: '100%',  // Make sure width is set
                                                    height: '100%', // Make sure height is set
                                                    maxWidth: '300px', // Limit maximum size
                                                    maxHeight: '300px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                            {/* Button with Adjusted Padding */}
                            {state.frame.showLabel && mergedProps.FrameText && (
                                <button 
                                    className="w-full py-3 sm:py-4 rounded-xl bg-[#C6500C] text-white font-bold tracking-wide shadow-lg 
                                    transform transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0 
                                    focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2
                                    relative overflow-hidden group pointer-events-none"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-white/20 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="relative flex items-center justify-center gap-2">
                                        <span className="text-base sm:text-lg font-semibold">{state.label.text}</span>
                                    </span>
                                    <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            ) :
            
            (
                <div className=' w-full max-w-[300px] sm:max-w-md sm:w-[448px] transform hover:scale-[1.02] hover:rotate-1 transition-all duration-500 ease-out'>
                    <div className='relative p-4 sm:p-8 flex flex-col space-y-4 sm:space-y-6'>
                        <div className="flex justify-center items-center w-full h-full">
                            <QRCodeCanvas
                                id="qr-canvas"
                                value={mergedProps.ValueText || ''}
                                size={qrSize}
                                bgColor={mergedProps.BgColor || '#FFFFFF'}
                                fgColor={mergedProps.FgColor || '#000000'}
                                level={mergedProps.Level || 'M'}
                                includeMargin={false}
                                imageSettings={processedLogoSettings}
                            />
                        </div>
                        {state.frame.showLabel && mergedProps.FrameText && (
                            <button 
                                className="w-full py-3 sm:py-4 rounded-xl bg-[#C6500C] text-white font-bold tracking-wide shadow-lg 
                                transform transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0 
                                focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2
                                relative overflow-hidden group pointer-events-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-white/20 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    <span className="text-base sm:text-lg font-semibold">{state.label.text}</span>
                                </span>
                                <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            </button>
                        )}
                    </div>
                </div>
            )}
            
        </div>
    );
};

QRCodeGenerate.defaultProps = {
    ValueText: 'https://example.com',
    Size: '256',
    Level: 'M',
    FrameText: 'Scan Me',
    IncludeMargin: false,
    EnableOuterFrame: true,
    CenterLogo: true,
    generateQR: false,
    handleInputChange: () => {},
};

export default QRCodeGenerate;
