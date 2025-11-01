'use client';

import { useEffect, useState } from 'react';
import { 
  Package, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Euro,
  Calendar,
  Zap
} from 'lucide-react';
import { getAllClients, getAllOrders, type Client, type Order } from '@/lib/database';
import { generateWeeklyCollections, hasWeeklyCollectionsGenerated, markWeeklyCollectionsGenerated } from '@/lib/autoCollect';
import Link from 'next/link';

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [generatingCollections, setGeneratingCollections] = useState(false);

  const loadData = () => {
    setClients(getAllClients());
    setOrders(getAllOrders());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerateCollections = () => {
    if (confirm('Générer les collectes hebdomadaires pour tous les abonnés ?\n\nCela créera une commande pour chaque client abonné qui n\'a pas de commande en cours.')) {
      setGeneratingCollections(true);
      
      setTimeout(() => {
        const result = generateWeeklyCollections();
        markWeeklyCollectionsGenerated();
        loadData();
        
        alert(
          `✅ Collectes générées !\n\n` +
          `Créées : ${result.created}\n` +
          `Ignorées : ${result.skipped}\n` +
          (result.errors.length > 0 ? `\nErreurs : ${result.errors.join('\n')}` : '')
        );
        
        setGeneratingCollections(false);
      }, 500);
    }
  };

  // Calculs des statistiques
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const inProgressOrders = orders.filter(o => o.status === 'in_progress' || o.status === 'collected').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalClients = clients.length;

  const stats = [
    {
      name: 'Commandes totales',
      value: totalOrders,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'En attente',
      value: pendingOrders,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'En cours',
      value: inProgressOrders,
      icon: AlertCircle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'Terminées',
      value: completedOrders,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Clients actifs',
      value: totalClients,
      icon: Users,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Chiffre d\'affaires',
      value: `${totalRevenue}€`,
      icon: Euro,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      collected: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const labels = {
      pending: 'En attente',
      collected: 'Collecté',
      in_progress: 'En cours',
      ready: 'Prêt',
      delivered: 'Livré',
      cancelled: 'Annulé',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  // Dernières commandes
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
              </div>
            </div>
            <div className="mt-4">
              <div className={`h-2 ${stat.bgColor} rounded-full overflow-hidden`}>
                <div className={`h-full ${stat.color} rounded-full`} style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dernières commandes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Dernières commandes</h2>
          <Link 
            href="/admin/clients"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Voir les clients →
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Aucune commande pour le moment</p>
            <Link
              href="/admin/clients"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Créer un client et sa première commande →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N° Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date collecte
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => {
                  const client = clients.find(c => c.id === order.clientId);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                        <div className="text-xs text-gray-500 font-mono">{order.clientQRCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.clientName}</div>
                        <div className="text-xs text-gray-500">{order.clientPhone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.collectionDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{order.totalPrice}€</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {client && (
                          <Link
                            href={`/admin/clients/${client.id}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Voir client →
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
