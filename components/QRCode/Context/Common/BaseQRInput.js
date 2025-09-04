import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

const BaseQRInput = ({
  config,
  handleInputChange,
  renderContent,
  renderHeader,
  children,
}) => {
  const Icon = config.icon;

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-7xl mx-auto p-1 sm:p-2">
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#F7931E] focus-within:ring-4 focus-within:ring-orange-500 focus-within:ring-offset-2">
        <CardHeader
          className={`bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 sm:p-6 md:p-8 border-b border-orange-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 sm:p-3 md:p-4 bg-white rounded-xl shadow-lg ring-2 ring-orange-200 backdrop-blur-sm hover:ring-[#F7931E] transition-all duration-300"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#F7931E]" />
              </motion.div>
              <div>
                <Label
                  htmlFor={config.name}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F7931E] to-orange-600"
                >
                  {config.label}
                </Label>
                <p className="text-base text-gray-600 mt-3 font-medium leading-relaxed tracking-wide">
                  {config.helperText}
                </p>
              </div>
            </div>
            {/* <Tooltip content={config.tooltip}>
              <HelpCircle className="w-5 h-5 text-white/70 hover:text-white transition-all duration-200 transform hover:scale-110" />
            </Tooltip> */}
          </div>
          {renderHeader && renderHeader()}
        </CardHeader>

        <CardContent className="p-4 sm:p-6 md:p-8 bg-white rounded-b-xl">
          {/* If a render function was passed in, use that, else fall back to children */}
          {renderContent ? renderContent() : children}
        </CardContent>
      </Card>
    </div>
  );
};

export default BaseQRInput;
