'use client';

import { Check, Zap, Star, Crown, Package, ShoppingBag, CreditCard, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingToggle() {
  const [activeTab, setActiveTab] = useState<'subscription' | 'alacarte'>('subscription');
  const [prices, setPrices] = useState({
    essentiel: '29.90',
    confort: '49.90',
    premium: '79.90',
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
      name: 'Essentiel',
      icon: Zap,
      price: prices.essentiel,
      capacity: '15L',
      color: 'from-blue-500 to-blue-600',
      description: 'Parfait pour 1-2 personnes',
      features: [
        'Panier 15L',
        'Collecte lundi',
        'Livraison 48h',
        'Pressing standard',
      ],
      popular: false,
      type: 'subscription'
    },
    {
      name: 'Confort',
      icon: Star,
      price: prices.confort,
      capacity: '30L',
      color: 'from-primary-500 to-primary-600',
      description: 'Idéal pour famille',
      features: [
        'Panier 30L',
        'Collecte lundi',
        'Livraison 48h',
        'Pressing premium',
        'Détachage expert',
      ],
      popular: true,
      type: 'subscription'
    },
    {
      name: 'Premium',
      icon: Crown,
      price: prices.premium,
      capacity: '50L',
      color: 'from-amber-500 to-amber-600',
      description: 'Grande famille',
      features: [
        'Panier 50L',
        'Collecte lundi',
        'Livraison 24h',
        'Pressing VIP',
        'Détachage expert',
        'Repassage premium',
      ],
      popular: false,
      type: 'subscription'
    },
  ];

  const alacarteOffers = [
    {
      name: 'Petit',
      icon: Package,
      price: prices.small,
      capacity: '15L',
      color: 'from-blue-500 to-blue-600',
      description: '1-2 personnes',
      features: [
        'Panier 15L',
        'Collecte domicile',
        'Livraison 48h',
        'Pressing standard',
        'Paiement livraison',
      ],
      popular: false,
      type: 'alacarte'
    },
    {
      name: 'Moyen',
      icon: ShoppingBag,
      price: prices.medium,
      capacity: '30L',
      color: 'from-primary-500 to-primary-600',
      description: 'Famille',
      features: [
        'Panier 30L',
        'Collecte domicile',
        'Livraison 48h',
        'Pressing premium',
        'Détachage expert',
        'Paiement livraison',
      ],
      popular: true,
      type: 'alacarte'
    },
    {
      name: 'Grand',
      icon: Package,
      price: prices.large,
      capacity: '50L',
      color: 'from-amber-500 to-amber-600',
      description: 'Grande famille',
      features: [
        'Panier 50L',
        'Collecte domicile',
        'Livraison 24h',
        'Pressing VIP',
        'Détachage expert',
        'Repassage premium',
        'Paiement livraison',
      ],
      popular: false,
      type: 'alacarte'
    },
  ];

  const currentOffers = activeTab === 'subscription' ? subscriptions : alacarteOffers;

  return (
    <section id="tarifs" className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête compact */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold mb-3">
            NOS TARIFS
          </span>
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Formule</span>
          </h2>
          
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Abonnement flexible ou commande ponctuelle
          </p>

          {/* Toggle compact - Pills */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab('subscription')}
              className={`relative px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === 'subscription'
                  ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star size={16} className="inline mr-2" />
              Abonnement
            </button>
            <button
              onClick={() => setActiveTab('alacarte')}
              className={`relative px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === 'alacarte'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCard size={16} className="inline mr-2" />
              À la carte
            </button>
          </div>

          {/* Info supplémentaire compacte */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
            {activeTab === 'subscription' ? (
              <>
                <span className="flex items-center gap-1 font-semibold text-primary-700">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                  Collecte tous les lundis
                </span>
                <span>•</span>
                <span>Sans engagement</span>
                <span>•</span>
                <span className="text-green-600 font-semibold">-10% le 1er mois</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1 font-semibold text-amber-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  Quand vous voulez
                </span>
                <span>•</span>
                <span>Paiement à la livraison</span>
              </>
            )}
          </div>
        </div>

        {/* Grille compacte */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mt-8">
          {currentOffers.map((offer, index) => (
            <div
              key={`${activeTab}-${index}`}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                offer.popular ? 'ring-2 ring-primary-500 md:scale-105' : ''
              }`}
            >
              {/* Badge offre lancement */}
              {activeTab === 'subscription' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl z-50 whitespace-nowrap">
                  Offre de lancement -10%
                </div>
              )}

              {/* Header compact avec gradient */}
              <div className={`bg-gradient-to-r ${offer.color} p-4 md:p-5 text-white relative rounded-t-2xl`}>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <offer.icon size={24} className="drop-shadow-lg md:w-7 md:h-7" />
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 md:py-1 rounded-full">
                    {offer.capacity}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-0.5 md:mb-1">{offer.name}</h3>
                <p className="text-xs opacity-90 mb-2 md:mb-3">{offer.description}</p>
                
                {/* Prix compact */}
                {activeTab === 'subscription' ? (
                  <div className="flex items-end gap-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs md:text-sm line-through opacity-60">{offer.price}€</span>
                        <span className="text-2xl md:text-3xl font-black">
                          {(parseFloat(offer.price) * 0.9).toFixed(2)}€
                        </span>
                      </div>
                      <span className="text-xs opacity-90">/mois · Premier mois*</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-black">{offer.price}€</span>
                    <span className="text-xs opacity-90">/panier</span>
                  </div>
                )}
              </div>

              {/* Contenu compact */}
              <div className="p-3 md:p-4">
                <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 md:gap-2 text-xs text-gray-700">
                      <Check className="text-green-500 flex-shrink-0 mt-0.5" size={12} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedOffer(offer);
                    setShowModal(true);
                  }}
                  className={`w-full py-2 md:py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                    offer.popular
                      ? activeTab === 'subscription'
                        ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:shadow-lg'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
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

      {/* Modal */}
      {showModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${selectedOffer.color} p-6 text-white relative`}>
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>
              <selectedOffer.icon size={40} className="mb-3" />
              <h2 className="text-2xl font-black mb-1">{selectedOffer.name}</h2>
              <p className="text-sm opacity-90 mb-3">{selectedOffer.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black">{selectedOffer.price}€</span>
                <span className="text-lg opacity-90">
                  {selectedOffer.type === 'subscription' ? '/mois' : '/commande'}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold">Panier de {selectedOffer.capacity}</p>
            </div>

            <div className="p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Inclus :</h3>
              <ul className="space-y-2 mb-5">
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
              } border rounded-lg p-3 mb-5`}>
                <p className={`text-xs font-bold mb-1.5 ${
                  selectedOffer.type === 'subscription' ? 'text-green-800' : 'text-amber-800'
                }`}>
                  {selectedOffer.type === 'subscription' ? 'Avantages' : 'À la carte'}
                </p>
                <ul className={`text-xs space-y-1 ${
                  selectedOffer.type === 'subscription' ? 'text-green-700' : 'text-amber-700'
                }`}>
                  {selectedOffer.type === 'subscription' ? (
                    <>
                      <li>Collecte gratuite chaque {collectionDays.join(', ')}</li>
                      <li>Sans engagement</li>
                      <li>Suivi en temps réel</li>
                    </>
                  ) : (
                    <>
                      <li>Paiement à la livraison</li>
                      <li>Sans engagement</li>
                      <li>Commandez quand vous voulez</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold text-sm"
                >
                  Fermer
                </button>
                <Link href="/espace-client/inscription" className="flex-1">
                  <button
                    className={`w-full bg-gradient-to-r ${
                      selectedOffer.type === 'subscription'
                        ? 'from-primary-600 to-blue-600'
                        : 'from-amber-600 to-orange-600'
                    } text-white py-2.5 rounded-lg hover:shadow-lg transition font-bold text-sm`}
                  >
                    S'inscrire →
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
