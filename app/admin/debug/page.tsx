'use client';

import { useState } from 'react';
import { getAllClients, getAllOrders, markOrderCollected, getReadyOrderByClientId } from '@/lib/database';

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [clientCode, setClientCode] = useState('');

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const testMarkCollected = () => {
    setLogs([]);
    addLog('🔍 Démarrage du test...');

    // 1. Récupérer tous les clients
    const clients = getAllClients();
    addLog(`✅ ${clients.length} clients trouvés`);

    if (clients.length === 0) {
      addLog('❌ Aucun client dans la base');
      return;
    }

    // 2. Prendre le premier client abonné
    const subscriber = clients.find(c => c.clientType === 'subscription');
    
    if (!subscriber) {
      addLog('❌ Aucun client abonné trouvé');
      return;
    }

    addLog(`👤 Client testé: ${subscriber.name} (${subscriber.qrCode})`);

    // 3. Récupérer ses commandes
    const orders = getAllOrders().filter(o => o.clientId === subscriber.id);
    addLog(`📦 ${orders.length} commande(s) pour ce client`);

    if (orders.length === 0) {
      addLog('❌ Aucune commande pour ce client');
      return;
    }

    // 4. Prendre la première commande
    const order = orders[0];
    addLog(`📋 Commande testée: ${order.orderNumber}`);
    addLog(`   - ID: ${order.id}`);
    addLog(`   - Status AVANT: ${order.status}`);
    addLog(`   - readyForCollection: ${order.readyForCollection}`);

    // 5. Tester markOrderCollected
    addLog('🚚 Appel de markOrderCollected...');
    const result = markOrderCollected(order.id);

    if (result) {
      addLog(`✅ markOrderCollected a réussi !`);
      addLog(`   - Status APRÈS: ${result.status}`);
      addLog(`   - readyForCollection: ${result.readyForCollection}`);
      addLog(`   - Historique: ${result.history.length} entrée(s)`);
      
      // 6. Vérifier dans localStorage
      const ordersInStorage = getAllOrders();
      const updatedOrder = ordersInStorage.find(o => o.id === order.id);
      
      if (updatedOrder) {
        addLog(`✅ Commande vérifiée dans localStorage:`);
        addLog(`   - Status dans storage: ${updatedOrder.status}`);
        addLog(`   - readyForCollection: ${updatedOrder.readyForCollection}`);
      } else {
        addLog('❌ Commande non trouvée dans localStorage après update');
      }
    } else {
      addLog('❌ markOrderCollected a retourné null');
    }
  };

  const testScanner = () => {
    setLogs([]);
    
    if (!clientCode.trim()) {
      addLog('❌ Entrez un code CLIENT-XXXXX');
      return;
    }

    addLog(`🔍 Test scanner pour: ${clientCode}`);

    // 1. Chercher le client
    const clients = getAllClients();
    const client = clients.find(c => c.qrCode === clientCode);

    if (!client) {
      addLog(`❌ Client non trouvé`);
      return;
    }

    addLog(`✅ Client trouvé: ${client.name}`);
    addLog(`   - Type: ${client.clientType}`);
    addLog(`   - Abonnement: ${client.subscription || 'N/A'}`);

    // 2. Chercher commande prête
    const readyOrder = getReadyOrderByClientId(client.id);
    
    if (readyOrder) {
      addLog(`✅ Commande prête trouvée: ${readyOrder.orderNumber}`);
      addLog(`   - Status: ${readyOrder.status}`);
      addLog(`   - readyForCollection: ${readyOrder.readyForCollection}`);
      
      // Test collecte
      addLog('🚚 Simulation collecte...');
      const collected = markOrderCollected(readyOrder.id);
      
      if (collected) {
        addLog(`✅ Collecte réussie !`);
        addLog(`   - Nouveau status: ${collected.status}`);
      } else {
        addLog(`❌ Échec collecte`);
      }
    } else {
      addLog(`ℹ️ Pas de commande prête pour ce client`);
      
      // Chercher toutes ses commandes
      const allOrders = getAllOrders().filter(o => o.clientId === client.id);
      addLog(`📦 ${allOrders.length} commande(s) au total:`);
      
      allOrders.forEach((o, i) => {
        addLog(`   ${i+1}. ${o.orderNumber} - Status: ${o.status} - Ready: ${o.readyForCollection}`);
      });
    }
  };

  const showAllData = () => {
    setLogs([]);
    
    const clients = getAllClients();
    const orders = getAllOrders();
    
    addLog(`📊 ÉTAT COMPLET DE LA BASE`);
    addLog(`═══════════════════════════`);
    addLog(`👥 ${clients.length} clients`);
    addLog(`📦 ${orders.length} commandes`);
    addLog(``);
    
    addLog(`CLIENTS:`);
    clients.forEach((c, i) => {
      addLog(`${i+1}. ${c.name} (${c.qrCode}) - ${c.clientType} ${c.subscription || ''}`);
    });
    
    addLog(``);
    addLog(`COMMANDES:`);
    orders.forEach((o, i) => {
      addLog(`${i+1}. ${o.orderNumber} - Client: ${o.clientName}`);
      addLog(`    Status: ${o.status} | Ready: ${o.readyForCollection || false}`);
      addLog(`    Collecte: ${o.collectionDate} | Livraison: ${o.deliveryDate}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">🔧 Debug Scanner & Collecte</h1>
        
        {/* Boutons de test */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Tests automatiques</h2>
          
          <div className="space-y-3">
            <button
              onClick={testMarkCollected}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              🧪 Test 1: Tester markOrderCollected
            </button>
            
            <button
              onClick={showAllData}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              📊 Test 2: Afficher toutes les données
            </button>
          </div>
        </div>

        {/* Test scanner manuel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Test scanner manuel</h2>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={clientCode}
              onChange={(e) => setClientCode(e.target.value)}
              placeholder="CLIENT-XXXXX"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <button
              onClick={testScanner}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              🔍 Tester
            </button>
          </div>
        </div>

        {/* Console de logs */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">📝 Console</h2>
            <button
              onClick={() => setLogs([])}
              className="text-sm bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Effacer
            </button>
          </div>
          
          <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-500">Aucun log pour le moment. Lancez un test !</p>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className={`mb-1 ${
                    log.includes('✅') ? 'text-green-400' :
                    log.includes('❌') ? 'text-red-400' :
                    log.includes('🚚') ? 'text-blue-400' :
                    log.includes('📦') ? 'text-yellow-400' :
                    'text-gray-300'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
