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
      case 'easy': return 'grid-cols-3';
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
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-2 sm:p-4 overflow-hidden flex flex-col">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Memory Game</h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg">Match all the pairs to win!</p>
          
          {/* Difficulty Badge */}
          <div className="mt-2 sm:mt-4">
            <span className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white font-medium text-sm sm:text-base bg-gradient-to-r ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
            </span>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-1 sm:gap-2"
            title={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />}
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          
          <button
            onClick={resetGame}
            className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-6 mb-4 sm:mb-6 border border-white/30">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Difficulty</h3>
            <div className="flex gap-2 sm:gap-4 justify-center">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`px-3 py-1 sm:px-6 sm:py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                    difficulty === level
                      ? 'bg-white text-purple-700'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  <span className="text-xs sm:text-sm ml-1 sm:ml-2 hidden sm:inline">
                    ({level === 'easy' ? '6' : level === 'medium' ? '8' : '10'} pairs)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Game Stats */}
        <div className="mb-4 sm:mb-6">
          <GameStats 
            moves={moves} 
            time={time} 
            matches={matches} 
            totalPairs={totalPairs} 
          />
        </div>

        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`grid ${getGridCols()} gap-2 sm:gap-3 lg:gap-4 justify-center max-w-fit mx-auto`}>
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