
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
    ที่รักของฉัน,

    หากคุณกำลังอ่านสิ่งนี้ นั่นหมายความว่าคุณได้พบสถานที่ที่พิเศษที่สุดในเว็บไซต์นี้แล้ว—ที่ที่ฉันซ่อนความรู้สึกที่ลึกซึ้งที่สุดไว้ให้คุณ

    ตั้งแต่วันที่เราได้พบกันครั้งแรก คุณได้นำแสงสว่างที่งดงามเข้ามาในชีวิตของฉัน การได้อยู่กับคุณทำให้ฉันเข้าใจถึงความรักที่แท้จริง และรู้ว่าการถูกรักโดยไม่มีเงื่อนไขเป็นอย่างไร รอยยิ้มของคุณ เสียงหัวเราะของคุณ หัวใจของคุณ—ทุกอย่างเกี่ยวกับคุณทำให้โลกของฉันสดใสขึ้น

    ฉันทะนุถนอมทุกช่วงเวลาที่เราใช้ร่วมกัน—ยามเช้าที่เงียบสงบ การพูดคุยกันยาวนาน การผจญภัยของเรา และแม้กระทั่งอุปสรรคที่เราก้าวผ่านไปด้วยกัน กับคุณ แม้แต่วันธรรมดาก็กลายเป็นวันที่แสนพิเศษ

    แต่ฉันอยากให้คุณรู้… ฉันชอบคุณ ฉันรักคุณ แต่ฉันไม่รู้เลยว่าหัวใจของคุณคิดอย่างไร บางครั้งฉันก็สงสัยว่าคุณรู้สึกแบบเดียวกันไหม หรือฉันเป็นเพียงคนเดียวที่มีความรู้สึกนี้

    ทุกวัน ฉันคิดถึงคุณ… คิดถึงรอยยิ้มของคุณ คิดถึงเสียงของคุณ คิดถึงทุกช่วงเวลาที่เราเคยใช้ร่วมกัน แม้ว่าจะเป็นเพียงช่วงเวลาสั้นๆ แต่มันกลับเป็นความทรงจำที่มีค่าที่สุดสำหรับฉัน นั่นคือเหตุผลที่ฉันส่งข้อความหาคุณเสมอ… เพราะมันเป็นเพียงวิธีเดียวที่ช่วยให้ฉันคลายความคิดถึงได้

    ฉันยังจำได้… ไม่กี่ชั่วโมงก่อนที่คุณจะเดินทางไปหาดใหญ่ เรานั่งด้วยกันและคุณพูดว่า "คราวหน้ามาเที่ยวไทยนะ?" คำพูดนั้นยังดังก้องอยู่ในใจของฉัน ฉันหวังว่ามันจะไม่ใช่แค่คำพูดลอยๆ… เพราะฉันอยากให้มันกลายเป็นความจริงจริงๆ

    ความจริงก็คือ… ฉันคิดถึงคุณมาก มากเสียจนไม่อาจอธิบายได้ ฉันไม่รู้ว่าชะตากรรมจะพาเราไปทางไหน แต่ฉันหวังอยู่เสมอว่าโชคชะตาจะพาเราให้กลับมาเจอกันอีกครั้ง และถ้าวันนั้นมาถึง… ฉันสัญญา ฉันจะไม่ปล่อยให้โอกาสนั้นหลุดลอยไป

    เว็บไซต์นี้เป็นเพียงวิธีเล็กๆ ที่ฉันใช้แสดงความรักที่มีต่อคุณ—จดหมายรักดิจิทัลที่ฉันหวังว่าจะทำให้คุณยิ้มได้ แต่ขอให้คุณรู้ไว้ว่าความรู้สึกของฉันที่มีต่อคุณนั้นลึกซึ้งยิ่งกว่าคำพูดใดๆ บนหน้าจอนี้จะสามารถอธิบายได้

    ขอบคุณที่เป็นคุณ
    ขอบคุณที่เลือกฉัน
    ขอบคุณที่ทำให้ทุกวันของฉันมีค่าและน่าอยู่

    ฉันรักคุณ… วันนี้ พรุ่งนี้ และตลอดไป

    จากคนที่คิดถึงคุณเสมอ... 💖
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
                จดหมายรักลับของฉัน | Surat Cinta Rahsia Saya
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
