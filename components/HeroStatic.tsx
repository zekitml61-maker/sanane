import { Sparkles, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

export default function HeroStatic() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Arrière-plan avec image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-50 to-white">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1600&q=80"
            alt="Pressing background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Votre pressing <span className="text-primary-600">professionnel</span> à domicile
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Collecte chaque lundi, nettoyage impeccable, livraison rapide. 
              Suivez vos vêtements en temps réel avec notre système QR code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#tarifs"
                className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition text-center"
              >
                Choisir mon abonnement
              </a>
              <a
                href="#suivi"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition text-center"
              >
                Suivre ma commande
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <Sparkles className="text-primary-600" size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-700">Qualité Premium</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <Clock className="text-primary-600" size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-700">Service Rapide</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <Shield className="text-primary-600" size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-700">Garanti</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 shadow-2xl">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800&q=80"
                  alt="Vêtements propres et colorés pliés professionnellement"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
