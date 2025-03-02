
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-32 pb-20 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-romantic-100 rounded-full filter blur-3xl opacity-60 animate-pulse-light"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cream-100 rounded-full filter blur-3xl opacity-50 animate-pulse-light" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs bg-romantic-100 text-romantic-800 mb-6">
              With all my heart
            </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold text-romantic-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            For the One Who <br className="hidden sm:block" />
            <span className="text-romantic-500">Stole My Heart</span>
          </motion.h1>
          
          <motion.p
            className="max-w-2xl mx-auto text-lg text-romantic-700 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            This is a space dedicated to us — to our memories, our moments, and all the little things that make 
            our love story uniquely ours. Every detail here is crafted with love, just like the life we're building together.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <a 
              href="#gallery" 
              className="px-6 py-3 bg-romantic-500 text-white font-medium rounded-full shadow-md hover:bg-romantic-600 transition-colors duration-300 w-full sm:w-auto"
            >
              Explore Our Memories
            </a>
            <a 
              href="#messages" 
              className="px-6 py-3 bg-transparent border border-romantic-200 text-romantic-600 font-medium rounded-full hover:bg-romantic-50 transition-colors duration-300 w-full sm:w-auto"
            >
              Read My Notes
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 glass-card p-8 rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
        >
          <p className="font-handwriting text-2xl text-romantic-800 text-center mb-4">
            "Every day with you is my favorite day."
          </p>
          <div className="flex justify-center">
            <div className="h-px w-16 bg-romantic-200"></div>
          </div>
          <p className="mt-6 text-romantic-700 text-center leading-relaxed">
            From the moment we met, you've brought a light to my life that I never knew was missing. 
            Your smile, your laugh, the way you look at me — every little detail about you fills my heart with joy. 
            I created this space to celebrate all that we are together, and all that we will be. 
            This is my love letter to you, to us, and to our journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
