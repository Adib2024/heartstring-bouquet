
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Star, Package, Ribbon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

type GiftType = {
  id: number;
  name: { th: string; en: string };
  icon: React.ReactNode;
  color: string;
  message: { th: string; en: string };
  animation: string;
};

const VirtualGift: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const gifts: GiftType[] = [
    {
      id: 1,
      name: { th: 'ช่อดอกไม้', en: 'Bouquet' },
      icon: <Sparkles size={32} />,
      color: 'bg-romantic-400',
      message: { 
        th: 'เหมือนดอกไม้ที่สวยงาม คุณทำให้วันของฉันสดใสเสมอ', 
        en: 'Like a beautiful flower, you brighten my day always.' 
      },
      animation: 'float'
    },
    {
      id: 2,
      name: { th: 'ช็อคโกแลต', en: 'Chocolates' },
      icon: <Package size={32} />,
      color: 'bg-amber-600',
      message: { 
        th: 'หวานเหมือนช็อคโกแลต แต่ความรักของเรา หวานยิ่งกว่า', 
        en: 'Sweet like chocolate, but our love is even sweeter.' 
      },
      animation: 'pulse-light'
    },
    {
      id: 3,
      name: { th: 'จดหมายรัก', en: 'Love Letter' },
      icon: <Heart size={32} />,
      color: 'bg-romantic-500',
      message: { 
        th: 'ทุกครั้งที่ฉันคิดถึงคุณ หัวใจฉันเต้นแรง', 
        en: 'Every time I think of you, my heart skips a beat.' 
      },
      animation: 'float'
    },
    {
      id: 4,
      name: { th: 'เค้กวันเกิด', en: 'Birthday Cake' },
      icon: <Gift size={32} />,
      color: 'bg-cream-400',
      message: { 
        th: 'ทุกวันกับคุณ คือวันพิเศษสำหรับฉัน', 
        en: 'Every day with you is a celebration for me.' 
      },
      animation: 'pulse-light'
    },
    {
      id: 5,
      name: { th: 'ดาวแห่งความรัก', en: 'Love Star' },
      icon: <Star size={32} />,
      color: 'bg-yellow-400',
      message: { 
        th: 'คุณคือดวงดาวที่สว่างที่สุดในจักรวาลของฉัน', 
        en: 'You are the brightest star in my universe.' 
      },
      animation: 'float'
    },
    {
      id: 6,
      name: { th: 'ตั๋วเดินทาง', en: 'Travel Tickets' },
      icon: <Ribbon size={32} />,
      color: 'bg-blue-400',
      message: { 
        th: 'ไม่ว่าจะไปที่ไหน ขอให้เราไปด้วยกัน', 
        en: 'No matter where we go, let\'s go together.' 
      },
      animation: 'pulse-light'
    },
  ];

  const text = {
    th: {
      title: 'ของขวัญเสมือนจริง',
      subtitle: 'เลือกของขวัญพิเศษเพื่อเปิดข้อความแห่งความรัก',
      openGift: 'เปิดของขวัญ',
      sendAnother: 'ส่งของขวัญอีกชิ้น',
      clickToSelect: 'คลิกเพื่อเลือก',
      notificationTitle: 'ส่งของขวัญสำเร็จ',
      notificationDesc: 'ด้วยความรักและความปรารถนาดี'
    },
    en: {
      title: 'Virtual Gifts',
      subtitle: 'Choose a special gift to reveal a message of love',
      openGift: 'Open Gift',
      sendAnother: 'Send Another Gift',
      clickToSelect: 'Click to select',
      notificationTitle: 'Gift Sent Successfully',
      notificationDesc: 'With love and best wishes'
    }
  };

  const currentText = language === 'th' ? text.th : text.en;

  const handleGiftClick = (gift: GiftType) => {
    setSelectedGift(gift);
  };

  const handleOpenGift = () => {
    if (!selectedGift) return;
    
    setIsOpening(true);
    setTimeout(() => {
      setIsRevealed(true);
      setIsOpening(false);
      
      toast({
        title: currentText.notificationTitle,
        description: currentText.notificationDesc,
        variant: "default",
      });
    }, 1500);
  };

  const handleSendAnother = () => {
    setSelectedGift(null);
    setIsRevealed(false);
  };

  return (
    <section id="virtualgift" className="py-20 relative overflow-hidden">
      {/* Background with soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-romantic-50 to-cream-50 opacity-70 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-romantic-800 mb-3">
            {currentText.title}
          </h2>
          <p className="text-romantic-600 max-w-xl mx-auto">
            {currentText.subtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedGift && !isRevealed && (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {gifts.map((gift) => (
                <motion.div
                  key={gift.id}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleGiftClick(gift)}
                    className={`w-full aspect-square rounded-2xl ${gift.color} flex flex-col items-center justify-center p-4 text-white shadow-md hover:shadow-lg transition-all duration-300`}
                  >
                    <motion.div
                      animate={{ y: gift.animation === 'float' ? [0, -10, 0] : 0 }}
                      transition={gift.animation === 'float' ? { 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      } : {}}
                      className={gift.animation === 'pulse-light' ? 'animate-pulse-light' : ''}
                    >
                      {gift.icon}
                    </motion.div>
                    <span className="mt-2 font-medium text-sm">
                      {language === 'th' ? gift.name.th : gift.name.en}
                    </span>
                    <span className="text-xs mt-1 opacity-80">{currentText.clickToSelect}</span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedGift && !isRevealed && (
            <motion.div 
              className="max-w-md mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={`w-56 h-56 mx-auto ${selectedGift.color} rounded-2xl flex items-center justify-center shadow-lg`}
                animate={isOpening ? {
                  rotate: [0, 5, -5, 5, -5, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1.1, 1.2],
                } : {}}
                transition={{ duration: 1.5 }}
              >
                <motion.div
                  className="text-white"
                  animate={{ 
                    rotate: isOpening ? 360 : 0,
                    scale: isOpening ? [1, 1.2, 0.8, 1.2, 0.8, 1] : 1
                  }}
                  transition={{ duration: 1.5 }}
                >
                  {selectedGift.icon}
                </motion.div>
              </motion.div>
              <h3 className="mt-6 text-xl font-medium text-romantic-800">
                {language === 'th' ? selectedGift.name.th : selectedGift.name.en}
              </h3>
              <button
                onClick={handleOpenGift}
                disabled={isOpening}
                className={`mt-6 px-6 py-3 bg-romantic-500 hover:bg-romantic-600 text-white rounded-full font-medium transition-colors duration-300 flex items-center justify-center mx-auto ${isOpening ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isOpening ? (
                  <span className="flex items-center">
                    <span className="mr-2">{currentText.openGift}</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  </span>
                ) : (
                  <span>{currentText.openGift}</span>
                )}
              </button>
              <button
                onClick={handleSendAnother}
                className="mt-3 px-4 py-2 text-romantic-600 hover:text-romantic-800 rounded-full font-medium transition-colors duration-300 text-sm"
              >
                ← {language === 'th' ? 'เลือกใหม่' : 'Choose another'}
              </button>
            </motion.div>
          )}

          {isRevealed && selectedGift && (
            <motion.div 
              className="max-w-xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Gift reveal animation with sparkles */}
              <motion.div 
                className="relative"
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white shadow-xl border border-romantic-100"
                >
                  <div className={`w-16 h-16 mx-auto ${selectedGift.color} rounded-full flex items-center justify-center text-white mb-4`}>
                    {selectedGift.icon}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-romantic-800 mb-4">
                    {language === 'th' ? selectedGift.name.th : selectedGift.name.en}
                  </h3>
                  <motion.p 
                    className="text-romantic-600 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    "{language === 'th' ? selectedGift.message.th : selectedGift.message.en}"
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <button
                      onClick={handleSendAnother}
                      className="mt-6 px-6 py-2 bg-romantic-100 hover:bg-romantic-200 text-romantic-600 hover:text-romantic-700 rounded-full font-medium transition-colors duration-300"
                    >
                      {currentText.sendAnother}
                    </button>
                  </motion.div>
                </motion.div>
                
                {/* Decorative sparkles */}
                <motion.div
                  className="absolute -top-4 -right-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="text-yellow-400" size={24} />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="text-romantic-400" size={20} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VirtualGift;
