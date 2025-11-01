'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle, User, Phone, Calendar } from 'lucide-react';
import { getClientByQRCode, getAllOrders, type Client, type Order } from '@/lib/database';
import Link from 'next/link';

export default function SuiviPublicPage() {
  const params = useParams();
  const code = params.code as string;
  
  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;

    // Charger le client par son code QR
    const foundClient = getClientByQRCode(code);
    
    if (!foundClient) {
      setError('Code client introuvable. Vérifiez votre code QR.');
      setLoading(false);
      return;
    }

    // Charger toutes les commandes du client
    const allOrders = getAllOrders();
    const clientOrders = allOrders.filter(o => o.clientId === foundClient.id);
    
    // Trier par date décroissante (plus récent en premier)
    clientOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setClient(foundClient);
    setOrders(clientOrders);
    setLoading(false);
  }, [code]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'En attente de collecte',
          icon: Clock,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          progressColor: 'bg-yellow-500',
          progress: 10,
          description: 'Votre panier est prêt à être collecté'
        };
      case 'collected':
        return {
          label: 'Collecté - En traitement',
          icon: Truck,
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          progressColor: 'bg-blue-500',
          progress: 50,
          description: 'Votre linge a été collecté et est en traitement'
        };
      case 'in_progress':
        return {
          label: 'En cours de nettoyage',
          icon: Package,
          color: 'bg-orange-100 text-orange-800 border-orange-300',
          progressColor: 'bg-orange-500',
          progress: 75,
          description: 'Nos experts s\'occupent de votre linge'
        };
      case 'ready':
        return {
          label: 'Prêt pour livraison',
          icon: CheckCircle,
          color: 'bg-purple-100 text-purple-800 border-purple-300',
          progressColor: 'bg-purple-500',
          progress: 90,
          description: 'Votre linge est prêt, livraison imminente'
        };
      case 'delivered':
        return {
          label: 'Livré',
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800 border-green-300',
          progressColor: 'bg-green-500',
          progress: 100,
          description: 'Votre commande a été livrée avec succès'
        };
      case 'cancelled':
        return {
          label: 'Annulée',
          icon: XCircle,
          color: 'bg-red-100 text-red-800 border-red-300',
          progressColor: 'bg-red-500',
          progress: 0,
          description: 'Cette commande a été annulée'
        };
      default:
        return {
          label: 'En attente',
          icon: Clock,
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          progressColor: 'bg-gray-500',
          progress: 0,
          description: 'Commande en attente'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de vos commandes...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <XCircle className="mx-auto text-red-600 mb-4" size={64} />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Code introuvable</h1>
          <p className="text-gray-600 mb-6">{error || 'Impossible de trouver ce code client.'}</p>
          <Link href="/" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const completedOrders = orders.filter(o => o.status === 'delivered');
  const cancelledOrders = orders.filter(o => o.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <ArrowLeft size={20} />
            <span className="font-semibold">Retour à l'accueil</span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Info Client */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border-2 border-primary-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Suivi de vos commandes
              </h1>
              <p className="text-gray-600">Toutes vos commandes en temps réel</p>
            </div>
            <div className="bg-primary-100 px-4 py-2 rounded-xl">
              <p className="text-xs text-primary-600 font-semibold">CODE CLIENT</p>
              <p className="text-lg font-black text-primary-700 font-mono">{client.qrCode}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <User size={24} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-600">Nom</p>
                <p className="font-bold text-gray-900">{client.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <Phone size={24} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-600">Téléphone</p>
                <p className="font-bold text-gray-900">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <Package size={24} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-600">Type</p>
                <p className="font-bold text-gray-900">
                  {client.clientType === 'subscription' ? '📦 Abonné' : '💳 À la carte'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Commandes en cours */}
        {activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={28} className="text-primary-600" />
              Commandes en cours
            </h2>
            <div className="space-y-6">
              {activeOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-blue-500 p-6 text-white">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold">{order.orderNumber}</h3>
                        <span className={`px-4 py-2 rounded-xl font-semibold text-sm ${statusInfo.color} border-2`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-white/90 text-sm">
                        Panier {order.basketSize} • {order.items.reduce((sum, item) => sum + item.price, 0) === 0 ? 'Abonnement' : `${order.items.reduce((sum, item) => sum + item.price, 0)}€`}
                      </p>
                    </div>

                    {/* Barre de progression */}
                    <div className="px-6 py-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progression</span>
                        <span className="text-sm font-bold text-primary-600">{statusInfo.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full ${statusInfo.progressColor} transition-all duration-1000 ease-out rounded-full`}
                          style={{ width: `${statusInfo.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Détails */}
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${statusInfo.color}`}>
                          <StatusIcon size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-1">{statusInfo.label}</p>
                          <p className="text-sm text-gray-600">{statusInfo.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                            <Calendar size={14} />
                            Collecte
                          </p>
                          <p className="font-bold text-gray-900">{new Date(order.collectionDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                            <Calendar size={14} />
                            Livraison prévue
                          </p>
                          <p className="font-bold text-gray-900">{new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>

                      {/* Historique détaillé */}
                      {order.history && order.history.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
                            <Clock size={16} />
                            📋 Historique détaillé
                          </h4>
                          <div className="space-y-3">
                            {order.history.slice().reverse().map((entry, idx) => (
                              <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-4 border border-primary-200">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                  <CheckCircle size={16} className="text-primary-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900 text-sm mb-1">
                                    {entry.note || getStatusInfo(entry.status).label}
                                  </p>
                                  <p className="text-xs text-gray-600 flex items-center gap-2">
                                    <Calendar size={12} />
                                    {new Date(entry.date).toLocaleDateString('fr-FR')} à {new Date(entry.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Commandes livrées */}
        {completedOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={28} className="text-green-600" />
              Commandes livrées
            </h2>
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                    <span className="px-4 py-2 rounded-xl font-semibold text-sm bg-green-100 text-green-800 border-2 border-green-300">
                      ✅ Livré
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Panier</p>
                      <p className="font-semibold text-gray-900">{order.basketSize}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Livré le</p>
                      <p className="font-semibold text-gray-900">{new Date(order.updatedAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commandes annulées */}
        {cancelledOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle size={28} className="text-red-600" />
              Commandes annulées
            </h2>
            <div className="space-y-4">
              {cancelledOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-200 opacity-60">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                    <span className="px-4 py-2 rounded-xl font-semibold text-sm bg-red-100 text-red-800 border-2 border-red-300">
                      ❌ Annulée
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Annulée le {new Date(order.updatedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aucune commande */}
        {orders.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <Package className="mx-auto text-gray-300 mb-4" size={80} />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore de commande en cours.</p>
            <Link href="/espace-client/inscription" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition">
              Créer un compte
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
