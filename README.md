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
mon-app-taches/
├── prisma/
│   ├── schema.prisma           # Schéma simple mais complet
│   └── seed.js                 # Données de test
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tasks/
│   │   │       ├── [id]/
│   │   │       │   └── route.js # CRUD tâche spécifique
│   │   │       └── route.js     # CRUD tâches générales
│   │   ├── globals.css          # Styles globaux
│   │   ├── layout.jsx           # Layout principal
│   │   └── page.jsx             # Page d'accueil avec toutes les fonctionnalités
│   ├── components/
│   │   ├── AddTaskForm.jsx      # Formulaire d'ajout
│   │   ├── EditTaskForm.jsx     # Formulaire de modification
│   │   ├── TaskCard.jsx         # Carte de tâche stylée
│   │   ├── TaskList.jsx         # Liste avec filtres
│   │   └── TaskFilters.jsx      # Filtres par priorité et statut
│   ├── lib/
│   │   ├── prisma.js            # Client Prisma
│   │   └── utils.js             # Fonctions utilitaires
│   └── styles/
│       ├── components/
│       │   ├── TaskCard.module.css
│       │   ├── TaskForm.module.css
│       │   ├── TaskList.module.css
│       │   ├── TaskFilters.module.css
│       │   └── Layout.module.css
│       └── globals.css          # Variables CSS et styles globaux
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
└── README.md
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
npx create-next-app@latest mon-app-taches
cd mon-app-taches
```

### 1ter. Construire l'application pour la production
```bash
npm run build
```

### 2. Installer les dépendances
```bash
# Installer Prisma CLI et Prisma Client
npm install prisma @prisma/client

# Initialiser Prisma (crée le dossier prisma/ et le fichier schema.prisma)
npx prisma init
```

### 3. Configurer la base de données
1. Créez un projet sur [Neon.tech](https://neon.tech)
2. Copiez l'URL de connexion
3. Créez un fichier `.env.local` :
```env
DATABASE_URL="votre_url_neon_ici"
```

### 4. Configurer Prisma
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init

# (Optionnel) Ajouter des données de test
npm run seed
```

### 5. Lancer l'application
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

## 📱 Utilisation

### Actions principales

| Action                    | Comment faire                                                                 |
|---------------------------|-------------------------------------------------------------------------------|
| **Ajouter une tâche**     | Utilisez le formulaire en haut de page                                       |
| **Modifier une tâche**    | Cliquez sur l'icône d'édition                                                |
| **Marquer comme terminée**| Cliquez sur la checkbox                                                       |
| **Supprimer**             | Cliquez sur l'icône de suppression (avec confirmation)                       |
| **Filtrer**               | Utilisez les boutons de filtre (Toutes / En cours / Terminées)               |

---

## 🔌 API Endpoints

| Méthode | Endpoint             | Description                        |
|---------|----------------------|------------------------------------|
| GET     | `/api/tasks`         | Récupérer toutes les tâches        |
| POST    | `/api/tasks`         | Créer une nouvelle tâche           |
| GET     | `/api/tasks/[id]`    | Récupérer une tâche spécifique     |
| PUT     | `/api/tasks/[id]`    | Mettre à jour une tâche            |
| DELETE  | `/api/tasks/[id]`    | Supprimer une tâche                |

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
  body: JSON.stringify({ completed: true })
});
```

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
# Voir la base de données dans le navigateur
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset

# Appliquer les changements de schéma
npx prisma db push
```

## 🎨 Personnalisation des styles

Le projet utilise **CSS Modules** pour une isolation parfaite des styles :

```css
/* styles/components/TaskCard.module.css */
.taskCard {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
}

.taskCard.completed {
  opacity: 0.7;
  text-decoration: line-through;
}
```

### Variables CSS globales
```css
/* app/globals.css */
:root {
  --primary-color: #0070f3;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --border-radius: 8px;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}
```

## 🎨 Captures d'écran

### Interface principale
![Interface principale](https://via.placeholder.com/800x600/f8f9fa/333?text=Interface+de+gestion+des+tâches)

### Ajout de tâche
![Ajout de tâche](https://via.placeholder.com/800x400/007bff/fff?text=Formulaire+d%27ajout+de+tâche)

### Modification inline
![Modification](https://via.placeholder.com/800x400/ffc107/000?text=Modification+inline+des+tâches)

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
| `npx prisma migrate`    | Créer/appliquer une migration Prisma        |

### Déploiement sur Vercel

1. **Connecter votre repository GitHub à Vercel**
2. **Configurer les variables d'environnement** dans Vercel
3. **Déployer automatiquement** à chaque push

La façon la plus simple de déployer votre application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js.

Consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

### Variables d'environnement en production

```env
DATABASE_URL=your_production_database_url
```

## 🔧 Développement

### Structure du projet
- **Pages** : Utilise le nouveau App Router de Next.js 13+
- **Components** : Composants React modulaires et réutilisables
- **API** : Routes API Next.js pour le backend
- **Database** : PostgreSQL avec Prisma ORM

### Bonnes pratiques appliquées
- ✅ Séparation des préoccupations (UI/Logic/Data)
- ✅ Gestion d'erreurs robuste
- ✅ Validation des données
- ✅ Code propre et commenté
- ✅ Architecture modulaire

## 🔧 Troubleshooting

### Problèmes courants

**Erreur de connexion à la base de données :**
```bash
# Vérifier que DATABASE_URL est correctement configuré
echo $DATABASE_URL

# Tester la connexion
npx prisma db pull
```

**Problèmes de migration :**
```bash
# Réinitialiser et recréer la base
npx prisma migrate reset
npx prisma migrate dev
```

**Erreurs de CSS Modules :**
- Vérifiez que vos fichiers CSS se terminent par `.module.css`
- Assurez-vous d'importer les styles correctement : `import styles from './Component.module.css'`

## 📚 Ressources Next.js

Pour en apprendre plus sur Next.js, consultez les ressources suivantes :

- [Documentation Next.js](https://nextjs.org/docs) - découvrez les fonctionnalités et l'API Next.js
- [Tutoriel interactif Next.js](https://nextjs.org/learn) - tutoriel interactif Next.js
- [Repository GitHub Next.js](https://github.com/vercel/next.js) - vos commentaires et contributions sont les bienvenus !

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Roadmap

### Prochaines fonctionnalités
- [ ] 🔐 Authentification utilisateur
- [ ] 🏷️ Système de tags/catégories
- [ ] 📅 Dates d'échéance
- [ ] 🔍 Recherche et filtres avancés
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🌙 Mode sombre
- [ ] 📊 Statistiques et rapports
- [ ] 🔔 Notifications push
- [ ] 📂 Organisation par projets
- [ ] 🎨 Thèmes personnalisables

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org) pour le framework incroyable
- [Prisma](https://prisma.io) pour l'ORM moderne
- [Neon.tech](https://neon.tech) pour la base de données cloud
- [Vercel](https://vercel.com) pour l'hébergement

## 📞 Contact

**Fanny Saez** - [@fannysaez](https://github.com/fannysaez)

Lien du projet : [https://github.com/fannysaez/app-tache](https://github.com/fannysaez/app-tache)

---

⭐ N'hésitez pas à donner une étoile si ce projet vous aide !