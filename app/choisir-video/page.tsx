'use client';

import { useState } from 'react';

export default function ChoisirVideoPage() {
  const [selectedBg, setSelectedBg] = useState('');
  const [selectedMain, setSelectedMain] = useState('');

  const videos = [
    {
      id: 'pexels-3209828',
      name: 'Machine à laver professionnelle (Actuelle)',
      bg: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4',
      main: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4',
      description: 'Machine à laver moderne en action',
    },
    {
      id: 'pexels-8088182',
      name: 'Linge dans tambour',
      bg: 'https://videos.pexels.com/video-files/8088182/8088182-sd_640_360_25fps.mp4',
      main: 'https://videos.pexels.com/video-files/8088182/8088182-hd_1920_1080_25fps.mp4',
      description: 'Vue intérieure tambour avec linge',
    },
    {
      id: 'pexels-6195578',
      name: 'Pressing professionnel',
      bg: 'https://videos.pexels.com/video-files/6195578/6195578-sd_640_360_25fps.mp4',
      main: 'https://videos.pexels.com/video-files/6195578/6195578-hd_1920_1080_25fps.mp4',
      description: 'Environnement pressing avec vêtements',
    },
    {
      id: 'pexels-4816055',
      name: 'Laverie automatique',
      bg: 'https://videos.pexels.com/video-files/4816055/4816055-sd_640_360_30fps.mp4',
      main: 'https://videos.pexels.com/video-files/4816055/4816055-hd_1920_1080_30fps.mp4',
      description: 'Rangée de machines à laver',
    },
    {
      id: 'pixabay-84244',
      name: 'Machine rotation (Légère)',
      bg: 'https://cdn.pixabay.com/video/2021/08/03/84244-582902589_tiny.mp4',
      main: 'https://cdn.pixabay.com/video/2021/08/03/84244-582902589_large.mp4',
      description: 'Linge en rotation - fichier léger',
    },
    {
      id: 'coverr-8389',
      name: 'Machine industrielle',
      bg: 'https://cdn.coverr.co/videos/coverr-laundry-washing-machine-8389/preview.mp4',
      main: 'https://cdn.coverr.co/videos/coverr-laundry-washing-machine-8389/1080p.mp4',
      description: 'Machine industrielle professionnelle',
    },
  ];

  const handleCopyCode = () => {
    const code = `
// Vidéo d'arrière-plan
<source src="${selectedBg || videos[0].bg}" type="video/mp4" />

// Vidéo principale
<source src="${selectedMain || videos[0].main}" type="video/mp4" />
`;
    navigator.clipboard.writeText(code);
    alert('Code copié ! Collez-le dans Hero.tsx');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎬 Choisir vos vidéos
          </h1>
          <p className="text-xl text-gray-600">
            Cliquez sur une vidéo pour la prévisualiser, puis copiez le code
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-video bg-gray-900">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onClick={() => {
                    setSelectedBg(video.bg);
                    setSelectedMain(video.main);
                  }}
                >
                  <source src={video.bg} type="video/mp4" />
                </video>
                {selectedBg === video.bg && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ✓ Sélectionnée
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {video.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                <button
                  onClick={() => {
                    setSelectedBg(video.bg);
                    setSelectedMain(video.main);
                  }}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    selectedBg === video.bg
                      ? 'bg-green-500 text-white'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {selectedBg === video.bg ? '✓ Sélectionnée' : 'Sélectionner'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedBg && (
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prévisualisation de votre sélection
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-2">Vidéo d'arrière-plan (SD)</h3>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg"
                >
                  <source src={selectedBg} type="video/mp4" />
                </video>
              </div>
              <div>
                <h3 className="font-bold mb-2">Vidéo principale (HD)</h3>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg"
                >
                  <source src={selectedMain} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-4 overflow-x-auto">
              <p className="text-xs mb-2 text-gray-400">
                📋 Copiez ces URLs pour les mettre dans components/Hero.tsx :
              </p>
              <code className="text-sm">
                <div className="mb-3">
                  <span className="text-gray-500">{`// Vidéo d'arrière-plan (ligne ~16)`}</span>
                  <br />
                  <span className="text-yellow-400">&lt;source</span>{' '}
                  <span className="text-blue-400">src=</span>
                  <span className="text-green-300">"{selectedBg}"</span>{' '}
                  <span className="text-blue-400">type=</span>
                  <span className="text-green-300">"video/mp4"</span>{' '}
                  <span className="text-yellow-400">/&gt;</span>
                </div>
                <div>
                  <span className="text-gray-500">{`// Vidéo principale (ligne ~81)`}</span>
                  <br />
                  <span className="text-yellow-400">&lt;source</span>{' '}
                  <span className="text-blue-400">src=</span>
                  <span className="text-green-300">"{selectedMain}"</span>{' '}
                  <span className="text-blue-400">type=</span>
                  <span className="text-green-300">"video/mp4"</span>{' '}
                  <span className="text-yellow-400">/&gt;</span>
                </div>
              </code>
            </div>

            <button
              onClick={handleCopyCode}
              className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-primary-700 transition"
            >
              📋 Copier le code
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Retour à l'accueil
          </a>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">
            💡 Comment ajouter votre propre vidéo ?
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Allez sur{' '}
              <a
                href="https://www.pexels.com/search/videos/laundry/"
                target="_blank"
                className="underline font-semibold"
              >
                Pexels.com
              </a>{' '}
              ou{' '}
              <a
                href="https://pixabay.com/videos/search/laundry/"
                target="_blank"
                className="underline font-semibold"
              >
                Pixabay.com
              </a>
            </li>
            <li>Cherchez "laundry", "washing machine", "dry cleaning"</li>
            <li>Cliquez sur une vidéo → Télécharger → Copiez l'URL</li>
            <li>
              Utilisez cette URL dans le code ci-dessus (remplacez l'URL existante)
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
