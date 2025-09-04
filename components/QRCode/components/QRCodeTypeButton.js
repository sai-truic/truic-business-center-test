import { motion } from 'framer-motion';
import useInputState from '../../useInputState';

export const QRCodeTypeButton = ({ section, isSelected, onClick }) => {
  const { setQrMenuSelected } = useInputState();

  const handleClick = () => {
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex-shrink-0 snap-center"
    >
      <motion.button
        whileHover={{ 
          scale: 1.03,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.97,
          transition: { duration: 0.1 }
        }}
        onClick={handleClick}
        className={`
          relative
          w-[calc((100%-2rem)/4)] 
          sm:w-[calc((100%-3rem)/5)] 
          lg:w-[calc((100%-6rem)/7)]
          min-w-[85px]
          sm:min-w-[110px]
          lg:min-w-[120px]
          max-w-[160px]
          h-20
          sm:h-24
          lg:h-28
          cursor-pointer 
          rounded-xl 
          p-2
          text-center 
          border-2 
          transition-all 
          duration-200 
          shadow-lg
          hover:shadow-xl
          focus:outline-none 
          focus:ring-2
          focus:ring-offset-2
          ${isSelected 
            ? `${section.theme.solidBg} ${section.theme.selectedBorder}` 
            : `bg-white ${section.theme.border} ${section.theme.hoverBorder}`
          }
          ${section.theme.shadow}
          ${section.theme.ringColor}
          transform perspective-1000
          hover:-translate-y-1
        `}
      >
        <div className="h-full flex flex-col items-center justify-center gap-2">
          <motion.div 
            className={`
              p-2 
              rounded-lg 
              shadow-md
              flex 
              items-center 
              justify-center 
              w-6
              h-6 
              sm:w-8
              sm:h-8
              lg:w-10
              lg:h-10
              flex-shrink-0
              ${isSelected 
                ? 'bg-white/80' 
                : `bg-gradient-to-br ${section.theme.gradient}`
              }
            `}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <section.icon className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${section.theme.iconColor}`} />
          </motion.div>
          <div className="min-h-0 flex-1 flex items-center">
            <span className="text-[10px] sm:text-xs font-medium text-gray-900 line-clamp-2">
              {section.label || section.name}
            </span>
          </div>
        </div>
        {isSelected && (
          <motion.div
            layoutId="selectedIndicator"
            className={`absolute -bottom-1 left-1/2 w-8 h-1 -translate-x-1/2 rounded-full ${section.theme.iconColor}`}
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    </motion.div>
  );
};
