
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Messages from '@/components/Messages';
import Surprise from '@/components/Surprise';
import CocaColaSurprise from '@/components/CocaColaSurprise';
import LoveGame from '@/components/LoveGame';
import Contact from '@/components/Contact';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Index: React.FC = () => {
  const { language } = useLanguage();
  
  // Scroll to the section specified in the URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section id="hero">
          <Hero />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="messages">
          <Messages />
        </section>
        <section id="lovegame">
          <LoveGame />
        </section>
        <section id="surprise">
          <Surprise />
          <CocaColaSurprise />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </motion.div>
    </Layout>
  );
};

export default Index;
