'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  QrCode as QrCodeIcon,
  Download,
  Edit,
  Save,
  X,
  Calendar,
  Shield
} from 'lucide-react';
import { getClientById, updateClient, type Client } from '@/lib/database';
import Link from 'next/link';
import QRCode from 'qrcode';

export default function ProfilPage() {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

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
    setFormData({
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      address: clientData.address,
    });

    // Générer le QR code
    generateQRCode(clientData.qrCode);
    setLoading(false);
  }, [router]);

  const generateQRCode = async (qrCode: string) => {
    try {
      const url = await QRCode.toDataURL(qrCode, {
        width: 300,
        margin: 2,
        color: {
          dark: '#059669',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Erreur génération QR:', error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!client) return;

    updateClient(client.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    });

    const updated = getClientById(client.id);
    setClient(updated);
    setEditing(false);
    alert('✅ Vos informations ont été mises à jour !');
  };

  const handleCancel = () => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      });
    }
    setEditing(false);
  };

  const downloadQRCode = () => {
    if (!client) return;
    const link = document.createElement('a');
    link.download = `QR-Code-${client.name}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const printQRCode = () => {
    if (!client) return;
    
    const printWindow = window.open('', '', 'width=600,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${client.name}</title>
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
                background: white;
              }
              h1 {
                color: #059669;
                margin-bottom: 10px;
                font-size: 28px;
              }
              .subtitle {
                color: #666;
                margin-bottom: 30px;
                font-size: 16px;
              }
              img {
                max-width: 300px;
                margin: 20px 0;
              }
              .qr-code {
                font-family: monospace;
                font-size: 18px;
                font-weight: bold;
                color: #059669;
                margin: 20px 0;
              }
              .info {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #059669;
              }
              .info-row {
                margin: 10px 0;
                color: #333;
              }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>C'Propre Pressing</h1>
              <div class="subtitle">Votre Carte Client</div>
              
              <img src="${qrCodeUrl}" alt="QR Code Client" />
              <div class="qr-code">${client.qrCode}</div>
              
              <div class="info">
                <div class="info-row"><strong>${client.name}</strong></div>
                <div class="info-row">${client.phone}</div>
                ${client.clientType === 'subscription' ? `<div class="info-row">Abonnement ${client.subscription}</div>` : ''}
              </div>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 100);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations personnelles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Informations personnelles</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    <Edit size={20} />
                    Modifier
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800"
                    >
                      <X size={18} />
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <Save size={18} />
                      Enregistrer
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Nom complet
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-lg">{client.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-lg">{client.email}</p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Téléphone
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-lg">{client.phone}</p>
                  )}
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Adresse
                  </label>
                  {editing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-lg">{client.address}</p>
                  )}
                </div>

                {/* Info compte */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar size={16} />
                    <span>Membre depuis le {new Date(client.joinDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield size={16} />
                    <span>Compte {client.active ? 'actif' : 'en pause'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Mon QR Code</h2>
              
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 mb-4">
                <div className="bg-white p-4 rounded-lg inline-block">
                  {qrCodeUrl && (
                    <img src={qrCodeUrl} alt="QR Code" className="w-full" />
                  )}
                </div>
                <p className="text-center mt-3 font-mono font-bold text-primary-600 text-sm">
                  {client.qrCode}
                </p>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Utilisez ce QR code pour :
              </p>
              <ul className="text-xs text-gray-600 space-y-2 mb-4 ml-4">
                <li>• Connexion rapide</li>
                <li>• Identification lors de la collecte</li>
                <li>• Suivi de vos commandes</li>
              </ul>

              <div className="space-y-2">
                <button
                  onClick={downloadQRCode}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  <Download size={20} />
                  Télécharger
                </button>
                <button
                  onClick={printQRCode}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  <QrCodeIcon size={20} />
                  Imprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sécurité</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
              <div className="font-semibold text-gray-900 mb-1">Changer mon mot de passe</div>
              <p className="text-sm text-gray-600">Modifiez votre mot de passe de connexion</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
