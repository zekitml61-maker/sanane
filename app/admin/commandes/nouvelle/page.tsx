'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, QrCode } from 'lucide-react';
import Link from 'next/link';
import QRCodeLib from 'qrcode';

export default function NouvelleCommandePage() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    subscription: 'essentiel',
    collectionDate: '',
    deliveryDate: '',
    notes: '',
  });

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    // Générer un numéro de commande unique
    const date = new Date();
    const year = date.getFullYear();
    const number = String(Math.floor(Math.random() * 9000) + 1000).padStart(3, '0');
    const newOrderNumber = `CMD-${year}-${number}`;
    const newQrCode = `QR-${newOrderNumber}`;
    
    setOrderNumber(newOrderNumber);
    setQrCode(newQrCode);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Générer le QR code
    const qrUrl = await QRCodeLib.toDataURL(qrCode, {
      width: 400,
      margin: 2,
      color: {
        dark: '#059669',
        light: '#FFFFFF'
      }
    });
    
    setQrCodeUrl(qrUrl);
    setShowQRCode(true);
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `${qrCode}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const printQRCode = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimer QR Code - ${orderNumber}</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
              }
              .container {
                text-align: center;
                border: 2px solid #059669;
                padding: 30px;
                border-radius: 10px;
              }
              h1 {
                color: #059669;
                margin-bottom: 10px;
              }
              .order-number {
                font-size: 24px;
                font-weight: bold;
                margin: 10px 0;
              }
              .qr-code {
                font-size: 16px;
                font-family: monospace;
                color: #666;
                margin-bottom: 20px;
              }
              img {
                max-width: 100%;
                border: 4px solid #e5e7eb;
                border-radius: 10px;
              }
              .client-info {
                margin-top: 20px;
                text-align: left;
                background: #f9fafb;
                padding: 15px;
                border-radius: 5px;
              }
              .info-row {
                margin: 5px 0;
              }
              @media print {
                body {
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>C'Propre - Pressing à domicile</h1>
              <div class="order-number">${orderNumber}</div>
              <div class="qr-code">${qrCode}</div>
              <img src="${qrCodeUrl}" alt="QR Code" />
              <div class="client-info">
                <div class="info-row"><strong>Client:</strong> ${formData.clientName}</div>
                <div class="info-row"><strong>Téléphone:</strong> ${formData.clientPhone}</div>
                <div class="info-row"><strong>Adresse:</strong> ${formData.clientAddress}</div>
                <div class="info-row"><strong>Formule:</strong> ${formData.subscription.charAt(0).toUpperCase() + formData.subscription.slice(1)}</div>
                <div class="info-row"><strong>Collecte:</strong> ${new Date(formData.collectionDate).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const getSubscriptionCapacity = (sub: string) => {
    switch(sub) {
      case 'essentiel': return '15L - 29.90€';
      case 'confort': return '30L - 49.90€';
      case 'premium': return '50L - 79.90€';
      default: return '';
    }
  };

  if (showQRCode) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowQRCode(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Commande créée avec succès !</h1>
            <p className="text-gray-600 mt-1">QR Code généré et prêt à être scanné</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 border-green-500 p-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
              <QrCode size={48} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{orderNumber}</h2>
            <p className="text-lg font-mono text-gray-600 mt-2">{qrCode}</p>
          </div>

          <div className="flex justify-center mb-6">
            <img src={qrCodeUrl} alt="QR Code" className="rounded-xl border-4 border-gray-200 shadow-lg" />
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Informations de la commande</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium text-gray-900">{formData.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium text-gray-900">{formData.clientPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{formData.clientEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Formule</p>
                <p className="font-medium text-gray-900 capitalize">
                  {formData.subscription} - {getSubscriptionCapacity(formData.subscription)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de collecte</p>
                <p className="font-medium text-gray-900">
                  {new Date(formData.collectionDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de livraison</p>
                <p className="font-medium text-gray-900">
                  {new Date(formData.deliveryDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              {formData.notes && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="font-medium text-gray-900">{formData.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={downloadQRCode}
              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <QrCode size={20} />
              Télécharger QR
            </button>
            <button
              onClick={printQRCode}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🖨️ Imprimer
            </button>
            <Link
              href="/admin/commandes"
              className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Voir toutes les commandes
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 font-medium mb-2">📱 Instructions :</p>
          <ol className="text-blue-800 space-y-1 text-sm list-decimal list-inside">
            <li>Téléchargez ou imprimez le QR code</li>
            <li>Remettez-le au client avec son linge</li>
            <li>Le client peut scanner ce code à tout moment pour suivre sa commande</li>
            <li>Vous pouvez aussi scanner ce code dans l'onglet "Scanner QR"</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/commandes"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Commande</h1>
          <p className="text-gray-600 mt-1">Créer une nouvelle commande avec QR code</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Numéro de commande */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-primary-700 mb-1">Numéro de commande</p>
            <p className="text-2xl font-bold text-primary-900">{orderNumber}</p>
            <p className="text-sm text-primary-600 font-mono mt-1">{qrCode}</p>
          </div>

          {/* Informations client */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Informations client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Sophie Martin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: 06 12 34 56 78"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: sophie.martin@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formule *
                </label>
                <select
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="essentiel">Essentiel - 15L (29.90€/mois)</option>
                  <option value="confort">Confort - 30L (49.90€/mois)</option>
                  <option value="premium">Premium - 50L (79.90€/mois)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse de collecte *
                </label>
                <input
                  type="text"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: 15 Rue des Lilas, 84110 Vaison-la-Romaine"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de collecte *
                </label>
                <input
                  type="date"
                  name="collectionDate"
                  value={formData.collectionDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de livraison prévue *
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes spéciales (optionnel)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Attention aux boutons fragiles..."
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-4">
            <Link
              href="/admin/commandes"
              className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Save size={20} />
              Créer la commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
