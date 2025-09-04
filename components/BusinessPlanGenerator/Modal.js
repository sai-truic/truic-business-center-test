import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-md hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-[#F7931E] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
          <h3 className="text-2xl font-bold text-neutral-950 text-center relative z-10">
            <span className="bg-clip-text text-transparent bg-[#C6500C]">
              {title}
            </span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-neutral-950 hover:text-[#F7931E] transition-all duration-200"
          >
            <X size={28} />
          </button>
        </div>
        <div
          className="text-neutral-950 space-y-4 text-base leading-relaxed prose prose-orange max-w-none relative z-10"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </motion.div>
    </div>
  );
};

export default Modal;
