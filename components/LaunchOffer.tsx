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
    <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.4s', opacity: 0 }}>
      {/* Animation de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      
      <div className="relative z-10">
        {/* Badge */}
        <div className="flex items-center justify-center mb-3">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
            Offre de Lancement Exclusive
          </h3>
        </div>

        {/* Texte promo */}
        <p className="text-center text-base sm:text-lg mb-4 font-semibold">
          Votre 1er mois à <span className="text-2xl font-black">-10%</span> avec le code
        </p>

        {/* Code promo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-xl px-4 py-2">
            <span className="text-xl sm:text-2xl font-mono font-black tracking-wider">
              CPROPRE10
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="bg-white text-primary-600 p-2 rounded-xl hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
            title="Copier le code"
          >
            {copied ? (
              <Check size={20} className="animate-bounce" />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>

        {/* Compteur */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock size={18} className="animate-pulse" />
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
              Offre limitée - Fin dans :
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            {/* Heures */}
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[70px]">
              <div className="text-2xl sm:text-3xl font-black font-mono animate-pulse">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-wide mt-0.5">Heures</div>
            </div>
            
            <div className="text-2xl font-black animate-pulse">:</div>
            
            {/* Minutes */}
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[70px]">
              <div className="text-2xl sm:text-3xl font-black font-mono animate-pulse">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-wide mt-0.5">Minutes</div>
            </div>
            
            <div className="text-2xl font-black animate-pulse">:</div>
            
            {/* Secondes */}
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[70px]">
              <div className="text-2xl sm:text-3xl font-black font-mono animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-wide mt-0.5">Secondes</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="#tarifs"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full text-base font-black uppercase tracking-wide hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <span>Je profite de l'offre</span>
          </a>
        </div>
      </div>
    </div>
  );
}
