'use client';

import { useState } from 'react';

export default function MigrationPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg]);
    console.log(msg);
  };

  const migrateData = () => {
    setLoading(true);
    setLogs([]);
    setDone(false);
    addLog('🔄 Début de la migration...');
    
    try {
      // Migrer les clients
      const clientsRaw = localStorage.getItem('cpropre_clients');
      if (clientsRaw) {
        const clients = JSON.parse(clientsRaw);
        addLog(`📦 ${clients.length} client(s) trouvé(s)`);
        
        const migratedClients = clients.map((client: any) => {
          // Si le client n'a pas clientType, on le définit par défaut
          if (!client.clientType) {
            addLog(`  Mise à jour client: ${client.name}`);
            return {
              ...client,
              clientType: 'subscription', // Par défaut abonné
              subscription: client.subscription || 'essentiel'
            };
          }
          return client;
        });
        
        localStorage.setItem('cpropre_clients', JSON.stringify(migratedClients));
        addLog('✅ Clients migrés');
      } else {
        addLog('ℹ️ Aucun client à migrer');
      }

      // Migrer les commandes
      const ordersRaw = localStorage.getItem('cpropre_orders');
      if (ordersRaw) {
        const orders = JSON.parse(ordersRaw);
        addLog(`📦 ${orders.length} commande(s) trouvée(s)`);
        
        const migratedOrders = orders.map((order: any) => {
          // Ajouter les nouveaux champs manquants
          if (!order.clientType) {
            addLog(`  Mise à jour commande: ${order.orderNumber}`);
            return {
              ...order,
              clientType: order.subscription ? 'subscription' : 'one-time',
              basketSize: order.subscription === 'essentiel' ? '15L' : 
                          order.subscription === 'confort' ? '30L' : '50L'
            };
          }
          return order;
        });
        
        localStorage.setItem('cpropre_orders', JSON.stringify(migratedOrders));
        addLog('✅ Commandes migrées');
      } else {
        addLog('ℹ️ Aucune commande à migrer');
      }

      addLog('✅ Migration terminée avec succès !');
      setDone(true);
    } catch (e: any) {
      addLog(`❌ Erreur: ${e.message}`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    if (confirm('⚠️ Êtes-vous sûr de vouloir tout effacer ?')) {
      localStorage.removeItem('cpropre_clients');
      localStorage.removeItem('cpropre_orders');
      localStorage.removeItem('cpropre_counter');
      addLog('🗑️ Toutes les données ont été effacées');
      setDone(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🔧 Migration de données</h1>
        <p className="text-gray-600 mb-6">
          Cette page permet de migrer les anciennes données vers le nouveau format avec clientType et basketSize.
        </p>

        <div className="flex gap-4">
          <button
            onClick={migrateData}
            disabled={loading}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Migration en cours...' : 'Lancer la migration'}
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Effacer toutes les données
          </button>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="bg-gray-900 text-green-400 rounded-xl shadow-sm p-4 font-mono text-sm">
          <strong className="text-white block mb-2">LOGS :</strong>
          {logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          ))}
        </div>
      )}

      {done && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-900 font-bold mb-2">✅ Migration terminée !</p>
          <p className="text-green-800 text-sm">
            Vous pouvez maintenant retourner sur le dashboard admin.
          </p>
          <a
            href="/admin"
            className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Retour au dashboard
          </a>
        </div>
      )}
    </div>
  );
}
