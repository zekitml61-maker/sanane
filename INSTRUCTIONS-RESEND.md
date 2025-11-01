# 📧 Configuration de Resend - Étape par étape

## ✅ Ce qui a été fait :

1. ✅ Resend installé (`npm install resend`)
2. ✅ API route créée (`app/api/pre-inscription/route.ts`)
3. ✅ Page de pré-inscription modifiée pour envoyer les données à l'API
4. ✅ Email HTML stylisé créé

## 🚀 Ce qu'il vous reste à faire :

### Étape 1 : Créer un compte Resend (2 minutes)

1. Allez sur **https://resend.com**
2. Cliquez sur **"Sign up"**
3. Créez votre compte (gratuit)

### Étape 2 : Obtenir votre clé API (1 minute)

1. Une fois connecté, allez dans **"API Keys"** dans le menu
2. Cliquez sur **"Create API Key"**
3. Donnez-lui un nom (ex: "C'Propre Production")
4. **Copiez la clé** (commence par `re_...`)
   ⚠️ IMPORTANT : Vous ne pourrez plus la voir après !

### Étape 3 : Configurer votre projet (1 minute)

1. **Créez le fichier `.env.local`** à la racine du projet (même dossier que `package.json`)

2. **Collez ce contenu** dans `.env.local` :

```
RESEND_API_KEY=re_votre_cle_copiee_ici
NOTIFICATION_EMAIL=votre-email@exemple.com
```

3. **Remplacez** :
   - `re_votre_cle_copiee_ici` par votre vraie clé API Resend
   - `votre-email@exemple.com` par votre email où vous voulez recevoir les notifications

**Exemple :**
```
RESEND_API_KEY=re_VotreCleAPIIci
NOTIFICATION_EMAIL=contact@cpropre.fr
```

### Étape 4 : Redémarrer le serveur

**Arrêtez le serveur** (Ctrl+C dans le terminal) puis **relancez** :

```bash
npm run dev
```

## 🎉 C'est tout ! Maintenant :

- Chaque nouvelle pré-inscription vous enverra un **email stylisé** avec toutes les infos du client
- L'email contient : nom, email, téléphone, ville, code postal et date
- Les données sont aussi sauvegardées dans **localStorage** en backup

## 🧪 Tester

1. Allez sur votre page de pré-inscription
2. Remplissez le formulaire avec vos infos
3. Cliquez sur "Rejoindre la liste VIP"
4. Vérifiez votre boîte email ! 📬

## ⚠️ Important

- Le fichier `.env.local` ne doit **JAMAIS** être committé sur Git (il est déjà dans `.gitignore`)
- Gardez votre clé API **secrète**
- Avec le plan gratuit Resend : **3000 emails/mois** (largement suffisant)

## 📊 Exemple d'email que vous recevrez :

```
🎉 Nouvelle Pré-inscription
C'Propre - Pressing Professionnel

👤 Nom : Jean Dupont
📧 Email : jean.dupont@exemple.fr
📱 Téléphone : 06 12 34 56 78
📍 Ville : Vaison-la-Romaine
🏠 Code postal : 84110
📅 Date : 01/11/2025 à 14:30
```

## 🆘 Problèmes ?

### L'email n'arrive pas ?

1. Vérifiez que le fichier `.env.local` existe bien
2. Vérifiez que la clé API est correcte
3. Redémarrez le serveur (`npm run dev`)
4. Regardez la console pour les erreurs
5. Vérifiez vos **spams**

### Erreur "Resend API Key is invalid"

- Votre clé API est incorrecte
- Créez une nouvelle clé sur resend.com
- Remplacez dans `.env.local`
- Redémarrez le serveur

## 📚 Ressources

- Dashboard Resend : https://resend.com/overview
- Documentation : https://resend.com/docs
- Support : https://resend.com/support
