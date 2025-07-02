import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// PUT - Modifier une tâche
export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id)
        const body = await request.json()

        // Vérifier que la tâche existe
        const existingTask = await prisma.task.findUnique({
            where: { id }
        })

        if (!existingTask) {
            return NextResponse.json(
                { error: 'Tâche non trouvée' },
                { status: 404 }
            )
        }

        // Mettre à jour la tâche
        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title: body.title?.trim() || existingTask.title,
                description: body.description?.trim() || existingTask.description,
                completed: body.completed !== undefined ? body.completed : existingTask.completed
            }
        })

        return NextResponse.json(updatedTask)
    } catch (error) {
        console.error('Erreur PUT /api/tasks/[id]:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour de la tâche' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer une tâche
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id)

        // Vérifier que la tâche existe
        const existingTask = await prisma.task.findUnique({
            where: { id }
        })

        if (!existingTask) {
            return NextResponse.json(
                { error: 'Tâche non trouvée' },
                { status: 404 }
            )
        }

        // Supprimer la tâche
        await prisma.task.delete({
            where: { id }
        })

        return NextResponse.json(
            { message: 'Tâche supprimée avec succès' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Erreur DELETE /api/tasks/[id]:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la suppression de la tâche' },
            { status: 500 }
        )
    }
}