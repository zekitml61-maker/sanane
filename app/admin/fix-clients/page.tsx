'use client';

import { useState } from 'react';
import { Wrench, CheckCircle } from 'lucide-react';

export default function FixClientsPage() {
  const [fixed, setFixed] = useState(false);
  const [result, setResult] = useState('');

  const fixClients = () => {
    try {
      const clients = JSON.parse(localStorage.getItem('cpropre_clients') || '[]');
      let fixedCount = 0;

      clients.forEach((client: any) => {
        if (!client.clientType && client.subscription) {
          client.clientType = 'subscription';
          fixedCount++;
        } else if (!client.clientType) {
          client.clientType = 'one-time';
          fixedCount++;
        }
      });

      localStorage.setItem('cpropre_clients', JSON.stringify(clients));
      
      setResult(`✅ ${fixedCount} client(s) corrigé(s) !`);
      setFixed(true);
      
      setTimeout(() => {
        window.location.href = '/admin/scanner';
      }, 2000);
    } catch (error) {
      setResult(`❌ Erreur: ${error}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <Wrench size={64} className="mx-auto text-primary-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Réparer les Clients
        </h1>
        <p className="text-gray-600 mb-8">
          Cette page va corriger les clients qui n'ont pas de type défini.
        </p>

        {!fixed ? (
          <button
            onClick={fixClients}
            className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition font-bold text-lg shadow-lg"
          >
            🔧 Réparer Maintenant
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <CheckCircle size={48} className="mx-auto text-green-600 mb-3" />
            <p className="text-2xl font-bold text-green-900 mb-2">{result}</p>
            <p className="text-green-700">Redirection vers le scanner...</p>
          </div>
        )}
      </div>
    </div>
  );
}
