
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Surprise: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // This would typically be stored securely, but for simplicity:
  const correctPassword = 'loveyou';

  const content = {
    th: {
      title: 'เซอร์ไพรส์พิเศษ',
      description: 'ฉันได้เตรียมบางสิ่งพิเศษไว้สำหรับคุณโดยเฉพาะ ใส่รหัสผ่านเพื่อปลดล็อค',
      hint: '(คำใบ้: คือสามคำที่ฉันบอกคุณเสมอ ไม่มีเว้นวรรค)',
      placeholder: 'ใส่รหัสผ่าน',
      errorMsg: 'รหัสผ่านไม่ถูกต้อง ลองอีกครั้ง!',
      buttonText: 'ปลดล็อคหัวใจของฉัน',
      footerText: 'นี่นำไปสู่หน้าพิเศษที่เป็นเรื่องระหว่างเราเท่านั้น'
    },
    en: {
      title: 'A Special Surprise',
      description: 'I\'ve prepared something special just for you. Enter the password to unlock it.',
      hint: '(Hint: It\'s three words I always tell you, without spaces)',
      placeholder: 'Enter the password',
      errorMsg: 'That\'s not quite right. Try again!',
      buttonText: 'Unlock My Heart',
      footerText: 'This leads to a special page that\'s just between us.'
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === correctPassword) {
      navigate('/surprise');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section id="surprise" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 romantic-gradient opacity-70 z-0"></div>
      
      <motion.div 
        className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="glass rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-romantic-500" fill="#f686a6" />
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-romantic-900 mb-4">
            {currentContent.title}
          </h2>
          
          <p className="text-romantic-700 mb-8">
            {currentContent.description}
            <span className="block mt-2 text-sm text-romantic-500 italic">
              {currentContent.hint}
            </span>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder={currentContent.placeholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? 'border-romantic-500 animate-shake' : 'border-romantic-200'
                } bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all duration-300`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {error ? (
                  <Lock className="h-5 w-5 text-romantic-500" />
                ) : (
                  <Unlock className="h-5 w-5 text-romantic-400" />
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-romantic-500 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {currentContent.errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-romantic-500 hover:bg-romantic-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <span>{currentContent.buttonText}</span>
              <Heart className="w-4 h-4 ml-2" />
            </button>
          </form>
          
          <p className="mt-6 text-sm text-romantic-600">
            {currentContent.footerText}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Surprise;
