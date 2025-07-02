const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function checkDatabase() {
  console.log('🔍 Analyse complète de la base de données...')
  
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`📊 Nombre total de tâches: ${tasks.length}`)
    
    // Identifier les tâches de seed vs personnalisées
    const seedTasks = [
      'Apprendre Next.js',
      'Configurer Prisma avec Neon',
      'Créer une todo app',
      'Déployer sur Vercel',
      'Tester les fonctionnalités'
    ]
    
    const personalTasks = tasks.filter(task => !seedTasks.includes(task.title))
    const defaultTasks = tasks.filter(task => seedTasks.includes(task.title))
    
    console.log('\n🌱 Tâches par défaut (seed):')
    defaultTasks.forEach((task, index) => {
      console.log(`${index + 1}. [ID: ${task.id}] ${task.title} ${task.completed ? '✅' : '⏳'}`)
      console.log(`   Créée: ${new Date(task.createdAt).toLocaleString('fr-FR')}`)
    })
    
    console.log('\n👤 Vos tâches personnelles:')
    personalTasks.forEach((task, index) => {
      console.log(`${index + 1}. [ID: ${task.id}] ${task.title} ${task.completed ? '✅' : '⏳'}`)
      console.log(`   Créée: ${new Date(task.createdAt).toLocaleString('fr-FR')}`)
      if (task.updatedAt.getTime() !== task.createdAt.getTime()) {
        console.log(`   Modifiée: ${new Date(task.updatedAt).toLocaleString('fr-FR')}`)
      }
      console.log(`   Description: ${task.description || 'Aucune'}`)
      console.log('---')
    })
    
    console.log('\n📊 Résumé:')
    console.log(`   Tâches par défaut: ${defaultTasks.length}`)
    console.log(`   Vos tâches: ${personalTasks.length}`)
    console.log(`   Total: ${tasks.length}`)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()