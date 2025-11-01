'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getClientById, 
  createOrder,
  calculateOrderPrice,
  getSubscriptionPrice,
  getOneTimePrice,
  type Client 
} from '@/lib/database';
import { 
  ArrowLeft, 
  Save,
  Package,
  Calendar,
  Euro,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function NouvelleCommandePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    orderType: 'subscription' as 'subscription' | 'one-time',
    basketSize: '15L' as '15L' | '30L' | '50L',
    collectionDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    notes: ''
  });

  useEffect(() => {
    const clientData = getClientById(id);
    setClient(clientData);
    setLoading(false);

    // Calculer la date de livraison (lundi suivant par défaut)
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    setFormData(prev => ({
      ...prev,
      orderType: clientData?.clientType || 'subscription',
      deliveryDate: nextMonday.toISOString().split('T')[0]
    }));
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    if (!client) return 0;
    return calculateOrderPrice(
      formData.orderType,
      formData.basketSize,
      client.subscription
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!client) return;

    try {
      const newOrder = createOrder({
        clientId: client.id,
        basketSize: formData.basketSize,
        collectionDate: formData.collectionDate,
        deliveryDate: formData.deliveryDate,
        notes: formData.notes
      });

      if (newOrder) {
        alert('✅ Commande créée avec succès !');
        router.push(`/admin/clients/${client.id}`);
      } else {
        alert('❌ Erreur lors de la création de la commande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de la création');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Client non trouvé</p>
        <Link href="/admin/clients" className="text-primary-600 hover:text-primary-700 font-medium">
          Retour à la liste des clients
        </Link>
      </div>
    );
  }

  const price = calculatePrice();
  const isSubscription = client.clientType === 'subscription';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href={`/admin/clients/${client.id}`}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Commande</h1>
          <p className="text-gray-600 mt-1">Pour {client.name}</p>
        </div>
      </div>

      {/* Info client */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Package className="text-blue-600 mt-1" size={20} />
          <div className="flex-1">
            <p className="font-bold text-blue-900 mb-1">Type de client</p>
            {isSubscription ? (
              <div>
                <p className="text-blue-800">
                  <strong>Abonné {client.subscription}</strong>
                  {' - '}
                  {client.subscription === 'essentiel' && '15L'}
                  {client.subscription === 'confort' && '30L'}
                  {client.subscription === 'premium' && '50L'}
                  {' '}
                  ({getSubscriptionPrice(client.subscription || '')}€/mois)
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  ✅ Tarif abonnement inclus dans le forfait mensuel
                </p>
              </div>
            ) : (
              <div>
                <p className="text-blue-800"><strong>Client à la carte</strong></p>
                <p className="text-sm text-blue-700 mt-1">
                  💰 Paiement à la commande selon la taille du panier
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Type de commande */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Euro size={20} />
            Type de commande
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                formData.orderType === 'subscription'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="orderType"
                value="subscription"
                checked={formData.orderType === 'subscription'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <p className="font-bold text-lg mb-1">📦 Abonnement</p>
                <p className="text-sm text-gray-600">Inclus dans le forfait mensuel</p>
              </div>
              {formData.orderType === 'subscription' && (
                <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
            <label
              className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                formData.orderType === 'one-time'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="orderType"
                value="one-time"
                checked={formData.orderType === 'one-time'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <p className="font-bold text-lg mb-1">💳 À la carte</p>
                <p className="text-sm text-gray-600">Paiement ponctuel</p>
              </div>
              {formData.orderType === 'one-time' && (
                <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Choix du panier */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={20} />
            Taille du panier
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: '15L', label: 'Petit', capacity: '15L', subPrice: 29.90, oneTimePrice: 35.00, subscription: 'essentiel' },
              { value: '30L', label: 'Moyen', capacity: '30L', subPrice: 49.90, oneTimePrice: 60.00, subscription: 'confort' },
              { value: '50L', label: 'Grand', capacity: '50L', subPrice: 79.90, oneTimePrice: 95.00, subscription: 'premium' }
            ].map((basket) => {
              const isSelected = formData.basketSize === basket.value;
              
              // Si commande abonnement, vérifier si c'est la bonne taille pour ce client
              const isDisabled = formData.orderType === 'subscription' && 
                                 client?.subscription && 
                                 client.subscription !== basket.subscription;
              
              return (
                <label
                  key={basket.value}
                  className={`relative border-2 rounded-lg p-4 transition-all ${
                    isDisabled 
                      ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200'
                      : isSelected
                        ? 'border-primary-600 bg-primary-50 cursor-pointer'
                        : 'border-gray-300 hover:border-gray-400 cursor-pointer'
                  }`}
                >
                  <input
                    type="radio"
                    name="basketSize"
                    value={basket.value}
                    checked={isSelected}
                    onChange={handleChange}
                    disabled={isDisabled}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <p className="font-bold text-lg mb-1">{basket.label}</p>
                    <p className={`text-3xl font-black mb-2 ${isDisabled ? 'text-gray-400' : 'text-primary-600'}`}>
                      {basket.capacity}
                    </p>
                    <div className="text-sm">
                      {formData.orderType === 'subscription' ? (
                        <div>
                          <p className="text-gray-600">Abonnement</p>
                          {isDisabled ? (
                            <p className="text-xs text-red-600 font-semibold">Non inclus dans votre forfait</p>
                          ) : (
                            <>
                              <p className="font-bold text-green-600">INCLUS</p>
                              <p className="text-xs text-gray-500">(Forfait {basket.subPrice}€/mois)</p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-600">À la carte</p>
                          <p className="font-bold text-primary-600">{basket.oneTimePrice}€</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Date de collecte
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
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Date de livraison prévue
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

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={16} />
            Notes (optionnel)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Instructions spéciales, taches particulières, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Récapitulatif prix */}
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Euro size={20} />
              Total à payer
            </span>
            <span className="text-3xl font-black text-primary-600">{price.toFixed(2)}€</span>
          </div>
          {isSubscription ? (
            <p className="text-sm text-gray-600">
              ✅ Inclus dans l'abonnement mensuel {client.subscription}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              💳 Paiement à la livraison
            </p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex gap-4 pt-4 border-t">
          <Link
            href={`/admin/clients/${client.id}`}
            className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Save size={20} />
            Créer la commande
          </button>
        </div>
      </form>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-900 font-medium mb-2">💡 Information :</p>
        <ul className="text-yellow-800 space-y-1 text-sm list-disc list-inside">
          <li>La commande sera créée avec le statut "En attente"</li>
          <li>Le client pourra suivre sa commande avec son QR code</li>
          <li>Vous pourrez modifier le statut depuis le dashboard</li>
        </ul>
      </div>
    </div>
  );
}
