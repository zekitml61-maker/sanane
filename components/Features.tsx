import { CheckCircle, Shield, Award, Sparkles, Zap } from 'lucide-react';

const features = [
  'Équipements professionnels dernière génération',
  'Produits écologiques et respectueux des tissus',
  'Traçabilité complète de vos vêtements',
  'Assurance tous risques incluse',
  'Détachage expert pour les taches tenaces',
  'Emballage individuel et soigné',
];

const badges = [
  { icon: Shield, label: 'Garantie 100%', color: 'from-blue-500 to-blue-600' },
  { icon: Award, label: 'Qualité Premium', color: 'from-amber-500 to-amber-600' },
  { icon: Sparkles, label: 'Éco-responsable', color: 'from-green-500 to-green-600' },
  { icon: Zap, label: 'Service Rapide', color: 'from-purple-500 to-purple-600' },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête centré */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Notre Engagement
          </span>
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Un service qui fait la différence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chez C'Propre, nous traitons chaque vêtement avec le plus grand soin. 
            Notre expertise et nos équipements de pointe garantissent un résultat impeccable.
          </p>
        </div>

        {/* Badges en haut */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${badge.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                <badge.icon className="text-white" size={32} />
              </div>
              <p className="text-center font-bold text-gray-900">{badge.label}</p>
            </div>
          ))}
        </div>

        {/* Grille de features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-primary-200"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="text-white" size={20} />
                </div>
              </div>
              <span className="text-lg text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Call to action avec avantages clés */}
        <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 rounded-3xl p-12 overflow-hidden shadow-2xl">
          {/* Motif de fond animé */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-4xl font-black text-white mb-4">
              Prêt à essayer notre service ?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de clients satisfaits. Premier mois à tarif réduit !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="#abonnements"
                className="group bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Découvrir les offres
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </a>
              <a
                href="#contact"
                className="group border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all duration-300"
              >
                Nous contacter
              </a>
            </div>
            
            {/* Mini avantages */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-white" size={20} />
                <span className="font-medium">Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-white" size={20} />
                <span className="font-medium">Satisfait ou remboursé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-white" size={20} />
                <span className="font-medium">Premier mois -20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
