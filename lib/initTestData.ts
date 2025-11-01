import { createClient } from './database';

export function initTestClient() {
  // Vérifier si un client avec cet email existe déjà
  const clients = JSON.parse(localStorage.getItem('cpropre_clients') || '[]');
  const existingClient = clients.find((c: any) => c.email === 'test@cpropre.fr');
  
  if (existingClient) {
    console.log('✅ Client de test existe déjà :');
    console.log('📧 Email: test@cpropre.fr');
    console.log('🔑 Mot de passe: test123');
    console.log('👤 QR Code:', existingClient.qrCode);
    return existingClient;
  }

  console.log('Création du client de test...');

  // Créer un client de test
  const testClient = {
    name: 'Jean Dupont',
    email: 'test@cpropre.fr',
    phone: '06 12 34 56 78',
    address: '123 Rue de Test',
    city: 'Vaison-la-Romaine',
    postalCode: '84110',
    clientType: 'subscription' as const,
    subscriptionPlan: 'confort' as const,
    joinDate: new Date().toISOString(),
    active: true,
  };

  const client = createClient(testClient);

  // Définir le mot de passe
  const passwords = JSON.parse(localStorage.getItem('cpropre_passwords') || '{}');
  passwords[client.id] = 'test123';
  localStorage.setItem('cpropre_passwords', JSON.stringify(passwords));

  console.log('✅ Client de test créé :');
  console.log('📧 Email: test@cpropre.fr');
  console.log('🔑 Mot de passe: test123');
  console.log('👤 QR Code:', client.qrCode);

  return client;
}
