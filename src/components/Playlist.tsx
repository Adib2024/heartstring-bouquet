
import React from 'react';
import { motion } from 'framer-motion';
import { Music, PlayCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Song {
  id: number;
  title: string;
  artist: string;
  link: string;
}

const Playlist: React.FC = () => {
  const { language } = useLanguage();

  const songs: Song[] = [
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      link: "https://www.youtube.com/watch?v=2Vv-BfVoq4g"
    },
    {
      id: 2,
      title: "At My Worst",
      artist: "Pink Sweat$",
      link: "https://www.youtube.com/watch?v=8CEJoCr_9UI"
    },
    {
      id: 3,
      title: "You Are The Reason",
      artist: "Calum Scott",
      link: "https://www.youtube.com/watch?v=ShZ978fBl6Y"
    },
    {
      id: 4,
      title: "ถ้าเธอรักฉันจริง",
      artist: "สิงโต นำโชค",
      link: "https://www.youtube.com/watch?v=MhL7jhl1PeQ"
    },
    {
      id: 5,
      title: "ทุกอย่าง",
      artist: "COCKTAIL",
      link: "https://www.youtube.com/watch?v=QbQJko0Gn9Q"
    }
  ];

  const content = {
    th: {
      sectionBadge: 'เพลงของเรา',
      title: 'เพลงที่บอกเล่า',
      titleHighlight: 'เรื่องราวของเรา',
      description: 'ทุกความสัมพันธ์มีซาวด์แทร็กของตัวเอง เพลงเหล่านี้ได้กลายเป็นส่วนหนึ่งของเรื่องราวของเรา แต่ละเพลงมีความทรงจำหรือความรู้สึกพิเศษที่เชื่อมโยงเรา',
      playlistNote: 'คลิกที่เพลงเพื่อฟัง',
      buttonText: 'ฟังเพลย์ลิสต์ทั้งหมด',
      playText: 'เล่น',
      loadingText: 'กำลังโหลด...',
      errorText: 'เกิดข้อผิดพลาดในการโหลดเพลย์ลิสต์ กรุณาลองใหม่อีกครั้ง'
    },
    en: {
      sectionBadge: 'Our Songs',
      title: 'Songs That Tell',
      titleHighlight: 'Our Story',
      description: 'Every relationship has its own soundtrack. These songs have become part of our story, each one holding a special memory or feeling that connects us.',
      playlistNote: 'Click on a song to listen',
      buttonText: 'Listen to Full Playlist',
      playText: 'Play',
      loadingText: 'Loading...',
      errorText: 'Error loading playlist. Please try again.'
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

  return (
    <section id="playlist" className="py-20 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-40 w-96 h-96 bg-romantic-100 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-cream-100 rounded-full filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs bg-romantic-100 text-romantic-800 mb-4">
            {currentContent.sectionBadge}
          </span>
          <h2 className="text-4xl font-serif font-bold text-romantic-900 mb-6">
            {currentContent.title} <span className="text-romantic-500">{currentContent.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-romantic-700">
            {currentContent.description}
          </p>
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="glass-card rounded-xl p-8">
            <Music className="h-12 w-12 text-romantic-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold text-romantic-800 mb-6 text-center">
              {currentContent.playlistNote}
            </h3>
            
            <div className="space-y-3 mb-8">
              {songs.map((song) => (
                <a
                  key={song.id}
                  href={song.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-romantic-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-romantic-400 w-6 text-center">{song.id}.</span>
                    <div className="ml-4">
                      <h4 className="font-medium text-romantic-800">{song.title}</h4>
                      <p className="text-sm text-romantic-500">{song.artist}</p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-romantic-500"
                  >
                    <PlayCircle size={20} />
                  </motion.div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <a 
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLnbwZHro0FzTZULQ1pOKHKWL1hL52-tDV" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-romantic-500 text-white font-medium rounded-full shadow-md hover:bg-romantic-600 transition-colors duration-300"
              >
                <span>{currentContent.buttonText}</span>
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Playlist;
