'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Search, CheckCircle, Clock, Package, Truck, Crown } from 'lucide-react';

const mockOrders = {
  'CP2025001': {
    id: 'CP2025001',
    status: 'completed',
    customer: 'Jean Dupont',
    collected: '2025-10-28',
    delivered: '2025-10-30',
    items: 5,
    formula: 'Confort',
  },
  'CP2025002': {
    id: 'CP2025002',
    status: 'in-progress',
    customer: 'Marie Martin',
    collected: '2025-10-30',
    estimated: '2025-11-01',
    items: 8,
    formula: 'Premium',
  },
  'CP2025003': {
    id: 'CP2025003',
    status: 'collected',
    customer: 'Pierre Durand',
    collected: '2025-10-31',
    estimated: '2025-11-02',
    items: 3,
    formula: 'Essentiel',
  },
};

const statusConfig = {
  collected: {
    label: 'Collecté',
    icon: Package,
    color: 'text-blue-600 bg-blue-50',
    description: 'Votre linge a été collecté et est en route vers notre pressing',
  },
  'in-progress': {
    label: 'En cours de traitement',
    icon: Clock,
    color: 'text-orange-600 bg-orange-50',
    description: 'Nos experts s\'occupent actuellement de votre linge',
  },
  ready: {
    label: 'Prêt pour livraison',
    icon: Truck,
    color: 'text-purple-600 bg-purple-50',
    description: 'Votre linge est prêt et sera livré bientôt',
  },
  completed: {
    label: 'Livré',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-50',
    description: 'Votre commande a été livrée avec succès',
  },
};

export default function QRCodeTracking() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState('');

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (trackingCode.trim()) {
      // Rediriger vers la page de suivi avec le code client
      router.push(`/suivi/${trackingCode.trim()}`);
    }
  };

  return (
    <section id="suivi" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <QrCode className="text-primary-600" size={40} />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Suivez votre commande en temps réel
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scannez le QR code sur votre panier ou entrez votre numéro de suivi
          </p>
        </div>

        <form onSubmit={handleTrack} className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Entrez votre code client (ex: CLIENT-XXXXXXXX)"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-lg font-mono"
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Suivre
            </button>
          </div>

          <div className="text-center py-8">
            <QrCode className="mx-auto text-primary-300 mb-4" size={80} />
            <p className="text-gray-600 text-lg mb-2">
              Entrez votre code client pour suivre vos commandes en temps réel
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Crown 
                size={18} 
                className="animate-pulse drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" 
                fill="white"
                stroke="#FFD700"
                strokeWidth={1.5}
              />
              Le code client se trouve dans votre espace personnel
            </p>
          </div>
        </form>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Package className="mx-auto text-primary-600 mb-3" size={32} />
            <h4 className="font-bold text-gray-900 mb-2">Collecte</h4>
            <p className="text-sm text-gray-600">Tous les lundis</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Clock className="mx-auto text-primary-600 mb-3" size={32} />
            <h4 className="font-bold text-gray-900 mb-2">Traitement</h4>
            <p className="text-sm text-gray-600">24-48h selon formule</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <CheckCircle className="mx-auto text-primary-600 mb-3" size={32} />
            <h4 className="font-bold text-gray-900 mb-2">Livraison</h4>
            <p className="text-sm text-gray-600">À votre porte</p>
          </div>
        </div>
      </div>
    </section>
  );
}
