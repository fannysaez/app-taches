const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function resetAndSeed() {
  console.log('🔄 Réinitialisation complète...')
  
  try {
    // Supprimer TOUTES les données
    const deletedCount = await prisma.task.deleteMany()
    console.log(`🗑️  ${deletedCount.count} tâches supprimées`)
    
    // Attendre un peu pour s'assurer que la suppression est terminée
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Recréer les données de test
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
    
    console.log(`✅ ${tasks.count} nouvelles tâches créées`)
    
    // Vérifier que tout est bien créé
    const allTasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`🔍 Vérification: ${allTasks.length} tâches dans la DB`)
    console.log('\n📝 Tâches créées:')
    allTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} ${task.completed ? '✅' : '⏳'}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetAndSeed()