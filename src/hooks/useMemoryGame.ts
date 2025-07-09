import { useState, useEffect, useCallback } from 'react';
import { useSoundEffects } from './useSoundEffects';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const symbols = ['heart', 'star', 'sparkles', 'zap', 'crown', 'gem', 'diamond', 'circle', 'square', 'triangle'];

export const useMemoryGame = (difficulty: 'easy' | 'medium' | 'hard' = 'medium', soundEnabled: boolean = true) => {
  const { playMatchSound, playLevelCompleteSound } = useSoundEffects(soundEnabled);
  
  const getPairCount = () => {
    switch (difficulty) {
      case 'easy': return 6;
      case 'medium': return 8;
      case 'hard': return 10;
      default: return 8;
    }
  };

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const pairCount = getPairCount();
  const totalPairs = pairCount;

  const initializeGame = useCallback(() => {
    const gameSymbols = symbols.slice(0, pairCount);
    const cardPairs = [...gameSymbols, ...gameSymbols];
    
    // Shuffle cards
    const shuffledCards = cardPairs
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setIsGameActive(false);
    setIsGameComplete(false);
  }, [pairCount]);

  const flipCard = useCallback((cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    
    // Check if card is already matched
    const card = cards.find(c => c.id === cardId);
    if (card?.isMatched) return;

    if (!isGameActive) {
      setIsGameActive(true);
    }

    setFlippedCards(prev => [...prev, cardId]);
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
  }, [flippedCards, cards, isGameActive]);

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Initialize game on mount and when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer effect - stops when game is complete
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGameActive && !isGameComplete) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isGameComplete]);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      setMoves(prev => prev + 1);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          playMatchSound();
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (matches === totalPairs && matches > 0) {
      // Play completion sound after a short delay
      setTimeout(() => {
        playLevelCompleteSound();
      }, 500);
      setIsGameComplete(true);
      setIsGameActive(false); // This stops the timer
    }
  }, [matches, totalPairs, playLevelCompleteSound]);

  return {
    cards,
    flippedCards,
    moves,
    matches,
    time,
    totalPairs,
    isGameComplete,
    flipCard,
    resetGame,
    isFlipDisabled: flippedCards.length >= 2
  };
};