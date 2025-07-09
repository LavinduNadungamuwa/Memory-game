import React from 'react';
import Card from './components/Card';
import GameStats from './components/GameStats';
import GameComplete from './components/GameComplete';
import { useMemoryGame } from './hooks/useMemoryGame';

function App() {
  const {
    cards,
    flippedCards,
    moves,
    matches,
    time,
    totalPairs,
    isGameComplete,
    isFlipDisabled,
    flipCard,
    resetGame,
    difficulty = 'medium'
  } = useMemoryGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Memory Game
        </h1>
        
        <GameStats 
          moves={moves} 
          time={time} 
          matches={matches} 
          totalPairs={totalPairs} 
        />
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              symbol={card.symbol}
              card={card}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              disabled={isFlipDisabled}
              difficulty={difficulty}
              onClick={() => flipCard(card.id)}
            />
          ))}
        </div>
        
        {isGameComplete && (
          <GameComplete 
            moves={moves} 
            time={time} 
            difficulty={difficulty}
            onRestart={resetGame} 
            onNextLevel={() => {}} 
          />
        )}
      </div>
    </div>
  );
}

export default App;