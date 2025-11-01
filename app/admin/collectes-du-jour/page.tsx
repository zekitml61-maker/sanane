'use client';

import { useState, useEffect } from 'react';
import { getReadyOrders, getAllClients, updateOrderStatus, type Order, type Client } from '@/lib/database';
import { Package, CheckCircle, MapPin, Phone, Calendar, Image as ImageIcon, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CollectesDuJourPage() {
  const [readyOrders, setReadyOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const orders = getReadyOrders();
    // Trier par date de signalement (plus récent en premier)
    orders.sort((a, b) => new Date(b.readyAt!).getTime() - new Date(a.readyAt!).getTime());
    setReadyOrders(orders);
    setLoading(false);
  };

  const handleCollected = (orderId: string) => {
    if (confirm('Confirmer la collecte de ce panier ?')) {
      updateOrderStatus(orderId, 'collected', 'Panier collecté');
      loadData();
      setSelectedOrder(null);
      alert('✅ Panier marqué comme collecté !');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Collectes du Jour</h1>
        <p className="text-gray-600 mt-1">
          {readyOrders.length} panier(s) prêt(s) à collecter
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paniers prêts</p>
              <p className="text-3xl font-bold text-primary-600 mt-1">{readyOrders.length}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <Package size={32} className="text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avec photos</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {readyOrders.filter(o => o.photos && o.photos.length > 0).length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ImageIcon size={32} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{readyOrders.length}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock size={32} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Liste des paniers prêts */}
      {readyOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun panier prêt</h3>
          <p className="text-gray-600">Aucun client n'a signalé être prêt pour la collecte aujourd'hui</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {readyOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              {/* En-tête */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{order.clientName}</h3>
                  <p className="text-sm text-gray-600">{order.orderNumber}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ Prêt
                </span>
              </div>

              {/* Informations */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone size={16} className="text-gray-400" />
                  <a href={`tel:${order.clientPhone}`} className="hover:text-primary-600">
                    {order.clientPhone}
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>{order.clientAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Collecte prévue : {new Date(order.collectionDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock size={16} className="text-gray-400" />
                  <span>Signalé le {new Date(order.readyAt!).toLocaleString('fr-FR')}</span>
                </div>
              </div>

              {/* Panier */}
              <div className="bg-primary-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package size={20} className="text-primary-600" />
                    <span className="font-semibold text-primary-900">
                      Panier {order.basketSize}
                    </span>
                  </div>
                  {order.subscription && (
                    <span className="text-xs bg-primary-200 text-primary-800 px-2 py-1 rounded-full font-semibold">
                      Abonné {order.subscription}
                    </span>
                  )}
                </div>
              </div>

              {/* Photos */}
              {order.photos && order.photos.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <ImageIcon size={16} />
                    {order.photos.length} photo(s) du linge
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {order.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                        onClick={() => setSelectedOrder(order)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/admin/clients/${order.clientId}`}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold text-center"
                >
                  Voir la fiche
                </Link>
                <button
                  onClick={() => handleCollected(order.id)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Collecté
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Photos */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.clientName}</h2>
                <p className="text-gray-600">{selectedOrder.orderNumber}</p>
              </div>

              {selectedOrder.photos && selectedOrder.photos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedOrder.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Fermer
                </button>
                <button
                  onClick={() => handleCollected(selectedOrder.id)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  ✓ Marquer comme collecté
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
