'use client';

import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Lock, Package, Check, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/database';
import QRCodeLib from 'qrcode';

export default function InscriptionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    clientType: 'subscription' as 'subscription' | 'one-time',
    subscription: 'essentiel' as 'essentiel' | 'confort' | 'premium',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Next = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Next = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Créer le client
      const newClient = createClient({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        clientType: formData.clientType,
        subscription: formData.clientType === 'subscription' ? formData.subscription : undefined,
        active: true,
        joinDate: new Date().toISOString().split('T')[0],
      });

      // Sauvegarder le mot de passe (temporaire, en production utiliser un vrai système d'auth)
      const passwords = JSON.parse(localStorage.getItem('cpropre_passwords') || '{}');
      passwords[newClient.id] = formData.password;
      localStorage.setItem('cpropre_passwords', JSON.stringify(passwords));

      // Connecter automatiquement
      localStorage.setItem('cpropre_client_session', newClient.id);

      alert('✅ Compte créé avec succès !');
      router.push('/espace-client/dashboard');
    } catch (error) {
      alert('❌ Erreur lors de la création du compte');
      setLoading(false);
    }
  };

  const subscriptionOptions = [
    { 
      value: 'essentiel', 
      label: 'Essentiel', 
      capacity: '15L', 
      price: '29.90€/mois',
      description: 'Parfait pour 1-2 personnes',
      color: 'blue'
    },
    { 
      value: 'confort', 
      label: 'Confort', 
      capacity: '30L', 
      price: '49.90€/mois',
      description: 'Idéal pour une famille',
      color: 'primary',
      popular: true
    },
    { 
      value: 'premium', 
      label: 'Premium', 
      capacity: '50L', 
      price: '79.90€/mois',
      description: 'Pour les grandes familles',
      color: 'amber'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/espace-client" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            Retour
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Compte</span>
            <span>Coordonnées</span>
            <span>Abonnement</span>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Étape 1 : Compte */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Créez votre compte</h2>
                <p className="text-gray-600">Informations de connexion</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500`}
                  placeholder="Jean Dupont"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500`}
                  placeholder="jean.dupont@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock size={16} className="inline mr-2" />
                  Mot de passe *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock size={16} className="inline mr-2" />
                  Confirmer le mot de passe *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                onClick={handleStep1Next}
                className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition font-bold text-lg"
              >
                Continuer →
              </button>
            </div>
          )}

          {/* Étape 2 : Coordonnées */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Vos coordonnées</h2>
                <p className="text-gray-600">Pour la collecte et la livraison</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500`}
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Adresse complète *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500`}
                  placeholder="15 Rue des Lilas, 84110 Vaison-la-Romaine"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition font-bold"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleStep2Next}
                  className="flex-1 bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition font-bold"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* Étape 3 : Abonnement ou À la carte */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre formule</h2>
                <p className="text-gray-600">Abonnement mensuel ou service à la carte</p>
              </div>

              {/* Choix type de client */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, clientType: 'subscription' }))}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.clientType === 'subscription'
                      ? 'border-primary-600 bg-primary-50 shadow-lg'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <Package size={32} className={`mx-auto mb-3 ${formData.clientType === 'subscription' ? 'text-primary-600' : 'text-gray-400'}`} />
                  <h3 className="font-bold text-lg mb-1">Abonnement</h3>
                  <p className="text-sm text-gray-600">Collecte gratuite chaque semaine</p>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, clientType: 'one-time' }))}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.clientType === 'one-time'
                      ? 'border-primary-600 bg-primary-50 shadow-lg'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <CreditCard size={32} className={`mx-auto mb-3 ${formData.clientType === 'one-time' ? 'text-primary-600' : 'text-gray-400'}`} />
                  <h3 className="font-bold text-lg mb-1">À la carte</h3>
                  <p className="text-sm text-gray-600">Paiement par commande</p>
                </button>
              </div>

              {/* Formules abonnement */}
              {formData.clientType === 'subscription' && (
                <div className="space-y-4">
                {subscriptionOptions.map((sub) => (
                  <label
                    key={sub.value}
                    className={`relative cursor-pointer border-2 rounded-xl p-6 transition-all flex items-start gap-4 ${
                      formData.subscription === sub.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${sub.popular ? 'ring-2 ring-primary-400' : ''}`}
                  >
                    {sub.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                        ⭐ POPULAIRE
                      </div>
                    )}
                    <input
                      type="radio"
                      name="subscription"
                      value={sub.value}
                      checked={formData.subscription === sub.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${sub.color}-500 to-${sub.color}-600 flex items-center justify-center text-white font-bold text-xl`}>
                        {sub.capacity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{sub.label}</h3>
                      <p className="text-gray-600 text-sm mb-2">{sub.description}</p>
                      <p className="text-2xl font-bold text-primary-600">{sub.price}</p>
                    </div>
                    {formData.subscription === sub.value && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <Check size={20} className="text-white" />
                        </div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
              )}

              {/* Info abonnement */}
              {formData.clientType === 'subscription' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    ✓ Sans engagement · Modifiable à tout moment<br />
                    ✓ Collecte gratuite chaque semaine<br />
                    ✓ Suivi en temps réel de vos commandes
                  </p>
                </div>
              )}

              {/* Info à la carte */}
              {formData.clientType === 'one-time' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900 font-semibold mb-2">
                    💳 Service à la carte
                  </p>
                  <p className="text-sm text-amber-900">
                    ✓ Paiement par commande (pas d'abonnement)<br />
                    ✓ Tarifs : 35€ (15L) · 60€ (30L) · 95€ (50L)<br />
                    ✓ Commandez quand vous voulez
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition font-bold"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition font-bold disabled:bg-gray-400"
                >
                  {loading ? 'Création...' : 'Créer mon compte ✓'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Déjà un compte */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link href="/espace-client/connexion" className="text-primary-600 hover:text-primary-700 font-semibold">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
