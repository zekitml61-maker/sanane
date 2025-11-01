'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function LaunchOfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  return (
    <>
      {/* Banner fixe */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary-600 to-blue-600 overflow-hidden shadow-lg">
        {/* Contenu défilant */}
        <div className="relative py-2">
          <div className="animate-scroll whitespace-nowrap text-white font-bold text-sm">
            <span className="inline-block px-8">
              OFFRE LANCEMENT EXCLUSIVE • -10% SUR VOTRE 1ER MOIS • CODE: CPROPRE10 • 
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')} RESTANTES
            </span>
            <span className="inline-block px-8">
              OFFRE LANCEMENT EXCLUSIVE • -10% SUR VOTRE 1ER MOIS • CODE: CPROPRE10 • 
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')} RESTANTES
            </span>
            <span className="inline-block px-8">
              OFFRE LANCEMENT EXCLUSIVE • -10% SUR VOTRE 1ER MOIS • CODE: CPROPRE10 • 
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')} RESTANTES
            </span>
          </div>
        </div>
      </div>
      
      {/* Overlay fondu gris sous le banner */}
      <div className="fixed top-[36px] left-0 right-0 h-8 bg-gradient-to-b from-gray-900/30 to-transparent z-[59] pointer-events-none"></div>
    </>
  );
}
