# 📋 Guide des Sections du Site

## Vue d'ensemble

Le site C'Propre contient **11 sections principales** organisées pour une expérience utilisateur optimale.

---

## 1. 🎯 NAVBAR (Navigation)
**Fichier** : `components/Navbar.tsx`

### Contenu
- Logo "C'Propre"
- Menu : Services, Abonnements, Suivi, Contact
- Bouton téléphone : 01 23 45 67 89
- Version mobile avec hamburger menu

### Style
- Fond blanc, ombre subtile
- Position fixe en haut
- Responsive collapse sur mobile

---

## 2. 🚀 HERO (Section d'accueil)
**Fichier** : `components/Hero.tsx`

### Contenu
- Titre principal avec "professionnel" en bleu
- Sous-titre explicatif
- 2 CTA : "Choisir mon abonnement" + "Suivre ma commande"
- 3 badges : Qualité Premium, Service Rapide, Garanti
- **Image Unsplash** : Vêtements sur cintres professionnels

### Style
- Gradient bleu clair en fond
- Image avec cadre gradient bleu premium
- Layout 50/50 texte/image

---

## 3. 💼 SERVICES
**Fichier** : `components/Services.tsx`

### Contenu (6 services)
1. **Nettoyage Pressing** (bleu) - Chemises, costumes, robes
2. **Nettoyage à Sec** (cyan) - Soie, laine, cachemire
3. **Repassage Premium** (violet) - Plis parfaits
4. **Détachage Expert** (ambre) - Vin, café, graisse
5. **Linge de Maison** (vert) - Draps, couettes, serviettes
6. **Collecte à Domicile** (rose) - Chaque lundi

### Style
- 6 cartes en grille 3 colonnes
- Icônes colorées avec gradients uniques
- Effet hover : scale + ombre
- Descriptions détaillées 2 lignes

---

## 4. ⭐ FEATURES
**Fichier** : `components/Features.tsx`

### Contenu
- Titre "Un service qui fait la différence"
- 6 points forts avec icônes CheckCircle
- 2 statistiques : 15+ ans, 50k+ clients
- **Image Unsplash** : Professionnel repassant

### Style
- Layout 50/50 image/texte
- Grande image 600px hauteur
- Stats en cartes bleues

---

## 5. 📸 GALLERY
**Fichier** : `components/Gallery.tsx`

### Contenu (6 images + 2 grandes)
**Petites images** :
1. Chemises blanches - "Repassage Premium"
2. Vêtements colorés - "Nettoyage Expert"
3. Service pressing - "Service Rapide"
4. Machine pro - "Équipement Pro"

**Grandes images** :
5. Notre Équipe - Personnel au travail
6. Livraison Express - Livraison à domicile

### Style
- Grille 4 colonnes pour petites images
- Effet hover : zoom + overlay texte
- 2 grandes images en 50/50 en dessous

---

## 6. 💰 SUBSCRIPTIONS (Abonnements)
**Fichier** : `components/Subscriptions.tsx`

### Contenu (3 formules)

**Essentiel - 29.90€/mois**
- 15L, 48h, standard
- Badge : Aucun
- Couleur : Bleu

**Confort - 49.90€/mois** ⭐
- 30L, 48h, premium + détachage
- Badge : "Le plus populaire"
- Couleur : Primary (mise en avant)

**Premium - 79.90€/mois**
- 50L, 24h express, VIP complet
- Badge : Aucun
- Couleur : Ambre

### Style
- 3 cartes en grille
- Formule Confort mise en avant (scale + ring)
- Header coloré avec icône
- Liste features avec CheckCircle
- Note : "Premier mois offert"

---

## 7. 📝 HOW IT WORKS (Comment ça marche)
**Fichier** : `components/HowItWorks.tsx`

### Contenu (4 étapes)
1. **Réservez** (Calendar) - Choisir formule
2. **Collecte** (Truck) - Chaque lundi
3. **Nettoyage** (Sparkles) - Traitement pro
4. **Livraison** (Package) - 24-48h

### Style
- 4 colonnes avec numéros
- Icônes circulaires bleu clair
- Flèches entre les étapes (desktop)
- Numéros en badge sur icônes

---

## 8. 💬 TESTIMONIALS (Témoignages)
**Fichier** : `components/Testimonials.tsx`

### Contenu (3 avis)
1. **Sophie Martin** - Cliente 2 ans
2. **Thomas Dubois** - Client Premium
3. **Marie Leroy** - Cliente Confort

Chaque avis :
- Photo profil ronde (Unsplash)
- 5 étoiles dorées
- Citation entre guillemets

**Stats globales** :
- 4.9/5 avec 5 étoiles
- 2,500+ avis clients

### Style
- 3 cartes blanches avec ombres
- Photos circulaires 64px
- Étoiles remplies ambre
- Fond gradient bleu clair

---

## 9. 🎯 CTA (Call to Action)
**Fichier** : `components/CTA.tsx`

### Contenu
- Titre "Prêt à simplifier votre quotidien ?"
- Sous-titre avec 10,000 clients
- 2 boutons : Abonnement (blanc) + Appeler (transparent)
- **Image de fond Unsplash** : Pressing professionnel

**4 statistiques avec backdrop blur** :
- 10k+ clients actifs
- 15+ ans d'expérience
- 98% satisfaction
- 24/7 disponible

### Style
- Full width avec image de fond
- Overlay gradient bleu foncé
- Texte blanc sur fond
- Backdrop blur sur stats

---

## 10. 🔍 QR CODE TRACKING (Suivi)
**Fichier** : `components/QRCodeTracking.tsx`

### Contenu
- Titre avec icône QR Code
- Champ de recherche + bouton
- Système de tracking en temps réel

**3 codes de test** :
- CP2025001 - Livré ✅
- CP2025002 - En traitement 🔄
- CP2025003 - Collecté 📦

**Affichage commande** :
- Statut avec icône et couleur
- Dates collecte/livraison
- Formule et nombre d'articles

**3 cartes info** :
- Collecte (lundi)
- Traitement (24-48h)
- Livraison (à domicile)

### Style
- Fond gradient bleu clair
- Carte blanche avec ombres
- Badges colorés par statut
- Messages contextuels

---

## 11. 📞 FOOTER (Pied de page)
**Fichier** : `components/Footer.tsx`

### Contenu (4 colonnes)

**Colonne 1 - À propos**
- Logo C'Propre
- Description courte
- 3 icônes sociales : Facebook, Instagram, Twitter

**Colonne 2 - Services**
- 5 liens services

**Colonne 3 - Informations**
- Formules, Suivi, FAQ, CGV, Mentions

**Colonne 4 - Contact**
- Téléphone : 01 23 45 67 89 (Lun-Sam 8h-19h)
- Email : contact@cpropre.fr
- Adresse : 123 Avenue République, 75011 Paris

**Bas de page**
- Copyright 2025
- Liens : Confidentialité, Cookies, Plan du site

### Style
- Fond gris foncé (gray-900)
- Texte blanc/gris
- Liens hover blanc
- Icônes sociales avec hover bleu

---

## 🎨 Thème Couleurs Global

```css
Primary : #0ea5e9 (Bleu ciel)
Primary Dark : #0369a1 (Bleu foncé)
Accent : #f97316 (Orange)

Services Gradients :
- Bleu : from-blue-500 to-blue-600
- Cyan : from-cyan-500 to-cyan-600
- Violet : from-purple-500 to-purple-600
- Ambre : from-amber-500 to-amber-600
- Vert : from-green-500 to-green-600
- Rose : from-rose-500 to-rose-600

Texte :
- Titres : gray-900
- Corps : gray-600/700
- Boutons : white sur primary

Backgrounds :
- Sections alternées : white / gray-50 / primary-50
```

---

## 📱 Breakpoints Responsive

```css
Mobile : < 768px (1 colonne)
Tablet : 768px - 1024px (2 colonnes)
Desktop : > 1024px (3-4 colonnes)
```

Toutes les sections s'adaptent automatiquement !
