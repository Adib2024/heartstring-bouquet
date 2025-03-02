
import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="cream-gradient min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <Navigation />
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="py-10"
        >
          {children}
        </motion.main>
        <footer className="text-center pt-10 pb-6 text-cream-700">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="h-px w-24 bg-cream-300 my-4"></div>
            <p className="text-sm font-light">Created with love</p>
            <p className="text-xs font-light opacity-70">© {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
