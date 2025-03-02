
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

const SurprisePage: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    // Auto-reveal after a short delay
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const letterContent = `
    My Dearest,
    
    If you're reading this, you've found your way to the most special part of this site — the place where I've hidden my deepest feelings for you.
    
    From the moment we met, you've brought an extraordinary light into my life. With you, I've discovered what it truly means to love and be loved unconditionally. Your smile, your laugh, your heart — everything about you makes my world brighter.
    
    I cherish every moment we spend together. The quiet mornings, the long talks, the adventures, and even the challenges we face side by side. With you, even ordinary days become extraordinary.
    
    This website is just a small expression of my love for you — a digital love letter that I hope brings a smile to your face. But know that my feelings for you run far deeper than any words on a screen could ever express.
    
    Thank you for being you. Thank you for choosing me. Thank you for making every day worth waking up to.
    
    I love you today, tomorrow, and always.
    
    Yours forever,
  `;

  return (
    <div className="romantic-gradient min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-romantic-600 hover:text-romantic-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <motion.div 
          className="glass-card rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 letter-background opacity-30"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <motion.div
                className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <Heart className="w-8 h-8 text-romantic-500" fill="#f686a6" />
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-5xl font-serif font-bold text-romantic-900 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                My Secret Love Letter
              </motion.h1>
              
              <motion.div
                className="h-px w-24 bg-romantic-200 mx-auto my-6"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            
            {isRevealed ? (
              <motion.div
                className="space-y-6 font-serif text-romantic-800 leading-relaxed text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                {letterContent.split('\n\n').map((paragraph, index) => (
                  <motion.p 
                    key={index}
                    className={`${index === letterContent.split('\n\n').length - 1 ? 'font-handwriting text-2xl text-romantic-500 text-right' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
                
                <motion.div
                  className="pt-10 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  <div className="relative w-32 h-32">
                    <motion.div
                      className="absolute inset-0 bg-romantic-100 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-romantic-500" fill="#f686a6" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="relative w-24 h-24">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-romantic-200 border-t-romantic-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="mt-6 text-romantic-600">Revealing my heart to you...</p>
              </div>
            )}
          </div>
        </motion.div>
        
        <div className="mt-10 text-center">
          <Link to="/" className="text-sm text-romantic-400 hover:text-romantic-600 transition-colors">
            Return to our memories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurprisePage;
