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
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 animate-slideDown">
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden">
        {/* Bouton fermer */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/20 transition z-10"
          title="Fermer"
        >
          <X size={20} />
        </button>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Texte principal */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide mb-1">
                Offre de Lancement Exclusive
              </h3>
              <p className="text-sm text-white/90">
                Votre 1er mois à <span className="text-xl font-black">-10%</span>
              </p>
            </div>

            {/* Code promo */}
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg px-3 py-1.5">
                <span className="text-lg font-mono font-black text-white tracking-wider">
                  CPROPRE10
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="bg-white text-primary-600 p-2 rounded-lg hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
                title="Copier le code"
              >
                {copied ? (
                  <Check size={18} className="animate-bounce" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>

            {/* Compteur compact */}
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-white animate-pulse" />
              <div className="flex items-center gap-1">
                <div className="bg-white/20 backdrop-blur-sm border border-white/50 rounded px-2 py-1 min-w-[35px] text-center">
                  <span className="text-lg font-black font-mono text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-white font-black">:</span>
                <div className="bg-white/20 backdrop-blur-sm border border-white/50 rounded px-2 py-1 min-w-[35px] text-center">
                  <span className="text-lg font-black font-mono text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-white font-black">:</span>
                <div className="bg-white/20 backdrop-blur-sm border border-white/50 rounded px-2 py-1 min-w-[35px] text-center">
                  <span className="text-lg font-black font-mono text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#tarifs"
              className="bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-black hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
            >
              Voir les offres
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
