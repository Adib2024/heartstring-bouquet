
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CupSoda } from 'lucide-react';

interface CocaColaProps {
  onClick?: () => void;
}

const CocaCola: React.FC<CocaColaProps> = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
    if (onClick) onClick();
  };

  return (
    <motion.div 
      className="relative flex flex-col items-center mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-4">
        <p className="text-romantic-800 font-handwriting text-2xl">Share a Coke with</p>
        <h3 className="text-3xl font-serif font-bold text-red-600">Love</h3>
      </div>
      
      <motion.div
        className="glass-card rounded-xl p-6 flex flex-col items-center cursor-pointer hover-lift"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
      >
        <div className="relative w-40 h-52 bg-gradient-to-b from-red-600 to-red-700 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <span className="font-serif text-red-600 text-2xl font-bold italic tracking-tighter">Coca-Cola</span>
            </div>
          </div>
          
          {isClicked && (
            <motion.div 
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.5 }}
            />
          )}
        </div>
        
        <div className="mt-4 flex items-center space-x-2">
          <CupSoda className="text-red-600 w-5 h-5" />
          <span className="text-romantic-700">Click to share a special moment</span>
        </div>
      </motion.div>
      
      {isClicked && (
        <motion.div 
          className="absolute top-full mt-4 w-full text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-romantic-700 font-medium">Cheers to our sweet memories together! 💕</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CocaCola;
