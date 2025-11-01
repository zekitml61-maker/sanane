'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Camera, 
  CheckCircle, 
  Check,
  Clock, 
  LogOut,
  User,
  CreditCard,
  FileText,
  X,
  XCircle,
  Upload,
  QrCode as QrCodeIcon,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { getClientById, getAllOrders, markOrderReady, createOrder, getSubscriptionCapacity, deleteOrder, type Client, type Order } from '@/lib/database';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [showBasketChoice, setShowBasketChoice] = useState(false);
  const [selectedBasketSize, setSelectedBasketSize] = useState<'15L' | '30L' | '50L'>('30L');
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const loadData = () => {
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
    setOrders(clientOrders);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('cpropre_client_session');
    router.push('/');
  };

  const handleCreateAndReady = () => {
    if (!client) return;

    // Pour les ABONNÉS : Créer commande directement avec leur formule
    if (client.clientType === 'subscription' && client.subscription) {
      createOrderAndOpenCamera(getSubscriptionCapacity(client.subscription) as '15L' | '30L' | '50L', 0);
    } 
    // Pour les clients À LA CARTE : Afficher le choix de taille
    else {
      setShowBasketChoice(true);
    }
  };

  const createOrderAndOpenCamera = (basketSize: '15L' | '30L' | '50L', price: number, forceOneTime: boolean = false) => {
    if (!client) return;

    const collectionDate = new Date().toISOString().split('T')[0];
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    // Si forceOneTime = true, c'est un panier supplémentaire payant (même pour abonnés)
    const isSubscriptionOrder = client.clientType === 'subscription' && price === 0 && !forceOneTime;

    const newOrder = createOrder({
      clientId: client.id,
      basketSize: basketSize,
      collectionDate: collectionDate,
      deliveryDate: deliveryDate.toISOString().split('T')[0],
      items: [
        {
          id: `item-${Date.now()}`,
          type: isSubscriptionOrder ? 'Nettoyage pressing abonnement' : 'Nettoyage pressing à la carte',
          description: `Panier ${basketSize} - ${isSubscriptionOrder ? `Abonnement ${client.subscription}` : 'Panier supplémentaire à la carte'}`,
          quantity: 1,
          price: price
        }
      ],
      notes: `📦 ${isSubscriptionOrder ? 'Collecte abonnement' : 'Panier supplémentaire à la carte'} - ${new Date().toLocaleString('fr-FR')}`
    });

    if (newOrder) {
      setSelectedOrder(newOrder);
      setShowBasketChoice(false);
      setShowCamera(true);
      startCamera();
      loadData();
    }
  };

  const handleBasketSizeSelect = (size: '15L' | '30L' | '50L') => {
    setSelectedBasketSize(size);
    const prices: Record<string, number> = {
      '15L': 35,
      '30L': 60,
      '50L': 95
    };
    // Si prix > 0, c'est forcément un panier à la carte (supplémentaire pour abonnés ou normal pour clients à la carte)
    createOrderAndOpenCamera(size, prices[size], prices[size] > 0);
  };

  const handleReadyClick = (order: Order) => {
    setSelectedOrder(order);
    setShowCamera(true);
    startCamera();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error('Erreur caméra:', error);
      // Ne pas bloquer, la photo est optionnelle
      console.log('ℹ️ Caméra non disponible, mais la confirmation reste possible sans photo');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg', 0.8);
        setPhotos([...photos, photoData]);
      }
    }
  };

  const handleConfirmReady = () => {
    if (!selectedOrder) return;

    // Marquer la commande comme prête
    markOrderReady(selectedOrder.id, photos);

    // Recharger les commandes
    const allOrders = getAllOrders();
    const clientOrders = allOrders.filter(o => o.clientId === client?.id);
    setOrders(clientOrders);

    // Fermer le modal
    stopCamera();
    setShowCamera(false);
    setPhotos([]);
    setSelectedOrder(null);

    alert('✅ Votre panier est prêt ! Nous viendrons le collecter bientôt.');
  };

  const handleCancelReady = () => {
    // Si une commande vient d'être créée et n'est pas encore "ready", la supprimer
    if (selectedOrder && !selectedOrder.readyForCollection) {
      deleteOrder(selectedOrder.id);
      console.log('🗑️ Commande annulée:', selectedOrder.id);
    }
    
    stopCamera();
    setShowCamera(false);
    setPhotos([]);
    setSelectedOrder(null);
    loadData(); // Recharger les données pour mettre à jour la liste
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!client) return null;

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const activeOrders = orders.filter(o => ['collected', 'in_progress', 'ready'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'delivered');
  const cancelledOrders = orders.filter(o => o.status === 'cancelled');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'collected': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente de collecte';
      case 'collected': return 'Collecté';
      case 'in_progress': return 'En cours de traitement';
      case 'ready': return 'Prêt à être livré';
      case 'delivered': return 'Livré';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-primary-50/20">
      {/* Header moderne avec glassmorphism */}
      <header className="backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                Bonjour, {client.name} 👋
              </h1>
              <p className="text-sm text-gray-600 mt-1">Bienvenue dans votre espace client</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation rapide avec design moderne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/espace-client/mon-abonnement"
            className="group relative bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary-500 to-purple-500 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <CreditCard size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Mon Abonnement</h3>
                <p className="text-sm text-primary-600 font-semibold">
                  {client.clientType === 'subscription' ? `✨ ${client.subscription}` : '💳 À la carte'}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/espace-client/mes-commandes"
            className="group relative bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Package size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Mes Commandes</h3>
                <p className="text-sm text-blue-600 font-semibold">
                  📦 {orders.length} commande{orders.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/espace-client/profil"
            className="group relative bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <User size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Mon Profil</h3>
                <p className="text-sm text-green-600 font-semibold">
                  ⚙️ Mes informations
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Bouton principale moderne - Pour TOUS les clients sans commande en attente */}
        {pendingOrders.length === 0 && (
          <div className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-blue-600 rounded-3xl shadow-2xl p-10 mb-8 text-center text-white overflow-hidden">
            {/* Effet de fond animé */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Package size={56} className="text-white drop-shadow-lg" />
                </div>
                <h2 className="text-3xl font-black mb-3 drop-shadow-lg">
                  🧺 Votre panier est prêt ?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Prenez une photo de votre linge et nous viendrons le collecter
                  {client.clientType === 'subscription' ? ' gratuitement' : ''}
                </p>
              </div>
              
              <button
                onClick={handleCreateAndReady}
                className="group relative bg-white text-primary-600 px-10 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-black text-xl shadow-2xl flex items-center justify-center gap-4 mx-auto hover:scale-105 active:scale-95"
              >
                <Camera size={32} className="group-hover:rotate-12 transition-transform" />
                <span>Demander la collecte</span>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
                {client.clientType === 'subscription' && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-300" />
                    <span className="font-semibold">Collecte gratuite</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-300" />
                  <span className="font-semibold">Livraison 7 jours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-300" />
                  <span className="font-semibold">Suivi en temps réel</span>
                </div>
                {client.clientType === 'one-time' && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-yellow-300" />
                    <span className="font-semibold">Tarif : 60€ (30L)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Panier supplémentaire à la carte - Pour ABONNÉS uniquement - TOUJOURS visible */}
        {client.clientType === 'subscription' && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Package size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  💳 Besoin d'un panier supplémentaire ?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                  En plus de votre abonnement, commandez un panier à la carte sans engagement. 
                  <span className="font-semibold text-amber-700"> Choisissez votre taille et payez à la livraison.</span>
                </p>
                <button
                  onClick={() => setShowBasketChoice(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105 text-sm sm:text-base"
                >
                  <Package size={20} />
                  Commander un panier supplémentaire
                </button>
                <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="bg-white px-3 py-1 rounded-full">✓ 15L (35€)</span>
                  <span className="bg-white px-3 py-1 rounded-full">✓ 30L (60€)</span>
                  <span className="bg-white px-3 py-1 rounded-full">✓ 50L (95€)</span>
                  <span className="text-amber-700 font-semibold px-3 py-1">• Paiement à la livraison</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Commandes en attente - Avec bouton "Prêt" */}
        {pendingOrders.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={24} className="text-yellow-600" />
              En attente de collecte
            </h2>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">
                        Collecte prévue : {new Date(order.collectionDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {order.readyForCollection ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={20} className="text-green-600" />
                        <div>
                          <p className="text-sm font-semibold text-green-900">Panier prêt ! ✅</p>
                          <p className="text-xs text-green-700">
                            Signalé le {new Date(order.readyAt!).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-green-800 bg-green-100 rounded p-2 mt-2">
                        🚚 Notre équipe viendra collecter votre panier lors de la prochaine tournée
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleReadyClick(order)}
                        className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
                      >
                        <QrCodeIcon size={24} />
                        Scanner mon panier
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir annuler cette collecte ?')) {
                            deleteOrder(order.id);
                            loadData();
                          }
                        }}
                        className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <X size={18} />
                        Annuler cette collecte
                      </button>
                      <p className="text-xs text-center text-gray-600">
                        Scannez le QR code de votre panier ou prenez une photo de votre linge
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commandes en cours */}
        {activeOrders.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={24} className="text-blue-600" />
              Commandes en cours
            </h2>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">
                        Livraison prévue : {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Commandes annulées */}
        {cancelledOrders.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle size={24} className="text-red-600" />
              Commandes annulées
            </h2>
            <div className="space-y-4">
              {cancelledOrders.map((order) => (
                <div key={order.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">
                        Annulée le {new Date(order.updatedAt).toLocaleDateString('fr-FR')}
                      </p>
                      {order.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">{order.notes}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Choix taille panier - Style site principal */}
      {showBasketChoice && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-3xl max-w-6xl w-full shadow-2xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                    💳 Service à la carte
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700 mb-4">
                  Choisissez votre panier
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sélectionnez la capacité adaptée à vos besoins · Paiement à la livraison
                </p>
                <button 
                  onClick={() => setShowBasketChoice(false)} 
                  className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Options de taille - Style cartes abonnement */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* 15L */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-3 transition-all duration-300 flex flex-col">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Petit Panier</h3>
                    <div className="text-5xl font-black mb-2">15L</div>
                    <p className="text-blue-100">Parfait pour 1-2 personnes</p>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="text-5xl font-black text-gray-900 mb-2">35€</div>
                      <p className="text-gray-600">par commande</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Collecte à domicile</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Livraison sous 7 jours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Suivi en temps réel</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => handleBasketSizeSelect('15L')}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                    >
                      Choisir cette taille
                    </button>
                  </div>
                </div>

                {/* 30L - POPULAIRE */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-3 transition-all duration-300 flex flex-col ring-4 ring-primary-500 md:scale-105">
                  <div className="absolute top-0 left-0 right-0 bg-primary-500 text-white px-6 py-2 text-center font-semibold">
                    ⭐ Le plus populaire
                  </div>
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white pt-14">
                    <h3 className="text-2xl font-bold mb-2">Panier Moyen</h3>
                    <div className="text-5xl font-black mb-2">30L</div>
                    <p className="text-primary-100">Idéal pour une famille</p>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="text-5xl font-black text-gray-900 mb-2">60€</div>
                      <p className="text-gray-600">par commande</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Collecte à domicile</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Livraison sous 7 jours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Suivi en temps réel</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Le meilleur rapport qualité/prix</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => handleBasketSizeSelect('30L')}
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                    >
                      Choisir cette taille
                    </button>
                  </div>
                </div>

                {/* 50L */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-3 transition-all duration-300 flex flex-col">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Grand Panier</h3>
                    <div className="text-5xl font-black mb-2">50L</div>
                    <p className="text-amber-100">Pour grandes familles</p>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="text-5xl font-black text-gray-900 mb-2">95€</div>
                      <p className="text-gray-600">par commande</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Collecte à domicile</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Livraison sous 7 jours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Suivi en temps réel</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">Volume XXL économique</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => handleBasketSizeSelect('50L')}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                    >
                      Choisir cette taille
                    </button>
                  </div>
                </div>
              </div>

              {/* Info footer */}
              <div className="mt-8 bg-white/50 backdrop-blur-sm border border-primary-200 rounded-2xl p-6 text-center">
                <p className="text-gray-700">
                  💳 <strong className="text-primary-600">Paiement à la livraison</strong> · Sans engagement · Commandez quand vous voulez
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Caméra - Design moderne */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
            <div className="p-8">
              {/* Header avec dégradé */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                    📸 Scanner mon panier
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Prenez des photos de votre linge</p>
                </div>
                <button 
                  onClick={handleCancelReady} 
                  className="p-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Instructions stylées */}
              <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 mb-8 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                <div className="relative flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <AlertCircle size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-2">Comment ça marche ?</p>
                    <ol className="space-y-2 text-sm text-white/90">
                      <li className="flex items-center gap-2">
                        <span className="bg-white/20 backdrop-blur-sm w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <span>Prenez des photos de votre linge (optionnel)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-white/20 backdrop-blur-sm w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <span>Confirmez → nous serons notifiés instantanément</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-white/20 backdrop-blur-sm w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <span>Nous viendrons collecter lors de la prochaine tournée</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Caméra avec bordure stylée */}
              <div className="mb-8">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-2xl bg-gray-900 max-h-80 shadow-2xl border-4 border-white"
                  />
                  <div className="absolute inset-0 rounded-2xl border-4 border-primary-500/30 pointer-events-none"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={takePhoto}
                    className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all font-bold text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
                  >
                    <Camera size={24} className="group-hover:scale-110 transition-transform" />
                    <span>Prendre une photo</span>
                  </button>
                  <button
                    onClick={() => { stopCamera(); handleConfirmReady(); }}
                    className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all font-bold text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
                  >
                    <CheckCircle size={24} className="group-hover:scale-110 transition-transform" />
                    <span>Sans photo</span>
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                  <span className="text-xl">💡</span>
                  <span>Les photos aident notre équipe mais ne sont pas obligatoires</span>
                </p>
              </div>

              {/* Photos prises - Design moderne */}
              {photos.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                        {photos.length}
                      </span>
                      Photo{photos.length > 1 ? 's' : ''} capturée{photos.length > 1 ? 's' : ''}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="group relative">
                        <img 
                          src={photo} 
                          alt={`Photo ${index + 1}`} 
                          className="w-full h-28 object-cover rounded-xl border-2 border-gray-200 group-hover:border-primary-500 transition-all shadow-lg" 
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full p-2 hover:from-red-600 hover:to-red-700 shadow-lg hover:scale-110 transition-all"
                        >
                          <X size={18} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold">
                          Photo {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions - Design moderne */}
              <div className="flex gap-4">
                <button
                  onClick={handleCancelReady}
                  className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 py-4 rounded-2xl hover:from-gray-300 hover:to-gray-400 transition-all font-bold text-lg shadow-lg hover:scale-105 active:scale-95"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmReady}
                  className="group flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all font-black text-lg shadow-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
                >
                  <CheckCircle size={24} className="group-hover:scale-110 transition-transform" />
                  <span>Confirmer {photos.length > 0 && `(${photos.length} photo${photos.length > 1 ? 's' : ''})`}</span>
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                <span>✨</span>
                <span>Vous pouvez confirmer même sans photo</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
