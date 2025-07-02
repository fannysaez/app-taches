const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function smartReset() {
  console.log('🧠 Réinitialisation intelligente...')
  
  try {
    // Récupérer toutes les tâches actuelles
    const allTasks = await prisma.task.findMany()
    
    // Identifier les tâches de seed (à supprimer)
    const seedTasks = [
      'Apprendre Next.js',
      'Configurer Prisma avec Neon',
      'Créer une todo app',
      'Déployer sur Vercel',
      'Tester les fonctionnalités'
    ]
    
    // Sauvegarder les tâches personnelles
    const personalTasks = allTasks.filter(task => !seedTasks.includes(task.title))
    
    console.log(`📋 ${personalTasks.length} tâches personnelles trouvées:`)
    personalTasks.forEach(task => {
      console.log(`   - ${task.title}`)
    })
    
    // Supprimer TOUTES les tâches (on va tout recréer)
    const deletedCount = await prisma.task.deleteMany()
    console.log(`🗑️  ${deletedCount.count} tâches supprimées`)
    
    // Attendre un peu
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Recréer les tâches par défaut
    const defaultTasksData = [
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
    
    await prisma.task.createMany({
      data: defaultTasksData
    })
    console.log(`✅ ${defaultTasksData.length} tâches par défaut recréées`)
    
    // Recréer les tâches personnelles
    if (personalTasks.length > 0) {
      for (const task of personalTasks) {
        await prisma.task.create({
          data: {
            title: task.title,
            description: task.description,
            completed: task.completed,
            // On peut essayer de préserver les dates mais c'est optionnel
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
          }
        })
      }
      console.log(`🔄 ${personalTasks.length} tâches personnelles restaurées`)
    }
    
    // Vérification finale
    const finalTasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`\n🎉 Terminé ! ${finalTasks.length} tâches au total`)
    console.log('\n📝 Résultat final:')
    finalTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} ${task.completed ? '✅' : '⏳'}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

smartReset()