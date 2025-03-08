import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'gallery', 'messages', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = {
    th: [
      { name: 'หน้าหลัก', path: '/#hero', section: 'hero' },
      { name: 'แกลเลอรี่', path: '/#gallery', section: 'gallery' },
      { name: 'ข้อความ', path: '/#messages', section: 'messages' },
      { name: 'ติดต่อ', path: '/#contact', section: 'contact' },
    ],
    en: [
      { name: 'Home', path: '/#hero', section: 'hero' },
      { name: 'Gallery', path: '/#gallery', section: 'gallery' },
      { name: 'Messages', path: '/#messages', section: 'messages' },
      { name: 'Contact', path: '/#contact', section: 'contact' },
    ]
  };

  const navLinks = language === 'th' ? navItems.th : navItems.en;
  const surpriseText = language === 'th' ? 'เซอร์ไพรส์' : 'Surprise';
  const logoText = language === 'th' ? 'สำหรับคุณ' : 'For You';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white/70 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <Heart className="h-6 w-6 text-romantic-500" fill="#f686a6" />
              <span className="text-romantic-900 font-serif text-xl font-medium">
                {logoText}
              </span>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                isActive={activeSection === link.section}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    scrollToSection(link.section);
                  }
                }}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="ml-2">
              <LanguageToggle />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <Link
                to="/surprise"
                className="px-4 py-2 rounded-full bg-romantic-100 text-romantic-500 font-medium text-sm hover:bg-romantic-200 transition-colors duration-300"
              >
                {surpriseText}
              </Link>
            </motion.div>
          </nav>
          
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <MobileMenu links={navLinks} scrollToSection={scrollToSection} surpriseText={surpriseText} />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const NavLink: React.FC<{ 
  to: string; 
  isActive: boolean; 
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}> = ({ 
  to, 
  isActive, 
  children,
  onClick
}) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium rounded-full transition-colors duration-300 relative ${
        isActive 
          ? 'text-romantic-500' 
          : 'text-romantic-900 hover:text-romantic-500'
      }`}
      onClick={onClick}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-romantic-500 mx-auto w-1/2"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

const MobileMenu: React.FC<{ 
  links: { name: string; path: string; section: string }[]; 
  scrollToSection: (sectionId: string) => void;
  surpriseText: string;
}> = ({ links, scrollToSection, surpriseText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-md text-romantic-800 hover:text-romantic-500 focus:outline-none"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-md mt-2 rounded-lg p-4"
        >
          <div className="flex flex-col space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-3 text-romantic-800 hover:text-romantic-500 hover:bg-romantic-50 rounded-md text-sm font-medium"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    scrollToSection(link.section);
                  }
                  setIsOpen(false);
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/surprise"
              className="mt-2 px-4 py-3 bg-romantic-100 text-romantic-500 rounded-md text-sm font-medium hover:bg-romantic-200 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {surpriseText}
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navigation;
