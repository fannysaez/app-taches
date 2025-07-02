# 🔥 App Tâches - Gestionnaire de Tâches Moderne

Une application web complète de gestion de tâches construite avec les dernières technologies web.

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon.tech-336791?style=for-the-badge&logo=postgresql)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

## 🚀 Fonctionnalités

- ✅ **Affichage des tâches** avec statut visuel (terminé/en cours)
- ➕ **Création de nouvelles tâches** avec titre et description
- ✏️ **Modification des tâches** avec formulaire inline
- 🔄 **Basculer le statut** d'une tâche (terminé ↔ en cours)
- 🗑️ **Suppression de tâches** avec confirmation
- 📅 **Horodatage automatique** (création et modification)
- 🎨 **Interface intuitive** et responsive
- ⚡ **Mise à jour en temps réel** sans rechargement

---

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 13+** - Framework React avec App Router
- **React 18** - Bibliothèque UI avec Server Components
- **JavaScript ES6+** - Langage principal (pas TypeScript)

### Backend
- **Next.js API Routes** - API REST intégrée
- **Prisma ORM** - Interface moderne pour base de données
- **PostgreSQL** - Base de données relationnelle

### Infrastructure
- **Neon.tech** - Base de données PostgreSQL cloud (gratuite)
- **Vercel** - Déploiement et hébergement

---

## 🏗️ Architecture

```bash

app-taches/
├── .next/                          # Build Next.js (généré automatiquement)
├── node_modules/                   # Dépendances NPM
├── prisma/
│   ├── migrations/                 # Migrations de la base de données
│   │   └── 20250702065308_init/
│   │       ├── migration.sql       # Script SQL de migration
│   │       └── migration_lock.toml # Verrou de migration
│   └── schema.prisma              # Schéma de base de données
├── public/                        # Fichiers statiques
│   └── favicon.ico               # Icône du site
├── scripts/
│   └── seed.js                   # Script de données de test
├── src/                          # Code source principal
│   ├── app/                      # App Router Next.js 13+
│   │   ├── api/
│   │   │   └── tasks/
│   │   │       ├── [id]/
│   │   │       │   └── route.js  # API CRUD pour tâche spécifique
│   │   │       └── route.js      # API CRUD pour toutes les tâches
│   │   ├── components/
│   │   │   ├── TaskList.js       # Liste des tâches
│   │   │   └── TaskList.module.css # Styles pour TaskList
│   │   ├── generated/            # Fichiers générés (Prisma)
│   │   ├── lib/
│   │   │   └── prisma.js         # Configuration client Prisma
│   │   ├── favicon.ico           # Icône de l'app
│   │   ├── globals.css           # Styles globaux
│   │   ├── layout.js             # Layout principal de l'application
│   │   ├── page.js               # Page d'accueil
│   │   └── page.module.css       # Styles pour la page d'accueil
├── .env                          # Variables d'environnement (exemple)
├── .gitignore                    # Fichiers ignorés par Git
├── eslint.config.mjs            # Configuration ESLint
├── jsconfig.json                # Configuration JavaScript/VS Code
├── next.config.mjs              # Configuration Next.js
├── package-lock.json            # Verrouillage des versions NPM
├── package.json                 # Dépendances et scripts
└── README.md                    # Documentation du projet
```
---

## 🚦 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Compte Neon.tech (gratuit)

### 1. Cloner le repository
```bash
git clone https://github.com/fannysaez/app-tache.git
cd app-tache
```

### 1bis. Créer une nouvelle application Next.js (si besoin)
```bash
npx create-next-app@latest mon-app-taches --no-typescript --no-tailwind --eslint --src-dir --app
cd mon-app-taches
```

### 2. Installer les dépendances
```bash
# Installer les dépendances de base
npm install

# Installer Prisma CLI et Prisma Client
npm install prisma @prisma/client

# Initialiser Prisma (si pas déjà fait)
npx prisma init
```

---

### 3. Configurer la base de données

#### 3.1 Créer un compte Neon.tech
1. Allez sur [neon.tech](https://neon.tech)
2. Cliquez sur "Sign up"
3. Connectez-vous avec GitHub (recommandé) ou email

#### 3.2 Créer votre projet de base de données
1. Une fois connecté, cliquez sur "Create a project"
2. **Nom du projet** : `mon-app-taches`
3. **Région** : Europe (Europe-West) pour de meilleures performances en France
4. **Version PostgreSQL** : Laissez la version par défaut
5. Cliquez sur "Create project"

#### 3.3 Récupérer l'URL de connexion
1. Sur la page de votre projet, vous verrez "Connection string"
2. Cliquez sur l'œil pour révéler l'URL complète
3. Copiez cette URL

#### 3.4 Configurer les variables d'environnement
Créez un fichier `.env.local` à la racine du projet :
```env
# URL de connexion à votre base de données Neon
DATABASE_URL="votre_url_neon_ici"

# Exemple d'URL (remplacez par la vôtre) :
# DATABASE_URL="postgresql://username:password@ep-xxxx.eu-west-1.aws.neon.tech/neondb?sslmode=require"
```

**⚠️ Important :** Gardez cette URL secrète et vérifiez que `.env.local` est dans votre `.gitignore` !

### 4. Configurer Prisma

#### 4.1 Configurer le schéma
Le fichier `prisma/schema.prisma` doit contenir :
```prisma
// Configuration du générateur
generator client {
  provider = "prisma-client-js"
}

// Configuration de la base de données
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Modèle de tâche
model Task {
  id          Int      @id @default(autoincrement())
  title       String   // Titre de la tâche
  description String?  // Description optionnelle
  completed   Boolean  @default(false) // Statut
  createdAt   DateTime @default(now()) // Date de création
  updatedAt   DateTime @updatedAt // Date de modification
  
  @@map("tasks")
}
```

#### 4.2 Générer et appliquer
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init

# (Optionnel) Ajouter des données de test
npm run seed
```

### 5. Créer le script de données de test
Créez `scripts/seed.js` :
```javascript
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Supprimer les données existantes
  await prisma.task.deleteMany()

  // Ajouter des tâches de test
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Apprendre Next.js',
        description: 'Suivre un tutoriel complet sur Next.js',
        completed: false
      },
      {
        title: 'Configurer Prisma',
        description: 'Installer et configurer Prisma avec Neon.tech',
        completed: true
      },
      {
        title: 'Créer une todo app',
        description: 'Construire une application de gestion de tâches',
        completed: false
      }
    ]
  })

  console.log(`✅ ${tasks.count} tâches créées`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 6. Lancer l'application
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

---

## 📱 Utilisation

### Actions principales

| Action                    | Comment faire                                                                 |
|---------------------------|-------------------------------------------------------------------------------|
| **Ajouter une tâche**     | Utilisez le formulaire en haut de page                                       |
| **Modifier une tâche**    | Cliquez sur l'icône d'édition ✏️                                            |
| **Marquer comme terminée**| Cliquez sur la checkbox ou le bouton de statut                               |
| **Supprimer**             | Cliquez sur l'icône de suppression 🗑️ (avec confirmation)                   |
| **Filtrer**               | Utilisez les boutons de filtre (Toutes / En cours / Terminées)               |

### Interface utilisateur
- **Formulaire d'ajout** : En haut de la page avec validation
- **Liste des tâches** : Affichage avec statut visuel
- **Modification inline** : Cliquez sur "Modifier" pour éditer directement
- **Indicateurs visuels** : ✅ pour terminé, ⏳ pour en cours
- **Dates automatiques** : Création et modification horodatées

---

## 🔌 API Endpoints

| Méthode | Endpoint             | Description                        | Paramètres                          |
|---------|----------------------|------------------------------------|-------------------------------------|
| GET     | `/api/tasks`         | Récupérer toutes les tâches        | -                                   |
| POST    | `/api/tasks`         | Créer une nouvelle tâche           | `{ title, description? }`           |
| GET     | `/api/tasks/[id]`    | Récupérer une tâche spécifique     | -                                   |
| PUT     | `/api/tasks/[id]`    | Mettre à jour une tâche            | `{ title?, description?, completed? }` |
| DELETE  | `/api/tasks/[id]`    | Supprimer une tâche                | -                                   |

### Exemple d'utilisation de l'API
```javascript
// Créer une tâche
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Ma nouvelle tâche',
    description: 'Description optionnelle'
  })
});

// Modifier une tâche
await fetch('/api/tasks/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    title: 'Titre modifié',
    completed: true 
  })
});

// Supprimer une tâche
await fetch('/api/tasks/1', {
  method: 'DELETE'
});
```

---

## 📊 Base de données

### Modèle de données (Prisma Schema)
```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String   // Titre de la tâche
  description String?  // Description optionnelle
  completed   Boolean  @default(false) // Statut
  createdAt   DateTime @default(now()) // Date de création
  updatedAt   DateTime @updatedAt // Date de modification
  
  @@map("tasks")
}
```

### Commandes utiles
```bash
# Interface graphique pour voir la base de données
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset

# Appliquer les changements de schéma sans migration
npx prisma db push

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations en production
npx prisma migrate deploy

# Régénérer le client après modification du schéma
npx prisma generate
```

---

## 🎨 Personnalisation des styles

Le projet utilise **CSS Modules** pour une isolation parfaite des styles :

```css
/* styles/components/TaskCard.module.css */
.taskCard {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  background-color: var(--card-bg);
  transition: all 0.2s ease-in-out;
}

.taskCard:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.taskCard.completed {
  opacity: 0.7;
  background-color: var(--completed-bg);
}

.taskCard.completed .title {
  text-decoration: line-through;
  color: var(--completed-text);
}
```

### Variables CSS globales
```css
/* app/globals.css */
:root {
  /* Couleurs principales */
  --primary-color: #0070f3;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --info-color: #17a2b8;
  
  /* Couleurs de fond */
  --bg-color: #ffffff;
  --card-bg: #f8f9fa;
  --completed-bg: #e8f5e8;
  
  /* Couleurs de texte */
  --text-color: #333333;
  --text-muted: #666666;
  --completed-text: #999999;
  
  /* Espacements */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Bordures */
  --border-radius: 8px;
  --border-color: #dee2e6;
  
  /* Ombres */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Mode sombre (optionnel) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --card-bg: #2d2d2d;
    --text-color: #ffffff;
    --text-muted: #cccccc;
    --border-color: #404040;
  }
}
```

---

## 🧰 Scripts disponibles

| Commande                | Description                                 |
|-------------------------|---------------------------------------------|
| `npm run dev`           | Démarrer en développement                   |
| `npm run build`         | Construire pour production                  |
| `npm run start`         | Démarrer en production                      |
| `npm run lint`          | Linter le code                              |
| `npm run seed`          | Ajouter des données de test                 |
| `npx prisma studio`     | Interface graphique BDD                     |
| `npx prisma generate`   | Régénérer client Prisma                     |
| `npx prisma migrate dev`| Créer/appliquer une migration              |
| `npx prisma db push`    | Pousser les changements sans migration     |

### Ajout dans package.json
Assurez-vous d'avoir ces scripts dans votre `package.json` :
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "node scripts/seed.js"
  }
}
```

---

## 🚀 Déploiement

### Déploiement sur Vercel (recommandé)

#### Étape 1 : Préparer le code
```bash
# S'assurer que tout fonctionne localement
npm run build

# Vérifier les migrations
npx prisma generate

# Initialiser Git si pas déjà fait
git init
git add .
git commit -m "Initial commit - App de tâches complète"
```

#### Étape 2 : Pousser sur GitHub
```bash
# Ajouter l'origine GitHub
git remote add origin https://github.com/fannysaez/app-tache.git
git branch -M main
git push -u origin main
```

#### Étape 3 : Déployer sur Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Sélectionnez votre repository `app-tache`
5. **Configurer les variables d'environnement** :
   - Nom : `DATABASE_URL`
   - Valeur : votre URL Neon.tech complète
6. Cliquez sur "Deploy"

#### Étape 4 : Appliquer les migrations en production
Une fois déployé, les migrations Prisma sont automatiquement appliquées.

### Variables d'environnement en production
```env
# Dans les paramètres de votre projet Vercel
DATABASE_URL=postgresql://username:password@ep-xxxx.eu-west-1.aws.neon.tech/neondb?sslmode=require
```

### Autres plateformes de déploiement
- **Netlify** : Similaire à Vercel, bon pour les sites statiques
- **Railway** : Excellent pour les applications avec base de données
- **DigitalOcean App Platform** : Plus de contrôle sur l'infrastructure
- **Heroku** : Plateforme classique avec add-ons PostgreSQL

---

## ✅ Tests et vérifications

### Checklist de fonctionnalités
Vérifiez que vous pouvez :
- ✅ Voir la page d'accueil avec le design
- ✅ Ajouter une nouvelle tâche avec titre et description
- ✅ **Modifier une tâche existante** (titre et description)
- ✅ Marquer une tâche comme terminée/en cours
- ✅ Supprimer une tâche avec confirmation
- ✅ Voir les tâches s'actualiser en temps réel
- ✅ Voir les dates de création et modification
- ✅ Navigation entre les formulaires (ajout/édition)

### Vérifications techniques
```bash
# Vérifier la base de données
npx prisma studio

# Vérifier les erreurs de build
npm run build

# Vérifier les erreurs de lint
npm run lint
```

### Test des API endpoints
```javascript
// Test dans la console du navigateur (F12)

// Test GET
fetch('/api/tasks').then(r => r.json()).then(console.log)

// Test POST
fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Test API', description: 'Test depuis console' })
}).then(r => r.json()).then(console.log)
```

---

## 🔧 Troubleshooting

### Problèmes courants et solutions

#### Erreur de connexion à la base de données
```bash
# Vérifier que DATABASE_URL est correctement configuré
echo $DATABASE_URL

# Tester la connexion
npx prisma db pull

# Vérifier le statut de Neon.tech
# Aller sur neon.tech et vérifier votre projet
```

#### Problèmes de migration
```bash
# Réinitialiser et recréer la base
npx prisma migrate reset
npx prisma migrate dev --name reinit

# Si les migrations sont corrompues
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

#### Erreurs de client Prisma
```bash
# Régénérer le client
npx prisma generate

# Redémarrer le serveur de développement
npm run dev
```

#### Erreurs de CSS Modules
- Vérifiez que vos fichiers CSS se terminent par `.module.css`
- Assurez-vous d'importer les styles correctement : 
  ```javascript
  import styles from './Component.module.css'
  ```
- Utilisez `styles.className` dans vos composants

#### Problèmes de déploiement Vercel
- Vérifiez que `DATABASE_URL` est bien configuré dans les variables d'environnement
- Assurez-vous que le build passe en local : `npm run build`
- Vérifiez les logs de déploiement sur Vercel

#### Erreurs JavaScript courantes
```javascript
// Erreur : Cannot read property 'map' of undefined
// Solution : Vérifier que tasks est un tableau
const tasks = data || []

// Erreur : Hooks peuvent seulement être appelés dans des composants fonctionnels
// Solution : Ajouter 'use client' en haut du fichier pour les composants client

// Erreur : Hydration mismatch
// Solution : S'assurer que le rendu serveur et client sont identiques
```

---

## 📚 Ressources Next.js et développement

### Documentation officielle
- [Next.js Documentation](https://nextjs.org/docs) - Guide complet Next.js
- [Prisma Documentation](https://www.prisma.io/docs) - Tout sur Prisma ORM
- [Neon.tech Documentation](https://neon.tech/docs) - Base de données cloud
- [React Documentation](https://react.dev) - Concepts React modernes

### Tutoriels et exemples
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [Learn Next.js](https://nextjs.org/learn) - Tutoriel interactif officiel

### Extensions VS Code recommandées
- **Prisma** : Coloration syntaxique pour les fichiers `.prisma`
- **ES7+ React/Redux/React-Native snippets** : Raccourcis pour React
- **Auto Rename Tag** : Renommer automatiquement les balises HTML
- **Bracket Pair Colorizer** : Colorer les parenthèses/crochets
- **GitLens** : Améliorer l'intégration Git
- **Thunder Client** : Tester les API directement dans VS Code

### Commandes utiles à mémoriser
```bash
# Développement quotidien
npm run dev                    # Lancer le serveur de développement
npx prisma studio             # Interface graphique pour la BDD
npx prisma generate           # Régénérer le client Prisma

# Gestion de la base de données
npx prisma migrate dev        # Créer une nouvelle migration
npx prisma migrate reset      # Réinitialiser la BDD (attention !)
npx prisma db push            # Pousser les changements sans migration
npx prisma db seed            # Exécuter le script de seed

# Production et déploiement
npm run build                 # Construire l'application
npm start                     # Démarrer en production
npx prisma migrate deploy     # Appliquer les migrations en production

# Outils utiles
npm run lint                  # Vérifier la qualité du code
npm run lint -- --fix        # Corriger automatiquement les erreurs de lint
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

### Processus de contribution
1. **Fork** le projet sur GitHub
2. **Clonez** votre fork localement
3. **Créez** votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
4. **Committez** vos changements (`git commit -m 'Add AmazingFeature'`)
5. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
6. **Ouvrez** une Pull Request avec une description détaillée

### Guidelines de contribution
- 📝 **Code propre** : Suivez les conventions JavaScript/React
- 🧪 **Tests** : Ajoutez des tests pour les nouvelles fonctionnalités
- 📚 **Documentation** : Mettez à jour la documentation si nécessaire
- 🔧 **Commits** : Utilisez des messages de commit descriptifs
- 🎨 **Style** : Respectez le style de code existant

### Types de contributions acceptées
- 🐛 **Corrections de bugs**
- ✨ **Nouvelles fonctionnalités**
- 📝 **Amélioration de la documentation**
- 🎨 **Améliorations de l'interface utilisateur**
- ⚡ **Optimisations de performance**
- 🔒 **Améliorations de sécurité**

---

## 📝 Roadmap

### Version actuelle (v1.0)
- ✅ CRUD complet des tâches
- ✅ Interface utilisateur moderne
- ✅ Base de données PostgreSQL
- ✅ API REST fonctionnelle
- ✅ Déploiement sur Vercel

### Version 1.1 (À venir)
- [ ] 🔐 **Authentification utilisateur** (NextAuth.js)
- [ ] 🏷️ **Système de tags/catégories**
- [ ] 📅 **Dates d'échéance** avec notifications
- [ ] 🔍 **Recherche et filtres avancés**

### Version 1.2 (Prévue)
- [ ] 📱 **Progressive Web App (PWA)**
- [ ] 🌙 **Mode sombre/clair**
- [ ] 📊 **Statistiques et rapports**
- [ ] 🔔 **Notifications push**

### Version 2.0 (Vision long terme)
- [ ] 📂 **Organisation par projets**
- [ ] 👥 **Collaboration multi-utilisateurs**
- [ ] 🎨 **Thèmes personnalisables**
- [ ] 📱 **Application mobile (React Native)**
- [ ] 🔄 **Synchronisation offline**
- [ ] 📈 **Analytics et métriques**

### Suggestions d'amélioration
Vous avez des idées ? Créez une issue GitHub avec le label `enhancement` !

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

### Permissions
✅ Usage commercial  
✅ Modification  
✅ Distribution  
✅ Usage privé  

### Conditions
📝 Inclure la licence et le copyright  
📝 Mentionner les changements  

### Limitations
❌ Aucune garantie  
❌ Aucune responsabilité  

---

## 🙏 Remerciements

Un grand merci aux créateurs et mainteneurs de :
- **[Next.js](https://nextjs.org)** - Pour le framework React incroyable
- **[Prisma](https://prisma.io)** - Pour l'ORM moderne et intuitif
- **[Neon.tech](https://neon.tech)** - Pour la base de données PostgreSQL cloud
- **[Vercel](https://vercel.com)** - Pour l'hébergement et le déploiement simplifié
- **[React](https://react.dev)** - Pour la bibliothèque UI révolutionnaire

### Ressources qui ont inspiré ce projet
- [TodoMVC](https://todomvc.com/) - Référence pour les applications de tâches
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples) - Exemples officiels
- [Prisma Examples](https://github.com/prisma/prisma-examples) - Modèles de démarrage

---

## 📞 Contact

**Fanny Saez** - Développeuse Full Stack  
- 🐙 GitHub : [@fannysaez](https://github.com/fannysaez)  
- 🔗 LinkedIn : [Profil LinkedIn](https://linkedin.com/in/fannysaez)  
<!-- - 📧 Email : [contact@fannysaez.dev](mailto:contact@fannysaez.dev)   -->

**Lien du projet :** [https://github.com/fannysaez/app-tache](https://github.com/fannysaez/app-tache)  
**Demo en ligne :** [https://app-tache.vercel.app](https://app-tache.vercel.app)

---

## 🎯 Statut du projet

![GitHub last commit](https://img.shields.io/github/last-commit/fannysaez/app-tache)
![GitHub issues](https://img.shields.io/github/issues/fannysaez/app-tache)
![GitHub stars](https://img.shields.io/github/stars/fannysaez/app-tache)
![GitHub forks](https://img.shields.io/github/forks/fannysaez/app-tache)

**Statut actuel :** 🟢 Actif et maintenu  
**Version :** 1.0.0  
**Dernière mise à jour :** Juillet 2025  

---

⭐ **N'hésitez pas à donner une étoile si ce projet vous aide !**

*Application créée avec ❤️ par [@fannysaez](https://github.com/fannysaez) - 2025*