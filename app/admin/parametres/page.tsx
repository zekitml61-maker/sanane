'use client';

import { useState, useEffect } from 'react';
import { Save, Building, Mail, Phone, MapPin, Clock, Euro, Package, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';

interface Settings {
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  hours: {
    [key: string]: string;
  };
  pricing: {
    subscription: {
      essentiel: number;
      confort: number;
      premium: number;
    };
    oneTime: {
      small: number;
      medium: number;
      large: number;
    };
  };
  collectionDays: string[];
  deliveryDelay: number;
}

const DEFAULT_SETTINGS: Settings = {
  company: {
    name: "C'Propre",
    email: "c.propre84@gmail.com",
    phone: "07 56 95 86 94",
    address: "Vaison-la-Romaine, 84110, France"
  },
  hours: {
    'Lundi': '8h00 - 19h00',
    'Mardi': '8h00 - 19h00',
    'Mercredi': '8h00 - 19h00',
    'Jeudi': '8h00 - 19h00',
    'Vendredi': '8h00 - 19h00',
    'Samedi': '8h00 - 19h00',
    'Dimanche': 'Fermé'
  },
  pricing: {
    subscription: {
      essentiel: 29.90,
      confort: 49.90,
      premium: 79.90
    },
    oneTime: {
      small: 35.00,
      medium: 60.00,
      large: 95.00
    }
  },
  collectionDays: ['Lundi'],
  deliveryDelay: 7
};

export default function ParametresPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem('cpropre_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('cpropre_settings', JSON.stringify(settings));
      setSaved(true);
      alert('✅ Paramètres sauvegardés avec succès !');
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert('❌ Erreur lors de la sauvegarde : ' + error);
    }
  };

  const updateCompany = (field: keyof Settings['company'], value: string) => {
    setSettings(prev => ({
      ...prev,
      company: { ...prev.company, [field]: value }
    }));
  };

  const updateHours = (day: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      hours: { ...prev.hours, [day]: value }
    }));
  };

  const updateSubscriptionPrice = (plan: keyof Settings['pricing']['subscription'], value: number) => {
    setSettings(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        subscription: { ...prev.pricing.subscription, [plan]: value }
      }
    }));
  };

  const updateOneTimePrice = (size: keyof Settings['pricing']['oneTime'], value: number) => {
    setSettings(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        oneTime: { ...prev.pricing.oneTime, [size]: value }
      }
    }));
  };

  const toggleCollectionDay = (day: string) => {
    setSettings(prev => ({
      ...prev,
      collectionDays: prev.collectionDays.includes(day)
        ? prev.collectionDays.filter(d => d !== day)
        : [...prev.collectionDays, day]
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configuration de l'entreprise et des services</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg animate-pulse">
            <CheckCircle2 size={20} />
            <span className="font-medium">Sauvegardé !</span>
          </div>
        )}
      </div>

      {/* Informations entreprise */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Building size={24} className="text-primary-600" />
          Informations de l'entreprise
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={settings.company.name}
              onChange={(e) => updateCompany('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                Email
              </label>
              <input
                type="email"
                value={settings.company.email}
                onChange={(e) => updateCompany('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Téléphone
              </label>
              <input
                type="tel"
                value={settings.company.phone}
                onChange={(e) => updateCompany('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin size={16} className="inline mr-1" />
              Adresse
            </label>
            <input
              type="text"
              value={settings.company.address}
              onChange={(e) => updateCompany('address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Tarifs ABONNEMENTS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Package size={24} className="text-blue-600" />
          Tarifs des abonnements mensuels
        </h2>
        <p className="text-sm text-gray-600 mb-6">Prix récurrents mensuels pour les clients abonnés</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              🧺 Essentiel (15L/mois)
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.pricing.subscription.essentiel}
                onChange={(e) => updateSubscriptionPrice('essentiel', parseFloat(e.target.value))}
                step="0.10"
                className="w-full px-4 py-3 pr-8 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-bold"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">€</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <label className="block text-sm font-bold text-blue-900 mb-2">
              🧺🧺 Confort (30L/mois)
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.pricing.subscription.confort}
                onChange={(e) => updateSubscriptionPrice('confort', parseFloat(e.target.value))}
                step="0.10"
                className="w-full px-4 py-3 pr-8 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-bold"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">€</span>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-300">
            <label className="block text-sm font-bold text-amber-900 mb-2">
              🧺🧺🧺 Premium (50L/mois)
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.pricing.subscription.premium}
                onChange={(e) => updateSubscriptionPrice('premium', parseFloat(e.target.value))}
                step="0.10"
                className="w-full px-4 py-3 pr-8 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg font-bold"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">€</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarifs À LA CARTE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Euro size={24} className="text-green-600" />
          Tarifs sans abonnement (à la carte)
        </h2>
        <p className="text-sm text-gray-600 mb-6">Prix par commande unique pour les clients non-abonnés</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
            <label className="block text-sm font-bold text-green-900 mb-2">
              🧺 Petit panier (15L)
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.pricing.oneTime.small}
                onChange={(e) => updateOneTimePrice('small', parseFloat(e.target.value))}
                step="0.10"
                className="w-full px-4 py-3 pr-8 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-bold"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">€</span>
            </div>
            <p className="text-xs text-green-700 mt-2">Prix par commande</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
            <label className="block text-sm font-bold text-green-900 mb-2">
              🧺🧺 Moyen panier (30L)
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.pricing.oneTime.medium}
                onChange={(e) => updateOneTimePrice('medium', parseFloat(e.target.value))}
                step="0.10"
                className="w-full px-4 py-3 pr-8 border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg font-bold"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">€</span>
            </div>
            <p className="text-xs text-green-700 mt-2">Prix par commande</p>
          </div>

          <div className="bg-green-200 p-4 rounded-lg border-2 border-green-500">
            <label className="block text-sm font-bold text-green-900 mb-2">
              🧺🧺🧺 Grand panier (50L)
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.pricing.oneTime.large}
                onChange={(e) => updateOneTimePrice('large', parseFloat(e.target.value))}
                step="0.10"
                className="w-full px-4 py-3 pr-8 border-2 border-green-500 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-lg font-bold"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">€</span>
            </div>
            <p className="text-xs text-green-700 mt-2">Prix par commande</p>
          </div>
        </div>
      </div>

      {/* Horaires */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock size={24} className="text-orange-600" />
          Horaires d'ouverture
        </h2>
        
        <div className="space-y-3">
          {Object.entries(settings.hours).map(([day, hours]) => (
            <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900 w-24">{day}</span>
              <input
                type="text"
                value={hours}
                onChange={(e) => updateHours(day, e.target.value)}
                className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Délai de livraison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Package size={24} className="text-red-600" />
          Délai de livraison
        </h2>
        <p className="text-sm text-gray-600 mb-6">Nombre de jours entre la collecte et la livraison</p>
        
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={settings.deliveryDelay}
            onChange={(e) => setSettings(prev => ({ ...prev, deliveryDelay: parseInt(e.target.value) || 7 }))}
            min="1"
            max="30"
            className="w-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg font-bold text-center"
          />
          <span className="text-gray-700 font-medium">jours</span>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-primary-300 rounded-xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <AlertCircle size={20} className="text-orange-500" />
            <span className="font-medium">Pensez à sauvegarder vos modifications</span>
          </div>
          <button
            onClick={handleSave}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary-600 text-white px-10 py-4 rounded-xl hover:bg-primary-700 active:bg-primary-800 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <Save size={24} />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
