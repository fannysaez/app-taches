const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Démarrage du seed...')
  
  // Supprimer les données existantes
  await prisma.task.deleteMany()
  console.log('🗑️  Anciennes données supprimées')

  // Ajouter des tâches de test
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Apprendre Next.js',
        description: 'Suivre un tutoriel complet sur Next.js avec Prisma',
        completed: false
      },
      {
        title: 'Configurer Prisma avec Neon',
        description: 'Installer et configurer Prisma avec une base de données Neon.tech',
        completed: true
      },
      {
        title: 'Créer une todo app',
        description: 'Construire une application de gestion de tâches complète',
        completed: false
      },
      {
        title: 'Déployer sur Vercel',
        description: 'Mettre en ligne l\'application sur Vercel',
        completed: false
      },
      {
        title: 'Tester les fonctionnalités',
        description: 'Vérifier que toutes les fonctionnalités marchent correctement',
        completed: true
      }
    ]
  })

  console.log(`✅ ${tasks.count} tâches créées avec succès !`)
  console.log('🎉 Seed terminé !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })