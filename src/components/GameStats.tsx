import React from 'react';
import { Clock, Target, Trophy } from 'lucide-react';

interface GameStatsProps {
  moves: number;
  time: number;
  matches: number;
  totalPairs: number;
}

const GameStats: React.FC<GameStatsProps> = ({ moves, time, matches, totalPairs }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex gap-3 justify-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
        <div className="flex items-center gap-2 text-white text-sm">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{formatTime(time)}</span>
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
        <div className="flex items-center gap-2 text-white text-sm">
          <Target className="w-4 h-4" />
          <span className="font-medium">{moves} moves</span>
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
        <div className="flex items-center gap-2 text-white text-sm">
          <Trophy className="w-4 h-4" />
          <span className="font-medium">{matches}/{totalPairs}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;