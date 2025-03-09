
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Gift, MessageCircleHeart, Smile } from 'lucide-react';
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';

interface Card {
  id: number;
  type: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const LoveGame: React.FC = () => {
  const { language } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const texts = {
    th: {
      title: 'เกมแห่งความรัก',
      subtitle: 'จับคู่การ์ดที่เหมือนกันเพื่อค้นพบข้อความพิเศษ',
      startButton: 'เริ่มเกม',
      playAgain: 'เล่นอีกครั้ง',
      matchMessage: 'เยี่ยมมาก! คุณจับคู่ได้แล้ว',
      completeMessage: 'ยินดีด้วย! คุณเล่นเกมสำเร็จด้วยการเดิน',
      moves: 'การเดิน',
      specialMessage: 'ฉันรักคุณมากที่สุดในโลก ❤️'
    },
    en: {
      title: 'Game of Love',
      subtitle: 'Match the pairs to discover a special message',
      startButton: 'Start Game',
      playAgain: 'Play Again',
      matchMessage: 'Great job! You found a match',
      completeMessage: 'Congratulations! You completed the game in',
      moves: 'moves',
      specialMessage: 'I love you more than anything in the world ❤️'
    }
  };

  const content = language === 'th' ? texts.th : texts.en;

  const cardTypes = [
    { type: 'heart', icon: Heart },
    { type: 'star', icon: Star },
    { type: 'gift', icon: Gift }, 
    { type: 'message', icon: MessageCircleHeart },
    { type: 'smile', icon: Smile },
  ];

  const initializeGame = () => {
    // Create pairs of cards
    const initialCards: Card[] = [];
    cardTypes.forEach((card, index) => {
      // Create two cards of each type for matching
      initialCards.push({
        id: index * 2,
        type: card.type,
        isFlipped: false,
        isMatched: false
      });
      initialCards.push({
        id: index * 2 + 1,
        type: card.type,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle the cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
    setIsGameStarted(true);
  };

  const handleCardClick = (id: number) => {
    // Ignore if the card is already flipped or matched
    if (
      cards.find(card => card.id === id)?.isFlipped ||
      cards.find(card => card.id === id)?.isMatched ||
      flippedCards.length >= 2
    ) {
      return;
    }

    // Flip the card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    // Add to flipped cards
    setFlippedCards(prev => [...prev, id]);
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard?.type === secondCard?.type) {
        // Cards match
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        
        // Show toast for match
        toast.success(content.matchMessage);
      } else {
        // Cards don't match, flip them back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, content.matchMessage]);

  // Check if game is complete
  useEffect(() => {
    if (matchedPairs === cardTypes.length && isGameStarted) {
      setGameComplete(true);
      toast.success(`${content.completeMessage} ${moves} ${content.moves}!`, {
        description: content.specialMessage,
        duration: 5000,
      });
    }
  }, [matchedPairs, cardTypes.length, moves, isGameStarted, content]);

  const renderCard = (card: Card) => {
    const CardIcon = cardTypes.find(ct => ct.type === card.type)?.icon || Heart;
    
    return (
      <motion.div
        key={card.id}
        whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
        className={`relative w-24 h-24 cursor-pointer rounded-xl shadow-md ${
          card.isMatched ? 'bg-romantic-200' : 'bg-white'
        }`}
        onClick={() => handleCardClick(card.id)}
      >
        <div
          className={`w-full h-full flex items-center justify-center ${
            card.isFlipped || card.isMatched
              ? 'rotate-y-180'
              : ''
          }`}
        >
          {(card.isFlipped || card.isMatched) ? (
            <motion.div
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CardIcon 
                className="text-romantic-500" 
                size={40} 
                fill={card.isMatched ? "#fadee4" : "none"} 
              />
            </motion.div>
          ) : (
            <motion.div 
              className="absolute inset-0 bg-romantic-100 rounded-xl flex items-center justify-center"
            >
              <Heart className="text-romantic-300" size={30} />
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="py-16 px-4">
      <motion.div 
        className="max-w-2xl mx-auto glass rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl font-serif font-bold text-romantic-900 mb-4">
          {content.title}
        </h2>
        
        <p className="text-romantic-700 mb-8">
          {content.subtitle}
        </p>

        {!isGameStarted ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto px-6 py-3 bg-romantic-500 text-white rounded-full shadow-md hover:bg-romantic-600 transition-colors"
            onClick={initializeGame}
          >
            {content.startButton}
          </motion.button>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-romantic-700">
                {content.moves}: {moves}
              </p>
              <p className="text-romantic-700">
                {matchedPairs}/{cardTypes.length}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <AnimatePresence>
                {cards.map(card => renderCard(card))}
              </AnimatePresence>
            </div>

            {gameComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mx-auto px-6 py-3 bg-romantic-500 text-white rounded-full shadow-md hover:bg-romantic-600 transition-colors"
                  onClick={initializeGame}
                >
                  {content.playAgain}
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default LoveGame;
