import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ScrollIndicator = ({ direction, onClick, isVisible }) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;
  
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        absolute top-1/2 -translate-y-1/2 
        ${isLeft ? 'left-0' : 'right-0'}
        bg-gradient-to-${isLeft ? 'r' : 'l'} from-white to-transparent 
        w-12 sm:w-16 h-full z-10
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-300
        flex items-center justify-center
      `}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="bg-white/80 rounded-full p-1.5 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-xl border-2 border-orange-200 hover:border-[#F7931E] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F7931E]" />
      </motion.button>
    </motion.div>
  );
};
