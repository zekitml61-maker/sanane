# Guide : Recevoir les pré-inscriptions par email

## 🎯 3 Solutions possibles

---

## ✅ Solution 1 : Resend (Recommandée - GRATUIT)

**Avantages :**
- 100% gratuit pour 100 emails/jour
- Facile à configurer
- Professionnel

**Étapes :**

### 1. Créer un compte Resend
- Allez sur https://resend.com
- Créez un compte gratuit
- Copiez votre clé API (commence par `re_...`)

### 2. Installer Resend dans le projet
```bash
npm install resend
```

### 3. Configurer la clé API
Créez le fichier `.env.local` à la racine du projet :
```
RESEND_API_KEY=re_votre_cle_api_ici
```

### 4. Modifier le fichier API
Ouvrez `app/api/pre-inscription/route.ts` et décommentez la section Resend.
Remplacez `votre-email@exemple.com` par votre vrai email.

### 5. Modifier la page de pré-inscription
Remplacez la sauvegarde localStorage par un appel API.

---

## 📧 Solution 2 : EmailJS (Simple - GRATUIT)

**Avantages :**
- 200 emails/mois gratuits
- Pas de backend nécessaire
- Configuration rapide

**Étapes :**

### 1. Créer un compte EmailJS
- Allez sur https://www.emailjs.com
- Créez un compte gratuit
- Connectez votre email (Gmail, Outlook, etc.)

### 2. Installer EmailJS
```bash
npm install @emailjs/browser
```

### 3. Configurer EmailJS
Récupérez vos IDs dans EmailJS :
- Service ID
- Template ID  
- Public Key

### 4. Créer un template d'email
Dans EmailJS, créez un template avec ces variables :
```
Nom: {{nom}}
Email: {{email}}
Téléphone: {{telephone}}
Ville: {{ville}}
Code postal: {{codePostal}}
```

### 5. Code à ajouter dans `app/pre-inscription/page.tsx`

```typescript
import emailjs from '@emailjs/browser';

// Dans handleSubmit, avant setSubmitted(true) :
try {
  await emailjs.send(
    'YOUR_SERVICE_ID',     // Remplacez
    'YOUR_TEMPLATE_ID',    // Remplacez
    {
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      ville: formData.ville,
      codePostal: formData.codePostal,
    },
    'YOUR_PUBLIC_KEY'      // Remplacez
  );
  console.log('Email envoyé !');
} catch (error) {
  console.error('Erreur email:', error);
}
```

---

## 🔗 Solution 3 : Google Forms (Le plus simple)

**Avantages :**
- Aucun code nécessaire
- 100% gratuit
- Données dans Google Sheets automatiquement

**Étapes :**

### 1. Créer un Google Form
- Allez sur https://forms.google.com
- Créez un formulaire avec les champs : Nom, Email, Téléphone, Ville, Code Postal

### 2. Configurer les notifications
- Dans Réponses → 3 points → Recevoir des notifications par email
- Vous recevrez un email à chaque nouvelle réponse

### 3. Obtenir le lien de soumission
- Cliquez sur "Envoyer"
- Sélectionnez l'icône de lien
- Copiez l'URL

### 4. Modifier votre formulaire
Au lieu d'utiliser le formulaire actuel, redirigez vers Google Forms :
```typescript
// Dans handleSubmit :
window.location.href = 'https://forms.gle/VOTRE_LIEN_ICI';
```

---

## 🚀 Quelle solution choisir ?

| Solution | Difficulté | Gratuit | Emails/mois | Design personnalisé |
|----------|-----------|---------|-------------|---------------------|
| **Resend** | ⭐⭐⭐ | ✅ | 3000 | ✅ |
| **EmailJS** | ⭐⭐ | ✅ | 200 | ✅ |
| **Google Forms** | ⭐ | ✅ | Illimité | ❌ |

---

## 💡 Ma recommandation

**Pour commencer rapidement** : Google Forms
**Pour un site professionnel** : Resend ou EmailJS

---

## 📝 Besoin d'aide ?

Si vous voulez que je configure l'une de ces solutions, dites-moi laquelle vous préférez !
