'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  CreditCard, 
  Package, 
  Calendar,
  CheckCircle,
  Edit,
  PauseCircle,
  XCircle
} from 'lucide-react';
import { getClientById, updateClient, getSubscriptionPrice, getSubscriptionCapacity, type Client } from '@/lib/database';
import Link from 'next/link';

export default function MonAbonnementPage() {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [newSubscription, setNewSubscription] = useState<'essentiel' | 'confort' | 'premium'>('essentiel');

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
    setNewSubscription(clientData.subscription || 'essentiel');
    setLoading(false);
  }, [router]);

  const handleChangeSubscription = () => {
    if (!client) return;

    // Si client à la carte passe à un abonnement
    if (client.clientType === 'one-time') {
      updateClient(client.id, {
        clientType: 'subscription',
        subscription: newSubscription,
      });
      alert('🎉 Bienvenue dans votre abonnement ! Vous profitez maintenant de collectes gratuites chaque semaine.');
    } else {
      // Si abonné change de formule
      updateClient(client.id, {
        subscription: newSubscription,
      });
      alert('✅ Votre formule a été modifiée avec succès !');
    }

    const updated = getClientById(client.id);
    setClient(updated);
    setShowChangeModal(false);
  };

  const handlePause = () => {
    if (!client) return;
    
    if (confirm('Voulez-vous vraiment mettre en pause votre abonnement ?')) {
      updateClient(client.id, {
        active: false,
      });

      const updated = getClientById(client.id);
      setClient(updated);
      alert('✅ Votre abonnement est maintenant en pause');
    }
  };

  const handleResume = () => {
    if (!client) return;
    
    updateClient(client.id, {
      active: true,
    });

    const updated = getClientById(client.id);
    setClient(updated);
    alert('✅ Votre abonnement a été réactivé !');
  };

  if (loading || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const subscriptionDetails = {
    essentiel: { 
      name: 'Essentiel', 
      capacity: '15L', 
      price: getSubscriptionPrice('essentiel'),
      description: 'Parfait pour 1-2 personnes',
      color: 'blue'
    },
    confort: { 
      name: 'Confort', 
      capacity: '30L', 
      price: getSubscriptionPrice('confort'),
      description: 'Idéal pour une famille',
      color: 'primary'
    },
    premium: { 
      name: 'Premium', 
      capacity: '50L', 
      price: getSubscriptionPrice('premium'),
      description: 'Pour les grandes familles',
      color: 'amber'
    },
  };

  const currentSub = client.subscription ? subscriptionDetails[client.subscription] : null;

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Abonnement</h1>
          <p className="text-gray-600">Gérez votre formule et vos options</p>
        </div>

        {/* Statut - CLIENT À LA CARTE */}
        {client.clientType === 'one-time' && (
          <div className="rounded-xl p-6 mb-8 bg-amber-50 border-2 border-amber-500">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard size={32} className="text-amber-600" />
              <div>
                <h2 className="text-xl font-bold text-amber-900">Service à la carte</h2>
                <p className="text-amber-700">Vous payez par commande</p>
              </div>
            </div>
            <p className="text-sm text-amber-800 mb-4">
              💡 <strong>Passez à un abonnement</strong> et profitez de collectes gratuites chaque semaine + tarifs réduits !
            </p>
            <button
              onClick={() => setShowChangeModal(true)}
              className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-xl transition font-bold flex items-center justify-center gap-2"
            >
              <Package size={20} />
              Découvrir les abonnements
            </button>
          </div>
        )}

        {/* Statut - ABONNÉ */}
        {client.clientType === 'subscription' && (
          <div className={`rounded-xl p-6 mb-8 ${client.active ? 'bg-green-50 border-2 border-green-500' : 'bg-yellow-50 border-2 border-yellow-500'}`}>
            <div className="flex items-center gap-3">
              {client.active ? (
                <>
                  <CheckCircle size={32} className="text-green-600" />
                  <div>
                    <h2 className="text-xl font-bold text-green-900">Abonnement Actif</h2>
                    <p className="text-green-700">Collecte tous les lundis</p>
                  </div>
                </>
              ) : (
                <>
                  <PauseCircle size={32} className="text-yellow-600" />
                  <div>
                    <h2 className="text-xl font-bold text-yellow-900">Abonnement en Pause</h2>
                    <p className="text-yellow-700">Aucune collecte prévue</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Formule actuelle - POUR ABONNÉS */}
        {client.clientType === 'subscription' && currentSub && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ma Formule</h2>
            
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    Formule {currentSub.name}
                  </h3>
                  <p className="text-gray-600">{currentSub.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-600">
                    {currentSub.price}€
                  </p>
                  <p className="text-sm text-gray-600">par mois</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Capacité panier</p>
                  <p className="text-2xl font-bold text-gray-900">{currentSub.capacity}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Collecte</p>
                  <p className="text-lg font-bold text-gray-900">Tous les lundis</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowChangeModal(true)}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center gap-2"
            >
              <Edit size={20} />
              Changer de formule
            </button>
          </div>
        )}

        {/* Avantages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vos Avantages</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-gray-700">Collecte automatique tous les lundis</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-gray-700">Livraison sous 7 jours</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-gray-700">Suivi en temps réel</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-gray-700">Sans engagement</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-gray-700">Modifiable à tout moment</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
          <div className="space-y-3">
            {client.active ? (
              <button
                onClick={handlePause}
                className="w-full bg-yellow-100 text-yellow-800 py-3 rounded-lg hover:bg-yellow-200 transition font-semibold flex items-center justify-center gap-2"
              >
                <PauseCircle size={20} />
                Mettre en pause mon abonnement
              </button>
            ) : (
              <button
                onClick={handleResume}
                className="w-full bg-green-100 text-green-800 py-3 rounded-lg hover:bg-green-200 transition font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Réactiver mon abonnement
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal Changement de formule / Souscription abonnement */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {client.clientType === 'one-time' ? '✨ Choisissez votre abonnement' : 'Changer de formule'}
                  </h2>
                  {client.clientType === 'one-time' && (
                    <p className="text-sm text-gray-600 mt-1">Profitez de collectes gratuites chaque semaine</p>
                  )}
                </div>
                <button onClick={() => setShowChangeModal(false)} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={24} />
                </button>
              </div>

              {/* Info banner pour clients à la carte */}
              {client.clientType === 'one-time' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-green-800 font-semibold mb-2">🎉 Avantages de l'abonnement :</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Collecte gratuite chaque semaine (au lieu de payer par commande)</li>
                    <li>✓ Tarifs avantageux à partir de 29.90€/mois</li>
                    <li>✓ Sans engagement - modifiable ou résiliable à tout moment</li>
                  </ul>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {Object.entries(subscriptionDetails).map(([key, sub]) => (
                  <label
                    key={key}
                    className={`relative cursor-pointer border-2 rounded-xl p-6 transition-all flex items-center gap-4 ${
                      newSubscription === key
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="subscription"
                      value={key}
                      checked={newSubscription === key}
                      onChange={(e) => setNewSubscription(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${sub.color}-500 to-${sub.color}-600 flex items-center justify-center text-white font-bold text-lg`}>
                        {sub.capacity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{sub.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{sub.description}</p>
                      <p className="text-2xl font-bold text-primary-600">{sub.price}€/mois</p>
                    </div>
                    {newSubscription === key && (
                      <div className="flex-shrink-0">
                        <CheckCircle size={24} className="text-primary-600" />
                      </div>
                    )}
                  </label>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowChangeModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Annuler
                </button>
                <button
                  onClick={handleChangeSubscription}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-xl transition font-bold"
                >
                  {client.clientType === 'one-time' ? '✨ Souscrire à l\'abonnement' : 'Confirmer le changement'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
