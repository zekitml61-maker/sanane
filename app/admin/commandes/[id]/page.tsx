'use client';

import { use, useEffect, useState } from 'react';
import { mockOrders } from '@/lib/mockData';
import { 
  ArrowLeft, 
  Download, 
  Edit, 
  Trash2,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import QRCode from 'qrcode';

export default function CommandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const order = mockOrders.find(o => o.id === id);

  useEffect(() => {
    if (order) {
      QRCode.toDataURL(order.qrCode, {
        width: 300,
        margin: 2,
        color: {
          dark: '#059669',
          light: '#FFFFFF'
        }
      }).then(setQrCodeUrl);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Commande non trouvée</p>
        <Link href="/admin/commandes" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Retour aux commandes
        </Link>
      </div>
    );
  }

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
      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `QR-${order.orderNumber}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/commandes"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
            <p className="text-gray-600 mt-1">Détails de la commande</p>
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
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statut */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Statut de la commande</h2>
            <div className="flex items-center justify-between">
              {getStatusBadge(order.status)}
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option value="pending">En attente</option>
                <option value="collected">Collecté</option>
                <option value="in_progress">En cours</option>
                <option value="ready">Prêt</option>
                <option value="delivered">Livré</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>

          {/* Articles */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={24} />
              Articles
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.description}</p>
                    <p className="text-sm text-gray-500">Quantité : {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900">{item.price}€</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-primary-600">{order.totalPrice}€</p>
              </div>
            </div>
          </div>

          {/* Historique */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={24} />
              Historique
            </h2>
            <div className="space-y-4">
              {order.history.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <CheckCircle size={16} className="text-primary-600" />
                    </div>
                    {index < order.history.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.note}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Notes spéciales</h3>
              <p className="text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QR Code */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">QR Code</h2>
            {qrCodeUrl && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img src={qrCodeUrl} alt="QR Code" className="rounded-lg border-4 border-gray-200" />
                </div>
                <p className="text-center text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded">
                  {order.qrCode}
                </p>
                <button 
                  onClick={downloadQRCode}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Download size={18} />
                  Télécharger QR Code
                </button>
              </div>
            )}
          </div>

          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User size={24} />
              Client
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-medium text-gray-900">{order.clientName}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                <p className="text-sm">{order.clientPhone}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={16} />
                <p className="text-sm">{order.clientEmail}</p>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin size={16} className="mt-1" />
                <p className="text-sm">{order.clientAddress}</p>
              </div>
              <div className="pt-3 border-t">
                <p className="text-sm text-gray-500">Abonnement</p>
                <p className="font-bold text-primary-600 capitalize">{order.subscription}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={24} />
              Dates
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Date de collecte</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.collectionDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de livraison prévue</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.deliveryDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Commande créée</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
