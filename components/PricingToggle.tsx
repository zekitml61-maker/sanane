'use client';

import { Check, Zap, Star, Crown, Package, ShoppingBag, CreditCard, X, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingToggle() {
  const [activeTab, setActiveTab] = useState<'subscription' | 'alacarte'>('subscription');
  const [prices, setPrices] = useState({
    // Abonnements
    essentiel: '29.90',
    confort: '49.90',
    premium: '79.90',
    // À la carte
    small: '35',
    medium: '60',
    large: '95'
  });
  const [collectionDays, setCollectionDays] = useState<string[]>(['Lundi']);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const settings = localStorage.getItem('cpropre_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      
      if (parsed?.pricing?.subscription) {
        setPrices(prev => ({
          ...prev,
          essentiel: parsed.pricing.subscription.essentiel.toFixed(2),
          confort: parsed.pricing.subscription.confort.toFixed(2),
          premium: parsed.pricing.subscription.premium.toFixed(2)
        }));
      }
      
      if (parsed?.pricing?.oneTime) {
        setPrices(prev => ({
          ...prev,
          small: parsed.pricing.oneTime['15L'].toFixed(0),
          medium: parsed.pricing.oneTime['30L'].toFixed(0),
          large: parsed.pricing.oneTime['50L'].toFixed(0)
        }));
      }
      
      if (parsed?.collectionDays && parsed.collectionDays.length > 0) {
        setCollectionDays(parsed.collectionDays);
      }
    }
  }, []);

  const subscriptions = [
    {
      name: 'Formule Essentiel',
      icon: Zap,
      price: prices.essentiel,
      capacity: '15L',
      color: 'from-blue-500 to-blue-600',
      description: 'Parfait pour 1-2 personnes',
      features: [
        'Panier de 15 litres',
        'Collecte chaque lundi',
        'Livraison sous 48h',
        'Suivi QR Code en temps réel',
        'Nettoyage pressing standard',
        'Service client prioritaire',
      ],
      popular: false,
      type: 'subscription'
    },
    {
      name: 'Formule Confort',
      icon: Star,
      price: prices.confort,
      capacity: '30L',
      color: 'from-primary-500 to-primary-600',
      description: 'Idéal pour une famille',
      features: [
        'Panier de 30 litres',
        'Collecte chaque lundi',
        'Livraison sous 48h',
        'Suivi QR Code en temps réel',
        'Nettoyage pressing premium',
        'Détachage expert inclus',
        'Service client prioritaire',
      ],
      popular: true,
      type: 'subscription'
    },
    {
      name: 'Formule Premium',
      icon: Crown,
      price: prices.premium,
      capacity: '50L',
      color: 'from-amber-500 to-amber-600',
      description: 'Pour les grandes familles',
      features: [
        'Panier de 50 litres',
        'Collecte chaque lundi',
        'Livraison express 24h',
        'Suivi QR Code en temps réel',
        'Nettoyage pressing VIP',
        'Détachage expert inclus',
        'Repassage premium',
        'Traitement tissus délicats',
        'Service client dédié 24/7',
      ],
      popular: false,
      type: 'subscription'
    },
  ];

  const alacarteOffers = [
    {
      name: 'Petit Panier',
      icon: Package,
      price: prices.small,
      capacity: '15L',
      color: 'from-blue-500 to-blue-600',
      description: 'Parfait pour 1-2 personnes',
      features: [
        'Panier de 15 litres',
        'Collecte à domicile',
        'Livraison sous 48h',
        'Suivi en temps réel',
        'Nettoyage pressing standard',
        'Paiement à la livraison',
      ],
      popular: false,
      type: 'alacarte'
    },
    {
      name: 'Panier Moyen',
      icon: ShoppingBag,
      price: prices.medium,
      capacity: '30L',
      color: 'from-primary-500 to-primary-600',
      description: 'Idéal pour une famille',
      features: [
        'Panier de 30 litres',
        'Collecte à domicile',
        'Livraison sous 48h',
        'Suivi en temps réel',
        'Nettoyage pressing premium',
        'Détachage expert inclus',
        'Paiement à la livraison',
      ],
      popular: true,
      type: 'alacarte'
    },
    {
      name: 'Grand Panier',
      icon: Package,
      price: prices.large,
      capacity: '50L',
      color: 'from-amber-500 to-amber-600',
      description: 'Pour grandes familles',
      features: [
        'Panier de 50 litres',
        'Collecte à domicile',
        'Livraison express 24h',
        'Suivi en temps réel',
        'Nettoyage pressing VIP',
        'Détachage expert inclus',
        'Repassage premium',
        'Paiement à la livraison',
      ],
      popular: false,
      type: 'alacarte'
    },
  ];

  const currentOffers = activeTab === 'subscription' ? subscriptions : alacarteOffers;

  return (
    <section id="tarifs" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Nos Offres
            </span>
          </div>
          
          <div className="mb-6 px-4">
            <h2 className="relative inline-block text-3xl sm:text-4xl md:text-5xl font-black">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
                Choisissez votre Formule
              </span>
            </h2>
          </div>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Abonnement mensuel ou service à la carte - Vous décidez !
          </p>

          {/* Toggle Abonnement / À la carte - Design premium */}
          <div className="relative max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <button
                onClick={() => setActiveTab('subscription')}
                className={`group relative p-8 rounded-2xl transition-all duration-500 ${
                  activeTab === 'subscription'
                    ? 'bg-gradient-to-br from-primary-600 via-primary-500 to-blue-600 shadow-2xl scale-105 ring-4 ring-primary-300'
                    : 'bg-white shadow-lg hover:shadow-xl hover:scale-102 border-2 border-gray-200'
                }`}
              >
                {/* Effet de fond animé */}
                {activeTab === 'subscription' && (
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 rounded-2xl"></div>
                )}
                
                <div className="relative z-10">
                  {/* Badge actif */}
                  {activeTab === 'subscription' && (
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      ✓ Actif
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 rounded-2xl ${
                      activeTab === 'subscription' ? 'bg-white/20' : 'bg-primary-100'
                    }`}>
                      <Star size={32} className={activeTab === 'subscription' ? 'text-white' : 'text-primary-600'} />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-xl font-black mb-1 ${
                        activeTab === 'subscription' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Abonnement
                      </h3>
                      <p className={`text-sm ${
                        activeTab === 'subscription' ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        Mensuel · Sans engagement
                      </p>
                    </div>
                  </div>
                  
                  <div className={`mb-4 ${activeTab === 'subscription' ? 'text-white' : 'text-gray-900'}`}>
                    <span className="text-4xl font-black">Dès {prices.essentiel}€</span>
                    <span className="text-lg opacity-80">/mois</span>
                  </div>
                  
                  <div className={`space-y-2 text-sm ${
                    activeTab === 'subscription' ? 'text-white/90' : 'text-gray-700'
                  }`}>
                    <p className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Collecte gratuite chaque semaine
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Économies sur le long terme
                    </p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('alacarte')}
                className={`group relative p-8 rounded-2xl transition-all duration-500 ${
                  activeTab === 'alacarte'
                    ? 'bg-gradient-to-br from-amber-600 via-orange-500 to-orange-600 shadow-2xl scale-105 ring-4 ring-amber-300'
                    : 'bg-white shadow-lg hover:shadow-xl hover:scale-102 border-2 border-gray-200'
                }`}
              >
                {/* Effet de fond animé */}
                {activeTab === 'alacarte' && (
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 rounded-2xl"></div>
                )}
                
                <div className="relative z-10">
                  {/* Badge actif */}
                  {activeTab === 'alacarte' && (
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      ✓ Actif
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 rounded-2xl ${
                      activeTab === 'alacarte' ? 'bg-white/20' : 'bg-amber-100'
                    }`}>
                      <CreditCard size={32} className={activeTab === 'alacarte' ? 'text-white' : 'text-amber-600'} />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-xl font-black mb-1 ${
                        activeTab === 'alacarte' ? 'text-white' : 'text-gray-900'
                      }`}>
                        À la carte
                      </h3>
                      <p className={`text-sm ${
                        activeTab === 'alacarte' ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        Ponctuel · Sans abonnement
                      </p>
                    </div>
                  </div>
                  
                  <div className={`mb-4 ${activeTab === 'alacarte' ? 'text-white' : 'text-gray-900'}`}>
                    <span className="text-4xl font-black">Dès {prices.small}€</span>
                    <span className="text-lg opacity-80">/panier</span>
                  </div>
                  
                  <div className={`space-y-2 text-sm ${
                    activeTab === 'alacarte' ? 'text-white/90' : 'text-gray-700'
                  }`}>
                    <p className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Aucun engagement requis
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Idéal pour usage occasionnel
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Sous-titre dynamique */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg text-gray-600">
            {activeTab === 'subscription' ? (
              <>
                <span className="inline-flex items-center gap-2 font-semibold text-primary-700">
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-ping"></span>
                  Collecte tous les lundis
                </span>
                <span>•</span>
                <span>Sans engagement</span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-2 font-semibold text-amber-700">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                  Commandez quand vous voulez
                </span>
                <span>•</span>
                <span>Paiement à la livraison</span>
              </>
            )}
          </div>
        </div>

        {/* Grille des offres avec animation - Mobile optimisé */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {currentOffers.map((offer, index) => (
            <div
              key={`${activeTab}-${index}`}
              className={`relative bg-white rounded-[2rem] shadow-xl hover:shadow-2xl md:hover:-translate-y-3 transition-all duration-300 animate-fadeInUp flex flex-col ${
                offer.popular ? 'ring-2 md:ring-4 ring-primary-500 md:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, overflow: 'visible' }}
            >
              {offer.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1.5 md:px-6 md:py-2 rounded-tr-[2rem] rounded-bl-2xl font-semibold text-xs md:text-sm">
                  ⭐ Populaire
                </div>
              )}

              <div className={`bg-gradient-to-r ${offer.color} p-6 text-white relative overflow-visible rounded-t-[2rem]`}>
                {/* Badge offre lancement sur chaque carte abonnement */}
                {activeTab === 'subscription' && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-black shadow-2xl z-20 overflow-hidden">
                    <span className="relative z-10">-10% Offre lancement</span>
                    {/* Effet K2000 */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-k2000" style={{ filter: 'blur(2px)' }}></span>
                  </div>
                )}
                
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-ping"></div>
                  <offer.icon size={40} className="relative md:w-12 md:h-12 drop-shadow-2xl hover:scale-125 hover:rotate-12 transition-all duration-700 ease-out" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2">{offer.name}</h3>
                
                {/* Prix avec barré pour abonnements */}
                {activeTab === 'subscription' ? (
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl md:text-3xl line-through opacity-60">{offer.price}€*</span>
                      <span className="text-3xl md:text-5xl font-bold">
                        {(parseFloat(offer.price) * 0.9).toFixed(2)}€
                      </span>
                    </div>
                    <span className="text-sm md:text-xl opacity-90">/mois</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl md:text-5xl font-bold">{offer.price}€</span>
                    <span className="text-sm md:text-xl opacity-90">/panier</span>
                  </div>
                )}
                
                <p className="mt-2 text-base md:text-xl font-semibold opacity-90">
                  Panier {offer.capacity}
                </p>
                
                {/* Note astérisque */}
                {activeTab === 'subscription' && (
                  <p className="mt-3 text-xs italic opacity-80">
                    * Le premier mois
                  </p>
                )}
              </div>

              <div className="p-5 md:p-8 flex flex-col flex-grow">
                <ul className="space-y-2.5 md:space-y-4 mb-6 flex-grow">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedOffer(offer);
                    setShowModal(true);
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm md:text-base transition touch-manipulation active:scale-95 ${
                    offer.popular
                      ? activeTab === 'subscription'
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                        : 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {activeTab === 'subscription' ? 'Choisir' : 'Commander'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal détails */}
      {showModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 sm:p-8 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto">
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
                <span className="text-xl opacity-90">
                  {selectedOffer.type === 'subscription' ? '/mois' : '/commande'}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold">Panier de {selectedOffer.capacity}</p>
            </div>

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

              <div className={`bg-gradient-to-r ${
                selectedOffer.type === 'subscription' 
                  ? 'from-green-50 to-emerald-50 border-green-200' 
                  : 'from-amber-50 to-orange-50 border-amber-200'
              } border-2 rounded-xl p-4 mb-6`}>
                <p className={`text-xs font-semibold mb-2 ${
                  selectedOffer.type === 'subscription' ? 'text-green-800' : 'text-amber-800'
                }`}>
                  {selectedOffer.type === 'subscription' ? '🎉 Avantages :' : '💳 Service à la carte :'}
                </p>
                <ul className={`text-xs space-y-1 ${
                  selectedOffer.type === 'subscription' ? 'text-green-700' : 'text-amber-700'
                }`}>
                  {selectedOffer.type === 'subscription' ? (
                    <>
                      <li>✓ Collecte gratuite chaque {collectionDays.join(', ')}</li>
                      <li>✓ Sans engagement</li>
                      <li>✓ Suivi en temps réel</li>
                    </>
                  ) : (
                    <>
                      <li>✓ Paiement à la livraison uniquement</li>
                      <li>✓ Sans engagement ni abonnement</li>
                      <li>✓ Commandez quand vous voulez</li>
                    </>
                  )}
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
                    className={`w-full bg-gradient-to-r ${
                      selectedOffer.type === 'subscription'
                        ? 'from-primary-600 to-blue-600'
                        : 'from-amber-600 to-orange-600'
                    } text-white py-3 rounded-xl hover:shadow-xl transition font-bold text-sm`}
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
