'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, AlertCircle, Truck, Sparkles, Crown } from 'lucide-react';
import Link from 'next/link';

type UserRole = 'admin' | 'livreur' | 'nettoyeur';

interface UserAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

const USERS: UserAccount[] = [
  {
    email: 'admin@cpropre.fr',
    password: 'Admin2025',
    role: 'admin',
    name: 'Administrateur'
  },
  {
    email: 'livreur@cpropre.fr',
    password: 'Livreur2025',
    role: 'livreur',
    name: 'Livreur'
  },
  {
    email: 'nettoyeur@cpropre.fr',
    password: 'Nettoyeur2025',
    role: 'nettoyeur',
    name: 'Nettoyeur'
  }
];

export default function AdminConnexionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const user = USERS.find(u => u.role === role);
    if (user) {
      setFormData({
        email: user.email,
        password: user.password
      });
    }
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = USERS.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      // Créer une session
      localStorage.setItem('adminSession', JSON.stringify({
        email: user.email,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString()
      }));

      // Rediriger vers le dashboard
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className="text-amber-600" size={32} />;
      case 'livreur':
        return <Truck className="text-blue-600" size={32} />;
      case 'nettoyeur':
        return <Sparkles className="text-green-600" size={32} />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'from-amber-500 to-orange-600';
      case 'livreur':
        return 'from-blue-500 to-blue-600';
      case 'nettoyeur':
        return 'from-green-500 to-green-600';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'livreur':
        return 'Livreur';
      case 'nettoyeur':
        return 'Nettoyeur';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-4 shadow-2xl">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Espace Équipe</h1>
          <p className="text-gray-400">Connexion sécurisée</p>
        </div>

        {!selectedRole ? (
          /* Sélection du rôle */
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Choisissez votre profil
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Admin */}
              <button
                onClick={() => handleRoleSelect('admin')}
                className="group relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Crown className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Administrateur</h3>
                  <p className="text-xs text-gray-600">Accès complet</p>
                </div>
              </button>

              {/* Livreur */}
              <button
                onClick={() => handleRoleSelect('livreur')}
                className="group relative bg-gradient-to-br from-blue-50 to-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Truck className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Livreur</h3>
                  <p className="text-xs text-gray-600">Collecte & Livraison</p>
                </div>
              </button>

              {/* Nettoyeur */}
              <button
                onClick={() => handleRoleSelect('nettoyeur')}
                className="group relative bg-gradient-to-br from-green-50 to-green-50 border-2 border-green-200 hover:border-green-400 rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Nettoyeur</h3>
                  <p className="text-xs text-gray-600">Pressing & Nettoyage</p>
                </div>
              </button>
            </div>

            {/* Lien retour */}
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        ) : (
          /* Formulaire de connexion */
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* En-tête avec rôle sélectionné */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${getRoleColor(selectedRole)} rounded-full shadow-lg`}>
                  {getRoleIcon(selectedRole)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{getRoleLabel(selectedRole)}</h2>
                  <p className="text-xs text-gray-600">Connexion</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setFormData({ email: '', password: '' });
                  setError('');
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Changer
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                    placeholder="votre@email.fr"
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
                className={`w-full bg-gradient-to-r ${getRoleColor(selectedRole)} text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
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

            {/* Info identifiants test */}
            <div className={`mt-6 bg-gradient-to-r ${getRoleColor(selectedRole).replace('from-', 'from-').replace('to-', 'to-').replace('500', '50').replace('600', '50')} border-2 ${selectedRole === 'admin' ? 'border-amber-200' : selectedRole === 'livreur' ? 'border-blue-200' : 'border-green-200'} rounded-xl p-4`}>
              <p className={`text-xs font-bold mb-2 ${selectedRole === 'admin' ? 'text-amber-900' : selectedRole === 'livreur' ? 'text-blue-900' : 'text-green-900'}`}>
                Identifiants pré-remplis
              </p>
              <div className="space-y-1 text-xs text-gray-700">
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Mot de passe:</strong> {formData.password}</p>
              </div>
              <p className={`text-xs mt-2 ${selectedRole === 'admin' ? 'text-amber-700' : selectedRole === 'livreur' ? 'text-blue-700' : 'text-green-700'}`}>
                Cliquez sur "Se connecter" pour accéder à votre espace
              </p>
            </div>

            {/* Lien retour */}
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        )}

        {/* Note de sécurité */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Connexion sécurisée SSL</p>
        </div>
      </div>
    </div>
  );
}
