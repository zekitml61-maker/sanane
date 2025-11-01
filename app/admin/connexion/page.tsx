'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminConnexionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [testCreated, setTestCreated] = useState(false);

  const handleCreateTestAdmin = () => {
    setTestCreated(true);
    setFormData({
      email: 'oflu@live.fr',
      password: 'Trfr1989'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Identifiants admin
    const ADMIN_EMAIL = 'oflu@live.fr';
    const ADMIN_PASSWORD = 'Trfr1989';

    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      // Créer une session admin
      localStorage.setItem('adminSession', JSON.stringify({
        email: ADMIN_EMAIL,
        role: 'admin',
        loginTime: new Date().toISOString()
      }));

      // Rediriger vers le dashboard admin
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-4 shadow-2xl">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Espace Administrateur</h1>
          <p className="text-gray-400">Connexion sécurisée</p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identifiant */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Administrateur
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                  placeholder="admin@cpropre.fr"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Accès rapide admin */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
            <p className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Shield size={20} />
              👑 Accès Rapide
            </p>
            {testCreated ? (
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 border border-purple-300">
                  <p className="text-xs font-semibold text-purple-900 mb-2">✅ Identifiants prêts !</p>
                  <div className="space-y-1 text-xs text-purple-800">
                    <p><strong>📧 Email:</strong> oflu@live.fr</p>
                    <p><strong>🔒 Mot de passe:</strong> Trfr1989</p>
                  </div>
                </div>
                <p className="text-xs text-purple-700">
                  Les identifiants ont été remplis automatiquement. Cliquez sur "Se connecter" !
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-purple-800 mb-3">
                  Accès administrateur rapide en 1 clic.
                </p>
                <button
                  type="button"
                  onClick={handleCreateTestAdmin}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-bold flex items-center justify-center gap-2"
                >
                  <Shield size={20} />
                  Remplir mes identifiants
                </button>
              </div>
            )}
          </div>

          {/* Lien retour */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>

        {/* Note de sécurité */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>🔒 Connexion sécurisée SSL</p>
        </div>
      </div>
    </div>
  );
}
