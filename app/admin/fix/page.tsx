'use client';

import { useEffect, useState } from 'react';

export default function FixPage() {
  const [fixed, setFixed] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Auto-fix au chargement
    autoFix();
  }, []);

  const autoFix = () => {
    try {
      setMessage('🔄 Correction en cours...');

      // Lire les données brutes
      const clientsRaw = localStorage.getItem('cpropre_clients');
      const ordersRaw = localStorage.getItem('cpropre_orders');

      setMessage(prev => prev + '\n📦 Lecture des données...');

      // Corriger les clients
      if (clientsRaw) {
        const clients = JSON.parse(clientsRaw);
        setMessage(prev => prev + `\n📦 ${clients.length} client(s) trouvé(s)`);

        const fixed = clients.map((c: any) => ({
          ...c,
          clientType: c.clientType || 'subscription',
          subscription: c.subscription || 'essentiel'
        }));

        localStorage.setItem('cpropre_clients', JSON.stringify(fixed));
        setMessage(prev => prev + '\n✅ Clients corrigés');
      }

      // Corriger les commandes
      if (ordersRaw) {
        const orders = JSON.parse(ordersRaw);
        setMessage(prev => prev + `\n📦 ${orders.length} commande(s) trouvée(s)`);

        const fixed = orders.map((o: any) => ({
          ...o,
          clientType: o.clientType || (o.subscription ? 'subscription' : 'one-time'),
          basketSize: o.basketSize || (
            o.subscription === 'premium' ? '50L' :
            o.subscription === 'confort' ? '30L' : '15L'
          )
        }));

        localStorage.setItem('cpropre_orders', JSON.stringify(fixed));
        setMessage(prev => prev + '\n✅ Commandes corrigées');
      }

      setMessage(prev => prev + '\n\n🎉 TERMINÉ ! Rechargez le dashboard.');
      setFixed(true);
    } catch (e: any) {
      setMessage(prev => prev + `\n\n❌ ERREUR: ${e.message}`);
    }
  };

  const resetAll = () => {
    localStorage.clear();
    setMessage('🗑️ Toutes les données effacées. Vous pouvez recréer vos clients.');
    setFixed(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔧 Réparation automatique</h1>
        
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap mb-6 min-h-40">
          {message || 'Chargement...'}
        </div>

        <div className="flex gap-4">
          <button
            onClick={autoFix}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
          >
            🔄 Relancer la correction
          </button>
          <button
            onClick={resetAll}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold"
          >
            🗑️ Tout effacer
          </button>
        </div>

        {fixed && (
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <p className="text-green-900 font-bold mb-3">✅ Correction terminée !</p>
            <a
              href="/admin"
              className="block text-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              Retour au Dashboard →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
