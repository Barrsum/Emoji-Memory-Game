import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, RotateCcw, Play, X, Info, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import Card from './components/Card';
import { CardType, generateDeck } from './lib/memoryLogic';

type GameState = 'menu' | 'playing' | 'won';

const GITHUB_URL = "https://github.com/Barrsum/Emoji-Memory-Game";
const LINKEDIN_URL = "https://www.linkedin.com/in/ram-bapat-barrsum-diamos";

export default function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [deck, setDeck] = useState<CardType[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const initializeGame = useCallback(() => {
    setDeck(generateDeck());
    setFlippedIndices([]);
    setIsLocked(false);
    setMoves(0);
    setMatches(0);
    setGameState('playing');
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || deck[index].isFlipped || deck[index].isMatched) return;

    const newDeck = [...deck];
    newDeck[index].isFlipped = true;
    setDeck(newDeck);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);
      checkForMatch(newFlippedIndices, newDeck);
    }
  };

  const checkForMatch = (indices: number[], currentDeck: CardType[]) => {
    const [firstIndex, secondIndex] = indices;
    const firstCard = currentDeck[firstIndex];
    const secondCard = currentDeck[secondIndex];

    if (firstCard.emoji === secondCard.emoji) {
      // Match
      const newDeck = [...currentDeck];
      newDeck[firstIndex].isMatched = true;
      newDeck[secondIndex].isMatched = true;
      setDeck(newDeck);
      setFlippedIndices([]);
      setMatches((m) => m + 1);
      setIsLocked(false);
    } else {
      // No Match - Error State
      const errorDeck = [...currentDeck];
      errorDeck[firstIndex].isError = true;
      errorDeck[secondIndex].isError = true;
      setDeck(errorDeck);

      setTimeout(() => {
        const resetDeck = [...errorDeck];
        resetDeck[firstIndex].isFlipped = false;
        resetDeck[firstIndex].isError = false;
        resetDeck[secondIndex].isFlipped = false;
        resetDeck[secondIndex].isError = false;
        setDeck(resetDeck);
        setFlippedIndices([]);
        setIsLocked(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matches === 8 && gameState === 'playing') {
      setGameState('won');
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#a78bfa', '#f472b6', '#34d399', '#60a5fa']
      });
    }
  }, [matches, gameState]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-slate-800 font-body selection:bg-purple-300 selection:text-purple-900 relative">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="p-4 sm:p-6 z-10">
        <div className="max-w-6xl mx-auto glass-panel px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 leading-none">Emoji Match</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Made by <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-pink-500 transition-colors">Ram Bapat</a>
              </p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors bg-white/50 p-2 rounded-full"><Github size={20} /></a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors bg-white/50 p-2 rounded-full"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 z-10">
        <AnimatePresence mode="wait">
          {gameState === 'menu' ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-lg w-full p-8 sm:p-12 glass-panel text-center"
            >
              <div className="mb-8">
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-6xl mb-4"
                >
                  🧠
                </motion.div>
                <h2 className="text-5xl sm:text-6xl font-display font-bold text-slate-800 mb-4">Memory Match</h2>
                <p className="text-lg text-slate-600 font-medium">A Dreamy Glassmorphic Experience</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={initializeGame}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-display text-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
                >
                  <Play size={28} fill="currentColor" /> START GAME
                </button>
                
                <button
                  onClick={() => setShowHowToPlay(true)}
                  className="w-full py-4 bg-white/50 text-slate-700 rounded-2xl font-display text-xl flex items-center justify-center gap-3 hover:bg-white/80 transition-all"
                >
                  <Info size={24} /> HOW TO PLAY
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl w-full"
            >
              {/* Status Bar */}
              <div className="mb-6 flex justify-between items-center gap-4 glass-panel p-4">
                <div className="flex-1 text-center border-r border-slate-200/50">
                  <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Moves</p>
                  <p className="text-3xl font-display font-bold text-purple-600">{moves}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Matches</p>
                  <p className="text-3xl font-display font-bold text-pink-600">{matches} / 8</p>
                </div>
              </div>

              {/* Game Board */}
              <div className="glass-panel p-6 sm:p-8">
                <div className="grid grid-cols-4 gap-3 sm:gap-4 justify-items-center">
                  {deck.map((card, i) => (
                    <Card
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(i)}
                      disabled={isLocked || gameState === 'won'}
                    />
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={initializeGame}
                  className="px-6 py-3 glass-card text-slate-700 font-bold flex items-center gap-2 hover:bg-white/80 transition-colors"
                >
                  <RotateCcw size={18} /> RESTART
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="px-6 py-3 glass-card text-slate-700 font-bold flex items-center gap-2 hover:bg-white/80 transition-colors"
                >
                  MENU
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Win Modal */}
      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full glass-panel p-8 text-center bg-white/80"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-4xl font-display font-bold text-slate-800 mb-2">You Won!</h2>
              <p className="text-lg text-slate-600 mb-8">
                You completed the game in <span className="font-bold text-purple-600">{moves}</span> moves.
              </p>
              <div className="space-y-3">
                <button
                  onClick={initializeGame}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <RotateCcw size={20} /> PLAY AGAIN
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  BACK TO MENU
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How to Play Modal */}
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full glass-panel p-8 relative bg-white/90"
            >
              <button 
                onClick={() => setShowHowToPlay(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-3xl font-display font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Info className="text-purple-500" /> How to Play
              </h2>
              <ul className="space-y-4 text-slate-600 text-left">
                <li className="flex gap-3">
                  <span className="text-xl">🃏</span>
                  <span>Click any card to flip it and reveal the emoji hidden behind it.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">🔍</span>
                  <span>Try to find the matching emoji by flipping a second card.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">✅</span>
                  <span>If they match, they turn green and stay flipped!</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">❌</span>
                  <span>If they don't match, they turn red and flip back over. Remember their positions!</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">🏆</span>
                  <span>Match all 8 pairs in the fewest moves possible to win.</span>
                </li>
              </ul>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="mt-8 w-full py-3 bg-purple-100 text-purple-700 rounded-xl font-bold hover:bg-purple-200 transition-colors"
              >
                GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="p-6 z-10">
        <div className="max-w-6xl mx-auto glass-panel px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-display font-bold text-slate-700 mb-1">OPEN SOURCE</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              Built with React, Tailwind CSS, and Framer Motion. Part of the April Vibe Coding Challenge.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href={GITHUB_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/50 text-slate-600 hover:text-purple-600 hover:bg-white rounded-xl transition-all shadow-sm"
              title="View Source on GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href={LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/50 text-slate-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm"
              title="Connect on LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          © 2026 Emoji Match • Created by Ram Bapat
        </div>
      </footer>
    </div>
  );
}
