'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, Calendar, Image as ImageIcon } from 'lucide-react';
import { getClientById, getAllOrders, type Client, type Order } from '@/lib/database';
import Link from 'next/link';

export default function MesCommandesPage() {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem('cpropre_client_session');
    if (!sessionId) {
      router.push('/espace-client/connexion');
      return;
    }

    const clientData = getClientById(sessionId);
    if (!clientData) {
      router.push('/espace-client/connexion');
      return;
    }

    setClient(clientData);

    const allOrders = getAllOrders();
    const clientOrders = allOrders.filter(o => o.clientId === clientData.id);
    // Trier par date décroissante
    clientOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setOrders(clientOrders);
    setLoading(false);
  }, [router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-600" size={24} />;
      case 'collected': return <Package className="text-blue-600" size={24} />;
      case 'in_progress': return <Package className="text-orange-600" size={24} />;
      case 'ready': return <CheckCircle className="text-green-600" size={24} />;
      case 'delivered': return <Truck className="text-gray-600" size={24} />;
      default: return <Package className="text-gray-600" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'collected': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_progress': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'ready': return 'bg-green-100 text-green-800 border-green-300';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente de collecte';
      case 'collected': return 'Collecté';
      case 'in_progress': return 'En cours de traitement';
      case 'ready': return 'Prêt à être livré';
      case 'delivered': return 'Livré';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['pending', 'collected', 'in_progress', 'ready'].includes(order.status);
    if (filter === 'completed') return order.status === 'delivered';
    return order.status === filter;
  });

  if (loading || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/espace-client/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            Retour au dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
          <p className="text-gray-600">{orders.length} commande(s) au total</p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({orders.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'active'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En cours ({orders.filter(o => ['pending', 'collected', 'in_progress', 'ready'].includes(o.status)).length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'completed'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Livrées ({orders.filter(o => o.status === 'delivered').length})
            </button>
          </div>
        </div>

        {/* Liste des commandes */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-600">Aucune commande ne correspond à ce filtre</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-gray-50 p-3 rounded-lg">
                    {getStatusIcon(order.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">
                          Créée le {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Collecte</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(order.collectionDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Livraison prévue</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>

                    {order.basketSize && (
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                          <Package size={14} />
                          Panier {order.basketSize}
                        </span>
                      </div>
                    )}

                    {order.readyForCollection && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-xs text-green-800 font-semibold">
                          Prêt depuis le {new Date(order.readyAt!).toLocaleDateString('fr-FR')}
                        </span>
                        {order.photos && order.photos.length > 0 && (
                          <span className="ml-auto text-xs text-green-700 flex items-center gap-1">
                            <ImageIcon size={14} />
                            {order.photos.length} photo(s)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Détail Commande */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails de la commande</h2>

              {/* Informations générales */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Numéro de commande</span>
                  <span className="font-mono font-bold text-gray-900">{selectedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Statut</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Panier</span>
                  <span className="font-semibold text-gray-900">{selectedOrder.basketSize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Collecte</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(selectedOrder.collectionDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Livraison prévue</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(selectedOrder.deliveryDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              {/* Photos */}
              {selectedOrder.photos && selectedOrder.photos.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Photos du linge</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedOrder.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Historique */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Historique</h3>
                <div className="space-y-3">
                  {selectedOrder.history.map((h, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{getStatusLabel(h.status)}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(h.date).toLocaleString('fr-FR')}
                        </p>
                        {h.note && (
                          <p className="text-xs text-gray-700 mt-1">{h.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
