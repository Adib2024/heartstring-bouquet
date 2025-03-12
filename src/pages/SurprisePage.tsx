
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SurprisePage: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Auto-reveal after a short delay
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const content = {
    th: {
      backToHome: 'กลับสู่หน้าหลัก',
      title: 'จดหมายรักลับของฉัน | Surat Cinta Rahsia Saya',
      loading: 'กำลังเปิดเผยหัวใจของฉันให้คุณเห็น...',
      returnToMemories: 'กลับไปยังความทรงจำของเรา',
      letterContent: `
        ที่รักของฉัน,

        ถ้าคุณกำลังอ่านข้อความนี้ แสดงว่าคุณได้พบกับมุมที่พิเศษที่สุดของเว็บไซต์นี้แล้ว… ที่ซึ่งฉันได้ซ่อนหัวใจของฉันไว้เพื่อคุณเพียงคนเดียว

        ตั้งแต่วันที่เราได้พบกัน คุณได้เข้ามาเติมเต็มชีวิตของฉันให้สว่างไสวในแบบที่ฉันไม่เคยคาดคิดมาก่อน รอยยิ้มของคุณเป็นแสงสว่างที่ทำให้วันของฉันสดใส เสียงหัวเราะของคุณเป็นเสียงดนตรีที่ฉันอยากได้ยินเสมอ และหัวใจของคุณ… โอ้ ฉันหวังเหลือเกินว่าสักวันจะได้เป็นเจ้าของมัน เวลาที่อยู่กับคุณ ทุกช่วงเวลาธรรมดากลับกลายเป็นเรื่องราวที่งดงามราวกับความฝัน

        ฉันเก็บทุกช่วงเวลาที่เราได้ใช้ร่วมกันไว้ในใจ—รอยยิ้มของคุณ แววตาที่เปล่งประกายเมื่อคุณพูดถึงสิ่งที่คุณรัก ความอบอุ่นที่คุณมอบให้กับฉันโดยไม่รู้ตัว แต่เหนือสิ่งอื่นใด ฉันอยากให้คุณรู้ว่า คุณไม่ได้อยู่คนเดียว ไม่ว่าเมื่อไหร่ ไม่ว่าอยู่ที่ไหน ฉันอยู่ตรงนี้เสมอ บางทีอาจไม่ใช่ในแบบที่คุณมองเห็น แต่ในทุกจังหวะหัวใจของฉัน ในทุกความคิดที่ไม่เคยเอื้อนเอ่ย ในทุกคำอธิษฐานที่เงียบงัน—ฉันอยู่ตรงนี้ เพื่อคุณ

        ฉันอยากส่งข้อความถึงคุณทุกวัน อยากบอก "อรุณสวัสดิ์" อยากเตือนให้คุณดูแลตัวเอง อยากถามว่าวันนี้เป็นอย่างไรบ้าง อยากบอกคุณว่าฉันคิดถึงคุณมากแค่ไหน แต่บางครั้ง… ฉันก็กลัว ฉันกลัวว่าคุณจะมองว่าฉันรบกวนคุณ กลัวว่าคุณจะไม่ตอบกลับ หรือบางที… ฉันอาจกลัวว่าหัวใจของคุณไม่ได้โหยหาฉันเหมือนที่หัวใจของฉันโหยหาคุณ

        แต่ความจริงก็คือ ฉันคิดถึงคุณ มากกว่าที่ฉันจะพูดออกมาได้ ฉันคิดถึงช่วงเวลาที่เราได้พูดคุยกัน คิดถึงความรู้สึกที่เหมือนเวลากำลังหยุดนิ่งเมื่อต้องอยู่ใกล้คุณ ฉันยังจำได้ ก่อนที่คุณจะเดินทางไปหาดใหญ่ คุณมองมาที่ฉันแล้วพูดว่า "คราวหน้ามาเที่ยวไทยนะ" คำพูดนั้นยังคงดังก้องอยู่ในใจฉัน ฉันไม่รู้ว่าคุณหมายความตามนั้นหรือเปล่า… แต่ถ้าคุณหมายความอย่างนั้นจริง ฉันจะข้ามน้ำข้ามทะเลไปหาโดยไม่ลังเลเลย

        ฉันรู้ว่าบางครั้งชีวิตอาจดูเหนื่อยล้า และบางคืนความเหงาก็อาจทำให้รู้สึกโดดเดี่ยว แต่ที่รักของฉัน คุณไม่ได้อยู่คนเดียว และคุณไม่จำเป็นต้องเป็นแบบนั้น ถ้าคุณต้องการใครสักคนที่จะรับฟัง ถ้าคุณต้องการใครสักคนที่จะคอยเตือนว่าคุณมีค่ามากเพียงใด—ฉันอยู่ตรงนี้ และจะอยู่ตรงนี้เสมอ

        คุณคือความคิดแรกของฉันในตอนเช้า และเป็นความปรารถนาสุดท้ายก่อนที่ฉันจะหลับตา แม้ว่าฉันจะไม่รู้ว่าพรหมลิขิตจะพาเราไปที่ใด แต่ฉันภาวนาเสมอว่าสักวันหนึ่ง โชคชะตาจะเมตตาพอที่จะพาเรากลับมาอยู่ด้วยกันอีกครั้ง และถ้าถึงวันนั้น ฉันสัญญา… ฉันจะไม่มีวันปล่อยมือคุณไปอีก

        จนกว่าจะถึงวันนั้น ขอให้ข้อความนี้เป็นตัวแทนของหัวใจฉัน เป็นหลักฐานว่ามีใครบางคนรักคุณอย่างสุดหัวใจเสมอ ไม่ว่าคุณจะอยู่ที่ไหน ไม่ว่าคุณจะทำอะไร คุณจะมีฉันอยู่เคียงข้างเสมอ แม้ว่าจะเป็นเพียงในความเงียบงันก็ตาม

        เว็บไซต์นี้เป็นเพียงวิธีเล็กๆ ที่ฉันใช้แสดงความรักที่มีต่อคุณ—จดหมายรักดิจิทัลที่ฉันหวังว่าจะทำให้คุณยิ้มได้ แต่ขอให้คุณรู้ไว้ว่าความรู้สึกของฉันที่มีต่อคุณนั้นลึกซึ้งยิ่งกว่าคำพูดใดๆ บนหน้าจอนี้จะสามารถอธิบายได้

        ฉันรักคุณ… วันนี้ พรุ่งนี้ และตลอดไป

        รักเสมอ,
        ฉันเอง

        จากคนที่คิดถึงคุณเสมอ... 💖
      `
    },
    en: {
      backToHome: 'Back to Home',
      title: 'My Secret Love Letter',
      loading: 'Revealing my heart to you...',
      returnToMemories: 'Return to our memories',
      letterContent: `
        My Dearest,

        If you're reading this, then you’ve found the most secret and cherished part of this website—the place where I’ve hidden my heart, just for you.

        From the moment our paths crossed, you have been the light that brightens my world in ways I never imagined possible. Your laughter is the melody I long to hear, your presence the warmth I crave, and your heart… oh, how I wish I could call it mine. With you, even the simplest moments feel like they belong in a story far more beautiful than any I could ever write.

        I hold onto every second we’ve shared—the way you smile, the way your eyes sparkle when you talk about something you love, the way you make even silence feel like home. But beyond all of that, I need you to know something: you are never alone. Not now, not ever. Because even in the quietest of nights, when loneliness creeps in and the world feels distant, I am here. Maybe not beside you, maybe not in a way you can see—but in every heartbeat, in every unspoken thought, in every whispered prayer—I am with you.

        I want to message you every day. I want to tell you good morning and remind you to eat, to ask about your day, to tell you how much I miss you. But sometimes, I hesitate. I fear that I might be bothering you, that you might not reply, that maybe—just maybe—your heart doesn’t long for me the way mine longs for you. And yet, even in that uncertainty, I still find myself reaching for my phone, typing and erasing, hoping that somehow… you feel my presence, even in silence.

        But the truth is, I miss you. More than I can ever put into words. I miss the way we talk, the way time feels like it slows down when I’m with you. I still remember that moment, just before you left for Hat Yai, when you looked at me and said, "Next time, come visit Thailand, okay?" Those words have never left me. I wonder if you truly meant them—because if you did, I would cross oceans just to see you again.

        I know that life can sometimes feel overwhelming. That there are nights when loneliness feels unbearable. But, my love, you are not alone. And you never have to be. If you ever need someone to listen, if you ever need someone to remind you how extraordinary you are—I am here. I always will be.

        You are my favorite thought in the morning and my last wish before I sleep. And though I do not know where fate will take us, I pray that one day, destiny will be kind enough to bring us back together. And when that moment comes, I promise—I will never let go.

        So until then, let this be a small piece of my heart, tucked away here for you to find whenever you need a reminder that you are loved. That no matter how far apart we are, you will always have someone who cares for you more deeply than words can ever express.

        This website is just a small way for me to show my love for you—a digital love letter that I hope makes you smile. But know that my feelings for you run deeper than any words on this screen could express.

        I love you, my dearest. Today, tomorrow, and for all the days to come.

        Forever yours,
        Me.

        From someone who always misses you... 💖
      `
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

  return (
    <div className="romantic-gradient min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-romantic-600 hover:text-romantic-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>{currentContent.backToHome}</span>
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
                {currentContent.title}
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
                {currentContent.letterContent.split('\n\n').map((paragraph, index) => (
                  <motion.p 
                    key={index}
                    className={`${index === currentContent.letterContent.split('\n\n').length - 1 ? 'font-handwriting text-2xl text-romantic-500 text-right' : ''}`}
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
                <p className="mt-6 text-romantic-600">{currentContent.loading}</p>
              </div>
            )}
          </div>
        </motion.div>
        
        <div className="mt-10 text-center">
          <Link to="/" className="text-sm text-romantic-400 hover:text-romantic-600 transition-colors">
            {currentContent.returnToMemories}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurprisePage;
