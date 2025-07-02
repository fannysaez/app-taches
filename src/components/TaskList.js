'use client'
import { useState } from 'react'
import styles from './TaskList.module.css'
import ConfirmModal from './ConfirmModal'

export default function TaskList({ initialTasks = [] }) {
    const [tasks, setTasks] = useState(initialTasks)
    const [newTask, setNewTask] = useState({ title: '', description: '' })
    const [isAdding, setIsAdding] = useState(false)
    const [filter, setFilter] = useState('all') //système de filtrage
    const [editingTask, setEditingTask] = useState(null)
    const [editingData, setEditingData] = useState({ title: '', description: '' })
    const [isUpdating, setIsUpdating] = useState(false)
    
    // 🆕 États pour le modal de confirmation
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        taskId: null,
        taskTitle: ''
    })

    // Ajouter une nouvelle tâche
    const addTask = async (e) => {
        e.preventDefault()
        if (!newTask.title.trim()) return

        setIsAdding(true)
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            })

            if (response.ok) {
                const task = await response.json()
                setTasks([task, ...tasks])
                setNewTask({ title: '', description: '' })
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout:', error)
        }
        setIsAdding(false)
    }

    // Basculer le statut d'une tâche
    const toggleTask = async (id, completed) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            })

            if (response.ok) {
                const updatedTask = await response.json()
                setTasks(tasks.map(task =>
                    task.id === id ? updatedTask : task
                ))
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error)
        }
    }

    // modifier une tâche
    const updateTask = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            })

            if (response.ok) {
                const updatedTask = await response.json()
                setTasks(tasks.map(task =>
                    task.id === id ? updatedTask : task
                ))
            }
        } catch (error) {
            console.error('Erreur lors de la modification:', error)
        }
    }

    // ✨ NOUVELLES FONCTIONS D'ÉDITION ✨
    
    // Commencer l'édition d'une tâche
    const startEditing = (task) => {
        setEditingTask(task.id)
        setEditingData({ 
            title: task.title, 
            description: task.description || '' 
        })
    }

    // Sauvegarder les modifications
    const saveEdit = async (e) => {
        e.preventDefault()
        if (!editingData.title.trim()) return
        
        setIsUpdating(true)
        await updateTask(editingTask, editingData)
        setEditingTask(null)
        setEditingData({ title: '', description: '' })
        setIsUpdating(false)
    }

    // Annuler l'édition
    const cancelEdit = () => {
        setEditingTask(null)
        setEditingData({ title: '', description: '' })
    }

    // Fonction de filtrage
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed
        if (filter === 'pending') return !task.completed
        return true // 'all'
    })
    
    // 🆕 Ouvrir le modal de confirmation
    const openDeleteConfirm = (id, taskTitle) => {
        setConfirmModal({
            isOpen: true,
            taskId: id,
            taskTitle: taskTitle
        })
    }

    // 🆕 Fermer le modal de confirmation
    const closeDeleteConfirm = () => {
        setConfirmModal({
            isOpen: false,
            taskId: null,
            taskTitle: ''
        })
    }

    // 🆕 Supprimer une tâche (confirmée)
    const deleteTask = async () => {
        const { taskId } = confirmModal
        
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                setTasks(tasks.filter(task => task.id !== taskId))
                closeDeleteConfirm()
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error)
        }
    }
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>📝 Ma Todo App</h1>

            {/* Formulaire d'ajout */}
            <form onSubmit={addTask} className={styles.addForm}>
                <h2 className={styles.formTitle}>➕ Ajouter une tâche</h2>

                <input
                    type="text"
                    placeholder="Titre de la tâche..."
                    className={styles.input}
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />

                <textarea
                    placeholder="Description (optionnelle)..."
                    className={styles.textarea}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />

                <button
                    type="submit"
                    disabled={isAdding}
                    className={styles.submitButton}
                >
                    {isAdding ? 'Ajout...' : '✅ Ajouter la tâche'}
                </button>
            </form>

            {/* 🆕 Boutons de filtre */}
            {tasks.length > 0 && (
                <div className={styles.filterButtons}>
                    <button 
                        onClick={() => setFilter('all')}
                        className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
                    >
                        📋 Toutes ({tasks.length})
                    </button>
                    <button 
                        onClick={() => setFilter('pending')}
                        className={`${styles.filterButton} ${filter === 'pending' ? styles.filterButtonActive : ''}`}
                    >
                        ⏳ En cours ({tasks.filter(t => !t.completed).length})
                    </button>
                    <button 
                        onClick={() => setFilter('completed')}
                        className={`${styles.filterButton} ${filter === 'completed' ? styles.filterButtonActive : ''}`}
                    >
                        ✅ Terminées ({tasks.filter(t => t.completed).length})
                    </button>
                </div>
            )}

            {/* Liste des tâches */}
            <div className={styles.tasksList}>
                {filteredTasks.length === 0 ? (
                    <div className={styles.emptyState}>
                        {filter === 'all' 
                            ? '🎉 Aucune tâche ! Ajoutez-en une ci-dessus.'
                            : filter === 'completed' 
                                ? '🎯 Aucune tâche terminée pour le moment.'
                                : '✨ Aucune tâche en cours ! Toutes sont terminées !'
                        }
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className={`${styles.taskCard} ${task.completed ? styles.taskCardCompleted : ''}`}
                        >
                            <div className={styles.taskHeader}>
                                {editingTask === task.id ? (
                                    // Mode édition
                                    <form onSubmit={saveEdit} className={styles.editForm}>
                                        <input
                                            type="text"
                                            value={editingData.title}
                                            onChange={(e) => setEditingData({ 
                                                ...editingData, 
                                                title: e.target.value 
                                            })}
                                            className={styles.editInput}
                                            placeholder="Titre de la tâche..."
                                            disabled={isUpdating}
                                        />
                                        
                                        <textarea
                                            value={editingData.description}
                                            onChange={(e) => setEditingData({ 
                                                ...editingData, 
                                                description: e.target.value 
                                            })}
                                            className={styles.editTextarea}
                                            placeholder="Description (optionnelle)..."
                                            disabled={isUpdating}
                                        />
                                        
                                        <div className={styles.editActions}>
                                            <button
                                                type="submit"
                                                disabled={isUpdating || !editingData.title.trim()}
                                                className={`${styles.actionButton} ${styles.saveButton}`}
                                            >
                                                {isUpdating ? 'Sauvegarde...' : '💾 Sauvegarder'}
                                            </button>
                                            
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                disabled={isUpdating}
                                                className={`${styles.actionButton} ${styles.cancelButton}`}
                                            >
                                                ❌ Annuler
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // Mode affichage normal
                                    <>
                                        <div className={styles.taskContent}>
                                            <h3 className={`${styles.taskTitle} ${task.completed ? styles.taskTitleCompleted : ''}`}>
                                                {task.completed ? '✅' : '⏳'} {task.title}
                                            </h3>

                                            {task.description && (
                                                <p className={`${styles.taskDescription} ${task.completed ? styles.taskDescriptionCompleted : ''}`}>
                                                    {task.description}
                                                </p>
                                            )}

                                            <p className={styles.taskDate}>
                                                Créée le {new Date(task.createdAt).toLocaleDateString('fr-FR')}
                                                {task.updatedAt !== task.createdAt && (
                                                    <span> • Modifiée le {new Date(task.updatedAt).toLocaleDateString('fr-FR')}</span>
                                                )}
                                            </p>
                                        </div>

                                        <div className={styles.taskActions}>
                                            <button
                                                onClick={() => startEditing(task)}
                                                className={`${styles.actionButton} ${styles.editButton}`}
                                            >
                                                ✏️ Modifier
                                            </button>
                                            
                                            <button
                                                onClick={() => toggleTask(task.id, !task.completed)}
                                                className={`${styles.actionButton} ${task.completed ? styles.reopenButton : styles.completeButton}`}
                                            >
                                                {task.completed ? '↩️ Réouvrir' : '✅ Terminer'}
                                            </button>

                                            <button
                                                onClick={() => openDeleteConfirm(task.id, task.title)}
                                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                            >
                                                🗑️ Supprimer
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Statistiques */}
            {tasks.length > 0 && (
                <div className={styles.stats}>
                    <h3 className={styles.statsTitle}>📊 Statistiques</h3>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <p className={`${styles.statNumber} ${styles.statNumberTotal}`}>
                                {tasks.length}
                            </p>
                            <p className={styles.statLabel}>Total</p>
                        </div>
                        <div className={styles.statItem}>
                            <p className={`${styles.statNumber} ${styles.statNumberCompleted}`}>
                                {tasks.filter(t => t.completed).length}
                            </p>
                            <p className={styles.statLabel}>Terminées</p>
                        </div>
                        <div className={styles.statItem}>
                            <p className={`${styles.statNumber} ${styles.statNumberPending}`}>
                                {tasks.filter(t => !t.completed).length}
                            </p>
                            <p className={styles.statLabel}>En cours</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 🆕 Modal de confirmation */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={closeDeleteConfirm}
                onConfirm={deleteTask}
                message={`Êtes-vous sûr de vouloir supprimer la tâche "${confirmModal.taskTitle}" ?`}
            />
        </div>
    )
}