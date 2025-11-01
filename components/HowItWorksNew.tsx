'use client';

import { Package, ShirtFolded, Truck, Sparkles, Bell, Trophy, LucideIcon } from 'lucide-react';

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
    title: '🏠 Livraison de votre panier',
    description: 'Nous livrons gratuitement votre panier C\'Propre directement à domicile. Prêt à l\'emploi !',
    badge: 'Livraison offerte',
    color: 'from-blue-400 to-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    number: 2,
    icon: ShirtFolded,
    title: '👕 Vous remplissez le panier',
    description: 'Déposez votre linge sale dans le panier à votre rythme. Simple et pratique !',
    badge: 'À votre rythme',
    color: 'from-green-400 to-green-600',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    number: 3,
    icon: Truck,
    title: '🚚 Collecte tous les lundis',
    description: 'Chaque lundi, nos livreurs récupèrent votre panier rempli. Vous n\'avez rien à faire !',
    badge: 'Tous les lundis',
    color: 'from-orange-400 to-orange-600',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    number: 4,
    icon: Sparkles,
    title: '✨ Traitement professionnel',
    description: 'Lavage, séchage, détachage, repassage et pliage impeccable. Tout est fait pour vous !',
    badge: 'Service complet',
    color: 'from-purple-400 to-purple-600',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    number: 5,
    icon: Bell,
    title: '📦 Livraison avec suivi',
    description: 'Réception de votre panier avec notification + photo dans votre espace client. Tranquillité garantie !',
    badge: 'Suivi en temps réel',
    color: 'from-indigo-400 to-indigo-600',
    badgeColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    number: 6,
    icon: Trophy,
    title: '🎉 Vous avez tout gagné !',
    description: 'Économie de temps ⏰, économie d\'argent 💰, et zéro chaussettes mystérieusement disparues ! 🧦✨',
    badge: 'Mission accomplie',
    color: 'from-yellow-400 to-yellow-600',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
];

export default function HowItWorksNew() {
  return (
    <section id="comment-ca-marche" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Simple et efficace
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Comment ça marche ?
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
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="20%" stopColor="#34d399" />
                <stop offset="40%" stopColor="#fb923c" />
                <stop offset="60%" stopColor="#a78bfa" />
                <stop offset="80%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            
            {/* Ligne serpent animée */}
            <path
              d="M 200 150 L 600 150 L 1000 150 L 1000 400 L 600 400 L 200 400 L 200 650"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              className="animate-drawLine"
            />
            
            {/* Flèches directionnelles */}
            <polygon points="595,145 605,150 595,155" fill="#34d399" className="animate-fadeIn" style={{ animationDelay: '1s' }} />
            <polygon points="995,395 1005,400 995,405" fill="#fb923c" className="animate-fadeIn" style={{ animationDelay: '2s' }} />
            <polygon points="605,405 595,400 605,395" fill="#a78bfa" className="animate-fadeIn" style={{ animationDelay: '3s' }} />
            <polygon points="205,645 200,635 195,645" fill="#fbbf24" className="animate-fadeIn" style={{ animationDelay: '4s' }} />
          </svg>

          {/* Grille 3x2 */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step: Step, index: number) => {
              const Icon = step.icon;
              return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-500 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
              >
                {/* Badge */}
                <div className={`inline-block px-3 py-1 ${step.badgeColor} rounded-full text-xs font-bold mb-4`}>
                  {step.badge}
                </div>

                {/* Numéro de l'étape */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.number}
                </div>

                {/* Icône */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    <Icon className="text-white" size={36} />
                  </div>
                  {/* Point lumineux */}
                  <div className={`absolute top-0 right-0 w-3 h-3 bg-gradient-to-br ${step.color} rounded-full animate-ping`}></div>
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Ligne décorative */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${step.color} group-hover:w-full transition-all duration-700`}></div>
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
            <span>🚀</span>
            <span>Commencer maintenant</span>
          </a>
        </div>
      </div>
    </section>
  );
}
