'use client';

import { Truck, Sparkles, Home } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden min-h-screen">
      {/* Vidéo plein écran en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/5535856-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[80vh]">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fadeInUp">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                Votre pressing <span className="text-primary-300">professionnel</span> à domicile
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold animate-fadeInUp px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)', animationDelay: '0.2s', opacity: 0 }}>
              Collecte chaque lundi, nettoyage impeccable, livraison rapide. 
              Suivez vos vêtements en temps réel avec notre système QR code.
            </p>
            
            {/* 3 blocs explicatifs - Côte à côte mobile */}
            <div className="flex gap-3 md:gap-6 max-w-4xl mx-auto animate-fadeInUp overflow-x-auto px-4 pb-2 scrollbar-hide" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex-1 min-w-[110px] flex-shrink-0">
                <div className="bg-white/90 p-3 rounded-full mb-3 animate-float">
                  <Truck className="text-primary-600" size={28} />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-white mb-0 md:mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  Collecte à domicile
                </h3>
                <p className="hidden md:block text-sm text-white/90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                  Nous venons récupérer votre linge directement chez vous
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex-1 min-w-[110px] flex-shrink-0" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white/90 p-3 rounded-full mb-3 animate-float" style={{ animationDelay: '0.3s' }}>
                  <Sparkles className="text-primary-600" size={28} />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-white mb-0 md:mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  Nettoyage professionnel
                </h3>
                <p className="hidden md:block text-sm text-white/90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                  Traitement éco-responsable par des experts du textile
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex-1 min-w-[110px] flex-shrink-0" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white/90 p-3 rounded-full mb-3 animate-float" style={{ animationDelay: '0.6s' }}>
                  <Home className="text-primary-600" size={28} />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-white mb-0 md:mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  Livraison express
                </h3>
                <p className="hidden md:block text-sm text-white/90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                  Retour de votre linge impeccable sous 48h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
