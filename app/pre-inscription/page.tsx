'use client';

import { useState } from 'react';
import { Sparkles, Mail, Phone, MapPin, User, CheckCircle, Rocket, Star, Zap, Gift, Truck, Home } from 'lucide-react';

export default function PreInscriptionPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    codePostal: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Codes postaux et villes valides autour de Vaison-la-Romaine (10 km)
  const zonesValides = [
    { cp: '84110', ville: 'Vaison-la-Romaine' },
    { cp: '84340', ville: 'Entrechaux' },
    { cp: '84110', ville: 'Séguret' },
    { cp: '84110', ville: 'Sablet' },
    { cp: '84110', ville: 'Roaix' },
    { cp: '84110', ville: 'Rasteau' },
    { cp: '84110', ville: 'Crestet' },
    { cp: '84110', ville: 'Villedieu' },
    { cp: '84850', ville: 'Camaret-sur-Aigues' },
    { cp: '84290', ville: 'Cairanne' },
    { cp: '84190', ville: 'Gigondas' },
    { cp: '84190', ville: 'Beaumes-de-Venise' },
    { cp: '84110', ville: 'Puyméras' },
    { cp: '84110', ville: 'Faucon' },
    { cp: '84110', ville: 'Saint-Marcellin-lès-Vaison' },
    { cp: '84110', ville: 'Saint-Romain-en-Viennois' },
  ];
  
  const codesPostauxValides = [...new Set(zonesValides.map(z => z.cp))];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Vérifier si le code postal est dans la zone de service
    if (!codesPostauxValides.includes(formData.codePostal)) {
      setError(`Désolé, notre service n'est pas encore disponible dans votre zone. Nous desservons actuellement Vaison-la-Romaine et ses environs (10 km).`);
      setLoading(false);
      return;
    }

    try {
      // Envoyer les données à l'API (qui envoie l'email)
      const response = await fetch('/api/pre-inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      // Sauvegarder aussi dans localStorage en backup
      const preInscrits = JSON.parse(localStorage.getItem('cpropre_preinscrits') || '[]');
      const newEntry = {
        ...formData,
        date: new Date().toISOString(),
        id: Date.now().toString()
      };
      preInscrits.push(newEntry);
      localStorage.setItem('cpropre_preinscrits', JSON.stringify(preInscrits));

      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-blue-600 to-primary-700 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Merci pour votre inscription !
          </h2>
          <p className="text-gray-600 mb-4">
            Vous faites partie des <strong className="text-primary-600">premiers inscrits VIP</strong> pour découvrir <strong>C'Propre</strong> !
          </p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 mb-6">
            <p className="text-sm text-green-900 font-bold mb-3">
              Vous serez contacté dès le lancement officiel avec :
            </p>
            <ul className="text-sm text-green-800 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <span>Une offre exclusive de -10%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <span>Des cadeaux de bienvenue</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <span>Un accès prioritaire au service</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              Le site sera bientôt disponible.<br />
              <strong className="text-gray-900">À très vite !</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Vidéo en arrière-plan - Visible uniquement sur PC (md et plus) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/5535856-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-black/70"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 py-8 sm:py-12">
        {/* Logo en haut avec effets améliorés - Optimisé mobile */}
        <div className="mb-6 md:mb-10 text-center relative px-2 w-full">
          {/* Effet glow derrière le logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-24 md:w-96 md:h-32 bg-gradient-to-r from-primary-500/30 via-blue-500/30 to-primary-500/30 blur-3xl animate-pulse"></div>
          </div>
          
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 md:mb-4">
            <span className="inline-block text-white drop-shadow-2xl">
              C'Propre
            </span>
          </h1>
          
          <div className="relative inline-block px-2 max-w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 blur-lg opacity-50"></div>
            <p className="relative text-white text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-wide px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-2xl break-words">
              Le pressing <span className="text-white drop-shadow-lg whitespace-nowrap">nouvelle génération</span>
            </p>
          </div>
        </div>

        <div className="max-w-6xl w-full px-2 mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Partie gauche - Texte marketing AMÉLIORÉ - Optimisé mobile */}
            <div className="text-white space-y-4 md:space-y-6 order-2 md:order-1">
              <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl overflow-hidden">
                {/* Effet K2000 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[slide_2s_ease-in-out_infinite]" style={{
                  backgroundSize: '200% 100%',
                  animation: 'k2000 2s linear infinite'
                }}></div>
                <Gift size={20} className="text-white sm:w-6 sm:h-6 relative z-10" />
                <span className="font-black text-sm sm:text-base md:text-lg relative z-10">BIENTÔT DISPONIBLE !</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                Le pressing qui vient<br />
                <span className="text-yellow-300">à vous</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                Plus besoin de vous déplacer ! <strong>C'Propre</strong> révolutionne le pressing avec la collecte et livraison à domicile.
              </p>

              <div className="space-y-3 md:space-y-4">
                <div className="group flex items-start gap-3 md:gap-4 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.1s', opacity: 0 }}>
                  <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-2 md:p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform group-hover:rotate-6">
                    <Truck className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl mb-1 text-white">Collecte à domicile</h3>
                    <p className="text-white/90 text-xs md:text-sm">Nous venons récupérer votre linge chez vous</p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 md:gap-4 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
                  <div className="bg-gradient-to-br from-blue-300 to-blue-500 p-2 md:p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform group-hover:rotate-6">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl mb-1 text-white">Nettoyage professionnel</h3>
                    <p className="text-white/90 text-xs md:text-sm">Traitement éco-responsable par des experts</p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 md:gap-4 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.3s', opacity: 0 }}>
                  <div className="bg-gradient-to-br from-green-300 to-green-500 p-2 md:p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform group-hover:rotate-6">
                    <Home className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl mb-1 text-white">Livraison express</h3>
                    <p className="text-white/90 text-xs md:text-sm">Retour de votre linge impeccable sous 48h</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Partie droite - Formulaire AMÉLIORÉ - Optimisé mobile */}
            <div className="bg-white rounded-xl md:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 md:border-4 border-primary-500/20 w-full max-w-full mx-auto order-1 md:order-2">
              <div className="text-center mb-3 md:mb-5">
                <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-2.5 py-1 md:px-4 md:py-2 rounded-full mb-2 md:mb-3">
                  <CheckCircle size={16} className="md:w-5 md:h-5" />
                  <span className="font-bold text-xs md:text-sm">Gratuit et sans engagement</span>
                </div>
                <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">
                  Pré-inscription Liste VIP
                </h2>
                <p className="text-xs md:text-sm text-gray-600 font-semibold mb-2">
                  Inscrivez-vous maintenant et soyez notifié par email dès le lancement !
                </p>
                <p className="text-[10px] md:text-xs text-primary-600 font-bold">
                  ⚡ Soyez les premiers informés du lancement
                </p>
              </div>

              {/* Zone de service avec scroll */}
              <div className="bg-gradient-to-r from-blue-50 to-primary-50 border-2 border-blue-200 rounded-xl p-3 md:p-4 mb-3 md:mb-4">
                <p className="text-xs md:text-sm text-blue-900 font-bold mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                  <MapPin className="text-blue-600" size={16} />
                  <span className="text-xs md:text-sm">Zone : Vaison-la-Romaine (10 km)</span>
                </p>
                <div className="relative">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {zonesValides.map((zone, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 bg-white px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-blue-300 shadow-sm"
                      >
                        <span className="text-[10px] md:text-xs font-semibold text-blue-900 whitespace-nowrap">
                          {zone.ville}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Indication de scroll */}
                  <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-red-800 font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                      placeholder="Jean Dupont"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                      placeholder="jean@email.fr"
                    />
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                {/* Ville */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Ville *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      required
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                      placeholder="Vaison-la-Romaine"
                    />
                  </div>
                </div>

                {/* Code postal */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.codePostal}
                    onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                    placeholder="84110"
                    maxLength={5}
                  />
                </div>

                {/* Bouton submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Inscription en cours...
                    </span>
                  ) : (
                    "M'inscrire gratuitement"
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                En vous inscrivant, vous acceptez de recevoir nos communications marketing. Aucun spam, promis !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
