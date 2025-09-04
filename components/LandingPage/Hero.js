import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from 'react-scroll';

const Hero = ({ onGetStarted }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 20;
        const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 20;
        setMousePosition({ x, y });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20 bg-gradient-to-br from-white via-[#F9F9F9] to-[#F4F4F4] rounded-3xl shadow-2xl p-12 md:p-16 mt-24 overflow-hidden relative backdrop-blur-sm border border-white border-opacity-40 hover:shadow-3xl transition-shadow duration-300"
        >
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 sm:mb-10 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-[#212429] via-[#38657A] to-[#212429] bg-clip-text text-transparent animate-gradient-x">Small Business Center</span>
                <br className="hidden md:block" />
                <span className="inline-block mt-2 md:mt-4">By <span className="text-[#38657A] bg-clip-text text-transparent bg-gradient-to-r from-[#38657A] via-[#4A7A94] to-[#38657A] animate-gradient-x hover:scale-105 transition-transform duration-300">TRUiC</span></span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <motion.div
                    className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#38657A] leading-snug">
                        Empowering Entrepreneurs with Essential Tools and Resources
                    </h2>
                    <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-[#8E8E8E] mb-8 sm:mb-12 leading-relaxed font-medium tracking-wide text-shadow-sm">
                        Your all-in-one solution for starting, managing, and growing your business with confidence. Let's turn your vision into reality.
                    </p>
                    <Link
                        to="contact"
                        smooth={true}
                        duration={800}
                        offset={-50}
                    >
                        <button
                            className="bg-[#DB6300] text-white px-12 py-5 rounded-lg text-xl font-extrabold
    hover:bg-[#C55A00] transition duration-300 shadow-lg transform hover:scale-105 backdrop-blur-sm hover:shadow-xl
    glossy-button"
                            onClick={onGetStarted}
                            aria-label="Get Started with TRUIC Business Center"
                        >
                            Get Started Now
                        </button>
                    </Link>
                 </motion.div>                                                                                          
                 <motion.div                                                                                            
                     className="w-full md:w-1/2 flex justify-center"                                                    
                     initial={{ opacity: 0, x: 50 }}                                                                    
                     animate={{ opacity: 1, x: 0 }}                                                                     
                     transition={{ duration: 0.7, delay: 0.4 }}                                                         
                 >                                                                                                      
                     <div                                                                                      
                         className="w-full max-w-lg relative"                                                           
                     >                                                                                                  
                         <div className="w-full h-64 md:h-80 bg-[#284A59] rounded-3xl shadow-2xl relative               
 overflow-hidden">                                                                                                      
                             <Image                                                                                     
                                 src="https://howtostartanllc.com/images/home/orange-map-llc2.webp"                     
                                 alt="LLC Map"                                                                          
                                 layout="fill"                                                                          
                                 objectFit="cover"                                                                      
                                 loading="eager"                                                                        
                                 priority                                                                               
                             />                                                                                         
                             <div                                                                              
                                 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#284A59]            
 via-[#284A59] to-transparent p-6"                                                                                      
                             >                                                                                          
                                 <p className="text-white text-center font-bold text-2xl">Start Your Business Journey</p>
                             </div>                                                                            
                         </div>                                                                                         
                     </div>                                                                                    
                 </motion.div>                                                                                          
             </div>                                                                                                     
         </motion.div>                                                                                                  
     );                                                                                                                 
 };                                                                                                                     
                                                                                                                        
 export default Hero;  
