'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, QrCode, User, Phone, Mail, MapPin, CreditCard, Package, Check } from 'lucide-react';
import Link from 'next/link';
import QRCodeLib from 'qrcode';
import { createClient, type Client } from '@/lib/database';

export default function NouveauClientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    clientType: 'subscription' as 'subscription' | 'one-time',
    subscription: 'essentiel' as 'essentiel' | 'confort' | 'premium',
    active: true,
    joinDate: new Date().toISOString().split('T')[0],
  });

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdClient, setCreatedClient] = useState<Client | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // Créer le client dans la base de données
      const newClient = createClient(formData);
      
      // Générer le QR code
      const qrUrl = await QRCodeLib.toDataURL(newClient.qrCode, {
        width: 400,
        margin: 2,
        color: {
          dark: '#059669',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeUrl(qrUrl);
      setCreatedClient(newClient);
      setShowSuccess(true);
    } catch (error) {
      console.error('Erreur création client:', error);
      alert('Erreur lors de la création du client');
    }
  };

  const downloadQRCode = () => {
    if (!createdClient) return;
    const link = document.createElement('a');
    link.download = `${createdClient.qrCode}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const printQRCode = () => {
    if (!createdClient) return;
    
    const printWindow = window.open('', '', 'width=600,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Carte Client - ${createdClient.name}</title>
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
                border: 3px solid #059669;
                padding: 40px;
                border-radius: 15px;
                background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
              }
              h1 {
                color: #059669;
                margin-bottom: 10px;
                font-size: 32px;
              }
              .subtitle {
                color: #666;
                margin-bottom: 30px;
                font-size: 18px;
              }
              .client-info {
                margin: 30px 0;
                text-align: left;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .info-row {
                margin: 10px 0;
                font-size: 16px;
              }
              .info-row strong {
                color: #059669;
                display: inline-block;
                width: 120px;
              }
              img {
                max-width: 100%;
                border: 5px solid #e5e7eb;
                border-radius: 15px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              }
              .qr-code {
                font-size: 20px;
                font-family: monospace;
                color: #059669;
                margin: 20px 0;
                font-weight: bold;
                letter-spacing: 2px;
              }
              .subscription-badge {
                display: inline-block;
                padding: 8px 20px;
                border-radius: 20px;
                font-weight: bold;
                margin: 10px 0;
                ${createdClient.subscription === 'premium' ? 'background: #fbbf24; color: #78350f;' :
                  createdClient.subscription === 'confort' ? 'background: #60a5fa; color: #1e3a8a;' :
                  'background: #e5e7eb; color: #374151;'}
              }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🧺 C'Propre</h1>
              <p class="subtitle">Votre pressing professionnel à domicile</p>
              
              <div class="client-info">
                <div class="info-row"><strong>Client :</strong> ${createdClient.name}</div>
                <div class="info-row"><strong>Téléphone :</strong> ${createdClient.phone}</div>
                ${createdClient.email ? `<div class="info-row"><strong>Email :</strong> ${createdClient.email}</div>` : ''}
                <div class="info-row"><strong>Adresse :</strong> ${createdClient.address}</div>
                <div class="info-row">
                  <strong>Formule :</strong> 
                  <span class="subscription-badge">
                    ${createdClient.subscription ? createdClient.subscription.charAt(0).toUpperCase() + createdClient.subscription.slice(1) : 'N/A'}
                  </span>
                </div>
              </div>
              
              <img src="${qrCodeUrl}" alt="QR Code Client" />
              <div class="qr-code">${createdClient.qrCode}</div>
              
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                <strong>Scannez ce QR code pour voir les commandes du client</strong><br>
                Client depuis le ${new Date(createdClient.joinDate).toLocaleDateString('fr-FR')}
              </p>
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

  const getSubscriptionDetails = (sub: string) => {
    switch(sub) {
      case 'essentiel': return { capacity: '15L', price: '29.90€' };
      case 'confort': return { capacity: '30L', price: '49.90€' };
      case 'premium': return { capacity: '50L', price: '79.90€' };
      default: return { capacity: '', price: '' };
    }
  };

  if (showSuccess && createdClient) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/admin/clients')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">✅ Client créé avec succès !</h1>
            <p className="text-gray-600 mt-1">Carte client générée</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 border-green-500 p-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
              <User size={48} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{createdClient.name}</h2>
            <p className="text-lg font-mono text-green-600 mt-2">{createdClient.qrCode}</p>
          </div>

          <div className="flex justify-center mb-6">
            <img src={qrCodeUrl} alt="QR Code" className="rounded-xl border-4 border-gray-200 shadow-lg" />
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Informations client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium text-gray-900">{createdClient.phone}</p>
              </div>
              {createdClient.email && (
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{createdClient.email}</p>
                </div>
              )}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium text-gray-900">{createdClient.address}</p>
              </div>
              {createdClient.subscription && (
                <div>
                  <p className="text-sm text-gray-500">Formule</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {createdClient.subscription} - {getSubscriptionDetails(createdClient.subscription).capacity} ({getSubscriptionDetails(createdClient.subscription).price}/mois)
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Date d'inscription</p>
                <p className="font-medium text-gray-900">
                  {new Date(createdClient.joinDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={downloadQRCode}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <QrCode size={20} />
              Télécharger QR
            </button>
            <button
              onClick={printQRCode}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🖨️ Imprimer carte
            </button>
            <Link
              href="/admin/clients"
              className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Voir tous les clients
            </Link>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-900 font-medium mb-2">📋 Prochaines étapes :</p>
          <ol className="text-green-800 space-y-1 text-sm list-decimal list-inside">
            <li>Imprimez ou téléchargez la carte client avec le QR code</li>
            <li>Remettez la carte au client</li>
            <li><strong>Scannez ce QR code pour voir les commandes du client</strong></li>
            <li>Créez de nouvelles commandes depuis la fiche client</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/clients"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Client</h1>
          <p className="text-gray-600 mt-1">Créer un nouveau client avec QR code unique</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations client */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} />
              Informations client
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Ex: Sophie Martin"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Ex: 06 12 34 56 78"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Ex: sophie.martin@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  Adresse de collecte *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Ex: 15 Rue des Lilas, 84110 Vaison-la-Romaine"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Type de client */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={20} />
              Type de client
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label
                className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                  formData.clientType === 'subscription'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="clientType"
                  value="subscription"
                  checked={formData.clientType === 'subscription'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <p className="font-bold text-lg mb-1">📦 Abonnement</p>
                  <p className="text-sm text-gray-600">Collecte hebdomadaire automatique</p>
                </div>
                {formData.clientType === 'subscription' && (
                  <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1">
                    <Check size={16} />
                  </div>
                )}
              </label>
              <label
                className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                  formData.clientType === 'one-time'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="clientType"
                  value="one-time"
                  checked={formData.clientType === 'one-time'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <p className="font-bold text-lg mb-1">💳 À la carte</p>
                  <p className="text-sm text-gray-600">Commandes ponctuelles</p>
                </div>
                {formData.clientType === 'one-time' && (
                  <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1">
                    <Check size={16} />
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Abonnement - Seulement si type subscription */}
          {formData.clientType === 'subscription' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={20} />
                Formule d'abonnement
              </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'essentiel', label: 'Essentiel', capacity: '15L', price: '29.90€', color: 'gray' },
                { value: 'confort', label: 'Confort', capacity: '30L', price: '49.90€', color: 'blue' },
                { value: 'premium', label: 'Premium', capacity: '50L', price: '79.90€', color: 'amber' },
              ].map((sub) => (
                <label
                  key={sub.value}
                  className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                    formData.subscription === sub.value
                      ? `border-${sub.color}-500 bg-${sub.color}-50`
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="subscription"
                    value={sub.value}
                    checked={formData.subscription === sub.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <p className="font-bold text-lg mb-1">{sub.label}</p>
                    <p className="text-2xl font-black text-primary-600 mb-1">{sub.capacity}</p>
                    <p className="text-sm text-gray-600">{sub.price}/mois</p>
                  </div>
                  {formData.subscription === sub.value && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
            </div>
          )}

          {/* Date d'inscription */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date d'inscription
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-4 pt-4 border-t">
            <Link
              href="/admin/clients"
              className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Save size={20} />
              Créer le client et générer le QR code
            </button>
          </div>
        </form>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-900 font-medium mb-2">💡 Fonctionnement :</p>
        <ul className="text-green-800 space-y-1 text-sm list-disc list-inside">
          <li>Un <strong>QR code unique</strong> sera généré automatiquement pour ce client</li>
          <li>Ce QR code servira pour toutes les <strong>commandes du client</strong></li>
          <li>Scannez-le pour accéder instantanément à sa fiche et ses commandes</li>
          <li>La carte client avec QR code pourra être imprimée et remise au client</li>
        </ul>
      </div>
    </div>
  );
}
