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
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/30">
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-3 h-3" />
          <span className="font-medium text-sm">{formatTime(time)}</span>
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/30">
        <div className="flex items-center gap-2 text-white">
          <Target className="w-3 h-3" />
          <span className="font-medium text-sm">{moves} moves</span>
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/30">
        <div className="flex items-center gap-2 text-white">
          <Trophy className="w-3 h-3" />
          <span className="font-medium text-sm">{matches}/{totalPairs}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;