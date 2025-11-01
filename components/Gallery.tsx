import { Clock, MapPin, Sparkles, Trophy, Users, TrendingUp } from 'lucide-react';

const processSteps = [
  {
    icon: MapPin,
    number: '01',
    title: 'Collecte à domicile',
    description: 'Chaque lundi, notre équipe vient récupérer votre linge directement chez vous',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Traitement expert',
    description: 'Nettoyage professionnel avec nos équipements de pointe et produits écologiques',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Trophy,
    number: '03',
    title: 'Contrôle qualité',
    description: 'Chaque vêtement est inspecté et emballé individuellement avec soin',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Clock,
    number: '04',
    title: 'Livraison rapide',
    description: 'Retour chez vous dans les 48h, propre et prêt à porter',
    color: 'from-green-500 to-green-600',
  },
];

const stats = [
  { icon: Users, value: '5000+', label: 'Clients actifs', color: 'text-blue-600' },
  { icon: Trophy, value: '15 ans', label: "D'expertise", color: 'text-amber-600' },
  { icon: TrendingUp, value: '98%', label: 'Satisfaction', color: 'text-green-600' },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Comment ça marche ?
          </span>
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Simple, Rapide & Efficace
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus en 4 étapes pensé pour vous faire gagner du temps tout en garantissant un résultat impeccable
          </p>
        </div>

        {/* Timeline des étapes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Ligne de connexion (sauf dernier) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-gray-200 to-transparent -z-10"></div>
              )}
              
              {/* Carte */}
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-200 hover:-translate-y-3">
                {/* Numéro en background */}
                <div className="absolute top-4 right-4 text-6xl font-black text-gray-100 group-hover:text-primary-50 transition-colors duration-300">
                  {step.number}
                </div>
                
                {/* Icône */}
                <div className={`relative bg-gradient-to-br ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl z-10`}>
                  <step.icon className="text-white" size={36} />
                </div>
                
                {/* Contenu */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {step.description}
                </p>
                
                {/* Ligne décorative */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques clés */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-white" size={36} />
                </div>
                <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                <p className="text-white/90 font-medium text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
