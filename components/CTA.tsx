import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=1600&q=80"
          alt="Équipement professionnel de laverie"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-700/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">
            Prêt à simplifier votre quotidien ?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto px-4">
            Rejoignez plus de 50 clients satisfaits qui ont choisi C'Propre pour leur pressing
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#tarifs"
              className="group bg-white text-primary-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition inline-flex items-center gap-3 shadow-2xl"
            >
              Choisir mon abonnement
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </a>
            <a
              href="tel:+33756958694"
              className="bg-transparent border-3 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition inline-flex items-center gap-3"
            >
              <Phone size={24} />
              Nous appeler
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">50</div>
              <p className="text-white/80 text-sm sm:text-base">Clients</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">98%</div>
              <p className="text-white/80 text-sm sm:text-base">Satisfaction client</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <p className="text-white/80 text-sm sm:text-base">Service disponible</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
