
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Messages from '@/components/Messages';
import Playlist from '@/components/Playlist';
import Surprise from '@/components/Surprise';
import Contact from '@/components/Contact';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
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
        <section id="playlist">
          <Playlist />
        </section>
        <section id="surprise">
          <Surprise />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </motion.div>
    </Layout>
  );
};

export default Index;
