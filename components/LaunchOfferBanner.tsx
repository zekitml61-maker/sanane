'use client';

import { useState, useEffect } from 'react';
import { Clock, Copy, Check, X } from 'lucide-react';

export default function LaunchOfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 animate-k200">
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 shadow-lg relative">
        {/* Barre de progression animée en bas */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
          <div className="h-full bg-white animate-progressBar"></div>
        </div>

        {/* Bouton fermer */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/20 transition"
          title="Fermer"
        >
          <X size={16} />
        </button>

        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white">
            {/* Texte accrocheur */}
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold">OFFRE LANCEMENT</span>
              <span className="text-xs sm:text-sm">•</span>
              <span className="text-sm sm:text-base font-black">-10%</span>
            </div>

            {/* Code promo compact */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm">Code:</span>
              <div className="bg-white/20 border border-white/40 rounded px-2 py-0.5">
                <span className="text-sm font-mono font-bold tracking-wide">CPROPRE10</span>
              </div>
              <button
                onClick={handleCopy}
                className="bg-white/20 hover:bg-white/30 p-1.5 rounded transition-all active:scale-95"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            {/* Compteur ultra-compact */}
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="animate-pulse" />
              <div className="flex items-center gap-0.5 text-sm font-mono font-bold">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>

            {/* CTA mini */}
            <a
              href="#tarifs"
              className="bg-white text-primary-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-100 transition-all hover:scale-105"
            >
              Profiter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
