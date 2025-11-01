import { Clock, TrendingDown, Package, Shield, ArrowDown } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 via-blue-50 to-white relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Votre meilleur choix
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Un service qui fait la différence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi des milliers de clients nous font confiance
          </p>
        </div>

        {/* Bloc économique principal */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-primary-200 relative overflow-hidden">
            {/* Effet brillant */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <TrendingDown className="text-primary-600" size={40} />
                <h3 className="text-3xl md:text-4xl font-black text-gray-900">
                  Faites des économies réelles
                </h3>
              </div>

              {/* Comparaison verticale */}
              <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
                {/* Avant */}
                <div className="text-center p-6 bg-red-50 rounded-2xl border-2 border-red-200 w-full">
                  <p className="text-sm font-semibold text-red-700 mb-2 uppercase tracking-wide">
                    Pressing traditionnel
                  </p>
                  <p className="text-gray-700 mb-4 text-sm">
                    Un ménage français dépense en moyenne
                  </p>
                  <div className="text-5xl font-black text-red-600 mb-2">
                    40-60€
                  </div>
                  <p className="text-xs text-gray-600">par mois</p>
                  <p className="text-xs text-gray-500 mt-3">
                    (chemises, pantalons, vestes)
                  </p>
                </div>

                {/* Flèche vers le bas */}
                <div className="flex items-center justify-center">
                  <ArrowDown className="text-primary-600 animate-bounce" size={48} strokeWidth={3} />
                </div>

                {/* Après */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-primary-50 rounded-2xl border-2 border-green-300 relative w-full">
                  {/* Badge "Meilleur prix" */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                    Meilleur prix
                  </div>
                  
                  <p className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wide">
                    Avec C'Propre
                  </p>
                  <p className="text-gray-700 mb-4 text-sm">
                    Votre abonnement (offre 1er mois)
                  </p>
                  <div className="text-5xl font-black text-green-600 mb-2">
                    26,91€
                  </div>
                  <p className="text-xs text-gray-600">par mois</p>
                  <p className="text-xs text-green-600 mt-3 font-semibold">
                    Service tout-en-un inclus !
                  </p>
                </div>
              </div>

              {/* Économie - Aligné avec les cartes */}
              <div className="mt-8 w-full text-center">
                <div className="inline-block w-full bg-gradient-to-r from-green-500/10 to-primary-600/10 border-2 border-green-500 text-gray-900 px-6 py-3 rounded-2xl">
                  <p className="text-sm font-semibold text-green-700">Économies mensuelles</p>
                  <p className="text-3xl font-black text-green-600">Jusqu'à 33€</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 arguments en grille */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Argument 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="text-white" size={28} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Économie de temps
            </h4>
            <p className="text-gray-600 text-sm">
              Plus de trajet au pressing. On s'occupe de tout !
            </p>
          </div>

          {/* Argument 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingDown className="text-white" size={28} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Prix transparent
            </h4>
            <p className="text-gray-600 text-sm">
              Tarif fixe mensuel. Aucun surcoût caché.
            </p>
          </div>

          {/* Argument 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="text-white" size={28} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Service tout-en-un
            </h4>
            <p className="text-gray-600 text-sm">
              Collecte + nettoyage + livraison. Tout inclus !
            </p>
          </div>

          {/* Argument 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="text-white" size={28} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Qualité garantie
            </h4>
            <p className="text-gray-600 text-sm">
              Satisfaction 100% ou remboursé. Sans condition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
