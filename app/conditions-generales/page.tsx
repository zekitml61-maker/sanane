'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';

export default function CGVPage() {
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <FileText className="text-primary-600" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-gray-600">
            Dernière mise à jour : 1er novembre 2025
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          {/* Article 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              1. Objet et champ d'application
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre <strong>C'Propre</strong>, 
                service de pressing et nettoyage à domicile, et ses clients, tant particuliers que professionnels.
              </p>
              <p>
                Toute commande de service implique l'acceptation sans réserve des présentes CGV. C'Propre se réserve le droit 
                de modifier ces conditions à tout moment, les conditions applicables étant celles en vigueur à la date de la commande.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              2. Services proposés
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                C'Propre propose deux types de services :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Abonnement mensuel</strong> : Formules 15L, 30L ou 50L avec collecte hebdomadaire gratuite incluse</li>
                <li><strong>Service à la carte</strong> : Paniers 15L, 30L ou 50L sans engagement, tarification par commande</li>
              </ul>
              <p>
                Chaque service inclut : collecte à domicile, nettoyage professionnel (pressing, nettoyage à sec, repassage), 
                détachage expert et livraison à domicile.
              </p>
            </div>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              3. Commandes et inscription
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Pour bénéficier de nos services, le client doit créer un compte sur notre Espace Client en fournissant 
                ses informations personnelles : nom, prénom, adresse complète, téléphone et email.
              </p>
              <p>
                Un code QR client unique est généré et envoyé par email. Ce code permet de suivre toutes les commandes 
                et d'accéder aux services.
              </p>
              <p>
                <strong>Abonnement :</strong> Le client choisit sa formule et s'engage pour une facturation mensuelle. 
                Résiliation possible à tout moment avec effet le mois suivant.
              </p>
              <p>
                <strong>À la carte :</strong> Le client commande ponctuellement selon ses besoins, sans engagement de durée.
              </p>
            </div>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              4. Tarifs et paiement
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Les tarifs en vigueur sont ceux affichés sur le site au moment de la commande. Ils sont exprimés en euros TTC.
              </p>
              <p>
                <strong>Abonnements mensuels :</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Essentiel 15L : 29,90€/mois</li>
                <li>Confort 30L : 49,90€/mois</li>
                <li>Premium 50L : 79,90€/mois</li>
              </ul>
              <p className="mt-3">
                <strong>À la carte (par commande) :</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Panier 15L : 35€</li>
                <li>Panier 30L : 60€</li>
                <li>Panier 50L : 95€</li>
              </ul>
              <p className="mt-3">
                Le paiement s'effectue par virement bancaire ou espèces. L'intégration du paiement par carte bancaire 
                en ligne (Stripe) est en cours de déploiement.
              </p>
              <p>
                Pour les abonnements, la facturation intervient le 1er de chaque mois. Pour les services à la carte, 
                le paiement est dû avant la collecte.
              </p>
            </div>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              5. Collecte et livraison
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                <strong>Collecte :</strong> Le client signale depuis son Espace Client que son panier est prêt. 
                La collecte intervient sous 24-48h selon les créneaux convenus lors de l'inscription.
              </p>
              <p>
                <strong>Livraison :</strong> Le linge nettoyé est livré à l'adresse indiquée sous 48-72h après collecte, 
                selon la formule choisie (Essentiel, Confort, Premium).
              </p>
              <p>
                Le client peut laisser son panier dans un lieu sécurisé (hall, local, etc.) s'il ne peut être présent. 
                C'Propre décline toute responsabilité en cas de vol ou détérioration du panier déposé dans un lieu non sécurisé.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              6. Responsabilité et assurance
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                C'Propre s'engage à traiter le linge avec le plus grand soin en utilisant des techniques professionnelles 
                et des produits adaptés. Nous sommes assurés pour les dommages éventuels.
              </p>
              <p>
                <strong>Articles exclus :</strong> Cuir, fourrure, daim, articles de luxe haute couture nécessitent un devis 
                préalable et ne sont pas inclus dans les forfaits standards.
              </p>
              <p>
                En cas de dommage constaté, le client doit nous contacter sous 48h après livraison. L'indemnisation 
                sera calculée selon la valeur déclarée du vêtement, plafonnée à 10 fois le prix du service.
              </p>
              <p>
                C'Propre ne saurait être tenu responsable :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Des taches impossibles à enlever malgré nos traitements experts</li>
                <li>Des décolorations ou déformations dues à l'usure naturelle du textile</li>
                <li>Des dommages sur articles non conformes aux instructions d'entretien du fabricant</li>
                <li>Des objets oubliés dans les poches (nous ne sommes pas responsables de leur perte)</li>
              </ul>
            </div>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              7. Annulation et modification
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                <strong>Annulation de collecte :</strong> Possible depuis l'Espace Client tant que le panier n'a pas été collecté. 
                Une fois collecté, le traitement est en cours et ne peut être annulé.
              </p>
              <p>
                <strong>Modification d'abonnement :</strong> Changement de formule possible à tout moment, avec effet le mois suivant.
              </p>
              <p>
                <strong>Résiliation d'abonnement :</strong> Sans engagement, résiliation possible à tout moment depuis l'Espace Client, 
                avec effet à la fin du mois en cours.
              </p>
            </div>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              8. Données personnelles
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Les données personnelles collectées (nom, adresse, email, téléphone) sont nécessaires à l'exécution 
                des services et sont traitées conformément au RGPD.
              </p>
              <p>
                Le client dispose d'un droit d'accès, de rectification et de suppression de ses données. 
                Pour exercer ces droits, contactez-nous à : <strong>contact@cpropre.fr</strong>
              </p>
              <p>
                Les données ne sont jamais vendues ni partagées avec des tiers, sauf obligation légale.
              </p>
            </div>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              9. Litiges et réclamations
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Pour toute réclamation, contactez notre service client au <strong>07 56 95 86 94</strong> ou par email 
                à <strong>contact@cpropre.fr</strong>. Nous nous engageons à répondre sous 48h ouvrées.
              </p>
              <p>
                En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux français 
                seront seuls compétents.
              </p>
            </div>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600" size={24} />
              10. Droit applicable
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents, 
                sauf dispositions légales contraires impératives.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Contact</h3>
            <div className="text-gray-700 space-y-2">
              <p><strong>C'Propre</strong> - Service de pressing à domicile</p>
              <p>📧 Email : contact@cpropre.fr</p>
              <p>📞 Téléphone : 07 56 95 86 94</p>
            </div>
          </div>
        </div>

        {/* Retour */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
