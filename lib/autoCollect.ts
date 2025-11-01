import { 
  getAllClients, 
  getAllOrders, 
  createOrder,
  getSubscriptionCapacity,
  type Client 
} from './database';

/**
 * Génère automatiquement les commandes de collecte pour tous les abonnés
 * À appeler chaque lundi (ou manuellement depuis le dashboard)
 */
export const generateWeeklyCollections = (): {
  created: number;
  skipped: number;
  errors: string[];
} => {
  const result = {
    created: 0,
    skipped: 0,
    errors: [] as string[]
  };

  try {
    // Récupérer tous les clients abonnés actifs
    const allClients = getAllClients();
    const subscribedClients = allClients.filter(
      c => c.active && c.clientType === 'subscription' && c.subscription
    );

    console.log(`📦 ${subscribedClients.length} client(s) abonné(s) trouvé(s)`);

    // Date de collecte : aujourd'hui
    const collectionDate = new Date();
    
    // Date de livraison : lundi prochain (7 jours plus tard)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    subscribedClients.forEach(client => {
      try {
        // Vérifier s'il n'a pas déjà une commande cette semaine
        const existingOrders = getAllOrders().filter(
          o => o.clientId === client.id && 
               o.status !== 'delivered' && 
               o.status !== 'cancelled'
        );

        if (existingOrders.length > 0) {
          console.log(`⚠️ ${client.name} a déjà une commande en cours, ignoré`);
          result.skipped++;
          return;
        }

        // Créer la commande automatique
        const basketSize = getSubscriptionCapacity(client.subscription!);
        
        const order = createOrder({
          clientId: client.id,
          basketSize: basketSize as '15L' | '30L' | '50L',
          collectionDate: collectionDate.toISOString().split('T')[0],
          deliveryDate: deliveryDate.toISOString().split('T')[0],
          items: [
            {
              id: `item-${Date.now()}-${client.id}`,
              type: 'Nettoyage pressing',
              description: `Panier ${basketSize} - Abonnement ${client.subscription}`,
              quantity: 1,
              price: 0
            }
          ],
          notes: '📅 Collecte automatique hebdomadaire (abonnement)'
        });

        if (order) {
          console.log(`✅ Commande créée pour ${client.name}`);
          result.created++;
        } else {
          result.errors.push(`Échec création commande pour ${client.name}`);
        }
      } catch (error) {
        const errorMsg = `Erreur pour ${client.name}: ${error}`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
      }
    });

    return result;
  } catch (error) {
    console.error('Erreur globale:', error);
    result.errors.push(`Erreur globale: ${error}`);
    return result;
  }
};

/**
 * Récupère la liste des clients à collecter aujourd'hui
 */
export const getTodayCollections = (): Client[] => {
  const allClients = getAllClients();
  const today = new Date().toISOString().split('T')[0];
  
  // Pour l'instant, tous les abonnés sont collectés le lundi
  const dayOfWeek = new Date().getDay(); // 0 = Dimanche, 1 = Lundi
  
  if (dayOfWeek === 1) { // Lundi
    return allClients.filter(
      c => c.active && c.clientType === 'subscription'
    );
  }
  
  return [];
};

/**
 * Vérifie si les collectes hebdomadaires ont été générées
 */
export const hasWeeklyCollectionsGenerated = (): boolean => {
  const lastGeneration = localStorage.getItem('cpropre_last_collection_generation');
  if (!lastGeneration) return false;
  
  const lastDate = new Date(lastGeneration);
  const today = new Date();
  
  // Vérifier si c'est la même semaine
  const getWeek = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };
  
  return getWeek(lastDate) === getWeek(today);
};

/**
 * Marque les collectes hebdomadaires comme générées
 */
export const markWeeklyCollectionsGenerated = (): void => {
  localStorage.setItem('cpropre_last_collection_generation', new Date().toISOString());
};
