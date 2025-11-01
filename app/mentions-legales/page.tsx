'use client';

import Link from 'next/link';
import { ArrowLeft, Scale, Shield } from 'lucide-react';

export default function MentionsLegalesPage() {
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
            <Scale className="text-primary-600" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Mentions Légales
          </h1>
          <p className="text-gray-600">
            Informations légales et réglementaires
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="text-primary-600" size={24} />
              1. Éditeur du site
            </h2>
            <div className="text-gray-700 space-y-2 leading-relaxed bg-gray-50 p-6 rounded-xl">
              <p><strong>Nom de l'entreprise :</strong> C'Propre</p>
              <p><strong>Forme juridique :</strong> Auto-entrepreneur / Micro-entreprise</p>
              <p><strong>Numéro SIRET :</strong> [À compléter]</p>
              <p><strong>Adresse du siège social :</strong> [Votre adresse]</p>
              <p><strong>Email :</strong> contact@cpropre.fr</p>
              <p><strong>Téléphone :</strong> 07 56 95 86 94</p>
              <p><strong>Directeur de la publication :</strong> [Votre nom]</p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="text-primary-600" size={24} />
              2. Hébergement du site
            </h2>
            <div className="text-gray-700 space-y-2 leading-relaxed bg-gray-50 p-6 rounded-xl">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">vercel.com</a></p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Propriété intellectuelle
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, vidéos, etc.) 
                est la propriété exclusive de <strong>C'Propre</strong>, sauf mentions contraires.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans 
                l'autorisation écrite préalable de C'Propre.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l'un des éléments qu'il contient sera considérée 
                comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles 
                L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Protection des données personnelles (RGPD)
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
                "Informatique et Libertés" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, 
                de rectification, de suppression et de portabilité de vos données personnelles.
              </p>
              
              <h3 className="text-lg font-bold text-gray-900 mt-4">Données collectées</h3>
              <p>
                Nous collectons les données suivantes lors de votre inscription :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse postale complète</li>
                <li>Numéro de téléphone</li>
                <li>Adresse email</li>
                <li>Informations de commande (dates, contenus, statuts)</li>
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mt-4">Finalité du traitement</h3>
              <p>
                Ces données sont utilisées uniquement pour :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>La gestion de votre compte client</li>
                <li>Le traitement de vos commandes</li>
                <li>La collecte et la livraison de votre linge</li>
                <li>La facturation et le suivi des paiements</li>
                <li>L'envoi d'informations relatives à nos services</li>
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mt-4">Conservation des données</h3>
              <p>
                Vos données sont conservées pendant la durée de notre relation commerciale et jusqu'à 3 ans 
                après la fin de celle-ci, sauf obligation légale de conservation plus longue.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mt-4">Exercice de vos droits</h3>
              <p>
                Pour exercer vos droits (accès, rectification, suppression, opposition, portabilité), 
                contactez-nous à : <strong>contact@cpropre.fr</strong>
              </p>
              <p>
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL 
                (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.cnil.fr</a>).
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Cookies
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Ce site utilise des cookies techniques nécessaires au bon fonctionnement du site et à la 
                mémorisation de votre session utilisateur (connexion à l'Espace Client).
              </p>
              <p>
                Ces cookies sont stockés localement dans votre navigateur et ne sont pas partagés avec des tiers.
              </p>
              <p>
                Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut 
                affecter certaines fonctionnalités du site.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Responsabilité
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                C'Propre s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. 
                Toutefois, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des informations 
                mises à disposition sur ce site.
              </p>
              <p>
                C'Propre ne saurait être tenu responsable :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Des interruptions ou dysfonctionnements du site</li>
                <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
                <li>De l'impossibilité d'accéder au site</li>
                <li>Des liens hypertextes pointant vers d'autres sites internet</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Droit applicable et juridiction compétente
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Les présentes mentions légales sont régies par le droit français.
              </p>
              <p>
                En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français 
                conformément aux règles de compétence en vigueur.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Crédits
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                <strong>Conception et développement :</strong> C'Propre
              </p>
              <p>
                <strong>Technologies utilisées :</strong> Next.js, React, TypeScript, Tailwind CSS
              </p>
              <p>
                <strong>Icônes :</strong> Lucide Icons (<a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">lucide.dev</a>)
              </p>
              <p>
                <strong>Hébergement :</strong> Vercel
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Contact</h3>
            <div className="text-gray-700 space-y-2">
              <p><strong>C'Propre</strong></p>
              <p>📧 Email : contact@cpropre.fr</p>
              <p>📞 Téléphone : 07 56 95 86 94</p>
            </div>
          </div>

          {/* Mise à jour */}
          <p className="text-sm text-gray-500 text-center pt-6 border-t border-gray-200">
            Dernière mise à jour des mentions légales : 1er novembre 2025
          </p>
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
