'use client';

import { useEffect, useState } from 'react';
import { getAllClients, getClientByQRCode } from '@/lib/database';

export default function TestDBPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [testQR, setTestQR] = useState('CLIENT-7E01B799');
  const [result, setResult] = useState<any>(null);
  const [rawData, setRawData] = useState<string>('');

  const loadData = () => {
    const allClients = getAllClients();
    setClients(allClients);
    console.log('📦 Tous les clients:', allClients);
    
    // Charger les données brutes
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('cpropre_clients') || '[]';
      setRawData(raw);
      console.log('📦 Données brutes localStorage:', raw);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const testSearch = () => {
    console.log('='.repeat(50));
    console.log('🔍 DEBUT TEST - Recherche de:', testQR);
    console.log('='.repeat(50));
    
    // Test manuel FIRST
    let manualResult = null;
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('cpropre_clients') || '[]';
      console.log('📦 RAW DATA:', raw);
      
      try {
        const parsed = JSON.parse(raw);
        console.log('📦 PARSED DATA:', parsed);
        console.log('📦 Nombre de clients:', parsed.length);
        
        console.log('\n🔍 COMPARAISON CODES QR:');
        parsed.forEach((c: any, index: number) => {
          const match = c.qrCode === testQR;
          console.log(`  [${index}] QR: "${c.qrCode}" | Nom: "${c.name}" | Match: ${match}`);
          if (match) manualResult = c;
        });
        
        const manual = parsed.find((c: any) => c.qrCode === testQR);
        console.log('\n🔍 Résultat find():', manual);
      } catch (e) {
        console.error('❌ Erreur parsing:', e);
      }
    }
    
    // Test avec la fonction
    console.log('\n🔧 TEST FONCTION getClientByQRCode:');
    const found = getClientByQRCode(testQR);
    console.log('🔍 Résultat getClientByQRCode:', found);
    
    console.log('\n📊 RESUME:');
    console.log('  - Recherche manuelle:', manualResult ? '✅ TROUVE' : '❌ NON TROUVE');
    console.log('  - Fonction DB:', found ? '✅ TROUVE' : '❌ NON TROUVE');
    console.log('='.repeat(50));
    
    setResult(found || manualResult);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Database</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Tous les clients ({clients.length})</h2>
        <div className="space-y-2">
          {clients.map((client, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded">
              <p className="font-mono text-sm"><strong>QR:</strong> {client.qrCode}</p>
              <p className="text-sm"><strong>Nom:</strong> {client.name}</p>
              <p className="text-sm"><strong>ID:</strong> {client.id}</p>
            </div>
          ))}
        </div>
        {clients.length === 0 && (
          <p className="text-gray-500">Aucun client trouvé dans localStorage</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Test recherche par QR</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={testQR}
            onChange={(e) => setTestQR(e.target.value)}
            className="flex-1 px-4 py-2 border rounded"
            placeholder="Ex: CLIENT-3E5F1693"
          />
          <button
            onClick={testSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Rechercher
          </button>
        </div>
        
        {result && (
          <div className="p-4 bg-green-50 rounded border border-green-200">
            <p className="text-green-900 font-bold mb-2">✅ Client trouvé !</p>
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        
        {result === null && (
          <div className="p-4 bg-red-50 rounded border border-red-200">
            <p className="text-red-900 font-bold">❌ Client non trouvé</p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded">
        <p className="text-sm font-bold mb-2">localStorage keys:</p>
        <pre className="text-xs bg-white p-2 rounded border">
          {typeof window !== 'undefined' && JSON.stringify(Object.keys(localStorage), null, 2)}
        </pre>
      </div>

      <div className="mt-4 bg-gray-50 p-4 rounded">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-bold">Données brutes (cpropre_clients):</p>
          <button
            onClick={loadData}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔄 Recharger
          </button>
        </div>
        <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-96">
          {rawData || 'Vide'}
        </pre>
      </div>
    </div>
  );
}
