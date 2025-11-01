export type OrderStatus = 'pending' | 'collected' | 'in_progress' | 'ready' | 'delivered' | 'cancelled';
export type SubscriptionType = 'essentiel' | 'confort' | 'premium';

export interface Order {
  id: string;
  orderNumber: string;
  qrCode: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  subscription: SubscriptionType;
  status: OrderStatus;
  collectionDate: string;
  deliveryDate: string;
  items: OrderItem[];
  totalPrice: number;
  notes?: string;
  history: OrderHistory[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  type: string; // 'pressing', 'dry_cleaning', 'ironing', etc.
  description: string;
  quantity: number;
  price: number;
}

export interface OrderHistory {
  status: OrderStatus;
  date: string;
  note?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscription: SubscriptionType;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

// Mock data
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'CMD-2025-001',
    qrCode: 'QR-CMD-2025-001',
    clientName: 'Sophie Martin',
    clientEmail: 'sophie.martin@email.com',
    clientPhone: '06 12 34 56 78',
    clientAddress: '15 Rue des Lilas, 84110 Vaison-la-Romaine',
    subscription: 'premium',
    status: 'in_progress',
    collectionDate: '2025-10-27',
    deliveryDate: '2025-10-30',
    items: [
      { id: '1', type: 'pressing', description: 'Chemise blanche', quantity: 3, price: 15 },
      { id: '2', type: 'dry_cleaning', description: 'Costume', quantity: 1, price: 25 },
      { id: '3', type: 'ironing', description: 'Pantalon', quantity: 2, price: 8 },
    ],
    totalPrice: 48,
    notes: 'Attention aux boutons de la chemise',
    history: [
      { status: 'pending', date: '2025-10-25T10:00:00', note: 'Commande créée' },
      { status: 'collected', date: '2025-10-27T08:30:00', note: 'Linge collecté' },
      { status: 'in_progress', date: '2025-10-27T14:00:00', note: 'En cours de traitement' },
    ],
    createdAt: '2025-10-25T10:00:00',
  },
  {
    id: '2',
    orderNumber: 'CMD-2025-002',
    qrCode: 'QR-CMD-2025-002',
    clientName: 'Thomas Dubois',
    clientEmail: 'thomas.dubois@email.com',
    clientPhone: '06 98 76 54 32',
    clientAddress: '42 Avenue du Marché, 84110 Vaison-la-Romaine',
    subscription: 'confort',
    status: 'ready',
    collectionDate: '2025-10-20',
    deliveryDate: '2025-10-23',
    items: [
      { id: '1', type: 'pressing', description: 'Robe de soirée', quantity: 1, price: 30 },
      { id: '2', type: 'dry_cleaning', description: 'Manteau', quantity: 1, price: 35 },
    ],
    totalPrice: 65,
    history: [
      { status: 'pending', date: '2025-10-18T14:00:00', note: 'Commande créée' },
      { status: 'collected', date: '2025-10-20T08:30:00', note: 'Linge collecté' },
      { status: 'in_progress', date: '2025-10-20T15:00:00', note: 'En cours de traitement' },
      { status: 'ready', date: '2025-10-23T10:00:00', note: 'Prêt pour livraison' },
    ],
    createdAt: '2025-10-18T14:00:00',
  },
  {
    id: '3',
    orderNumber: 'CMD-2025-003',
    qrCode: 'QR-CMD-2025-003',
    clientName: 'Marie Leroy',
    clientEmail: 'marie.leroy@email.com',
    clientPhone: '07 11 22 33 44',
    clientAddress: '8 Place du Village, 84110 Vaison-la-Romaine',
    subscription: 'essentiel',
    status: 'pending',
    collectionDate: '2025-11-03',
    deliveryDate: '2025-11-06',
    items: [
      { id: '1', type: 'ironing', description: 'Chemises', quantity: 5, price: 20 },
      { id: '2', type: 'pressing', description: 'Pantalons', quantity: 3, price: 12 },
    ],
    totalPrice: 32,
    history: [
      { status: 'pending', date: '2025-10-31T09:00:00', note: 'Commande créée' },
    ],
    createdAt: '2025-10-31T09:00:00',
  },
  {
    id: '4',
    orderNumber: 'CMD-2025-004',
    qrCode: 'QR-CMD-2025-004',
    clientName: 'Pierre Durand',
    clientEmail: 'pierre.durand@email.com',
    clientPhone: '06 55 66 77 88',
    clientAddress: '23 Rue de la Paix, 84110 Vaison-la-Romaine',
    subscription: 'premium',
    status: 'delivered',
    collectionDate: '2025-10-13',
    deliveryDate: '2025-10-16',
    items: [
      { id: '1', type: 'pressing', description: 'Costume complet', quantity: 2, price: 50 },
      { id: '2', type: 'dry_cleaning', description: 'Veste en cuir', quantity: 1, price: 45 },
    ],
    totalPrice: 95,
    history: [
      { status: 'pending', date: '2025-10-11T11:00:00', note: 'Commande créée' },
      { status: 'collected', date: '2025-10-13T08:30:00', note: 'Linge collecté' },
      { status: 'in_progress', date: '2025-10-13T16:00:00', note: 'En cours de traitement' },
      { status: 'ready', date: '2025-10-16T09:00:00', note: 'Prêt pour livraison' },
      { status: 'delivered', date: '2025-10-16T17:30:00', note: 'Livré au client' },
    ],
    createdAt: '2025-10-11T11:00:00',
  },
  {
    id: '5',
    orderNumber: 'CMD-2025-005',
    qrCode: 'QR-CMD-2025-005',
    clientName: 'Julie Bernard',
    clientEmail: 'julie.bernard@email.com',
    clientPhone: '07 99 88 77 66',
    clientAddress: '56 Boulevard Victor Hugo, 84110 Vaison-la-Romaine',
    subscription: 'confort',
    status: 'collected',
    collectionDate: '2025-10-31',
    deliveryDate: '2025-11-03',
    items: [
      { id: '1', type: 'pressing', description: 'Draps et taies', quantity: 1, price: 20 },
      { id: '2', type: 'ironing', description: 'Nappes', quantity: 2, price: 15 },
    ],
    totalPrice: 35,
    history: [
      { status: 'pending', date: '2025-10-29T13:00:00', note: 'Commande créée' },
      { status: 'collected', date: '2025-10-31T08:30:00', note: 'Linge collecté' },
    ],
    createdAt: '2025-10-29T13:00:00',
  },
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '06 12 34 56 78',
    address: '15 Rue des Lilas, 84110 Vaison-la-Romaine',
    subscription: 'premium',
    joinDate: '2024-01-15',
    totalOrders: 24,
    totalSpent: 1680,
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    email: 'thomas.dubois@email.com',
    phone: '06 98 76 54 32',
    address: '42 Avenue du Marché, 84110 Vaison-la-Romaine',
    subscription: 'confort',
    joinDate: '2024-03-20',
    totalOrders: 18,
    totalSpent: 890,
  },
  {
    id: '3',
    name: 'Marie Leroy',
    email: 'marie.leroy@email.com',
    phone: '07 11 22 33 44',
    address: '8 Place du Village, 84110 Vaison-la-Romaine',
    subscription: 'essentiel',
    joinDate: '2024-06-10',
    totalOrders: 12,
    totalSpent: 358,
  },
  {
    id: '4',
    name: 'Pierre Durand',
    email: 'pierre.durand@email.com',
    phone: '06 55 66 77 88',
    address: '23 Rue de la Paix, 84110 Vaison-la-Romaine',
    subscription: 'premium',
    joinDate: '2023-11-05',
    totalOrders: 36,
    totalSpent: 2450,
  },
  {
    id: '5',
    name: 'Julie Bernard',
    email: 'julie.bernard@email.com',
    phone: '07 99 88 77 66',
    address: '56 Boulevard Victor Hugo, 84110 Vaison-la-Romaine',
    subscription: 'confort',
    joinDate: '2024-07-22',
    totalOrders: 8,
    totalSpent: 420,
  },
];
