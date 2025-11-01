'use client';

import { useState, useEffect } from 'react';
import { Clock, Copy, Check } from 'lucide-react';

export default function LaunchOffer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Calculer 7 jours à partir de maintenant
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('CPROPRE10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.4s', opacity: 0 }}>
      {/* Animation de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      
      <div className="relative z-10">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl sm:text-3xl">🔥</span>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
            Offre de Lancement Exclusive
          </h3>
          <span className="text-2xl sm:text-3xl">🔥</span>
        </div>

        {/* Texte promo */}
        <p className="text-center text-lg sm:text-xl mb-6 font-semibold">
          Votre 1er mois à <span className="text-3xl font-black">-10%</span> avec le code
        </p>

        {/* Code promo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-xl px-6 py-3">
            <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider">
              CPROPRE10
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="bg-white text-red-600 p-3 rounded-xl hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
            title="Copier le code"
          >
            {copied ? (
              <Check size={24} className="animate-bounce" />
            ) : (
              <Copy size={24} />
            )}
          </button>
        </div>

        {/* Compteur */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock size={20} className="animate-pulse" />
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wide">
              Offre limitée - Fin dans :
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Heures */}
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 min-w-[60px] sm:min-w-[80px]">
              <div className="text-3xl sm:text-4xl font-black font-mono animate-pulse">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-wide mt-1">Heures</div>
            </div>
            
            <div className="text-3xl font-black animate-pulse">:</div>
            
            {/* Minutes */}
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 min-w-[60px] sm:min-w-[80px]">
              <div className="text-3xl sm:text-4xl font-black font-mono animate-pulse">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-wide mt-1">Minutes</div>
            </div>
            
            <div className="text-3xl font-black animate-pulse">:</div>
            
            {/* Secondes */}
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 min-w-[60px] sm:min-w-[80px]">
              <div className="text-3xl sm:text-4xl font-black font-mono animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-wide mt-1">Secondes</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="#tarifs"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full text-lg font-black uppercase tracking-wide hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span className="text-xl">👑</span>
            <span>Je profite de l'offre</span>
          </a>
        </div>
      </div>
    </div>
  );
}
