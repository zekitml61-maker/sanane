'use client';

import { useState } from 'react';

export default function VideoTestPage() {
  const [videoStatus, setVideoStatus] = useState('');

  const videos = [
    { name: 'Pexels 1', url: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
    { name: 'Pexels 2', url: 'https://videos.pexels.com/video-files/8088182/8088182-sd_640_360_25fps.mp4' },
    { name: 'Coverr 1', url: 'https://cdn.coverr.co/videos/coverr-laundry-washing-machine-8389/preview.mp4' },
    { name: 'Pixabay 1', url: 'https://cdn.pixabay.com/video/2021/08/03/84244-582902589_tiny.mp4' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test des Vidéos</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-3">{video.name}</h3>
              <div className="bg-black rounded aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full"
                  onLoadStart={() => setVideoStatus(`${video.name}: Chargement...`)}
                  onLoadedData={() => setVideoStatus(`${video.name}: ✅ Chargée`)}
                  onError={(e) => setVideoStatus(`${video.name}: ❌ Erreur`)}
                >
                  <source src={video.url} type="video/mp4" />
                </video>
              </div>
              <p className="text-xs text-gray-600 mt-2 truncate">{video.url}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">Statut :</h3>
          <p className="text-sm">{videoStatus || 'En attente...'}</p>
        </div>

        <div className="mt-4">
          <a href="/" className="text-blue-600 hover:underline">← Retour à l'accueil</a>
        </div>
      </div>
    </div>
  );
}
