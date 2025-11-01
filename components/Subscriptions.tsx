'use client';

import { Check, Zap, Star, Crown, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Subscriptions() {
  const [prices, setPrices] = useState({
    essentiel: '29.90',
    confort: '49.90',
    premium: '79.90'
  });
  const [collectionDays, setCollectionDays] = useState<string[]>(['Lundi']);
  const [selectedFormule, setSelectedFormule] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Charger les paramètres
    const settings = localStorage.getItem('cpropre_settings');
    console.log('📦 Settings bruts:', settings);
    if (settings) {
      const parsed = JSON.parse(settings);
      console.log('📦 Settings parsés:', parsed);
      console.log('📅 Jours de collecte:', parsed?.collectionDays);
      
      if (parsed?.pricing?.subscription) {
        setPrices({
          essentiel: parsed.pricing.subscription.essentiel.toFixed(2),
          confort: parsed.pricing.subscription.confort.toFixed(2),
          premium: parsed.pricing.subscription.premium.toFixed(2)
        });
      }
      if (parsed?.collectionDays && parsed.collectionDays.length > 0) {
        console.log('✅ Mise à jour jours:', parsed.collectionDays);
        setCollectionDays(parsed.collectionDays);
      }
    }
  }, []);

  const collectionText = collectionDays.length === 1 
    ? `Collecte chaque ${collectionDays[0].toLowerCase()}` 
    : collectionDays.length > 1 
      ? `Collecte ${collectionDays.length}x par semaine`
      : 'Collecte sur demande';

  const subscriptions = [
  {
    name: 'Formule Essentiel',
    icon: Zap,
    price: prices?.essentiel || '29.90',
    capacity: '15L',
    color: 'from-blue-500 to-blue-600',
    features: [
      'Panier de 15 litres',
      'Collecte chaque lundi',
      'Livraison sous 48h',
      'Nettoyage pressing standard',
      'Service client prioritaire',
    ],
    popular: false,
  },
  {
    name: 'Formule Confort',
    icon: Star,
    price: prices?.confort || '49.90',
    capacity: '30L',
    color: 'from-primary-500 to-primary-600',
    features: [
      'Panier de 30 litres',
      'Collecte chaque lundi',
      'Livraison sous 48h',
      'Nettoyage pressing premium',
      'Détachage expert inclus',
      'Service client prioritaire',
      'Emballage écologique',
    ],
    popular: true,
  },
  {
    name: 'Formule Premium',
    icon: Crown,
    price: prices?.premium || '79.90',
    capacity: '50L',
    color: 'from-amber-500 to-amber-600',
    features: [
      'Panier de 50 litres',
      'Collecte chaque lundi',
      'Livraison express 24h',
      'Nettoyage pressing VIP',
      'Détachage expert inclus',
      'Repassage premium',
      'Traitement tissus délicats',
      'Service client dédié 24/7',
      'Emballage luxe',
    ],
    popular: false,
  },
];

  return (
    <section id="abonnements" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête avec effet lumineux */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Offres Exclusives
            </span>
          </div>
          
          <div className="mb-6 px-4">
            <h2 className="relative inline-block text-3xl sm:text-4xl md:text-5xl font-black">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700 ">
                Nos Formules d'Abonnement
              </span>
              {/* Effet de lueur qui bouge */}
              <span className="absolute -inset-2 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 opacity-0 blur-2xl animate-glow-move"></span>
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            <span className="inline-flex items-center gap-2 font-semibold text-primary-700 ">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-ping"></span>
              Collecte tous les lundis
            </span>
            <span>•</span>
            <span>Choisissez la capacité adaptée à vos besoins</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch px-2">
          {subscriptions.map((sub, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:-translate-y-3 transition-all duration-300 animate-fadeInUp flex flex-col ${
                sub.popular ? 'ring-4 ring-primary-500 md:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s`, opacity: 0 }}
            >
              {sub.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-6 py-2 rounded-bl-2xl font-semibold">
                  Le plus populaire
                </div>
              )}

              <div className={`bg-gradient-to-r ${sub.color} p-5 sm:p-6 md:p-8 text-white`}>
                <div className="relative inline-block mb-2 sm:mb-3 md:mb-4">
                  {/* Animations spécifiques par formule */}
                  {index === 0 && (
                    // Essentiel - Simple bounce
                    <>
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
                      <sub.icon 
                        size={48} 
                        className="relative z-10 animate-bounce-slow hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-lg" 
                      />
                    </>
                  )}
                  {index === 1 && (
                    // Confort - Float + pulse
                    <>
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      <sub.icon 
                        size={48} 
                        className="relative z-10 animate-float hover:scale-110 hover:rotate-6 transition-all duration-400 cursor-pointer drop-shadow-lg" 
                      />
                    </>
                  )}
                  {index === 2 && (
                    // Premium - Glow + spin + scale
                    <>
                      <div className="absolute -inset-2 bg-yellow-300/30 rounded-full animate-ping"></div>
                      <div className="absolute -inset-1 bg-white/30 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full opacity-40 animate-spin-slow blur-sm"></div>
                      <sub.icon 
                        size={48} 
                        className="relative z-10 animate-float-premium hover:scale-125 hover:rotate-12 transition-all duration-500 cursor-pointer drop-shadow-2xl" 
                        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
                      />
                    </>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{sub.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold">{sub.price}€</span>
                  <span className="text-lg sm:text-xl opacity-90">/mois</span>
                </div>
                <p className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold opacity-90">
                  Panier de {sub.capacity}
                </p>
              </div>

              <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  {sub.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <Check className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedFormule(sub);
                    setShowModal(true);
                  }}
                  className={`w-full py-4 rounded-xl font-semibold text-base sm:text-lg transition touch-manipulation active:scale-95 ${
                    sub.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Choisir cette formule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal détails formule */}
      {showModal && selectedFormule && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 sm:p-8 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto">
            {/* Header avec couleur de la formule */}
            <div className={`bg-gradient-to-r ${selectedFormule.color} p-6 text-white text-center relative`}>
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>
              <selectedFormule.icon size={48} className="mx-auto mb-3" />
              <h2 className="text-2xl font-black mb-1">{selectedFormule.name}</h2>
              <p className="text-sm opacity-90 mb-4">{selectedFormule.description}</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-black">{selectedFormule.price}€</span>
                <span className="text-xl opacity-90">/mois</span>
              </div>
              <p className="mt-2 text-lg font-semibold">Panier de {selectedFormule.capacity}</p>
            </div>

            {/* Contenu */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Ce qui est inclus :</h3>
              <ul className="space-y-2 mb-6">
                {selectedFormule.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                <p className="text-xs text-green-800 font-semibold mb-2">Avantages :</p>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>Collecte gratuite chaque {collectionDays.join(', ')}</li>
                  <li>Sans engagement</li>
                  <li>Suivi en temps réel</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition font-semibold text-sm"
                >
                  Fermer
                </button>
                <Link href="/espace-client/inscription" className="flex-1">
                  <button
                    className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-3 rounded-xl hover:shadow-xl transition font-bold text-sm"
                  >
                    S'inscrire maintenant →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
