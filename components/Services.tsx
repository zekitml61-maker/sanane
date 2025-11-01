import { Shirt, Droplet, Wind, Sparkles, Package, Home } from 'lucide-react';

const services = [
  {
    icon: Shirt,
    title: 'Nettoyage Pressing',
    description: 'Vêtements traités avec soin par nos experts. Chemises, costumes, robes - résultat impeccable garanti',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Droplet,
    title: 'Nettoyage à Sec',
    description: 'Traitement délicat pour tissus fragiles. Soie, laine, cachemire traités en toute sécurité',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Wind,
    title: 'Repassage Premium',
    description: 'Repassage professionnel impeccable. Vos vêtements comme neufs, plis parfaits',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: Sparkles,
    title: 'Détachage Expert',
    description: 'Élimination des taches les plus tenaces. Vin, café, graisse - on s\'occupe de tout',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    icon: Package,
    title: 'Linge de Maison',
    description: 'Draps, couettes, serviettes, nappes. Grand volume ? Aucun problème !',
    gradient: 'from-green-500 to-green-600',
  },
  {
    icon: Home,
    title: 'Collecte à Domicile',
    description: 'Chaque lundi, on vient chercher votre linge. Sans bouger de chez vous !',
    gradient: 'from-rose-500 to-rose-600',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-4">
            Excellence & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 px-4">
            Nos Services Professionnels
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Un service complet pour tous vos besoins de nettoyage et d'entretien textile
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-primary-300 hover:-translate-y-3 animate-fadeInUp overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              {/* Effet de fond au hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Contenu de la carte */}
              <div className="relative z-10">
                {/* Logo avec multiple effets */}
                <div className="relative w-14 sm:w-20 md:w-24 h-14 sm:h-20 md:h-24 mb-3 sm:mb-4 md:mb-6">
                  {/* Cercle de fond avec animation pulse */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl md:rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl`}></div>
                  
                  {/* Cercle principal */}
                  <div className={`relative bg-gradient-to-br ${service.gradient} w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    {/* Reflet brillant */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                    
                    {/* Icône */}
                    <service.icon className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300" size={24} />
                    
                    {/* Point lumineux animé */}
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 sm:w-3 h-2 sm:h-3 bg-white/80 rounded-full animate-ping"></div>
                  </div>
                </div>
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">{service.description}</p>
              </div>
              
              {/* Ligne décorative en bas */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
