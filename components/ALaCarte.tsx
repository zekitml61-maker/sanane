'use client';

import { Check, CreditCard, Package, ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ALaCarte() {
  const [prices, setPrices] = useState({
    small: '35',
    medium: '60',
    large: '95'
  });
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Charger les prix depuis les paramètres
    const settings = localStorage.getItem('cpropre_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      if (parsed?.pricing?.oneTime) {
        setPrices({
          small: parsed.pricing.oneTime['15L'].toFixed(0),
          medium: parsed.pricing.oneTime['30L'].toFixed(0),
          large: parsed.pricing.oneTime['50L'].toFixed(0)
        });
      }
    }
  }, []);

  const offers = [
    {
      name: 'Petit Panier',
      capacity: '15L',
      price: prices.small,
      description: 'Parfait pour 1-2 personnes',
      color: 'from-blue-500 to-blue-600',
      icon: Package,
      features: [
        'Panier de 15 litres',
        'Collecte à domicile',
        'Livraison sous 7 jours',
        'Suivi en temps réel',
        'Nettoyage pressing standard',
        'Paiement à la livraison',
      ],
      popular: false,
    },
    {
      name: 'Panier Moyen',
      capacity: '30L',
      price: prices.medium,
      description: 'Idéal pour une famille',
      color: 'from-primary-500 to-primary-600',
      icon: ShoppingBag,
      features: [
        'Panier de 30 litres',
        'Collecte à domicile',
        'Livraison sous 7 jours',
        'Suivi en temps réel',
        'Nettoyage pressing premium',
        'Détachage expert inclus',
        'Paiement à la livraison',
      ],
      popular: true,
    },
    {
      name: 'Grand Panier',
      capacity: '50L',
      price: prices.large,
      description: 'Pour grandes familles',
      color: 'from-amber-500 to-amber-600',
      icon: Package,
      features: [
        'Panier de 50 litres',
        'Collecte à domicile',
        'Livraison sous 7 jours',
        'Suivi en temps réel',
        'Nettoyage pressing VIP',
        'Détachage expert inclus',
        'Repassage premium',
        'Paiement à la livraison',
      ],
      popular: false,
    },
  ];

  return (
    <section id="a-la-carte" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              💳 Service à la carte
            </span>
          </div>
          
          <div className="mb-6 px-4">
            <h2 className="relative inline-block text-3xl sm:text-4xl md:text-5xl font-black">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Offres à la Carte
              </span>
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            <span className="inline-flex items-center gap-2 font-semibold text-amber-700">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
              Commandez quand vous voulez
            </span>
            <span>•</span>
            <span>Paiement à la livraison · Sans engagement</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch px-2">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:-translate-y-3 transition-all duration-300 animate-fadeInUp flex flex-col ${
                offer.popular ? 'ring-4 ring-amber-500 md:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s`, opacity: 0 }}
            >
              {offer.popular && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-6 py-2 rounded-bl-2xl font-semibold">
                  Le plus populaire
                </div>
              )}

              <div className={`bg-gradient-to-r ${offer.color} p-5 sm:p-6 md:p-8 text-white`}>
                <offer.icon size={48} className="mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{offer.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold">{offer.price}€</span>
                  <span className="text-lg sm:text-xl opacity-90">/commande</span>
                </div>
                <p className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold opacity-90">
                  Panier de {offer.capacity}
                </p>
              </div>

              <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <Check className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedOffer(offer);
                    setShowModal(true);
                  }}
                  className={`w-full py-4 rounded-xl font-semibold text-base sm:text-lg transition touch-manipulation active:scale-95 ${
                    offer.popular
                      ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Commander
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal détails offre */}
      {showModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 sm:p-8 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto">
            {/* Header avec couleur de l'offre */}
            <div className={`bg-gradient-to-r ${selectedOffer.color} p-6 text-white text-center relative`}>
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>
              <selectedOffer.icon size={48} className="mx-auto mb-3" />
              <h2 className="text-2xl font-black mb-1">{selectedOffer.name}</h2>
              <p className="text-sm opacity-90 mb-4">{selectedOffer.description}</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-black">{selectedOffer.price}€</span>
                <span className="text-xl opacity-90">/commande</span>
              </div>
              <p className="mt-2 text-lg font-semibold">Panier de {selectedOffer.capacity}</p>
            </div>

            {/* Contenu */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">✨ Ce qui est inclus :</h3>
              <ul className="space-y-2 mb-6">
                {selectedOffer.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-xs text-amber-800 font-semibold mb-2">💳 Service à la carte :</p>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>✓ Paiement à la livraison uniquement</li>
                  <li>✓ Sans engagement ni abonnement</li>
                  <li>✓ Commandez quand vous voulez</li>
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
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl hover:shadow-xl transition font-bold text-sm"
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
