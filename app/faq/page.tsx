'use client';

import Link from 'next/link';
import { ArrowLeft, HelpCircle, Package, CreditCard, Truck, Clock, Phone } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      category: 'Abonnements',
      icon: Package,
      questions: [
        {
          q: 'Comment fonctionne l\'abonnement mensuel ?',
          a: 'Vous choisissez votre formule (15L, 30L ou 50L) et bénéficiez d\'une collecte hebdomadaire gratuite. Votre panier est collecté chaque semaine et le linge propre vous est livré sous 48-72h selon la formule.'
        },
        {
          q: 'Puis-je modifier ou annuler mon abonnement ?',
          a: 'Oui, sans engagement ! Vous pouvez modifier votre formule ou annuler votre abonnement à tout moment depuis votre Espace Client. La modification prend effet le mois suivant.'
        },
        {
          q: 'Que se passe-t-il si je dépasse la capacité de mon panier ?',
          a: 'Pas de problème ! Vous pouvez commander un panier supplémentaire payant depuis votre Espace Client. Les tarifs à la carte s\'appliquent pour les paniers supplémentaires.'
        },
        {
          q: 'Puis-je sauter une semaine de collecte ?',
          a: 'Oui, connectez-vous à votre Espace Client et indiquez simplement que votre panier n\'est pas prêt pour la collecte. Votre abonnement continue normalement.'
        }
      ]
    },
    {
      category: 'À la carte',
      icon: CreditCard,
      questions: [
        {
          q: 'Comment commander un service à la carte ?',
          a: 'Créez un compte sur notre Espace Client, choisissez la taille de votre panier (15L, 30L ou 50L) et indiquez quand votre linge est prêt pour la collecte. Nous passons le récupérer sous 24-48h.'
        },
        {
          q: 'Quel est le délai de livraison pour un service à la carte ?',
          a: 'Votre linge est collecté sous 24-48h après votre demande, puis nettoyé et livré sous 48-72h supplémentaires selon la formule choisie (Essentiel, Confort ou Premium).'
        },
        {
          q: 'Y a-t-il un montant minimum de commande ?',
          a: 'Non, vous pouvez commander un panier de 15L minimum. Pas de minimum de fréquence, commandez uniquement quand vous en avez besoin !'
        }
      ]
    },
    {
      category: 'Collecte & Livraison',
      icon: Truck,
      questions: [
        {
          q: 'Comment se passe la collecte ?',
          a: 'Dès que votre linge est prêt, signalez-le depuis votre Espace Client. Vous pouvez ajouter une photo optionnelle. Nous passons collecter votre panier à l\'adresse enregistrée dans les créneaux convenus.'
        },
        {
          q: 'Dois-je être présent lors de la collecte/livraison ?',
          a: 'Non nécessairement. Vous pouvez laisser votre panier dans un endroit sécurisé (hall d\'immeuble, local, etc.). Nous vous conseillons de le mentionner dans les notes lors de votre inscription.'
        },
        {
          q: 'Comment suivre ma commande ?',
          a: 'Vous recevez votre code client QR unique. Scannez-le ou entrez-le sur notre page de suivi pour voir en temps réel où en est votre commande : collecté, en traitement, prêt pour livraison, livré.'
        },
        {
          q: 'Puis-je annuler une collecte ?',
          a: 'Oui, tant que votre panier n\'a pas été collecté, vous pouvez annuler depuis votre Espace Client. Une fois collecté, le traitement est en cours et ne peut plus être annulé.'
        }
      ]
    },
    {
      category: 'Services & Qualité',
      icon: HelpCircle,
      questions: [
        {
          q: 'Quels types de vêtements acceptez-vous ?',
          a: 'Nous acceptons tous les vêtements courants : chemises, pantalons, robes, vestes, linge de maison (draps, serviettes), etc. Pour les articles délicats (cuir, fourrure, costume haute couture), contactez-nous au préalable.'
        },
        {
          q: 'Utilisez-vous des produits écologiques ?',
          a: 'Oui ! Nous utilisons des produits de nettoyage certifiés écologiques et respectueux des textiles. Notre processus minimise la consommation d\'eau et d\'énergie.'
        },
        {
          q: 'Comment gérez-vous les taches difficiles ?',
          a: 'Nous avons un service de détachage expert inclus. Si vous identifiez une tache particulière, mentionnez-le dans les notes lors de la préparation de votre panier. Nos experts traiteront la tache avec des techniques adaptées.'
        },
        {
          q: 'Que faire si un vêtement est abîmé ?',
          a: 'Bien que nous prenions toutes les précautions, si un incident survient, contactez-nous immédiatement. Nous sommes assurés et prenons en charge les dommages selon nos conditions générales.'
        }
      ]
    },
    {
      category: 'Paiement & Facturation',
      icon: CreditCard,
      questions: [
        {
          q: 'Quels moyens de paiement acceptez-vous ?',
          a: 'Actuellement, le paiement se fait par virement bancaire ou espèces. Nous travaillons sur l\'intégration du paiement par carte bancaire en ligne (Stripe) prochainement.'
        },
        {
          q: 'Quand suis-je facturé pour mon abonnement ?',
          a: 'L\'abonnement est payable mensuellement, le 1er de chaque mois. Vous recevez votre facture par email quelques jours avant le prélèvement.'
        },
        {
          q: 'Y a-t-il des frais cachés ?',
          a: 'Non, tout est transparent ! Le prix affiché inclut : collecte, nettoyage, repassage, détachage et livraison. Aucun frais supplémentaire sauf si vous commandez des paniers supplémentaires.'
        }
      ]
    },
    {
      category: 'Compte Client',
      icon: Package,
      questions: [
        {
          q: 'Comment créer mon compte Espace Client ?',
          a: 'Cliquez sur "Espace Client" dans le menu, puis "Inscription". Renseignez vos informations (nom, adresse, téléphone, email) et choisissez votre formule. Vous recevrez votre code QR client par email.'
        },
        {
          q: 'J\'ai perdu mon code QR, que faire ?',
          a: 'Connectez-vous à votre Espace Client, votre code QR est affiché dans votre profil. Vous pouvez aussi nous contacter au 07 56 95 86 94, nous vous le renverrons par email.'
        },
        {
          q: 'Puis-je avoir plusieurs adresses de collecte ?',
          a: 'Actuellement, une seule adresse par compte. Si vous souhaitez changer d\'adresse ponctuellement, contactez-nous avant la collecte pour que nous puissions organiser le passage.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <ArrowLeft size={20} />
            <span className="font-semibold">Retour à l'accueil</span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <HelpCircle className="text-primary-600" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Toutes les réponses à vos questions sur C'Propre
          </p>
        </div>

        {/* Contact rapide */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-3xl p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Une question non résolue ?</h3>
              <p className="text-white/90">Notre équipe est là pour vous aider !</p>
            </div>
            <a
              href="tel:+33756958694"
              className="flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              <Phone size={20} />
              07 56 95 86 94
            </a>
          </div>
        </div>

        {/* FAQ par catégorie */}
        <div className="space-y-8">
          {faqs.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-blue-500 text-white p-6">
                  <div className="flex items-center gap-3">
                    <IconComponent size={28} />
                    <h2 className="text-2xl font-bold">{category.category}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {category.questions.map((faq, qIdx) => (
                    <div key={qIdx} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                        <span className="text-primary-600 flex-shrink-0">Q:</span>
                        {faq.q}
                      </h3>
                      <p className="text-gray-700 leading-relaxed pl-6">
                        <span className="text-primary-600 font-bold">R:</span> {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 text-center">
          <Clock className="mx-auto text-primary-600 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Prêt à essayer C'Propre ?
          </h3>
          <p className="text-gray-600 mb-6">
            Créez votre compte et profitez de notre service dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/espace-client/inscription"
              className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all hover:scale-105"
            >
              Créer mon compte
            </Link>
            <Link
              href="/#tarifs"
              className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-primary-50 transition-all"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
