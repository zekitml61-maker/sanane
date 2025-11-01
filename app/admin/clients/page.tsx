'use client';

import { useState, useEffect } from 'react';
import { getAllClients, type Client } from '@/lib/database';
import { Search, Filter, Mail, Phone, MapPin, TrendingUp, Plus, Crown, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>('all');

  useEffect(() => {
    // Charger les clients au montage du composant
    loadClients();
  }, []);

  const loadClients = () => {
    const allClients = getAllClients();
    setClients(allClients);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      client.phone.includes(searchTerm) ||
      client.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubscription = subscriptionFilter === 'all' || client.subscription === subscriptionFilter;
    
    return matchesSearch && matchesSubscription;
  });

  const getSubscriptionBadge = (subscription: string) => {
    const badges = {
      essentiel: 'bg-gray-100 text-gray-800',
      confort: 'bg-blue-100 text-blue-800',
      premium: 'bg-amber-100 text-amber-800',
    };
    const labels = {
      essentiel: 'Essentiel',
      confort: 'Confort',
      premium: 'Premium ⭐',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[subscription as keyof typeof badges]}`}>
        {labels[subscription as keyof typeof labels]}
      </span>
    );
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
        <p className="text-gray-600 mt-1">{filteredClients.length} client(s) trouvé(s)</p>
      </div>

      {/* Header avec bouton */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="text-gray-600 mt-1">{filteredClients.length} client(s) trouvé(s)</p>
        </div>
        <Link
          href="/admin/clients/nouveau"
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Ajouter un client
        </Link>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Total clients</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalClients}</p>
          <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp size={16} />
            <span>{activeClients} actifs</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Clients par formule</p>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Essentiel:</span>
              <span className="font-bold">{clients.filter(c => c.subscription === 'essentiel').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Confort:</span>
              <span className="font-bold">{clients.filter(c => c.subscription === 'confort').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Premium:</span>
              <span className="font-bold">{clients.filter(c => c.subscription === 'premium').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recherche */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtre abonnement */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={subscriptionFilter}
              onChange={(e) => setSubscriptionFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Tous les abonnements</option>
              <option value="essentiel">Essentiel</option>
              <option value="confort">Confort</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
                  {client.clientType === 'subscription' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
                      <Crown size={12} />
                      Abonné
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                      <ShoppingBag size={12} />
                      À la carte
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Client depuis {new Date(client.joinDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              {client.clientType === 'subscription' && client.subscription && getSubscriptionBadge(client.subscription)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <Phone size={16} />
                <span>{client.phone}</span>
              </div>
              {client.email && (
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <Mail size={16} />
                  <span>{client.email}</span>
                </div>
              )}
              <div className="flex items-start gap-2 text-gray-700 text-sm">
                <MapPin size={16} className="mt-0.5" />
                <span>{client.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm font-mono bg-gray-50 p-2 rounded">
                <span className="text-xs font-bold">QR:</span>
                <span>{client.qrCode}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Statut</p>
                  <p className={`font-bold ${client.active ? 'text-green-600' : 'text-red-600'}`}>
                    {client.active ? '✅ Actif' : '❌ Inactif'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Inscrit le</p>
                  <p className="font-medium text-gray-900 text-sm">
                    {new Date(client.joinDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/admin/clients/${client.id}`}
                className="block text-center w-full px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium"
              >
                Voir l'historique →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500">Aucun client trouvé</p>
        </div>
      )}
    </div>
  );
}
