
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: number;
  date: {
    th: string;
    en: string;
  };
  title: {
    th: string;
    en: string;
  };
  content: {
    th: string;
    en: string;
  };
}

const messages: Message[] = [
  {
    id: 6,
    date: {
      th: '20 กุมภาพันธ์ 2025',
      en: 'February 20, 2025'
    },
    title: {
      th: 'วันแรกที่ฉันได้พบคุณ',
      en: 'The First Day I Met You'
    },
    content: {
      th: 'วันแรกที่ฉันได้พบคุณ… ฉันยังจำได้ดีว่าคุณดูสวยมาก ดวงตาของคุณเต็มไปด้วยความอบอุ่น รอยยิ้มของคุณสว่างไสวยิ่งกว่าดวงอาทิตย์ และฉันก็รู้ทันทีว่าคุณคือคนพิเศษ คุณเป็นคนไทยคนแรกที่ฉันได้รู้จัก แต่คุณไม่ใช่แค่ "ใครบางคน" สำหรับฉัน... คุณเป็นคนที่ทำให้หัวใจฉันเต้นแรงที่สุดตั้งแต่แรกพบ ฉันรู้สึกประหม่า ไม่รู้ว่าควรพูดอะไรดี แต่ฉันจำได้ว่า คุณพูดคนเดียวเบาๆ... ฉันไม่เข้าใจคำพูดของคุณเลย แต่ฉันกลับหลงใหลในเสียงของคุณ ทุกถ้อยคำที่คุณพูดมันน่ารักเหลือเกิน',
      en: 'The first day I met you... I remember clearly how beautiful you looked. Your eyes were full of warmth, your smile brighter than the sun, and I knew immediately you were special. You were the first Thai person I ever met, but you weren\'t just "someone" to me... you were the person who made my heart beat the fastest from the moment we met. I felt nervous, not knowing what to say, but I remember you whispering to yourself... I didn\'t understand a word you said, but I was captivated by your voice. Every word you spoke was so adorable.'
    }
  },
  {
    id: 7,
    date: {
      th: '20 กุมภาพันธ์ 2025 (กลางคืน)',
      en: 'February 20, 2025 (Evening)'
    },
    title: {
      th: 'เบอร์เกอร์ที่แบ่งกันกิน',
      en: 'The Burger We Shared'
    },
    content: {
      th: 'ฉันชอบวิธีที่คุณดูแลฉัน และคืนนี้เราก็ได้พบกันอีกครั้ง ฉันซื้อเบอร์เกอร์มาให้คุณ เราแบ่งกันกิน และฉันเพิ่งรู้ว่าสิ่งที่คุณไม่ชอบ... คุณไม่กินหัวหอมและมะเขือเทศ แต่แทนที่คุณจะหยิบออก คุณกลับเลือกให้ฉันกินแทน... คุณยื่นชิ้นที่มีผักให้ฉันโดยไม่พูดอะไร พร้อมรอยยิ้มเล็กๆ ฉันรู้สึกหัวใจเต้นแรงขึ้นมาทันที... นั่นเป็นช่วงเวลาที่ฉันรู้ว่า "ฉันชอบคุณมากจริงๆ" ไม่ใช่เพราะอะไร แต่เพราะความใส่ใจเล็กๆ น้อยๆ ที่คุณมีให้ฉัน มันทำให้ฉันรู้สึกพิเศษเหลือเกิน',
      en: 'I love the way you take care of me, and tonight we met again. I bought you a burger, we shared it, and I just learned what you don\'t like... you don\'t eat onions and tomatoes. But instead of picking them out, you chose to give them to me... you handed me the pieces with vegetables without saying anything, with just a small smile. I felt my heart racing immediately... That was the moment I knew "I really like you." Not because of anything grand, but because of the small ways you pay attention to me. It made me feel so special.'
    }
  },
  {
    id: 8,
    date: {
      th: '22 กุมภาพันธ์ 2025',
      en: 'February 22, 2025'
    },
    title: {
      th: 'Subway และ Choki-choki',
      en: 'Subway and Choki-choki'
    },
    content: {
      th: 'วันก่อนที่ฉันจะต้องกลับ ฉันอยากใช้เวลาทุกวินาทีกับคุณ ฉันซื้อ Subway และ Choki-choki มาให้คุณ และฉันดีใจมากที่คุณชอบมัน คุณดูน่ารักทุกครั้งที่คุณกินอาหาร ฉันสังเกตเห็นว่าคุณกินนิดเดียว… มักจะกินไม่หมดเสมอ... ฮ่าๆ ฉันแซวคุณว่า "คุณขี้เสียดายนะ" แต่ไม่ว่าอะไรก็ตาม ฉันว่ามันเป็นเรื่องที่น่ารักที่สุดที่ฉันเคยเห็น ทุกการกระทำของคุณทำให้ฉันยิ้มโดยไม่รู้ตัว และวันนี้ฉันก็ได้แนะนำให้คุณลองกิน "Nasi Lemak" อาหารเช้าของคนมาเลเซีย และฉันตื่นเต้นมากเมื่อเห็นคุณกินมันจนหมด... แสดงว่าคุณชอบมันจริงๆ ใช่ไหม?',
      en: 'The day before I had to leave, I wanted to spend every second with you. I bought Subway and Choki-choki for you, and I was so happy you liked them. You look cute every time you eat. I noticed you eat just a little bit... always leaving food unfinished... Haha! I teased you saying, "You\'re so stingy!" But whatever it is, I think it\'s the cutest thing I\'ve ever seen. Everything you do makes me smile without realizing it. And today I introduced you to try "Nasi Lemak," a Malaysian breakfast, and I was so excited when I saw you finish it all... Does that mean you really liked it?'
    }
  },
  {
    id: 9,
    date: {
      th: '27 กุมภาพันธ์ 2025',
      en: 'February 27, 2025'
    },
    title: {
      th: 'คืนสุดท้าย',
      en: 'The Last Night'
    },
    content: {
      th: 'คืนสุดท้ายก่อนที่คุณจะกลับไทย ฉันรีบมาหาคุณที่โรงแรม เพราะฉันไม่อยากพลาดโอกาสสุดท้ายในการได้อยู่กับคุณ เราออกไปทานข้าวด้วยกัน และคืนนี้ฉันจะไม่มีวันลืม… คุณใส่เดรสสีดำ และคุณดูสวยมากจนฉันแทบหยุดหายใจ ฉันนั่งมองคุณเงียบๆ อยู่นาน เพราะฉันกลัวว่าถ้ากะพริบตา ฉันอาจจะพลาดช่วงเวลาสำคัญนี้ไป ฉันจับมือคุณแน่น... ไม่อยากให้เวลาผ่านไป ฉันรู้ว่าพรุ่งนี้คุณจะต้องจากไปแล้ว และฉันก็ได้แต่หวังว่า... สักวันหนึ่ง เราจะได้นั่งแบบนี้ด้วยกันอีกครั้ง',
      en: 'The last night before you returned to Thailand, I rushed to see you at the hotel because I didn\'t want to miss the last chance to be with you. We went out for dinner together, and I will never forget this night... You wore a black dress, and you looked so beautiful I could barely breathe. I sat looking at you quietly for a long time because I was afraid that if I blinked, I might miss this important moment. I held your hand tightly... not wanting time to pass. I knew tomorrow you would have to leave, and all I could hope was... someday, we would sit like this together again.'
    }
  }
];

const Messages: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { language } = useLanguage();

  const content = {
    th: {
      sectionBadge: 'จากหัวใจของฉัน',
      title: 'จดหมายถึง',
      titleHighlight: 'คุณ',
      description: 'คำพูดอาจไม่สามารถบรรยายความรู้สึกของฉันได้เสมอไป แต่ข้อความเหล่านี้คือส่วนเล็กๆ ในหัวใจของฉัน — แต่ละข้อความเป็นตัวเตือนว่าคุณมีความหมายกับฉันมากแค่ไหน',
      signOff: 'ด้วยความรักทั้งหมด'
    },
    en: {
      sectionBadge: 'From My Heart',
      title: 'Letters to',
      titleHighlight: 'You',
      description: 'Words may not always capture how I feel, but these messages are little glimpses into my heart — each one a reminder of how much you mean to me.',
      signOff: 'With all my love'
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="messages" className="py-20 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-40 left-0 w-96 h-96 bg-cream-100 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-romantic-100 rounded-full filter blur-3xl opacity-40"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs bg-romantic-100 text-romantic-800 mb-4">
            {currentContent.sectionBadge}
          </span>
          <h2 className="text-4xl font-serif font-bold text-romantic-900 mb-6">
            {currentContent.title} <span className="text-romantic-500">{currentContent.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-romantic-700">
            {currentContent.description}
          </p>
        </div>
        
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {messages.map((message) => (
            <motion.div 
              key={message.id}
              className={`glass-card rounded-xl overflow-hidden transition-all duration-500 ${
                expandedId === message.id ? 'letter-background' : ''
              }`}
              variants={itemVariants}
            >
              <div 
                className={`p-6 cursor-pointer ${
                  expandedId === message.id ? 'border-b border-romantic-200' : ''
                }`}
                onClick={() => toggleExpand(message.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-romantic-400 mb-1">
                      {language === 'th' ? message.date.th : message.date.en}
                    </p>
                    <h3 className="text-xl font-serif font-semibold text-romantic-800">
                      {language === 'th' ? message.title.th : message.title.en}
                    </h3>
                  </div>
                  <Heart 
                    className={`w-5 h-5 transition-all duration-300 ${
                      expandedId === message.id 
                        ? 'text-romantic-500 fill-romantic-500' 
                        : 'text-romantic-300'
                    }`} 
                  />
                </div>
              </div>
              
              <AnimatePresence>
                {expandedId === message.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-3">
                      <p className="text-romantic-700 leading-relaxed font-medium">
                        {language === 'th' ? message.content.th : message.content.en}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <p className="font-handwriting text-xl text-romantic-500">{currentContent.signOff}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Messages;
