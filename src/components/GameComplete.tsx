import React from 'react';
import { Trophy, RefreshCw, Star, ArrowRight } from 'lucide-react';

interface GameCompleteProps {
  moves: number;
  time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  onRestart: () => void;
  onNextLevel: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ 
  moves, 
  time, 
  difficulty, 
  onRestart, 
  onNextLevel 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceRating = () => {
    const timeThreshold = difficulty === 'easy' ? 45 : difficulty === 'medium' ? 75 : 120;
    const moveThreshold = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35;
    
    if (moves <= moveThreshold && time <= timeThreshold) return { stars: 3, message: "Perfect!" };
    if (moves <= moveThreshold * 1.5 && time <= timeThreshold * 1.3) return { stars: 2, message: "Great job!" };
    return { stars: 1, message: "Well done!" };
  };

  const rating = getPerformanceRating();
  const canAdvance = difficulty !== 'hard';
  const nextLevel = difficulty === 'easy' ? 'medium' : 'hard';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-bounce-in">
        <div className="text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Level Complete!</h2>
            <p className="text-gray-600">{rating.message}</p>
            <p className="text-sm text-gray-500 mt-1 capitalize">
              {difficulty} difficulty conquered
            </p>
          </div>
          
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(3)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-8 h-8 ${
                  i < rating.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">{formatTime(time)}</div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{moves}</div>
                <div className="text-sm text-gray-600">Moves</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {canAdvance && (
              <button
                onClick={onNextLevel}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Next Level ({nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)})
              </button>
            )}
            
            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameComplete;