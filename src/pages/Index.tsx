
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Messages from '@/components/Messages';
import Surprise from '@/components/Surprise';
import CocaColaSurprise from '@/components/CocaColaSurprise';
import Contact from '@/components/Contact';
import TrackingDashboard from '@/components/TrackingDashboard';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageViewTracking, useScrollTracking, useClickTracking } from '@/hooks/useTrackingHooks';

const Index: React.FC = () => {
  const { language } = useLanguage();
  
  // Initialize tracking hooks
  usePageViewTracking();
  useScrollTracking();
  useClickTracking();
  
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
        <section id="hero" data-track-id="hero-section">
          <Hero />
        </section>
        <section id="gallery" data-track-id="gallery-section">
          <Gallery />
        </section>
        <section id="messages" data-track-id="messages-section">
          <Messages />
        </section>
        <section id="surprise" data-track-id="surprise-section">
          <Surprise />
          <CocaColaSurprise />
        </section>
        <section id="contact" data-track-id="contact-section">
          <Contact />
        </section>
        
        {/* Add tracking dashboard */}
        <TrackingDashboard />
      </motion.div>
    </Layout>
  );
};

export default Index;
