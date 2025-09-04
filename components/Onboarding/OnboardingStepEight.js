import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, Mail, Check, User, Star, Zap, Sparkles } from 'lucide-react';
import useNewsletterSignup from '../../hooks/useNewsletterSignup';

const OnboardingStepEight = ({ onPrevious, onClose, handleButtonClick, updateOnboardingData }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const { signUp, isLoading, error } = useNewsletterSignup();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const handleSubmit = async () => {
    try {
      const result = await signUp(email, name);
      if (result.alreadyRegistered) {
        setIsAlreadyRegistered(true);
      } else {
        updateOnboardingData({ 
          newsletterSignup: { email, name, date: new Date().toISOString() },
          completed: true
        });
        setIsSubmitted(true);
      }
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (isSubmitted || isAlreadyRegistered) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg p-8 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(129, 140, 248, 0.1)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-xl mb-8"
          >
            {isAlreadyRegistered ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Star className="w-16 h-16 text-white" />
                </motion.div>
                <h3 className="text-4xl font-bold text-indigo-800 mb-4">Welcome Back, Superstar!</h3>
                <p className="text-xl text-indigo-600 mb-6">You're already part of our exclusive newsletter community.</p>
                <p className="text-lg text-indigo-500 mb-8">Your enthusiasm lights up our world! Stay tuned for more exciting updates and insider insights coming your way.</p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </motion.div>
                <h3 className="text-4xl font-bold text-indigo-800 mb-4">Welcome to the Inner Circle!</h3>
                <p className="text-xl text-indigo-600 mb-6">We're absolutely thrilled to have you join our newsletter community.</p>
                <p className="text-lg text-indigo-500 mb-4">Get ready for a journey filled with exclusive insights, powerful resources, and game-changing strategies tailored just for you!</p>
                <p className="text-lg text-indigo-500 mb-8">We've initiated your welcome sequence. Keep an eye on your inbox for our welcome email and future communications!</p>
              </>
            )}
            <div className="flex justify-center space-x-6">
              <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="bg-indigo-100 p-4 rounded-full shadow-md">
                <Zap className="w-10 h-10 text-indigo-600" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -10 }} className="bg-purple-100 p-4 rounded-full shadow-md">
                <Star className="w-10 h-10 text-purple-600" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="bg-pink-100 p-4 rounded-full shadow-md">
                <Sparkles className="w-10 h-10 text-pink-600" />
              </motion.div>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleButtonClick('OnboardingStepEightClose');
              onClose();
            }}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 text-xl font-medium transition-all duration-300 shadow-lg cursor-pointer"
          >
            Let's Get Started!
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white rounded-lg shadow-2xl"
    >
      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-indigo-200">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900">Newsletter Signup</h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('OnboardingStepEightClose', onClose)}
          className="text-indigo-500 hover:text-indigo-700 focus:outline-none transition-colors duration-200"
        >
          <X size={24} />
        </motion.button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800 mb-3 sm:mb-4">
            Stay Connected & Grow Your Business
          </h4>
          <p className="text-base sm:text-lg md:text-xl text-indigo-600 max-w-2xl leading-relaxed">
            Join our community of entrepreneurs and receive personalized tips, resources, and exclusive offers to help your business thrive.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="space-y-4">
            <div className="relative flex items-center">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none">
                <User size={20} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-4 pl-12 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 text-indigo-800 text-base sm:text-lg placeholder-indigo-300"
              />
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-4 pl-12 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 text-indigo-800 text-base sm:text-lg placeholder-indigo-300"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="form-checkbox h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 border-2 border-indigo-300 rounded focus:ring-indigo-200 transition-all duration-300 opacity-0 absolute"
                />
                <div className={`border-2 border-indigo-300 rounded w-5 h-5 sm:w-6 sm:h-6 flex flex-shrink-0 justify-center items-center focus-within:border-indigo-500 ${agreed ? 'bg-indigo-500' : 'bg-white'}`}>
                  <Check className={`fill-current w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none ${agreed ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
              <span className="text-sm sm:text-base md:text-lg text-indigo-700 group-hover:text-indigo-900 transition-colors duration-200">I agree to receive newsletter emails</span>
            </label>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
      <div className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 border-t border-indigo-200">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepEightPrevious', onPrevious)}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 text-base sm:text-lg md:text-xl font-medium transition-all duration-200 flex items-center justify-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleButtonClick('OnboardingStepEightSubmit', handleSubmit)}
          disabled={!email || !name || !agreed || isLoading}
          className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg md:text-xl font-medium transition-all duration-200 flex items-center justify-center ${
            email && name && agreed && !isLoading
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OnboardingStepEight;
