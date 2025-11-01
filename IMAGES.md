# Images Professionnelles Intégrées

Toutes les images proviennent de **Unsplash** (gratuites et libres de droits pour usage commercial).

## 📸 Images Principales

### Hero Section
- **Image** : Vêtements sur cintres dans un pressing
- **URL** : `photo-1582735689369-4fe89db7114c`
- **Usage** : Image principale de la page d'accueil

### Features Section
- **Image** : Professionnel repassant des vêtements
- **URL** : `photo-1558317374-067fb5f30001`
- **Usage** : Section "Un service qui fait la différence"

### Gallery Section (6 images)
1. **Chemises blanches** : `photo-1517677129300-07b130802f46`
2. **Vêtements colorés** : `photo-1489274495757-95c7c837b101`
3. **Service pressing** : `photo-1545292425-c66196de3c37`
4. **Machine professionnelle** : `photo-1604335399105-a0c585fd81a1`
5. **Équipe de pressing** : `photo-1567538096630-e0c55bd6374c`
6. **Livraison à domicile** : `photo-1610557892470-55d9e80c0bce`

### Testimonials (3 photos de clients)
1. **Sophie Martin** : `photo-1494790108377-be9c29b29330`
2. **Thomas Dubois** : `photo-1507003211169-0a1dd7228f2d`
3. **Marie Leroy** : `photo-1438761681033-6461ffad8d80`

### CTA Section
- **Image de fond** : Pressing professionnel en action
- **URL** : `photo-1521737711867-e3b97375f902`
- **Usage** : Background avec overlay pour section Call-to-Action

## 🔧 Configuration Technique

### Next.js Image Optimization
Les images sont configurées dans `next.config.ts` pour autoriser le domaine Unsplash :

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

### Paramètres d'URL
Toutes les images utilisent :
- `w=800` ou `w=1600` : Largeur optimisée
- `q=80` : Qualité 80% (bon compromis performance/qualité)

### Avantages
✅ Chargement optimisé automatique par Next.js
✅ Formats WebP/AVIF automatiques selon le navigateur
✅ Lazy loading natif
✅ Placeholder flou automatique
✅ Responsive images

## 🎨 Optimisations Visuelles

- **Hero** : `priority` pour chargement immédiat
- **Gallery** : Effet hover avec zoom
- **Testimonials** : Images rondes des clients
- **CTA** : Image de fond avec overlay gradient
- **Features** : Grande image immersive

## 📝 Crédits

Toutes les images proviennent de [Unsplash](https://unsplash.com), plateforme de photos gratuites et libres de droits.

Photographes : 
- Leurs travaux sont utilisés conformément à la licence Unsplash
- Attribution non requise mais appréciée
- Usage commercial autorisé

## 🔄 Pour Remplacer les Images

Si vous souhaitez utiliser vos propres images :

1. **Option 1 - Images locales** :
   - Placer les images dans `/public/images/`
   - Modifier les `src` : `/images/nom-image.jpg`

2. **Option 2 - Autre CDN** :
   - Ajouter le domaine dans `next.config.ts`
   - Mettre à jour les URLs dans les composants

3. **Option 3 - Changer les images Unsplash** :
   - Rechercher sur [Unsplash.com](https://unsplash.com)
   - Copier l'ID de la photo (ex : `abc123`)
   - Remplacer dans le composant : `photo-abc123`
