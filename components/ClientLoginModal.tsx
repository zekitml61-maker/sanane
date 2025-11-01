'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock, Shield, UserPlus, CheckCircle, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAllClients } from '@/lib/database';
import { initTestClient } from '@/lib/initTestData';

interface ClientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientLoginModal({ isOpen, onClose }: ClientLoginModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [testCreated, setTestCreated] = useState(false);
  const [crownClickCount, setCrownClickCount] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminFormData, setAdminFormData] = useState({
    email: '',
    password: ''
  });
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  const handleCrownClick = () => {
    setCrownClickCount(prev => prev + 1);
    
    // Si 3 clics sur la couronne en moins de 2 secondes → ouvrir mini modal admin
    if (crownClickCount >= 2) {
      setShowAdminLogin(true);
      setCrownClickCount(0);
    }
    
    // Réinitialiser le compteur après 2 secondes
    setTimeout(() => {
      setCrownClickCount(0);
    }, 2000);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);

    // Vérifier les identifiants admin
    if (adminFormData.email === 'oflu@live.fr' && adminFormData.password === 'Trfr1989') {
      // Authentification admin
      localStorage.setItem('adminSession', JSON.stringify({
        email: 'oflu@live.fr',
        role: 'admin',
        loginTime: new Date().toISOString()
      }));
      
      // Fermer les modals et rediriger
      setTimeout(() => {
        setShowAdminLogin(false);
        onClose();
        router.push('/admin');
      }, 1500);
    } else {
      setAdminError('Identifiants admin incorrects');
      setAdminLoading(false);
    }
  };

  // Réinitialiser le formulaire quand le modal se ferme
  useEffect(() => {
    if (!isOpen) {
      setFormData({ email: '', password: '' });
      setError('');
      setLoading(false);
      setTestCreated(false);
    }
  }, [isOpen]);

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
      const clients = getAllClients();
      const client = clients.find(c => c.email.toLowerCase() === formData.email.toLowerCase());

      if (!client) {
        setError('Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      const passwords = JSON.parse(localStorage.getItem('cpropre_passwords') || '{}');
      if (passwords[client.id] !== formData.password) {
        setError('Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      localStorage.setItem('cpropre_client_session', client.id);

      // Animation de sécurisation puis redirection
      setTimeout(() => {
        router.push('/espace-client/dashboard');
      }, 2500);
    } catch (err) {
      setError('Une erreur est survenue');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop ultra flou et sombre */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-primary-900/90 to-black/95 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* Modal glassmorphism moderne */}
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-md animate-slideUp overflow-hidden border border-white/20">
        {/* Header minimaliste avec effet glassmorphism */}
        <div className="relative p-8 pb-6">
          {/* Bouton X discret */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90 group"
          >
            <X size={20} className="text-gray-400 group-hover:text-gray-600" />
          </button>
          
          {/* Icône et titre élégants */}
          <div className="flex items-center gap-4 mb-2">
            <button
              type="button"
              onClick={handleCrownClick}
              className="relative group cursor-pointer"
              title={crownClickCount > 0 ? `${crownClickCount}/3 clics` : ''}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl blur-xl opacity-40 animate-pulse ${crownClickCount > 0 ? 'opacity-60' : ''}`}></div>
              <div className={`relative bg-gradient-to-br from-primary-600 to-blue-600 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform ${crownClickCount > 0 ? 'ring-2 ring-purple-400' : ''}`}>
                <Crown size={24} className="text-white" fill="white" />
              </div>
              {crownClickCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {crownClickCount}
                </div>
              )}
            </button>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Espace Client</h2>
              <p className="text-sm text-gray-500">Connexion sécurisée</p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">
                Mot de passe
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                {error}
              </div>
            )}

            {/* Bouton connexion moderne */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-4 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 font-bold text-base disabled:cursor-wait relative overflow-hidden group mt-6"
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

          {/* Compte de test - DEV ONLY */}
          {testCreated && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-xs font-semibold text-green-900 mb-2">✅ Compte de test créé !</p>
              <div className="space-y-1 text-xs text-green-800">
                <p><strong>Email:</strong> test@cpropre.fr</p>
                <p><strong>Mot de passe:</strong> test123</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              onClick={handleCreateTestAccount}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-xs font-semibold"
            >
              Créer compte test
            </button>
            <a 
              href="/espace-client/inscription"
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition text-xs font-semibold text-center"
            >
              S'inscrire
            </a>
          </div>

          {/* Badge sécurisé */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
            <Shield size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">Connexion chiffrée SSL 256-bit</span>
          </div>
        </div>
      </div>

      {/* Mini modal admin (popup dans popup) */}
      {showAdminLogin && (
        <div className="absolute inset-0 flex items-center justify-center z-10 animate-fadeIn">
          {/* Backdrop du mini modal */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAdminLogin(false)}
          ></div>

          {/* Mini formulaire admin */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-80 border-2 border-purple-300 animate-slideUp">
            {/* Header admin */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="text-purple-600" size={20} />
                <h3 className="text-lg font-black text-gray-900">Accès Admin</h3>
              </div>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Formulaire admin compact */}
            <form onSubmit={handleAdminSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Email Administrateur
                </label>
                <input
                  type="email"
                  value={adminFormData.email}
                  onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-sm"
                  placeholder="admin@cpropre.fr"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={adminFormData.password}
                  onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-sm"
                  placeholder="••••••••"
                  autoComplete="off"
                />
              </div>

              {adminError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {adminError}
                </div>
              )}

              <button
                type="submit"
                disabled={adminLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-bold text-sm disabled:cursor-wait"
              >
                {adminLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Shield className="animate-spin" size={16} />
                    Vérification...
                  </span>
                ) : (
                  '👑 Accéder au dashboard'
                )}
              </button>
            </form>

            {/* Badge sécurité */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Shield size={12} />
                Accès sécurisé
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
