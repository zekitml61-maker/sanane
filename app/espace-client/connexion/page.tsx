'use client';

import { useState } from 'react';
import { ArrowLeft, Mail, Lock, QrCode, UserPlus, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllClients } from '@/lib/database';
import { initTestClient } from '@/lib/initTestData';

export default function ConnexionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [testCreated, setTestCreated] = useState(false);

  const handleCreateTestAccount = () => {
    const client = initTestClient();
    if (client) {
      setTestCreated(true);
      setFormData({
        email: 'test@cpropre.fr',
        password: 'test123'
      });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Chercher le client par email
      const clients = getAllClients();
      const client = clients.find(c => c.email.toLowerCase() === formData.email.toLowerCase());

      if (!client) {
        setError('Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      // Vérifier le mot de passe
      const passwords = JSON.parse(localStorage.getItem('cpropre_passwords') || '{}');
      if (passwords[client.id] !== formData.password) {
        setError('Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      // Créer une session
      localStorage.setItem('cpropre_client_session', client.id);

      // Simuler une sécurisation du compte avec délai
      setTimeout(() => {
        router.push('/espace-client/dashboard');
      }, 2500); // 2.5 secondes pour l'animation
    } catch (err) {
      setError('Une erreur est survenue');
      setLoading(false);
    }
  };

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

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
            <p className="text-gray-600">Accédez à votre espace client</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="jean.dupont@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition font-bold text-lg disabled:bg-primary-600 disabled:cursor-wait relative overflow-hidden"
            >
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Shield className="animate-pulse" size={24} />
                      <div className="absolute inset-0 animate-ping">
                        <Shield size={24} className="opacity-50" />
                      </div>
                    </div>
                    <span className="animate-pulse">Sécurisation en cours...</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span>Chiffrement des données</span>
                  </div>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/espace-client/scan"
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              <QrCode size={20} />
              Se connecter avec mon QR Code
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Pas encore de compte ?{' '}
            <Link href="/espace-client/inscription" className="text-primary-600 hover:text-primary-700 font-semibold">
              S'inscrire
            </Link>
          </p>
        </div>

        {/* Compte de test */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <p className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
            <UserPlus size={20} />
            🚀 Compte de test rapide
          </p>
          {testCreated ? (
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-3 border border-green-300">
                <p className="text-xs font-semibold text-green-900 mb-2">✅ Compte créé avec succès !</p>
                <div className="space-y-1 text-xs text-green-800">
                  <p><strong>📧 Email:</strong> test@cpropre.fr</p>
                  <p><strong>🔑 Mot de passe:</strong> test123</p>
                </div>
              </div>
              <p className="text-xs text-green-700">
                Les identifiants ont été remplis automatiquement. Cliquez sur "Se connecter" !
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-green-800 mb-3">
                Pas encore de compte ? Créez un compte de test en 1 clic pour découvrir l'espace client.
              </p>
              <button
                type="button"
                onClick={handleCreateTestAccount}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center justify-center gap-2"
              >
                <UserPlus size={20} />
                Créer un compte de test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
