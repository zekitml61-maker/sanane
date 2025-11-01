'use client';

import { Sparkles, Clock, Shield, MoveDown, QrCode } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen">
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9)' }}>
                Votre pressing <span className="text-primary-300">professionnel</span> à domicile
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold animate-fadeInUp px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)', animationDelay: '0.2s', opacity: 0 }}>
              Collecte chaque lundi, nettoyage impeccable, livraison rapide. 
              Suivez vos vêtements en temps réel avec notre système QR code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s', opacity: 0 }}>
              {/* Bouton principal - effet professionnel élégant */}
              <a
                href="#tarifs"
                className="group relative bg-white text-primary-600 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-2xl text-center overflow-hidden transition-all duration-500 hover:shadow-primary-500/30"
              >
                {/* Bordure animée subtile */}
                <span className="absolute inset-0 rounded-full border-2 border-primary-400 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></span>
                
                {/* Effet shimmer élégant */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-primary-100 to-transparent"></span>
                
                {/* Fond qui s'illumine doucement */}
                <span className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
                
                <span className="relative z-10 group-hover:text-primary-700 transition-colors duration-300">Choisir mon abonnement</span>
              </a>
              
              {/* Bouton secondaire avec effet néon pulsant */}
              <a
                href="#suivi"
                className="group relative border-3 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold backdrop-blur-sm text-center overflow-hidden hover:scale-110 transition-all duration-500"
              >
                {/* Bordure néon qui pulse */}
                <span className="absolute inset-0 rounded-full border-2 border-white animate-ping-slow opacity-75"></span>
                <span className="absolute inset-0 rounded-full border-2 border-white"></span>
                
                {/* Effet glow au hover */}
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300 rounded-full"></span>
                
                {/* Shimmer blanc */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></span>
                
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  <QrCode size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>Suivre ma commande</span>
                </span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto animate-fadeInUp px-4" style={{ animationDelay: '0.6s', opacity: 0 }}>
              <div className="flex flex-col items-center text-center animate-float">
                <div className="bg-white/90 p-4 rounded-full mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  <Sparkles className="text-primary-600" size={32} />
                </div>
                <p className="text-lg font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Qualité Premium</p>
              </div>
              <div className="flex flex-col items-center text-center animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-white/90 p-4 rounded-full mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  <Clock className="text-primary-600" size={32} />
                </div>
                <p className="text-lg font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Service Rapide</p>
              </div>
              <div className="flex flex-col items-center text-center animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-white/90 p-4 rounded-full mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  <Shield className="text-primary-600" size={32} />
                </div>
                <p className="text-lg font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Garanti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
