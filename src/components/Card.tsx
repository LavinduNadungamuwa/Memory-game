import React from 'react';
import { Sparkles, Heart, Star, Zap, Crown, Gem } from 'lucide-react';

interface CardProps {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const symbolMap: { [key: string]: React.ReactNode } = {
  'heart': <Heart className="w-8 h-8" />,
  'star': <Star className="w-8 h-8" />,
  'sparkles': <Sparkles className="w-8 h-8" />,
  'zap': <Zap className="w-8 h-8" />,
  'crown': <Crown className="w-8 h-8" />,
  'gem': <Gem className="w-8 h-8" />,
};

const Card: React.FC<CardProps> = ({
  id,
  symbol,
  isFlipped,
  isMatched,
  onClick,
  disabled
}) => {
  return (
    <div
      className={`relative w-20 h-20 cursor-pointer transition-all duration-300 ${
        disabled ? 'cursor-not-allowed' : 'hover:scale-105'
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg border-2 border-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Card Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className={`w-full h-full rounded-xl shadow-lg border-2 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isMatched 
              ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300/50 scale-105' 
              : 'bg-gradient-to-br from-white to-gray-100 border-gray-200/50'
          }`}>
            <div className={`transition-all duration-300 ${
              isMatched ? 'text-white' : 'text-gray-700'
            }`}>
              {symbolMap[symbol]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;