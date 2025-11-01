import { Calendar, Truck, Sparkles, Package } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    number: '1',
    title: 'Réservez votre collecte',
    description: 'Choisissez votre formule et planifiez votre premier lundi de collecte',
  },
  {
    icon: Truck,
    number: '2',
    title: 'On collecte votre linge',
    description: 'Chaque lundi, notre équipe vient récupérer votre panier à domicile',
  },
  {
    icon: Sparkles,
    number: '3',
    title: 'Nettoyage professionnel',
    description: 'Vos vêtements sont traités avec soin par nos experts',
  },
  {
    icon: Package,
    number: '4',
    title: 'Livraison à domicile',
    description: 'Recevez votre linge propre et repassé sous 24-48h',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 px-4">
            Comment ça marche ?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Un service simple et efficace en 4 étapes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="text-center">
                <div className="relative inline-block mb-4 sm:mb-6">
                  <div className="bg-primary-100 w-20 sm:w-24 h-20 sm:h-24 rounded-full flex items-center justify-center">
                    {/* Animation 1: Calendrier - pages qui s'ouvrent */}
                    {index === 0 && (
                      <div className="relative">
                        <Calendar className="text-primary-600 group-hover:animate-calendar-flip" size={40} />
                        <div className="absolute inset-0 bg-white/30 group-hover:animate-page-flip"></div>
                      </div>
                    )}
                    
                    {/* Animation 2: Camion qui avance */}
                    {index === 1 && (
                      <Truck className="text-primary-600 group-hover:animate-truck-move" size={40} />
                    )}
                    
                    {/* Animation 3: Étoile qui brille */}
                    {index === 2 && (
                      <div className="relative">
                        <Sparkles className="text-primary-600 group-hover:animate-sparkle-shine" size={40} />
                        <div className="absolute inset-0 bg-yellow-300/0 group-hover:bg-yellow-300/30 group-hover:animate-ping rounded-full"></div>
                      </div>
                    )}
                    
                    {/* Animation 4: Carton avec zoom simple */}
                    {index === 3 && (
                      <Package className="text-primary-600 group-hover:scale-125 transition-transform duration-300" size={40} />
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-primary-200">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-primary-200 border-b-[6px] border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
