'use client';

import { useState, useEffect } from 'react';
import { 
  getAllOrders, 
  getAllClients,
  updateOrderStatus,
  type Order,
  type Client 
} from '@/lib/database';
import { 
  Package,
  Clock,
  Truck,
  CheckCircle,
  Home,
  Filter,
  Search,
  Eye,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function CommandesSuiviPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allOrders = getAllOrders();
    const allClients = getAllClients();
    
    // Trier par date décroissante
    allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setOrders(allOrders);
    setClients(allClients);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          label: '✅ Livré', 
          icon: CheckCircle, 
          color: 'bg-green-100 text-green-800 border-green-300',
          nextStatus: null,
          nextLabel: null
        };
      case 'cancelled':
        return {
          label: '❌ Annulée', 
          icon: CheckCircle, 
          color: 'bg-red-100 text-red-800 border-red-300',
          nextStatus: null,
          nextLabel: null
        };
      default:
        // Tout autre statut (pending, collected, etc.) = Collecté
        return {
          label: '🚚 Collecté', 
          icon: Truck, 
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          nextStatus: 'delivered',
          nextLabel: 'Marquer comme livré'
        };
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string, note?: string) => {
    const updated = updateOrderStatus(orderId, newStatus as any, note);
    if (updated) {
      loadData();
      setSelectedOrder(updated);
      alert(`✅ Statut mis à jour : ${getStatusInfo(newStatus).label}`);
    }
  };

  const filteredOrders = orders.filter(order => {
    let matchesStatus = true;
    if (filterStatus === 'collected') {
      matchesStatus = order.status !== 'delivered' && order.status !== 'cancelled';
    } else if (filterStatus === 'delivered') {
      matchesStatus = order.status === 'delivered';
    } else if (filterStatus === 'cancelled') {
      matchesStatus = order.status === 'cancelled';
    }
    // filterStatus === 'all' → matchesStatus reste true
    
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientQRCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: orders.length,
    collected: orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Suivi des Commandes</h1>
        <p className="text-gray-600 mt-1">Gérez les statuts et le suivi des commandes</p>
      </div>

      {/* Stats rapides - 3 statuts + annulé */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setFilterStatus('all')}
          className={`cursor-pointer bg-white rounded-xl shadow-sm border-2 p-4 transition-all ${
            filterStatus === 'all' ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Package size={20} className="text-primary-600" />
            <p className="text-sm text-gray-600">Toutes</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{statusCounts.all}</p>
        </div>

        <div 
          onClick={() => setFilterStatus('collected')}
          className={`cursor-pointer bg-white rounded-xl shadow-sm border-2 p-4 transition-all ${
            filterStatus === 'collected' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Truck size={20} className="text-blue-600" />
            <p className="text-sm text-gray-600">🚚 Collecté</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{statusCounts.collected}</p>
        </div>

        <div 
          onClick={() => setFilterStatus('delivered')}
          className={`cursor-pointer bg-white rounded-xl shadow-sm border-2 p-4 transition-all ${
            filterStatus === 'delivered' ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} className="text-green-600" />
            <p className="text-sm text-gray-600">✅ Livré</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{statusCounts.delivered}</p>
        </div>

        <div 
          onClick={() => setFilterStatus('cancelled')}
          className={`cursor-pointer bg-white rounded-xl shadow-sm border-2 p-4 transition-all ${
            filterStatus === 'cancelled' ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200 hover:border-red-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} className="text-red-600" />
            <p className="text-sm text-gray-600">❌ Annulée</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{statusCounts.cancelled}</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par n° commande, client, QR code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {filteredOrders.length} commande(s)
          </h2>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucune commande trouvée</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              const client = clients.find(c => c.id === order.clientId);

              return (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Infos commande */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${statusInfo.color.split(' ')[0]}`}>
                          <StatusIcon size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>{order.clientName}</strong> • {order.clientPhone}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>🧺 {order.basketSize}</span>
                            <span>💰 {order.totalPrice}€</span>
                            <span>📅 Collecte: {new Date(order.collectionDate).toLocaleDateString('fr-FR')}</span>
                            <span>🚚 Livraison: {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</span>
                          </div>
                          {order.notes && (
                            <p className="text-sm text-blue-700 mt-2 bg-blue-50 p-2 rounded">
                              📝 {order.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 md:w-64">
                      {client && (
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          <Eye size={16} />
                          Voir client
                        </Link>
                      )}
                      
                      {statusInfo.nextStatus && statusInfo.nextLabel && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, statusInfo.nextStatus!, `Statut mis à jour vers ${getStatusInfo(statusInfo.nextStatus!).label}`)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                          <ChevronRight size={16} />
                          {statusInfo.nextLabel}
                        </button>
                      )}

                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <button
                          onClick={() => {
                            if (confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
                              handleStatusUpdate(order.id, 'cancelled', 'Commande annulée');
                            }
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Historique de la commande */}
                  {order.history && order.history.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">📋 Historique :</p>
                      <div className="flex flex-wrap gap-2">
                        {order.history.map((h, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {getStatusInfo(h.status).label} • {new Date(h.date).toLocaleString('fr-FR')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions rapides globales */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-900 font-medium mb-2">💡 Actions rapides :</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const pendingOrders = orders.filter(o => o.status === 'pending');
              if (pendingOrders.length === 0) {
                alert('Aucune commande en attente');
                return;
              }
              if (confirm(`Marquer ${pendingOrders.length} commande(s) en attente comme collectée(s) ?`)) {
                pendingOrders.forEach(o => handleStatusUpdate(o.id, 'collected', 'Collecte groupée'));
                loadData();
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Collecter toutes les commandes en attente ({statusCounts.pending})
          </button>
        </div>
      </div>
    </div>
  );
}
