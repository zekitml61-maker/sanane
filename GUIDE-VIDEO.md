# 🎬 Guide pour ajouter une vidéo locale

## Étape 1 : Télécharger une vidéo gratuite

### Option A : Pexels (Recommandé)
1. Allez sur https://www.pexels.com/search/videos/laundry/
2. Choisissez une vidéo (exemple : machine à laver)
3. Cliquez sur "Free Download" → Choisissez "HD 1920x1080"
4. Enregistrez le fichier MP4

### Option B : Pixabay
1. Allez sur https://pixabay.com/videos/search/washing%20machine/
2. Choisissez une vidéo
3. Téléchargez en cliquant sur le bouton de téléchargement
4. Choisissez la qualité 1920x1080

### Vidéos suggérées :
- Machine à laver en rotation
- Linge dans un tambour
- Pressing professionnel avec vêtements
- Laverie automatique

## Étape 2 : Placer la vidéo dans le projet

1. Renommez votre vidéo : `hero-video.mp4`
2. Placez-la dans le dossier : 
   ```
   cpropre-pressing/public/videos/hero-video.mp4
   ```

## Étape 3 : Utiliser la vidéo

La vidéo sera automatiquement utilisée avec ce code dans `Hero.tsx` :

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
>
  <source src="/videos/hero-video.mp4" type="video/mp4" />
</video>
```

## ✅ Avantages vidéo locale :
- ✅ Chargement instantané
- ✅ Pas de dépendance réseau
- ✅ Contrôle total de la qualité
- ✅ Fonctionne même hors ligne

## 📝 Tailles recommandées :
- **Vidéo d'arrière-plan** : 720p (léger, rapide)
- **Vidéo principale** : 1080p (haute qualité)
- **Durée** : 10-20 secondes (en boucle)
- **Format** : MP4 (H.264)

## 🔧 Commande pour vous :

1. Téléchargez une vidéo depuis Pexels ou Pixabay
2. Mettez-la dans `public/videos/`
3. Dites-moi et je modifie le code pour l'utiliser !
