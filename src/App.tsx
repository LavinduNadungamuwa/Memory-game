import React, { useState } from 'react';
import { Gamepad2, RefreshCw, Settings, Volume2, VolumeX } from 'lucide-react';
import Card from './components/Card';
import GameStats from './components/GameStats';
import GameComplete from './components/GameComplete';
import { useMemoryGame } from './hooks/useMemoryGame';

function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
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
  } = useMemoryGame(difficulty, soundEnabled);

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setShowSettings(false);
    // Level start sound will be triggered by the useEffect in useMemoryGame
  };

  const handleNextLevel = () => {
    if (difficulty === 'easy') {
      setDifficulty('medium');
    } else if (difficulty === 'medium') {
      setDifficulty('hard');
    }
  };

  const getGridCols = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-4';
      case 'medium': return 'grid-cols-4';
      case 'hard': return 'grid-cols-5';
      default: return 'grid-cols-4';
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-600';
      default: return 'from-indigo-500 to-purple-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-2">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2 className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Memory Game</h1>
          </div>
          <p className="text-white/80 text-sm">Match all the pairs to win!</p>
          
          {/* Difficulty Badge */}
          <div className="mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
            </span>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-1"
            title={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-1 text-sm"
          >
            <Settings className="w-3 h-3" />
            Settings
          </button>
          
          <button
            onClick={resetGame}
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-1 text-sm"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/30">
            <h3 className="text-white text-lg font-semibold mb-3">Difficulty</h3>
            <div className="flex gap-2 justify-center">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`px-4 py-1.5 rounded-lg font-medium transition-all duration-200 text-sm ${
                    difficulty === level
                      ? 'bg-white text-purple-700'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  <span className="text-xs ml-1">
                    ({level === 'easy' ? '6' : level === 'medium' ? '8' : '10'} pairs)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Game Stats */}
        <div className="mb-4">
          <GameStats 
            moves={moves} 
            time={time} 
            matches={matches} 
            totalPairs={totalPairs} 
          />
        </div>

        {/* Game Board */}
        <div className={`grid ${getGridCols()} gap-2 justify-center max-w-fit mx-auto mb-4`}>
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
            difficulty={difficulty}
            onRestart={resetGame}
            onNextLevel={handleNextLevel}
          />
        )}
      </div>
    </div>
  );
}

export default App;