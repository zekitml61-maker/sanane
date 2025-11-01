'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getClientById, 
  getOrdersByClientId,
  updateOrderStatus,
  type Client, 
  type Order,
  getSubscriptionCapacity,
  getSubscriptionPrice
} from '@/lib/database';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  Package,
  Calendar,
  Edit,
  Trash2,
  Plus,
  QrCode as QrCodeIcon,
  Clock,
  Truck,
  CheckCircle,
  Home,
  ChevronRight,
  X as XIcon
} from 'lucide-react';
import Link from 'next/link';
import QRCodeLib from 'qrcode';

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientData();
  }, [id]);

  const loadClientData = async () => {
    setLoading(true);
    
    // Charger le client
    const clientData = getClientById(id);
    setClient(clientData);
    
    if (clientData) {
      // Générer le QR code
      const qrUrl = await QRCodeLib.toDataURL(clientData.qrCode, {
        width: 300,
        margin: 2,
        color: {
          dark: '#059669',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrUrl);
      
      // Charger les commandes du client
      const clientOrders = getOrdersByClientId(id);
      // Trier par date décroissante
      clientOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(clientOrders);
    }
    
    setLoading(false);
  };

  const downloadQRCode = () => {
    if (!client) return;
    const link = document.createElement('a');
    link.download = `${client.qrCode}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const getStatusInfo = (status: string) => {
    const statuses = {
      pending: { 
        label: 'En attente', 
        icon: Clock, 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        nextStatus: 'collected',
        nextLabel: 'Collecté',
        nextIcon: Package
      },
      collected: { 
        label: 'Collecté', 
        icon: Package, 
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        nextStatus: 'in_progress',
        nextLabel: 'En cours',
        nextIcon: Truck
      },
      in_progress: { 
        label: 'En cours', 
        icon: Truck, 
        color: 'bg-orange-100 text-orange-800 border-orange-300',
        nextStatus: 'ready',
        nextLabel: 'Prêt',
        nextIcon: CheckCircle
      },
      ready: { 
        label: 'Prêt', 
        icon: CheckCircle, 
        color: 'bg-green-100 text-green-800 border-green-300',
        nextStatus: 'delivered',
        nextLabel: 'Livré',
        nextIcon: Home
      },
      delivered: { 
        label: 'Livré', 
        icon: Home, 
        color: 'bg-gray-100 text-gray-800 border-gray-300',
        nextStatus: null,
        nextLabel: null,
        nextIcon: null
      },
      cancelled: { 
        label: 'Annulé', 
        icon: XIcon, 
        color: 'bg-red-100 text-red-800 border-red-300',
        nextStatus: null,
        nextLabel: null,
        nextIcon: null
      },
    };
    return statuses[status as keyof typeof statuses] || statuses.pending;
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    const statusInfo = getStatusInfo(newStatus);
    const updated = updateOrderStatus(orderId, newStatus as any, `Statut changé vers ${statusInfo.label}`);
    if (updated) {
      loadClientData();
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    const badges = {
      essentiel: 'bg-gray-100 text-gray-800',
      confort: 'bg-blue-100 text-blue-800',
      premium: 'bg-amber-100 text-amber-800',
    };
    const labels = {
      essentiel: 'Essentiel',
      confort: 'Confort',
      premium: 'Premium',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badges[subscription as keyof typeof badges]}`}>
        {labels[subscription as keyof typeof labels]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Client non trouvé</p>
        <Link href="/admin/clients" className="text-primary-600 hover:text-primary-700 font-medium">
          Retour à la liste des clients
        </Link>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/clients"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600 mt-1">Fiche client complète</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit size={18} />
            Modifier
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 size={18} />
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Infos client */}
        <div className="space-y-6">
          {/* QR Code */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <QrCodeIcon size={20} />
              QR Commande Client
            </h2>
            {qrCodeUrl && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img src={qrCodeUrl} alt="QR Code" className="rounded-lg border-2 border-gray-200" />
                </div>
                <p className="text-center text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded">
                  {client.qrCode}
                </p>
                <button 
                  onClick={downloadQRCode}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <QrCodeIcon size={18} />
                  Télécharger QR
                </button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Scannez pour voir les commandes
                </p>
              </div>
            )}
          </div>

          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} />
              Informations
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Statut</p>
                <p className={`font-bold ${client.active ? 'text-green-600' : 'text-red-600'}`}>
                  {client.active ? '✅ Actif' : '❌ Inactif'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Phone size={14} />
                  Téléphone
                </p>
                <p className="font-medium text-gray-900">{client.phone}</p>
              </div>
              
              {client.email && (
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                    <Mail size={14} />
                    Email
                  </p>
                  <p className="font-medium text-gray-900 break-all">{client.email}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <MapPin size={14} />
                  Adresse
                </p>
                <p className="font-medium text-gray-900">{client.address}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <CreditCard size={14} />
                  Formule
                </p>
                {client.subscription && getSubscriptionBadge(client.subscription)}
                <p className="text-sm text-gray-600 mt-1">
                  {client.subscription && (
                    <>{getSubscriptionCapacity(client.subscription)} • {getSubscriptionPrice(client.subscription)}€/mois</>
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Calendar size={14} />
                  Client depuis
                </p>
                <p className="font-medium text-gray-900">
                  {new Date(client.joinDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Statistiques</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total commandes</span>
                <span className="text-2xl font-bold text-primary-600">{orders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Livrées</span>
                <span className="text-2xl font-bold text-green-600">{completedOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">CA total</span>
                <span className="text-2xl font-bold text-emerald-600">{totalSpent.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content - Historique commandes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h2>
            <div className="flex gap-4">
              <Link
                href={`/admin/clients/${client.id}/nouvelle-commande`}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Plus size={20} />
                Nouvelle commande
              </Link>
            </div>
          </div>

          {/* Historique des commandes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Historique des commandes</h2>
              <span className="text-sm text-gray-500">{orders.length} commande(s)</span>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Aucune commande pour ce client</p>
                <Link
                  href={`/admin/clients/${client.id}/nouvelle-commande`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Plus size={18} />
                  Créer la première commande
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
                    {orders.map((order) => {
                      const statusInfo = getStatusInfo(order.status);
                      const StatusIcon = statusInfo.icon;
                      const NextIcon = statusInfo.nextIcon;
                      
                      return (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                            <div className="text-xs text-gray-500">🧺 {order.basketSize} • {order.totalPrice}€</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                              <StatusIcon size={14} />
                              {statusInfo.label}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>{new Date(order.collectionDate).toLocaleDateString('fr-FR')}</div>
                            <div className="text-xs text-gray-500">
                              Livraison: {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{order.totalPrice}€</div>
                            <div className="text-xs text-gray-500">{order.basketSize}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              {statusInfo.nextStatus && NextIcon && (
                                <button
                                  onClick={() => handleStatusUpdate(order.id, statusInfo.nextStatus!)}
                                  className="flex items-center gap-1 px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs font-medium"
                                  title={statusInfo.nextLabel || ''}
                                >
                                  <NextIcon size={14} />
                                  {statusInfo.nextLabel}
                                </button>
                              )}
                              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                <button
                                  onClick={() => {
                                    if (confirm('Annuler cette commande ?')) {
                                      handleStatusUpdate(order.id, 'cancelled');
                                    }
                                  }}
                                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-xs"
                                  title="Annuler"
                                >
                                  <XIcon size={14} />
                                </button>
                              )}
                            </div>
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
      </div>
    </div>
  );
}
