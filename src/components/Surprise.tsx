
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Heart } from 'lucide-react';

const Surprise: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  // This would typically be stored securely, but for simplicity:
  const correctPassword = 'loveyou';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === correctPassword) {
      navigate('/surprise');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section id="surprise" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 romantic-gradient opacity-70 z-0"></div>
      
      <motion.div 
        className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="glass rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-romantic-500" fill="#f686a6" />
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-romantic-900 mb-4">
            A Special Surprise
          </h2>
          
          <p className="text-romantic-700 mb-8">
            I've prepared something special just for you. Enter the password to unlock it.
            <span className="block mt-2 text-sm text-romantic-500 italic">
              (Hint: It's three words I always tell you, without spaces)
            </span>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? 'border-romantic-500 animate-shake' : 'border-romantic-200'
                } bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all duration-300`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {error ? (
                  <Lock className="h-5 w-5 text-romantic-500" />
                ) : (
                  <Unlock className="h-5 w-5 text-romantic-400" />
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-romantic-500 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  That's not quite right. Try again!
                </motion.p>
              )}
            </AnimatePresence>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-romantic-500 hover:bg-romantic-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <span>Unlock My Heart</span>
              <Heart className="w-4 h-4 ml-2" />
            </button>
          </form>
          
          <p className="mt-6 text-sm text-romantic-600">
            This leads to a special page that's just between us.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Surprise;
