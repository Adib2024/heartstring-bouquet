import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    th: {
      badge: 'ด้วยหัวใจทั้งหมดของฉัน',
      title: 'สำหรับคนที่ขโมย',
      titleHighlight: 'หัวใจของฉัน',
      description: 'ที่นี่คือพื้นที่ของเรา—สำหรับความทรงจำ ช่วงเวลาของเรา และทุกสิ่งเล็กๆ น้อยๆ ที่ทำให้เรื่องราวความรักของเราเป็นเอกลักษณ์ ทุกๆ รายละเอียดที่นี่ถูกสร้างขึ้นด้วยความรัก เหมือนกับชีวิตที่เรากำลังสร้างร่วมกัน',
      exploreButton: 'สำรวจความทรงจำของเรา',
      readButton: 'อ่านข้อความของฉัน',
      quote: 'ทุกวันกับคุณคือวันที่ฉันชอบที่สุด',
      message: 'ตั้งแต่วินาทีแรกที่เราได้พบกัน คุณได้นำแสงสว่างเข้ามาในชีวิตของฉันที่ฉันไม่เคยรู้ว่าขาดหายไป รอยยิ้มของคุณ เสียงหัวเราะของคุณ วิธีที่คุณมองฉัน — ทุกรายละเอียดเล็กๆ น้อยๆ เกี่ยวกับตัวคุณทำให้หัวใจฉันเต็มไปด้วยความสุข ฉันสร้างพื้นที่นี้ขึ้นมาเพื่อเฉลิมฉลองทุกสิ่งที่เราเป็นด้วยกัน และทุกสิ่งที่เราจะเป็น นี่คือจดหมายรักของฉันถึงคุณ ถึงเรา และถึงการเดินทางของเรา'
    },
    en: {
      badge: 'With all my heart',
      title: 'For the One Who',
      titleHighlight: 'Stole My Heart',
      description: 'This is a space dedicated to us — to our memories, our moments, and all the little things that make our love story uniquely ours. Every detail here is crafted with love, just like the life we\'re building together.',
      exploreButton: 'Explore Our Memories',
      readButton: 'Read My Notes',
      quote: 'Every day with you is my favorite day.',
      message: 'From the moment we met, you\'ve brought a light to my life that I never knew was missing. Your smile, your laugh, the way you look at me — every little detail about you fills my heart with joy. I created this space to celebrate all that we are together, and all that we will be. This is my love letter to you, to us, and to our journey.'
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

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
              {currentContent.badge}
            </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold text-romantic-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {currentContent.title} <br className="hidden sm:block" />
            <span className="text-romantic-500">{currentContent.titleHighlight}</span>
          </motion.h1>
          
          <motion.p
            className="max-w-2xl mx-auto text-lg text-romantic-700 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {currentContent.description}
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
              {currentContent.exploreButton}
            </a>
            <a 
              href="#messages" 
              className="px-6 py-3 bg-transparent border border-romantic-200 text-romantic-600 font-medium rounded-full hover:bg-romantic-50 transition-colors duration-300 w-full sm:w-auto"
            >
              {currentContent.readButton}
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
            "{currentContent.quote}"
          </p>
          <div className="flex justify-center">
            <div className="h-px w-16 bg-romantic-200"></div>
          </div>
          <p className="mt-6 text-romantic-700 text-center leading-relaxed">
            {currentContent.message}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
