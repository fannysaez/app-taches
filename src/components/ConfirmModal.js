import { useEffect } from 'react'
import styles from './ConfirmModal.module.css'

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirmer la suppression", 
    message, 
    confirmText = "Supprimer", 
    cancelText = "Annuler" 
}) => {
    // Fermer le modal avec la touche Échap
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Empêcher le scroll du body quand le modal est ouvert
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div 
                className={styles.modal} 
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className={styles.header}>
                    <h3 id="modal-title" className={styles.title}>
                        🗑️ {title}
                    </h3>
                    <button 
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Fermer"
                    >
                        ✕
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.iconContainer}>
                        <div className={styles.warningIcon}>
                            ⚠️
                        </div>
                    </div>
                    <p id="modal-description" className={styles.message}>
                        {message}
                    </p>
                    <p className={styles.subMessage}>
                        Cette action est irréversible.
                    </p>
                </div>

                <div className={styles.actions}>
                    <button 
                        className={styles.cancelButton}
                        onClick={onClose}
                        autoFocus
                    >
                        {cancelText}
                    </button>
                    <button 
                        className={styles.confirmButton}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal