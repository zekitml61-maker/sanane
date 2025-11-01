'use client';

import { useEffect, useRef, useState } from 'react';
import { Package, Shirt, Truck, Sparkles, Bell, Trophy, LucideIcon } from 'lucide-react';

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  color: string;
  badgeColor: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Package,
    title: 'Livraison de votre panier',
    description: 'Nous livrons gratuitement votre panier C\'Propre directement à domicile. Prêt à l\'emploi !',
    badge: 'Livraison offerte',
    color: 'from-primary-500 to-primary-600',
    badgeColor: 'bg-primary-100 text-primary-700',
  },
  {
    number: 2,
    icon: Shirt,
    title: 'Vous remplissez le panier',
    description: 'Déposez votre linge sale dans le panier à votre rythme. Simple et pratique !',
    badge: 'À votre rythme',
    color: 'from-blue-500 to-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    number: 3,
    icon: Truck,
    title: 'Collecte tous les lundis',
    description: 'Chaque lundi, nos livreurs récupèrent votre panier rempli. Vous n\'avez rien à faire !',
    badge: 'Tous les lundis',
    color: 'from-primary-500 to-primary-600',
    badgeColor: 'bg-primary-100 text-primary-700',
  },
  {
    number: 4,
    icon: Sparkles,
    title: 'Traitement professionnel',
    description: 'Lavage, séchage, détachage, repassage et pliage impeccable. Tout est fait pour vous !',
    badge: 'Service complet',
    color: 'from-blue-500 to-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    number: 5,
    icon: Bell,
    title: 'Livraison avec suivi',
    description: 'Réception de votre panier avec notification + photo dans votre espace client. Tranquillité garantie !',
    badge: 'Suivi en temps réel',
    color: 'from-primary-500 to-primary-600',
    badgeColor: 'bg-primary-100 text-primary-700',
  },
  {
    number: 6,
    icon: Trophy,
    title: 'Vous avez tout gagné !',
    description: 'Économie de temps, économie d\'argent, et zéro chaussettes mystérieusement disparues !',
    badge: 'Mission accomplie',
    color: 'from-blue-500 to-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
];

export default function HowItWorksNew() {
  const [scrollProgress, setScrollProgress] = useState<{ [key: number]: number }>({});
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [connectionProgress, setConnectionProgress] = useState<{ [key: number]: number }>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const cardTop = rect.top;
        const cardBottom = rect.bottom;
        
        let progress = 0;
        
        // La carte est visible dans la fenêtre
        if (cardBottom > 0 && cardTop < windowHeight) {
          // La carte entre dans la vue depuis le bas
          // Commence à 0% quand le bas de la carte touche le bas de l'écran
          // Atteint 100% quand le haut de la carte touche le haut de l'écran
          
          // Distance totale que la carte parcourt
          const totalDistance = windowHeight;
          
          // Distance parcourue depuis l'entrée dans la vue
          const traveledDistance = windowHeight - cardTop;
          
          // Calcul du pourcentage (0% à 100%)
          progress = Math.max(0, Math.min(100, (traveledDistance / totalDistance) * 100));
          
          // Détecter quand atteint 100% pour la première fois
          if (progress >= 99.5 && !completedCards.has(index)) {
            setCompletedCards(prev => new Set([...prev, index]));
            // Retirer après l'animation
            setTimeout(() => {
              setCompletedCards(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }, 600);
          }
        } else {
          // Carte hors de vue → reset progress à 0
          progress = 0;
          // Retirer des cartes complétées si elle sort de la vue
          if (completedCards.has(index)) {
            setCompletedCards(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        }
        
        setScrollProgress(prev => ({ ...prev, [index]: progress }));
        
        // Calculer le progress de connexion vers la carte suivante
        if (index < cardRefs.current.length - 1) {
          // La ligne de connexion commence à se dessiner quand la carte actuelle atteint 80%
          const connectionProg = Math.max(0, Math.min(100, (progress - 80) * 5));
          setConnectionProgress(prev => ({ ...prev, [index]: connectionProg }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="comment-ca-marche" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Simple et efficace
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            Comment ça marche<span className="text-2xl md:text-4xl"> ?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            6 étapes simples pour un linge impeccable, sans effort
          </p>
        </div>

        {/* Grille des étapes avec SVG serpent */}
        <div className="relative">
          {/* SVG Animation serpent - Hidden on mobile */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
            style={{ zIndex: 0 }}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            
            {/* Ligne serpent animée */}
            <path
              d="M 200 150 L 600 150 L 1000 150 L 1000 400 L 600 400 L 200 400 L 200 650"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              className="animate-drawLine"
            />
          </svg>



          {/* Grille 3x2 */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step: Step, index: number) => {
              const Icon = step.icon;
              const progress = scrollProgress[index] || 0;
              const isCompleted = completedCards.has(index);
              
              return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                data-index={index}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:shadow-2xl overflow-visible"
                style={{ 
                  transform: progress > 10 ? 'scale(1)' : 'scale(0.9)',
                  opacity: progress > 10 ? 1 : 0.3,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                }}
              >
                {/* SVG bordure qui se remplit - Mobile uniquement */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none md:hidden" 
                  style={{ 
                    borderRadius: '1.5rem',
                    overflow: 'visible'
                  }}
                >
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="24"
                    ry="24"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="3"
                    strokeDasharray="2000"
                    strokeDashoffset={2000 - (progress / 100) * 2000}
                    style={{ 
                      transition: 'stroke-dashoffset 0.1s ease-out'
                    }}
                    className={isCompleted ? 'animate-flash-border' : ''}
                  />
                  
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(14, 165, 233)" />
                      <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Ligne de connexion vers carte suivante - Mobile uniquement */}
                {index < steps.length - 1 && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full md:hidden pointer-events-none">
                    <div 
                      style={{
                        width: '1px',
                        height: `${(connectionProgress[index] || 0) * 0.8}px`,
                        maxHeight: '80px',
                        background: 'linear-gradient(to bottom, rgb(14, 165, 233), rgb(59, 130, 246), rgb(96, 165, 250))',
                        transition: 'height 0.15s ease-out'
                      }}
                    ></div>
                  </div>
                )}
                
                {/* Badge */}
                <div className={`inline-block px-3 py-1 ${step.badgeColor} rounded-full text-xs font-bold mb-4`}>
                  {step.badge}
                </div>

                {/* Numéro de l'étape */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.number}
                </div>

                {/* Icône */}
                <div className="mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    <Icon className="text-white" size={36} />
                  </div>
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              );
            })}
          </div>
        </div>

        {/* CTA en bas */}
        <div className="text-center mt-16">
          <a
            href="#tarifs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-primary-500/50"
          >
            <span>Commencer maintenant</span>
          </a>
        </div>
      </div>
    </section>
  );
}
