import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Github } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const ShareQRCodes = () => {
  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      link: '#'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      link: '#'
    },
    {
      name: 'GitHub',
      icon: Github,
      color: 'bg-gray-800 hover:bg-gray-900',
      link: '#'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Share Our Tool
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4"
        >
          {shareButtons.map((button) => (
            <motion.a
              key={button.name}
              href={button.link}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center p-3 rounded-lg ${button.color} text-white shadow-lg transition-colors duration-200`}
            >
              <button.icon className="w-5 h-5" />
              <span className="sr-only">Share on {button.name}</span>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500">
            Help us spread the word and share this tool with your network
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ShareQRCodes;