const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function checkDatabase() {
  console.log('🔍 Vérification de la base de données...')
  
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`📊 Nombre total de tâches: ${tasks.length}`)
    console.log('\n📝 Liste des tâches:')
    
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. [ID: ${task.id}] ${task.title} ${task.completed ? '✅' : '⏳'}`)
      console.log(`   Créée: ${new Date(task.createdAt).toLocaleString('fr-FR')}`)
      if (task.updatedAt.getTime() !== task.createdAt.getTime()) {
        console.log(`   Modifiée: ${new Date(task.updatedAt).toLocaleString('fr-FR')}`)
      }
      console.log(`   Description: ${task.description || 'Aucune'}`)
      console.log('---')
    })
    
    // Statistiques
    const completed = tasks.filter(t => t.completed).length
    const pending = tasks.length - completed
    
    console.log('\n📊 Statistiques:')
    console.log(`   Total: ${tasks.length}`)
    console.log(`   Terminées: ${completed}`)
    console.log(`   En cours: ${pending}`)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()