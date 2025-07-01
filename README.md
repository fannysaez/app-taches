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

## 🏗️ Architecture

```
├── src/
│   ├── app/                 # Pages et layouts (App Router)
│   │   ├── api/tasks/      # API REST pour les tâches
│   │   ├── layout.js       # Layout principal
│   │   └── page.js         # Page d'accueil
│   ├── components/         # Composants React réutilisables
│   │   ├── AddTaskForm.js  # Formulaire d'ajout
│   │   ├── EditTaskForm.js # Formulaire de modification
│   │   └── TaskList.js     # Liste des tâches
│   └── lib/
│       └── prisma.js       # Client Prisma configuré
├── prisma/
│   ├── schema.prisma       # Schéma de base de données
│   └── migrations/         # Historique des migrations
└── scripts/
    └── seed.js             # Données de test
```

## 🚦 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Neon.tech (gratuit)

### 1. Cloner le repository
```bash
git clone https://github.com/fannysaez/app-tache.git
cd app-tache
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer la base de données
1. Créez un projet sur [Neon.tech](https://neon.tech)
2. Copiez l'URL de connexion
3. Créez un fichier `.env` :
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

## 🔌 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/tasks` | Récupérer toutes les tâches |
| `POST` | `/api/tasks` | Créer une nouvelle tâche |
| `PUT` | `/api/tasks/[id]` | Modifier une tâche |
| `DELETE` | `/api/tasks/[id]` | Supprimer une tâche |

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

## 🧰 Scripts disponibles

```bash
npm run dev          # Démarrer en développement
npm run build        # Construire pour production
npm run start        # Démarrer en production
npm run seed         # Ajouter des données de test

# Scripts Prisma
npx prisma studio    # Interface graphique BDD
npx prisma generate  # Régénérer client
npx prisma migrate   # Créer migration
```

## 🎨 Captures d'écran

### Interface principale
![Interface principale](https://via.placeholder.com/800x600/f8f9fa/333?text=Interface+de+gestion+des+tâches)

### Ajout de tâche
![Ajout de tâche](https://via.placeholder.com/800x400/007bff/fff?text=Formulaire+d%27ajout+de+tâche)

### Modification inline
![Modification](https://via.placeholder.com/800x400/ffc107/000?text=Modification+inline+des+tâches)

## 🚀 Déploiement

### Déploiement sur Vercel
1. Push votre code sur GitHub
2. Connectez votre repo à [Vercel](https://vercel.com)
3. Ajoutez la variable d'environnement `DATABASE_URL`
4. Déployez ! 🎉

### Variables d'environnement requises
```env
DATABASE_URL="postgresql://..."  # URL Neon.tech
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
- [ ] 🔍 Recherche et filtres
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