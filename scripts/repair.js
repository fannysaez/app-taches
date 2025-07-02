const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function repair() {
  console.log('🔧 Réparation en cours...')
  
  try {
    // Vérifier l'état actuel
    const currentTasks = await prisma.task.findMany()
    console.log(`📊 État actuel: ${currentTasks.length} tâches`)
    
    // Vérifier si les tâches par défaut existent déjà
    const seedTasks = [
      'Apprendre Next.js',
      'Configurer Prisma avec Neon',
      'Créer une todo app',
      'Déployer sur Vercel',
      'Tester les fonctionnalités'
    ]
    
    const existingDefaults = currentTasks.filter(task => 
      seedTasks.includes(task.title)
    )
    
    console.log(`🌱 Tâches par défaut existantes: ${existingDefaults.length}`)
    
    if (existingDefaults.length === 0) {
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
      
      const created = await prisma.task.createMany({
        data: defaultTasksData
      })
      
      console.log(`✅ ${created.count} tâches par défaut recréées`)
    } else {
      console.log('ℹ️  Les tâches par défaut existent déjà')
    }
    
    // Vérification finale
    const finalTasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`\n🎉 État final: ${finalTasks.length} tâches au total`)
    console.log('\n📝 Liste complète:')
    finalTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} ${task.completed ? '✅' : '⏳'}`)
      if (task.description) {
        console.log(`   Description: ${task.description}`)
      }
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

repair()