// Script pour créer des commandes factices
import { createClient, createOrder, getAllClients } from './database';

export const createTestOrders = () => {
  // Vérifier s'il y a déjà des clients
  let clients = getAllClients();
  
  // Créer des clients factices si nécessaire
  if (clients.length === 0) {
    const testClients = [
      {
        name: 'Marie Dubois',
        email: 'marie.dubois@email.fr',
        phone: '06 12 34 56 78',
        address: '15 Rue de la Paix, 75001 Paris',
        clientType: 'subscription' as const,
        subscription: 'confort' as const,
        joinDate: '2025-10-15',
        active: true,
      },
      {
        name: 'Pierre Martin',
        email: 'pierre.martin@email.fr',
        phone: '06 98 76 54 32',
        address: '42 Avenue des Champs, 75008 Paris',
        clientType: 'subscription' as const,
        subscription: 'premium' as const,
        joinDate: '2025-09-20',
        active: true,
      },
      {
        name: 'Sophie Lefebvre',
        email: 'sophie.lefebvre@email.fr',
        phone: '06 11 22 33 44',
        address: '8 Boulevard Saint-Michel, 75005 Paris',
        clientType: 'one-time' as const,
        subscription: undefined,
        joinDate: '2025-11-01',
        active: true,
      },
      {
        name: 'Jean Rousseau',
        email: 'jean.rousseau@email.fr',
        phone: '06 55 66 77 88',
        address: '23 Rue du Commerce, 75015 Paris',
        clientType: 'subscription' as const,
        subscription: 'essentiel' as const,
        joinDate: '2025-10-01',
        active: true,
      },
    ];

    testClients.forEach(client => {
      createClient(client);
    });

    clients = getAllClients();
    console.log(`✅ ${testClients.length} clients créés`);
  }

  // Créer des commandes pour chaque client
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const in3Days = new Date(today);
  in3Days.setDate(in3Days.getDate() + 3);
  const in5Days = new Date(today);
  in5Days.setDate(in5Days.getDate() + 5);

  let created = 0;

  clients.forEach((client, index) => {
    const basketSize = client.subscription === 'essentiel' ? '15L' : 
                       client.subscription === 'confort' ? '30L' : 
                       client.subscription === 'premium' ? '50L' : '30L';

    // Commande 1 : En attente de collecte (aujourd'hui)
    const order1 = createOrder({
      clientId: client.id,
      basketSize: basketSize as '15L' | '30L' | '50L',
      collectionDate: today.toISOString(),
      deliveryDate: in3Days.toISOString(),
      items: [
        {
          id: '1',
          type: 'Chemise',
          description: 'Chemise blanche',
          quantity: 3,
          price: 15,
        },
        {
          id: '2',
          type: 'Pantalon',
          description: 'Pantalon costume',
          quantity: 2,
          price: 20,
        },
      ],
      notes: 'À collecter aujourd\'hui',
    });
    if (order1) created++;

    // Commande 2 : Prêt pour livraison (pour certains clients)
    if (index % 2 === 0) {
      const order2 = createOrder({
        clientId: client.id,
        basketSize: basketSize as '15L' | '30L' | '50L',
        collectionDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        deliveryDate: tomorrow.toISOString(),
        items: [
          {
            id: '1',
            type: 'Robe',
            description: 'Robe de soirée',
            quantity: 1,
            price: 25,
          },
        ],
        notes: 'Prêt à livrer demain',
      });
      if (order2) {
        // Mettre à jour le statut à "ready"
        const orders = JSON.parse(localStorage.getItem('cpropre_orders') || '[]');
        const orderIndex = orders.findIndex((o: any) => o.id === order2.id);
        if (orderIndex !== -1) {
          orders[orderIndex].status = 'ready';
          orders[orderIndex].history.push({
            status: 'ready',
            date: new Date().toISOString(),
            note: 'Nettoyage terminé, prêt pour livraison',
          });
          localStorage.setItem('cpropre_orders', JSON.stringify(orders));
          created++;
        }
      }
    }

    // Commande 3 : En cours de traitement (pour certains clients)
    if (index % 3 === 0) {
      const order3 = createOrder({
        clientId: client.id,
        basketSize: basketSize as '15L' | '30L' | '50L',
        collectionDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        deliveryDate: in5Days.toISOString(),
        items: [
          {
            id: '1',
            type: 'Veste',
            description: 'Veste en cuir',
            quantity: 1,
            price: 35,
          },
        ],
        notes: 'En cours de nettoyage',
      });
      if (order3) {
        // Mettre à jour le statut à "processing" (anciennement in_progress)
        const orders = JSON.parse(localStorage.getItem('cpropre_orders') || '[]');
        const orderIndex = orders.findIndex((o: any) => o.id === order3.id);
        if (orderIndex !== -1) {
          orders[orderIndex].status = 'in_progress';
          orders[orderIndex].history.push({
            status: 'in_progress',
            date: new Date().toISOString(),
            note: 'Collecté, en cours de traitement',
          });
          localStorage.setItem('cpropre_orders', JSON.stringify(orders));
          created++;
        }
      }
    }
  });

  console.log(`✅ ${created} commandes créées`);
  return { clients: clients.length, orders: created };
};
