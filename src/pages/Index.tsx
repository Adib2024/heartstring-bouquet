
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
        <Hero />
        <Gallery />
        <Messages />
        <Playlist />
        <Surprise />
        <Contact />
      </motion.div>
    </Layout>
  );
};

export default Index;
