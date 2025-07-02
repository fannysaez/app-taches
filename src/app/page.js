import TaskList from '../components/TaskList'
import { prisma } from '../lib/prisma'
import styles from './page.module.css'

// Fonction pour récupérer les tâches côté serveur
async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    // Convertir les dates en strings pour éviter les erreurs de sérialisation
    return tasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString()
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error)
    return []
  }
}

export default async function HomePage() {
  const tasks = await getTasks()

  return (
    <main className={styles.main}>
      <TaskList initialTasks={tasks} />
    </main>
  )
}

// Métadonnées de la page
export const metadata = {
  title: 'Ma Todo App - Gestion de Tâches',
  description: 'Application de gestion de tâches créée avec Next.js, Prisma et Neon.tech'
}