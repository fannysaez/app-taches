import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET - Récupérer toutes les tâches
export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(tasks)
    } catch (error) {
        console.error('Erreur GET /api/tasks:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des tâches' },
            { status: 500 }
        )
    }
}

// POST - Créer une nouvelle tâche
export async function POST(request) {
    try {
        const body = await request.json()
        const { title, description } = body

        if (!title || title.trim() === '') {
            return NextResponse.json(
                { error: 'Le titre est obligatoire' },
                { status: 400 }
            )
        }

        const task = await prisma.task.create({
            data: {
                title: title.trim(),
                description: description?.trim() || null
            }
        })

        return NextResponse.json(task, { status: 201 })
    } catch (error) {
        console.error('Erreur POST /api/tasks:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la création de la tâche' },
            { status: 500 }
        )
    }
}