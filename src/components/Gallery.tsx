
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Photo {
  id: number;
  src: string;
  alt: {
    th: string;
    en: string;
  };
  caption: {
    th: string;
    en: string;
  };
}

const photos: Photo[] = [
  {
    id: 1,
    src: '/src/components/Gallery/A.jpg',
    alt: {
      th: 'จับมือกัน',
      en: 'Holding hands together'
    },
    caption: {
      th: 'เมื่อมือของเราประสานกัน ฉันรู้สึกเติมเต็ม',
      en: 'When our hands intertwine, I feel complete'
    }
  },
  {
    id: 2,
    src: '/src/components/Gallery/B.jpg',
    alt: {
      th: 'ทิวทัศน์ที่สงบเงียบพร้อมภูเขาและน้ำ',
      en: 'Serene landscape with mountains and water'
    },
    caption: {
      th: 'สถานที่ที่เราพูดว่า "ฉันรักคุณ" เป็นครั้งแรก',
      en: 'The place where we first said "I love you"'
    }
  },
  {
    id: 3,
    src: '/src/components/Gallery/C.jpg',
    alt: {
      th: 'ดอกไม้สีส้มสวยงามบาน',
      en: 'Beautiful orange flowers in bloom'
    },
    caption: {
      th: 'จำได้ไหมเมื่อคุณทำให้ฉันประหลาดใจด้วยดอกไม้เหล่านี้?',
      en: 'Remember when you surprised me with these flowers?'
    }
  },
  {
    id: 4,
    src: '/src/components/Gallery/D.jpg',
    alt: {
      th: 'ช่วงเวลาที่อบอุ่นทำงานด้วยกัน',
      en: 'Cozy moment working together'
    },
    caption: {
      th: 'ช่วงเวลาเงียบๆ ของเราสำคัญกับฉันมาก',
      en: 'Our quiet moments mean everything to me'
    }
  },
  {
    id: 5,
    src: '/src/components/Gallery/E.jpg',
    alt: {
      th: 'ห้องนั่งเล่นที่แสนอบอุ่น',
      en: 'A cozy living room'
    },
    caption: {
      th: 'สร้างบ้านของเราด้วยกัน ทีละความทรงจำ',
      en: 'Building our home together, one memory at a time'
    }
  },
  {
    id: 6,
    src: '/src/components/Gallery/F.jpg',
    alt: {
      th: 'เพื่อนตัวน้อยที่น่ารักของเรา',
      en: 'Our furry friend'
    },
    caption: {
      th: 'สมาชิกครอบครัวตัวน้อยของเราที่นำความสุขมาให้เรามากมาย',
      en: 'Our little family member who brings us so much joy'
    }
  }
];

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
  const { language } = useLanguage();

  const content = {
    th: {
      sectionBadge: 'ความทรงจำของเรา',
      title: 'ช่วงเวลาที่',
      titleHighlight: 'น่าจดจำ',
      description: 'ภาพถ่ายแต่ละภาพบันทึกช่วงเวลา ความรู้สึก ความทรงจำที่เราสร้างขึ้นด้วยกัน เหล่านี้คือเศษเสี้ยวของเรื่องราวของเราที่ฉันเก็บไว้ใกล้ชิดกับหัวใจที่สุด',
      imageLoadError: 'ไม่สามารถโหลดรูปภาพได้'
    },
    en: {
      sectionBadge: 'Our Memories',
      title: 'Moments Worth',
      titleHighlight: 'Remembering',
      description: 'Each photo captures a moment, a feeling, a memory that we\'ve created together. These are the fragments of our story that I hold closest to my heart.',
      imageLoadError: 'Image couldn\'t be loaded'
    }
  };

  // Select content based on current language
  const currentContent = language === 'th' ? content.th : content.en;

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
    // If it was previously marked as error, remove it
    if (errorImages.has(id)) {
      const newErrorSet = new Set(errorImages);
      newErrorSet.delete(id);
      setErrorImages(newErrorSet);
    }
  };

  const handleImageError = (id: number) => {
    // Mark this image as having an error
    setErrorImages(prev => new Set(prev).add(id));
    // Ensure it's not in loaded images
    const newLoadedSet = new Set(loadedImages);
    newLoadedSet.delete(id);
    setLoadedImages(newLoadedSet);
    console.error(`Failed to load image with id ${id}`);
  };

  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % photos.length;
    } else {
      newIndex = (currentIndex - 1 + photos.length) % photos.length;
    }
    
    setSelectedPhoto(photos[newIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs bg-cream-100 text-cream-800 mb-4">
            {currentContent.sectionBadge}
          </span>
          <h2 className="text-4xl font-serif font-bold text-romantic-900 mb-6">
            {currentContent.title} <span className="text-cream-600">{currentContent.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-romantic-700">
            {currentContent.description}
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {photos.map((photo) => (
            <motion.div 
              key={photo.id}
              className="overflow-hidden rounded-xl hover-lift glass-card"
              variants={itemVariants}
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="overflow-hidden h-[450px] relative">
                {!loadedImages.has(photo.id) && !errorImages.has(photo.id) && (
                  <div className="absolute inset-0 image-loading"></div>
                )}
                
                {errorImages.has(photo.id) ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream-50 p-4 text-center">
                    <AlertCircle className="h-12 w-12 text-romantic-400 mb-2" />
                    <p className="text-romantic-700 font-medium">{currentContent.imageLoadError}</p>
                    <p className="text-sm text-romantic-500 mt-1">{language === 'th' ? photo.alt.th : photo.alt.en}</p>
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={language === 'th' ? photo.alt.th : photo.alt.en}
                    className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${
                      loadedImages.has(photo.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(photo.id)}
                    onError={() => handleImageError(photo.id)}
                  />
                )}
              </div>
              <div className="p-4">
                <p className="font-handwriting text-lg text-romantic-700">
                  {language === 'th' ? photo.caption.th : photo.caption.en}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-3 right-3 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </button>
              
              <div className="h-[80vh] max-w-md mx-auto bg-gray-100 relative">
                {errorImages.has(selectedPhoto.id) ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream-50 p-4 text-center">
                    <AlertCircle className="h-16 w-16 text-romantic-400 mb-4" />
                    <p className="text-romantic-700 text-xl font-medium">{currentContent.imageLoadError}</p>
                    <p className="text-romantic-500 mt-1">{language === 'th' ? selectedPhoto.alt.th : selectedPhoto.alt.en}</p>
                  </div>
                ) : (
                  <img 
                    src={selectedPhoto.src} 
                    alt={language === 'th' ? selectedPhoto.alt.th : selectedPhoto.alt.en} 
                    className="w-full h-full object-contain"
                    onError={() => handleImageError(selectedPhoto.id)}
                  />
                )}
              </div>
              
              <div className="p-6 bg-white">
                <p className="font-handwriting text-xl text-romantic-700 mb-2">
                  {language === 'th' ? selectedPhoto.caption.th : selectedPhoto.caption.en}
                </p>
              </div>
              
              <button 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('prev');
                }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('next');
                }}
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
