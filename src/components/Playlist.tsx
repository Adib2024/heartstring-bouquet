import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, VolumeX } from 'lucide-react';
import { toast } from "sonner";
import YouTube, { YouTubePlayer, YouTubeProps, YouTubeEvent } from 'react-youtube';

interface Song {
  id: number;
  title: string;
  artist: string;
  description: string;
  videoId: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    description: "The song that reminds me of our first dance",
    videoId: "cNGjD0VG4R8"
  },
  {
    id: 2,
    title: "All of Me",
    artist: "John Legend",
    description: "This describes exactly how I feel about you",
    videoId: "ngq5Aw0Q6rQ"
  },
  {
    id: 3,
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    description: "Forever's not long enough with you",
    videoId: "s6jDsbz0DQw"
  },
  {
    id: 4,
    title: "At Last",
    artist: "Etta James",
    description: "A classic that makes me think of you",
    videoId: "YtZ-IgUjALo"
  },
  {
    id: 5,
    title: "Can't Help Falling In Love",
    artist: "Elvis Presley",
    description: "Because some things are meant to be",
    videoId: "MqazV4hbu8E"
  }
];

const Playlist: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    
    playerRef.current.setVolume(50);

    if (currentSong && isPlaying) {
      event.target.playVideo();
    }
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    const playerState = event.data;
    
    if (playerState === 1) {
      setIsPlaying(true);
      startProgressInterval();
    } else if (playerState === 2) {
      setIsPlaying(false);
      stopProgressInterval();
    } else if (playerState === 0) {
      handleNext();
    } else if (playerState === 3) {
      stopProgressInterval();
    }
  };

  const startProgressInterval = () => {
    stopProgressInterval();
    
    progressIntervalRef.current = window.setInterval(() => {
      if (playerRef.current) {
        const duration = playerRef.current.getDuration();
        const currentTime = playerRef.current.getCurrentTime();
        
        if (duration) {
          setProgress((currentTime / duration) * 100);
        }
      }
    }, 1000);
  };

  const stopProgressInterval = () => {
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        playerRef.current?.pauseVideo();
      } else {
        playerRef.current?.playVideo();
      }
    } else {
      setCurrentSong(song);
      
      if (playerRef.current) {
        playerRef.current.loadVideoById({
          videoId: song.videoId,
          startSeconds: 0
        });
        playerRef.current.playVideo();
      } else {
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const handlePrev = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !currentSong) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    const percentage = (x / width) * 100;
    
    setProgress(percentage);
    
    const duration = playerRef.current.getDuration();
    const seekToTime = (percentage / 100) * duration;
    
    playerRef.current.seekTo(seekToTime, true);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const opts: YouTubeProps['opts'] = {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
    },
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
    <section id="playlist" className="py-20 bg-cream-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs bg-cream-200 text-cream-800 mb-4">
            Our Soundtrack
          </span>
          <h2 className="text-4xl font-serif font-bold text-romantic-900 mb-6">
            Songs That <span className="text-cream-600">Tell Our Story</span>
          </h2>
          <p className="max-w-2xl mx-auto text-romantic-700">
            Every relationship has its own soundtrack. These songs have become part of our story,
            each one holding a special memory or feeling that connects us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            className="md:col-span-5 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-romantic-100 to-cream-100 flex items-center justify-center mb-6 overflow-hidden">
                {currentSong ? (
                  <motion.div 
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-romantic-200 to-cream-200"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: isPlaying ? [1, 1.02, 1] : 1, 
                      opacity: 1,
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: isPlaying ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    <Music className="w-20 h-20 text-white/70" />
                  </motion.div>
                ) : (
                  <Music className="w-16 h-16 text-romantic-300" />
                )}
              </div>
              
              <div className="w-full text-center mb-6">
                <h3 className="text-xl font-serif font-semibold text-romantic-800 truncate">
                  {currentSong ? currentSong.title : "Select a song"}
                </h3>
                <p className="text-sm text-romantic-500 truncate">
                  {currentSong ? currentSong.artist : "Our playlist"}
                </p>
                {currentSong && (
                  <p className="mt-2 text-xs text-romantic-400 italic">
                    {currentSong.description}
                  </p>
                )}
              </div>
              
              <div className="sr-only">
                {currentSong && (
                  <YouTube
                    videoId={currentSong.videoId}
                    opts={opts}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange}
                    className="hidden"
                  />
                )}
              </div>
              
              <div className="w-full mb-6">
                <div 
                  className="w-full h-1 bg-romantic-100 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-romantic-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                <button 
                  onClick={handlePrev}
                  className="p-2 text-romantic-600 hover:text-romantic-800 transition-colors"
                  disabled={!currentSong}
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => currentSong && playSong(currentSong)}
                  className="p-4 bg-romantic-500 text-white rounded-full hover:bg-romantic-600 transition-colors flex items-center justify-center"
                  disabled={!currentSong}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                
                <button 
                  onClick={handleNext}
                  className="p-2 text-romantic-600 hover:text-romantic-800 transition-colors"
                  disabled={!currentSong}
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={toggleMute}
                  className="p-2 text-romantic-600 hover:text-romantic-800 transition-colors"
                  disabled={!currentSong}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              {songs.map((song) => (
                <motion.div
                  key={song.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    currentSong?.id === song.id
                      ? 'bg-romantic-100'
                      : 'hover:bg-romantic-50 bg-white'
                  }`}
                  onClick={() => playSong(song)}
                  variants={itemVariants}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center 
                      ${currentSong?.id === song.id && isPlaying 
                        ? 'bg-romantic-500 text-white' 
                        : 'bg-romantic-100 text-romantic-500'
                      }
                    `}>
                      {currentSong?.id === song.id && isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-romantic-800 font-medium truncate">{song.title}</h4>
                      <p className="text-sm text-romantic-500 truncate">{song.artist}</p>
                    </div>
                    
                    <div className="hidden sm:block max-w-[200px] truncate text-sm text-romantic-400 italic">
                      {song.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Playlist;
