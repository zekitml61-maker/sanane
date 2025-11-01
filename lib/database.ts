// Système de base de données locale avec localStorage
import { v4 as uuidv4 } from 'uuid';

export interface Client {
  id: string;
  qrCode: string; // Code QR unique du client
  name: string;
  email: string;
  phone: string;
  address: string;
  clientType?: 'subscription' | 'one-time'; // Abonné ou à la carte (optionnel pour compatibilité)
  subscription?: 'essentiel' | 'confort' | 'premium'; // Si abonné
  joinDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string; // Référence au client
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientQRCode: string; // QR code du client (CLIENT-XXXX) - utilisé pour scanner
  clientType?: 'subscription' | 'one-time'; // Type de client (optionnel pour compatibilité)
  subscription?: 'essentiel' | 'confort' | 'premium'; // Si abonné
  basketSize?: '15L' | '30L' | '50L'; // Taille du panier (optionnel pour compatibilité)
  status: 'pending' | 'collected' | 'in_progress' | 'ready' | 'delivered' | 'cancelled';
  collectionDate: string;
  deliveryDate: string;
  items: OrderItem[];
  totalPrice: number;
  notes?: string;
  readyForCollection?: boolean; // Client a signalé qu'il est prêt
  readyAt?: string; // Date/heure où le client a signalé être prêt
  photos?: string[]; // Photos du linge (base64 ou URLs)
  history: OrderHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  type: string;
  description: string;
  quantity: number;
  price: number;
}

export interface OrderHistory {
  status: string;
  date: string;
  note?: string;
}

// Clés pour le localStorage
const CLIENTS_KEY = 'cpropre_clients';
const ORDERS_KEY = 'cpropre_orders';
const COUNTER_KEY = 'cpropre_counter';

// ==================== CLIENTS ====================

export const generateClientQRCode = (): string => {
  const uuid = uuidv4().split('-')[0].toUpperCase();
  return `CLIENT-${uuid}`;
};

export const getAllClients = (): Client[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(CLIENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getClientById = (id: string): Client | null => {
  const clients = getAllClients();
  return clients.find(c => c.id === id) || null;
};

export const getClientByQRCode = (qrCode: string): Client | null => {
  const clients = getAllClients();
  return clients.find(c => c.qrCode === qrCode) || null;
};

export const createClient = (clientData: Omit<Client, 'id' | 'qrCode' | 'createdAt' | 'updatedAt'>): Client => {
  const clients = getAllClients();
  
  const newClient: Client = {
    ...clientData,
    id: uuidv4(),
    qrCode: generateClientQRCode(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  clients.push(newClient);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  
  return newClient;
};

export const updateClient = (id: string, updates: Partial<Client>): Client | null => {
  const clients = getAllClients();
  const index = clients.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  clients[index] = {
    ...clients[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  return clients[index];
};

export const deleteClient = (id: string): boolean => {
  const clients = getAllClients();
  const filtered = clients.filter(c => c.id !== id);
  
  if (filtered.length === clients.length) return false;
  
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(filtered));
  return true;
};

// ==================== ORDERS ====================

export const generateOrderNumber = (): string => {
  const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0') + 1;
  localStorage.setItem(COUNTER_KEY, counter.toString());
  
  const year = new Date().getFullYear();
  const paddedCounter = String(counter).padStart(4, '0');
  return `CMD-${year}-${paddedCounter}`;
};

export const getAllOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getOrderById = (id: string): Order | null => {
  const orders = getAllOrders();
  return orders.find(o => o.id === id) || null;
};

export const getOrderByQRCode = (qrCode: string): Order | null => {
  const orders = getAllOrders();
  // Chercher par QR code client ou numéro de commande
  return orders.find(o => o.clientQRCode === qrCode || o.orderNumber === qrCode) || null;
};

export const getOrdersByClientId = (clientId: string): Order[] => {
  const orders = getAllOrders();
  return orders.filter(o => o.clientId === clientId);
};

export const createOrder = (orderData: {
  clientId: string;
  basketSize: '15L' | '30L' | '50L';
  collectionDate: string;
  deliveryDate: string;
  items?: OrderItem[];
  notes?: string;
}): Order | null => {
  const client = getClientById(orderData.clientId);
  if (!client) return null;
  
  const orders = getAllOrders();
  const orderNumber = generateOrderNumber();
  
  // Calculer le prix selon le type de client
  const totalPrice = calculateOrderPrice(
    client.clientType || 'subscription',
    orderData.basketSize,
    client.subscription
  );
  
  const newOrder: Order = {
    id: uuidv4(),
    orderNumber,
    clientId: client.id,
    clientQRCode: client.qrCode,
    clientName: client.name,
    clientEmail: client.email,
    clientPhone: client.phone,
    clientAddress: client.address,
    clientType: client.clientType || 'subscription',
    subscription: client.subscription,
    basketSize: orderData.basketSize,
    status: 'pending',
    collectionDate: orderData.collectionDate,
    deliveryDate: orderData.deliveryDate,
    items: orderData.items || [],
    totalPrice,
    notes: orderData.notes,
    history: [
      {
        status: 'pending',
        date: new Date().toISOString(),
        note: 'Commande créée',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  orders.push(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  
  return newOrder;
};

export const updateOrder = (id: string, updates: Partial<Order>): Order | null => {
  const orders = getAllOrders();
  const index = orders.findIndex(o => o.id === id);
  
  if (index === -1) return null;
  
  orders[index] = {
    ...orders[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders[index];
};

export const updateOrderStatus = (id: string, status: Order['status'], note?: string): Order | null => {
  const order = getOrderById(id);
  if (!order) return null;
  
  const newHistory: OrderHistory = {
    status,
    date: new Date().toISOString(),
    note,
  };
  
  return updateOrder(id, {
    status,
    history: [...order.history, newHistory],
  });
};

export const deleteOrder = (id: string): boolean => {
  const orders = getAllOrders();
  const filtered = orders.filter(o => o.id !== id);
  
  if (filtered.length === orders.length) return false;
  
  localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
  return true;
};

// Marquer une commande comme "prête à collecter"
export const markOrderReady = (orderId: string, photos?: string[]): Order | null => {
  const order = getOrderById(orderId);
  if (!order) return null;

  return updateOrder(orderId, {
    readyForCollection: true,
    readyAt: new Date().toISOString(),
    photos: photos || [],
  });
};

// Récupérer les commandes prêtes à collecter
export const getReadyOrders = (): Order[] => {
  const orders = getAllOrders();
  return orders.filter(o => o.readyForCollection && o.status === 'pending');
};

// ==================== UTILS ====================

// Charger les paramètres sauvegardés
const getSettings = () => {
  if (typeof window === 'undefined') return null;
  const settings = localStorage.getItem('cpropre_settings');
  return settings ? JSON.parse(settings) : null;
};

// Prix abonnements mensuels
export const getSubscriptionPrice = (subscription: string): number => {
  const settings = getSettings();
  if (settings?.pricing?.subscription) {
    switch (subscription) {
      case 'essentiel': return settings.pricing.subscription.essentiel;
      case 'confort': return settings.pricing.subscription.confort;
      case 'premium': return settings.pricing.subscription.premium;
      default: return 0;
    }
  }
  // Valeurs par défaut si pas de paramètres
  switch (subscription) {
    case 'essentiel': return 29.90;
    case 'confort': return 49.90;
    case 'premium': return 79.90;
    default: return 0;
  }
};

export const getSubscriptionCapacity = (subscription: string): string => {
  switch (subscription) {
    case 'essentiel': return '15L';
    case 'confort': return '30L';
    case 'premium': return '50L';
    default: return '';
  }
};

// Prix à la carte (sans abonnement)
export const getOneTimePrice = (basketSize: string): number => {
  const settings = getSettings();
  if (settings?.pricing?.oneTime) {
    switch (basketSize) {
      case '15L': return settings.pricing.oneTime.small;
      case '30L': return settings.pricing.oneTime.medium;
      case '50L': return settings.pricing.oneTime.large;
      default: return 0;
    }
  }
  // Valeurs par défaut si pas de paramètres
  switch (basketSize) {
    case '15L': return 35.00;
    case '30L': return 60.00;
    case '50L': return 95.00;
    default: return 0;
  }
};

// Calculer le prix d'une commande
export const calculateOrderPrice = (
  clientType: 'subscription' | 'one-time',
  basketSize: '15L' | '30L' | '50L',
  subscription?: 'essentiel' | 'confort' | 'premium'
): number => {
  if (clientType === 'subscription') {
    // Les commandes d'abonnement sont INCLUSES dans le forfait mensuel → 0€
    return 0;
  } else {
    return getOneTimePrice(basketSize);
  }
};

// ==================== INIT / SEED ====================

export const initDatabase = () => {
  // Initialiser avec les données mock si vide
  const clients = getAllClients();
  const orders = getAllOrders();
  
  if (clients.length === 0 && orders.length === 0) {
    console.log('📦 Initialisation de la base de données avec données de test...');
    // On peut ajouter des données de test ici si besoin
  }
};

// ==================== EXPORT / IMPORT ====================

export const exportData = () => {
  const data = {
    clients: getAllClients(),
    orders: getAllOrders(),
    exportDate: new Date().toISOString(),
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cpropre-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = (jsonData: string) => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.clients) {
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(data.clients));
    }
    
    if (data.orders) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(data.orders));
    }
    
    return true;
  } catch (error) {
    console.error('Erreur import:', error);
    return false;
  }
};

// Marquer une commande comme collectée (scanner du livreur)
export const markOrderCollected = (orderId: string): Order | null => {
  const orders = getAllOrders();
  const index = orders.findIndex(o => o.id === orderId);
  
  if (index === -1) return null;
  
  orders[index] = {
    ...orders[index],
    status: 'collected',
    readyForCollection: false,
    updatedAt: new Date().toISOString(),
    history: [
      ...orders[index].history,
      {
        status: 'collected',
        date: new Date().toISOString(),
        note: '🚚 Panier collecté par le livreur',
      }
    ]
  };
  
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders[index];
};

// Récupérer la commande prête d'un client (pour le scanner)
// IMPORTANT: Doit être ready ET pas encore collectée (status = 'pending')
export const getReadyOrderByClientId = (clientId: string): Order | null => {
  const orders = getAllOrders();
  const readyOrders = orders.filter(o => 
    o.clientId === clientId && 
    o.readyForCollection === true && 
    o.status === 'pending'
  );
  
  if (readyOrders.length === 0) return null;
  
  // S'il y a plusieurs commandes ready, prendre la plus récente
  readyOrders.sort((a, b) => new Date(b.readyAt || b.createdAt).getTime() - new Date(a.readyAt || a.createdAt).getTime());
  return readyOrders[0];
};

// Récupérer la commande collectée LA PLUS RÉCENTE d'un client (pour la livraison)
export const getCollectedOrderByClientId = (clientId: string): Order | null => {
  const orders = getAllOrders();
  const collectedOrders = orders.filter(o => o.clientId === clientId && o.status === 'collected');
  
  if (collectedOrders.length === 0) return null;
  
  // Trier par date de création décroissante et prendre la plus récente
  collectedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return collectedOrders[0];
};

// Marquer une commande comme livrée (scanner du livreur)
export const markOrderDelivered = (orderId: string): Order | null => {
  const orders = getAllOrders();
  const index = orders.findIndex(o => o.id === orderId);
  
  if (index === -1) return null;
  
  orders[index] = {
    ...orders[index],
    status: 'delivered',
    updatedAt: new Date().toISOString(),
    history: [
      ...orders[index].history,
      {
        status: 'delivered',
        date: new Date().toISOString(),
        note: '✅ Linge livré au client',
      }
    ]
  };
  
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders[index];
};

export const clearAllData = () => {
  localStorage.removeItem(CLIENTS_KEY);
  localStorage.removeItem(ORDERS_KEY);
  localStorage.removeItem(COUNTER_KEY);
};
