import React, { useState } from 'react';
import { Gamepad2, RefreshCw, Settings } from 'lucide-react';
import Card from './components/Card';
import GameStats from './components/GameStats';
import GameComplete from './components/GameComplete';
import { useMemoryGame } from './hooks/useMemoryGame';

function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    cards,
    moves,
    matches,
    time,
    totalPairs,
    isGameComplete,
    flipCard,
    resetGame,
    isFlipDisabled
  } = useMemoryGame(difficulty);

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setShowSettings(false);
    // The useMemoryGame hook will reinitialize when difficulty changes
  };

  const getGridCols = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-3';
      case 'medium': return 'grid-cols-4';
      case 'hard': return 'grid-cols-5';
      default: return 'grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white">Memory Game</h1>
          </div>
          <p className="text-white/80 text-lg">Match all the pairs to win!</p>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          
          <button
            onClick={resetGame}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/30">
            <h3 className="text-white text-xl font-semibold mb-4">Difficulty</h3>
            <div className="flex gap-4 justify-center">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    difficulty === level
                      ? 'bg-white text-purple-700'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  <span className="text-sm ml-2">
                    ({level === 'easy' ? '6' : level === 'medium' ? '8' : '10'} pairs)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Game Stats */}
        <GameStats 
          moves={moves} 
          time={time} 
          matches={matches} 
          totalPairs={totalPairs} 
        />

        {/* Game Board */}
        <div className={`grid ${getGridCols()} gap-4 justify-center max-w-fit mx-auto`}>
          {cards.map(card => (
            <Card
              key={card.id}
              id={card.id}
              symbol={card.symbol}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => flipCard(card.id)}
              disabled={isFlipDisabled}
            />
          ))}
        </div>

        {/* Game Complete Modal */}
        {isGameComplete && (
          <GameComplete
            moves={moves}
            time={time}
            onRestart={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;