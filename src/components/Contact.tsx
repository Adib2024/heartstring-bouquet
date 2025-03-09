
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquareHeart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const content = {
    th: {
      badge: 'เขียนถึงฉัน',
      title: 'ส่ง',
      titleHighlight: 'ข้อความ',
      description: 'ฉันอยากได้ยินจากคุณ แบ่งปันความทรงจำ บอกฉันว่าคุณรู้สึกอย่างไร หรือแค่ส่งคำทักทาย คำพูดของคุณทำให้วันของฉันสดใสเสมอ',
      nameLabel: 'ชื่อของคุณ',
      namePlaceholder: 'ชื่อของคุณ',
      emailLabel: 'อีเมลของคุณ (ถ้าต้องการการตอบกลับ)',
      emailPlaceholder: 'อีเมลของคุณ',
      messageLabel: 'ข้อความของคุณ',
      messagePlaceholder: 'คุณอยากจะบอกอะไรกับฉัน?',
      sendButton: 'ส่งข้อความ',
      sending: 'กำลังส่ง...',
      contactMe: 'ติดต่อฉัน',
      alwaysRespond: 'ฉันจะตอบกลับเสมอ',
      yourMessages: 'ข้อความของคุณมีความหมายกับฉันมาก ไม่ว่าจะเป็นบันทึกที่น่ารัก ความทรงจำที่คุณอยากแบ่งปัน หรือแค่คำทักทาย ฉันอยากได้ยินจากคุณ',
      leaveMessage: 'ฝากข้อความได้ตลอดเวลา',
      useForm: 'ใช้แบบฟอร์มนี้เพื่อส่งความคิด ความรู้สึก หรือสิ่งที่คุณอยากแบ่งปัน ฉันสัญญาว่าจะอ่านทุกคำพร้อมรอยยิ้ม',
      privateSpace: 'พื้นที่ส่วนตัวของเรา',
      cornerInternet: 'นี่คือมุมพิเศษของเราบนอินเทอร์เน็ต — สถานที่ที่ระยะทางหายไปและเราสามารถรู้สึกเชื่อมต่อกันได้เสมอ',
      cantWait: 'รอที่จะได้ยินจากคุณ',
      errorTitle: 'กรุณากรอกข้อมูลให้ครบ',
      errorDesc: 'ทั้งชื่อและข้อความจำเป็นต้องกรอก',
      successTitle: 'ส่งข้อความสำเร็จ',
      successDesc: 'ฉันจะอ่านมันพร้อมรอยยิ้มบนใบหน้า',
      writeSomethingSweet: 'เขียนอะไรซักอย่างที่หวานๆ',
      emailError: 'กรุณากรอกอีเมลที่ถูกต้อง หากต้องการการตอบกลับ'
    },
    en: {
      badge: 'Write To Me',
      title: 'Send Me A',
      titleHighlight: 'Message',
      description: 'I\'d love to hear from you. Share a memory, tell me how you feel, or simply send a hello. Your words always brighten my day.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Your Email (if you want a reply)',
      emailPlaceholder: 'Your email',
      messageLabel: 'Your Message',
      messagePlaceholder: 'What would you like to tell me?',
      sendButton: 'Send Message',
      sending: 'Sending...',
      contactMe: 'Contact Me',
      alwaysRespond: 'I\'ll always respond',
      yourMessages: 'Your messages mean the world to me. Whether it\'s a sweet note, a memory you want to share, or just a hello, I\'d love to hear from you.',
      leaveMessage: 'Leave a message anytime',
      useForm: 'Use this form to send me your thoughts, feelings, or anything you\'d like to share. I promise to read every word with a smile.',
      privateSpace: 'Our private space',
      cornerInternet: 'This is our special corner of the internet — a place where distance disappears and we can always feel connected.',
      cantWait: 'Can\'t wait to hear from you',
      errorTitle: 'Please fill in all fields',
      errorDesc: 'Both name and message are required',
      successTitle: 'Message sent successfully',
      successDesc: 'I\'ll read it with a smile on my face',
      writeSomethingSweet: 'Write Something Sweet',
      emailError: 'Please enter a valid email if you want a reply'
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

  // Email validation function
  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '' || message.trim() === '') {
      toast({
        title: currentContent.errorTitle,
        description: currentContent.errorDesc,
        variant: "destructive",
      });
      return;
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      toast({
        title: currentContent.errorTitle,
        description: currentContent.emailError,
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);

    try {
      // Using Email.js service to send emails directly from frontend
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_euedxns', // Updated service ID
          template_id: 'template_default', // Replace with your Email.js template ID
          user_id: 'user_yourUserID', // Replace with your Email.js user ID
          template_params: {
            to_email: 'adbahnf19@gmail.com',
            from_name: name,
            from_email: email || 'No email provided',
            message: message,
            reply_to: email || 'adbahnf19@gmail.com',
          }
        }),
      });
      
      // Alternative approach - sending to a serverless function or backend
      // For demo purposes, we'll use a timeout to simulate network request
      // In a real application, you would uncomment the fetch code above
      
      // Simulating sending a message for demo purposes
      setTimeout(() => {
        console.log('Message sent to: adbahnf19@gmail.com');
        console.log('From:', name);
        console.log('Reply email:', email || 'None provided');
        console.log('Message:', message);
        
        toast({
          title: currentContent.successTitle,
          description: currentContent.successDesc,
          duration: 5000,
        });
        
        setName('');
        setEmail('');
        setMessage('');
        setIsSending(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: "destructive",
      });
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs bg-romantic-100 text-romantic-800 mb-4">
            {currentContent.badge}
          </span>
          <h2 className="text-4xl font-serif font-bold text-romantic-900 mb-6">
            {currentContent.title} <span className="text-romantic-500">{currentContent.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-romantic-700">
            {currentContent.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="h-full glass-card rounded-xl p-8 flex flex-col">
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-semibold text-romantic-800 mb-6 flex items-center">
                  <MessageSquareHeart className="mr-2 h-5 w-5 text-romantic-500" />
                  {currentContent.writeSomethingSweet}
                </h3>
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-romantic-700 mb-2">
                    {currentContent.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={currentContent.namePlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-romantic-200 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all duration-300"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-romantic-700 mb-2">
                    {currentContent.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={currentContent.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-romantic-200 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all duration-300"
                  />
                </div>
                
                <div className="mb-6 flex-1">
                  <label htmlFor="message" className="block text-sm font-medium text-romantic-700 mb-2">
                    {currentContent.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={currentContent.messagePlaceholder}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-romantic-200 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all duration-300 resize-none flex-1"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSending}
                  className={`py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isSending
                      ? 'bg-romantic-300 cursor-not-allowed'
                      : 'bg-romantic-500 hover:bg-romantic-600'
                  } text-white`}
                >
                  {isSending ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{currentContent.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{currentContent.sendButton}</span>
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="h-full glass-card rounded-xl p-8 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-romantic-100 flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-romantic-500" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-romantic-800">{currentContent.contactMe}</h3>
                  <p className="text-romantic-600 text-sm">{currentContent.alwaysRespond}</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <p className="text-romantic-700 leading-relaxed">
                  {currentContent.yourMessages}
                </p>
                
                <div className="p-6 bg-white/50 rounded-lg border border-romantic-100">
                  <p className="text-romantic-700 font-medium mb-2">{currentContent.leaveMessage}</p>
                  <p className="text-romantic-600 text-sm">
                    {currentContent.useForm}
                  </p>
                </div>
                
                <div className="p-6 bg-white/50 rounded-lg border border-romantic-100">
                  <p className="text-romantic-700 font-medium mb-2">{currentContent.privateSpace}</p>
                  <p className="text-romantic-600 text-sm">
                    {currentContent.cornerInternet}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-romantic-100">
                <p className="font-handwriting text-xl text-romantic-500 text-center">
                  {currentContent.cantWait}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
