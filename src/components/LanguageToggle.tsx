
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      className="flex items-center space-x-2 px-3 py-2 rounded-full bg-romantic-100 text-romantic-800 hover:bg-romantic-200 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      aria-label={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === 'th' ? 'EN' : 'TH'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
