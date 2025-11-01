'use client';

import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, AlertCircle, Calendar, User, Plus, QrCode, MapPin, Navigation } from 'lucide-react';
import { getAllOrders, type Order } from '@/lib/database';
import { createTestOrders } from '@/lib/createTestOrders';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MesCommandesPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'ready' | 'delivered'>('all');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (session) {
      const sessionData = JSON.parse(session);
      setUserRole(sessionData.role || '');
    }
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = getAllOrders();
    setOrders(allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const handleCreateTestOrders = () => {
    if (confirm('Créer des commandes de test ?\n\nCela créera des clients et commandes factices pour tester l\'interface.')) {
      const result = createTestOrders();
      alert(`✅ Commandes créées !\n\n${result.clients} clients\n${result.orders} commandes`);
      loadOrders();
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    // Mapper les anciens statuts aux nouveaux
    const mappedStatus = order.status === 'in_progress' ? 'processing' : 
                        order.status === 'collected' ? 'processing' : order.status;
    return mappedStatus === filter;
  });

  const getStatusInfo = (status: string) => {
    // Mapper les anciens statuts
    const mappedStatus = status === 'in_progress' ? 'processing' : 
                        status === 'collected' ? 'processing' : status;
    
    switch (mappedStatus) {
      case 'pending':
        return { 
          label: 'En attente de collecte', 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-600'
        };
      case 'processing':
        return { 
          label: 'En cours de traitement', 
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: Package,
          iconColor: 'text-orange-600'
        };
      case 'ready':
        return { 
          label: 'Prêt pour livraison', 
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Truck,
          iconColor: 'text-purple-600'
        };
      case 'delivered':
        return { 
          label: 'Livré', 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      default:
        return { 
          label: status, 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertCircle,
          iconColor: 'text-gray-600'
        };
    }
  };

  const getOrderTypeLabel = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'Abonnement';
      case 'one-time':
        return 'À la carte';
      default:
        return type;
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing' || o.status === 'in_progress' || o.status === 'collected').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              Mes Commandes
            </h1>
            <p className="text-gray-600">
              {userRole === 'livreur' && 'Gérez les collectes et livraisons'}
              {userRole === 'nettoyeur' && 'Gérez le traitement des commandes'}
              {userRole === 'admin' && 'Vue d\'ensemble de toutes les commandes'}
            </p>
          </div>
          
          <div className="flex gap-2">
            {/* Bouton Scanner QR Code */}
            <button
              onClick={() => router.push('/admin/scanner')}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-bold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <QrCode size={24} />
              <span>Scanner QR Code</span>
            </button>
            
            {/* Bouton créer commandes test */}
            {orders.length === 0 && (
              <button
                onClick={handleCreateTestOrders}
                className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
              >
                <Plus size={20} />
                <span className="hidden md:inline">Créer des commandes test</span>
                <span className="md:hidden">Test</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === 'all' 
              ? 'bg-primary-50 border-primary-500' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-black text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600 mt-1">Total</div>
        </button>
        
        <button
          onClick={() => setFilter('pending')}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === 'pending' 
              ? 'bg-blue-50 border-blue-500' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-black text-blue-600">{stats.pending}</div>
          <div className="text-xs text-gray-600 mt-1">En attente</div>
        </button>
        
        <button
          onClick={() => setFilter('processing')}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === 'processing' 
              ? 'bg-orange-50 border-orange-500' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-black text-orange-600">{stats.processing}</div>
          <div className="text-xs text-gray-600 mt-1">En cours</div>
        </button>
        
        <button
          onClick={() => setFilter('ready')}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === 'ready' 
              ? 'bg-purple-50 border-purple-500' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-black text-purple-600">{stats.ready}</div>
          <div className="text-xs text-gray-600 mt-1">Prêt</div>
        </button>
        
        <button
          onClick={() => setFilter('delivered')}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === 'delivered' 
              ? 'bg-green-50 border-green-500' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-black text-green-600">{stats.delivered}</div>
          <div className="text-xs text-gray-600 mt-1">Livré</div>
        </button>
      </div>

      {/* Liste des commandes */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium">
              {filter === 'all' ? 'Aucune commande' : 'Aucune commande avec ce statut'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 md:p-6 border-2 border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Info principale */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${statusInfo.color.replace('text-', 'bg-').replace('800', '100')}`}>
                        <StatusIcon className={statusInfo.iconColor} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            Commande #{order.trackingCode}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusInfo.color} border`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {order.clientName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-semibold">
                            {getOrderTypeLabel(order.orderType)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Détails */}
                    {order.items && order.items.length > 0 && (
                      <div className="text-sm text-gray-600 ml-11">
                        <strong>{order.items.length} article(s)</strong>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row gap-2">
                    {/* Bouton Navigation Google Maps */}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.clientAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-sm"
                    >
                      <Navigation size={16} />
                      <span>Navigation</span>
                    </a>
                    
                    <Link
                      href={`/admin/commandes/${order.id}`}
                      className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-sm"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
