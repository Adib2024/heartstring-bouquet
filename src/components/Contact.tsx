
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquareHeart, Upload, X, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
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
      addFiles: 'เพิ่มไฟล์',
      orDrop: 'หรือลากไฟล์มาวางที่นี่',
      selectedFiles: 'ไฟล์ที่เลือก',
      removeFile: 'ลบไฟล์',
      maxSize: 'ขนาดไฟล์ต้องน้อยกว่า 5MB',
      fileTooLarge: 'ไฟล์ขนาดใหญ่เกินไป',
      fileType: 'รองรับไฟล์รูปภาพและเอกสาร'
    },
    en: {
      badge: 'Write To Me',
      title: 'Send Me A',
      titleHighlight: 'Message',
      description: 'I\'d love to hear from you. Share a memory, tell me how you feel, or simply send a hello. Your words always brighten my day.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Your name',
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
      addFiles: 'Add Files',
      orDrop: 'or drop files here',
      selectedFiles: 'Selected Files',
      removeFile: 'Remove file',
      maxSize: 'Files must be less than 5MB',
      fileTooLarge: 'File is too large',
      fileType: 'Image and document files supported'
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    const newFiles: File[] = [];
    
    // Check each file for size (5MB limit)
    Array.from(selectedFiles).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: currentContent.fileTooLarge,
          description: currentContent.maxSize,
          variant: "destructive",
        });
        return;
      }
      newFiles.push(file);
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles) return;
    
    const newFiles: File[] = [];
    
    // Check each file for size (5MB limit)
    Array.from(droppedFiles).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: currentContent.fileTooLarge,
          description: currentContent.maxSize,
          variant: "destructive",
        });
        return;
      }
      newFiles.push(file);
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '' || message.trim() === '') {
      toast({
        title: currentContent.errorTitle,
        description: currentContent.errorDesc,
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending a message with files
    setTimeout(() => {
      toast({
        title: currentContent.successTitle,
        description: currentContent.successDesc,
        duration: 5000,
      });
      
      // Clear form
      setName('');
      setMessage('');
      setFiles([]);
      setIsSending(false);
    }, 1500);
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
                
                {/* File Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-romantic-700 mb-2">
                    {currentContent.addFiles}
                  </label>
                  <div 
                    className="border-2 border-dashed border-romantic-200 rounded-lg p-4 text-center cursor-pointer hover:border-romantic-400 transition-all duration-300"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-6 w-6 mx-auto mb-2 text-romantic-500" />
                    <p className="text-romantic-700 mb-1">{currentContent.addFiles}</p>
                    <p className="text-romantic-500 text-sm">{currentContent.orDrop}</p>
                    <p className="text-romantic-400 text-xs mt-2">{currentContent.maxSize}</p>
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                  </div>
                </div>
                
                {/* Display selected files */}
                {files.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-romantic-700 mb-2">{currentContent.selectedFiles}</p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md bg-romantic-50 p-2">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-romantic-500 mr-2" />
                            <span className="text-sm text-romantic-700 truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-romantic-500 hover:text-romantic-700"
                            aria-label={currentContent.removeFile}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
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
