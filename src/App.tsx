import React from 'react';
import Card from './components/Card';
import GameStats from './components/GameStats';
import GameComplete from './components/GameComplete';
import { useMemoryGame } from './hooks/useMemoryGame';
import { useSoundEffects } from './hooks/useSoundEffects';

function App() {
  const {
    cards,
    flippedCards,
    matchedCards,
    moves,
    gameComplete,
    handleCardClick,
    resetGame
  } = useMemoryGame();

  const { playFlip, playMatch, playComplete } = useSoundEffects();

  const handleCardClickWithSound = (id: number) => {
    handleCardClick(id);
    
    if (flippedCards.length === 0) {
      playFlip();
    } else if (flippedCards.length === 1) {
      playFlip();
      // Check if cards match after a short delay
      setTimeout(() => {
        const firstCard = cards.find(card => card.id === flippedCards[0]);
        const secondCard = cards.find(card => card.id === id);
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          playMatch();
        }
      }, 500);
    }
  };

  React.useEffect(() => {
    if (gameComplete) {
      playComplete();
    }
  }, [gameComplete, playComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Memory Game
        </h1>
        
        <GameStats moves={moves} onReset={resetGame} />
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
              isMatched={matchedCards.includes(card.id)}
              onClick={() => handleCardClickWithSound(card.id)}
            />
          ))}
        </div>
        
        {gameComplete && (
          <GameComplete moves={moves} onPlayAgain={resetGame} />
        )}
      </div>
    </div>
  );
}

export default App;