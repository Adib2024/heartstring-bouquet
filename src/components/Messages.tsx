import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Message {
  id: number;
  date: string;
  title: string;
  content: string;
}

const messages: Message[] = [
  {
    id: 6,
    date: '20 กุมภาพันธ์ 2025',
    title: 'วันแรกที่ฉันได้พบคุณ',
    content: 'วันแรกที่ฉันได้พบคุณ… ฉันยังจำได้ดีว่าคุณดูสวยมาก ดวงตาของคุณเต็มไปด้วยความอบอุ่น รอยยิ้มของคุณสว่างไสวยิ่งกว่าดวงอาทิตย์ และฉันก็รู้ทันทีว่าคุณคือคนพิเศษ คุณเป็นคนไทยคนแรกที่ฉันได้รู้จัก แต่คุณไม่ใช่แค่ "ใครบางคน" สำหรับฉัน... คุณเป็นคนที่ทำให้หัวใจฉันเต้นแรงที่สุดตั้งแต่แรกพบ ฉันรู้สึกประหม่า ไม่รู้ว่าควรพูดอะไรดี แต่ฉันจำได้ว่า คุณพูดคนเดียวเบาๆ... ฉันไม่เข้าใจคำพูดของคุณเลย แต่ฉันกลับหลงใหลในเสียงของคุณ ทุกถ้อยคำที่คุณพูดมันน่ารักเหลือเกิน'
  },
  {
    id: 7,
    date: '20 กุมภาพันธ์ 2025 (กลางคืน)',
    title: 'เบอร์เกอร์ที่แบ่งกันกิน',
    content: 'ฉันชอบวิธีที่คุณดูแลฉัน และคืนนี้เราก็ได้พบกันอีกครั้ง ฉันซื้อเบอร์เกอร์มาให้คุณ เราแบ่งกันกิน และฉันเพิ่งรู้ว่าสิ่งที่คุณไม่ชอบ... คุณไม่กินหัวหอมและมะเขือเทศ แต่แทนที่คุณจะหยิบออก คุณกลับเลือกให้ฉันกินแทน... คุณยื่นชิ้นที่มีผักให้ฉันโดยไม่พูดอะไร พร้อมรอยยิ้มเล็กๆ ฉันรู้สึกหัวใจเต้นแรงขึ้นมาทันที... นั่นเป็นช่วงเวลาที่ฉันรู้ว่า "ฉันชอบคุณมากจริงๆ" ไม่ใช่เพราะอะไร แต่เพราะความใส่ใจเล็กๆ น้อยๆ ที่คุณมีให้ฉัน มันทำให้ฉันรู้สึกพิเศษเหลือเกิน'
  },
  {
    id: 8,
    date: '22 กุมภาพันธ์ 2025',
    title: 'Subway และ Choki-choki',
    content: 'วันก่อนที่ฉันจะต้องกลับ ฉันอยากใช้เวลาทุกวินาทีกับคุณ ฉันซื้อ Subway และ Choki-choki มาให้คุณ และฉันดีใจมากที่คุณชอบมัน คุณดูน่ารักทุกครั้งที่คุณกินอาหาร ฉันสังเกตเห็นว่าคุณกินนิดเดียว… มักจะกินไม่หมดเสมอ... ฮ่าๆ ฉันแซวคุณว่า "คุณขี้เสียดายนะ" แต่ไม่ว่าอะไรก็ตาม ฉันว่ามันเป็นเรื่องที่น่ารักที่สุดที่ฉันเคยเห็น ทุกการกระทำของคุณทำให้ฉันยิ้มโดยไม่รู้ตัว และวันนี้ฉันก็ได้แนะนำให้คุณลองกิน "Nasi Lemak" อาหารเช้าของคนมาเลเซีย และฉันตื่นเต้นมากเมื่อเห็นคุณกินมันจนหมด... แสดงว่าคุณชอบมันจริงๆ ใช่ไหม?'
  },
  {
    id: 9,
    date: '27 กุมภาพันธ์ 2025',
    title: 'คืนสุดท้าย',
    content: 'คืนสุดท้ายก่อนที่คุณจะกลับไทย ฉันรีบมาหาคุณที่โรงแรม เพราะฉันไม่อยากพลาดโอกาสสุดท้ายในการได้อยู่กับคุณ เราออกไปทานข้าวด้วยกัน และคืนนี้ฉันจะไม่มีวันลืม… คุณใส่เดรสสีดำ และคุณดูสวยมากจนฉันแทบหยุดหายใจ ฉันนั่งมองคุณเงียบๆ อยู่นาน เพราะฉันกลัวว่าถ้ากะพริบตา ฉันอาจจะพลาดช่วงเวลาสำคัญนี้ไป ฉันจับมือคุณแน่น... ไม่อยากให้เวลาผ่านไป ฉันรู้ว่าพรุ่งนี้คุณจะต้องจากไปแล้ว และฉันก็ได้แต่หวังว่า... สักวันหนึ่ง เราจะได้นั่งแบบนี้ด้วยกันอีกครั้ง'
  }
];

const Messages: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
            From My Heart
          </span>
          <h2 className="text-4xl font-serif font-bold text-romantic-900 mb-6">
            Letters to <span className="text-romantic-500">You</span>
          </h2>
          <p className="max-w-2xl mx-auto text-romantic-700">
            Words may not always capture how I feel, but these messages are little glimpses into my heart — 
            each one a reminder of how much you mean to me.
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
                    <p className="text-sm text-romantic-400 mb-1">{message.date}</p>
                    <h3 className="text-xl font-serif font-semibold text-romantic-800">{message.title}</h3>
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
                      <p className="text-romantic-700 leading-relaxed font-medium">{message.content}</p>
                      <div className="mt-4 flex justify-end">
                        <p className="font-handwriting text-xl text-romantic-500">With all my love</p>
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
