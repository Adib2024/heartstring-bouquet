
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquareHeart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '' || message.trim() === '') {
      toast({
        title: "Please fill in all fields",
        description: "Both name and message are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending a message
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "I'll read it with a smile on my face",
        duration: 5000,
      });
      
      setName('');
      setMessage('');
      setIsSending(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs bg-romantic-100 text-romantic-800 mb-4">
            Write To Me
          </span>
          <h2 className="text-4xl font-serif font-bold text-romantic-900 mb-6">
            Send Me A <span className="text-romantic-500">Message</span>
          </h2>
          <p className="max-w-2xl mx-auto text-romantic-700">
            I'd love to hear from you. Share a memory, tell me how you feel, or simply send a hello.
            Your words always brighten my day.
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
                  Write Something Sweet
                </h3>
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-romantic-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-romantic-200 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all duration-300"
                  />
                </div>
                
                <div className="mb-6 flex-1">
                  <label htmlFor="message" className="block text-sm font-medium text-romantic-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to tell me?"
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
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
                  <h3 className="text-xl font-serif font-semibold text-romantic-800">Contact Me</h3>
                  <p className="text-romantic-600 text-sm">I'll always respond</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <p className="text-romantic-700 leading-relaxed">
                  Your messages mean the world to me. Whether it's a sweet note, a memory you want to share, 
                  or just a hello, I'd love to hear from you.
                </p>
                
                <div className="p-6 bg-white/50 rounded-lg border border-romantic-100">
                  <p className="text-romantic-700 font-medium mb-2">Leave a message anytime</p>
                  <p className="text-romantic-600 text-sm">
                    Use this form to send me your thoughts, feelings, or anything you'd like to share.
                    I promise to read every word with a smile.
                  </p>
                </div>
                
                <div className="p-6 bg-white/50 rounded-lg border border-romantic-100">
                  <p className="text-romantic-700 font-medium mb-2">Our private space</p>
                  <p className="text-romantic-600 text-sm">
                    This is our special corner of the internet — a place where distance disappears
                    and we can always feel connected.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-romantic-100">
                <p className="font-handwriting text-xl text-romantic-500 text-center">
                  Can't wait to hear from you
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
