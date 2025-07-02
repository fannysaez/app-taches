const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function cleanDefaults() {
  console.log('🧹 Nettoyage des tâches par défaut uniquement...')
  
  try {
    const seedTasks = [
      'Apprendre Next.js',
      'Configurer Prisma avec Neon',
      'Créer une todo app',
      'Déployer sur Vercel',
      'Tester les fonctionnalités'
    ]
    
    // Supprimer seulement les tâches de seed
    const deleted = await prisma.task.deleteMany({
      where: {
        title: {
          in: seedTasks
        }
      }
    })
    
    console.log(`🗑️  ${deleted.count} tâches par défaut supprimées`)
    
    // Vérification
    const remaining = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`\n📋 ${remaining.length} tâches restantes:`)
    remaining.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} ${task.completed ? '✅' : '⏳'}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanDefaults()