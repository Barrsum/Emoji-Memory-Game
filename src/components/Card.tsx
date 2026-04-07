import React from 'react';
import { motion } from 'motion/react';
import { CardType } from '../lib/memoryLogic';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  return (
    <div className="relative w-20 h-24 sm:w-24 sm:h-28 perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => !disabled && !card.isFlipped && !card.isMatched && onClick()}
        whileHover={!disabled && !card.isFlipped ? { scale: 1.05, y: -5 } : {}}
        whileTap={!disabled && !card.isFlipped ? { scale: 0.95 } : {}}
      >
        {/* Front of card (hidden when flipped) */}
        <div className="absolute inset-0 backface-hidden glass-card flex items-center justify-center text-3xl text-indigo-400/50 hover:text-indigo-400 transition-colors">
          ❓
        </div>
        
        {/* Back of card (shows emoji) */}
        <div 
          className={`absolute inset-0 backface-hidden flex items-center justify-center text-4xl sm:text-5xl rounded-2xl border-2 shadow-lg rotate-y-180 transition-colors duration-300 ${
            card.isError ? 'bg-red-100/80 border-red-400 backdrop-blur-md' : 
            card.isMatched ? 'bg-green-100/80 border-green-400 backdrop-blur-md' : 
            'bg-white/80 border-indigo-200 backdrop-blur-md'
          }`}
        >
          {card.emoji}
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
