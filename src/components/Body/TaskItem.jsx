import { useState } from "react";

function TaskItem({ task, onUpdate, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [editedDescription, setEditedDescription] = useState(task.description || "");
    const [editedEtat, setEditedEtat] = useState(task.etat);
    const [editedUrgent, setEditedUrgent] = useState(task.urgent || false);
    const [editedDateEcheance, setEditedDateEcheance] = useState(task.date_echeance || "");

    const handleSave = () => {
        const updatedTask = {
            ...task,
            description: editedDescription,
            etat: editedEtat,
            urgent: editedUrgent,
            date_echeance: editedDateEcheance
        };
        onUpdate(updatedTask);
        setIsEditing(false);
    };

    return (
        <li className="task-item">
            {!isEditing ? (
                <div className="task-item-summary" onClick={() => setShowDetails(!showDetails)}>
                    <div className="task-item-main">
                        <span
                            className={`task-item-title ${
                                task.etat === "Reussi" || task.etat === "Abandonné" ? "task-done" : ""
                            }`}
                            style={{ textDecoration: (task.etat === "Reussi" || task.etat === "Abandonné") ? "line-through" : "none" }}
                        >
                            {task.title}
                        </span>
                        <span className="task-item-etat">{task.etat}</span>
                        <span className="task-item-date">
                            {task.date_echeance || "Non définie"}
                        </span>
                        {task.urgent && <strong className="task-item-urgent">URGENT</strong>}
                    </div>

                    {showDetails && (
                        <div className="task-item-details">
                            <p> {task.description || "Aucune description"}</p>
                            <p><strong>Date de création :</strong> {task.date_creation}</p>

                            <div className="task-item-buttons">
                                <button
                                    className="btn-edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
                                            onDelete(task.id);
                                        }
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="task-item-edit">
                    {isEditing && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Modifier la tâche</h2>

                                <label>Description :</label>
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />

                                <label>État :</label>
                                <select value={editedEtat} onChange={(e) => setEditedEtat(e.target.value)}>
                                    <option value="Nouveau">Nouveau</option>
                                    <option value="En cours">En cours</option>
                                    <option value="En attente">En attente</option>
                                    <option value="Reussi">Réussi</option>
                                    <option value="Abandonné">Abandonné</option>
                                </select>

                                <label>Urgent :</label>
                                <input
                                    type="checkbox"
                                    checked={editedUrgent}
                                    onChange={(e) => setEditedUrgent(e.target.checked)}
                                />

                                <label>Date d’échéance :</label>
                                <input
                                    type="date"
                                    value={editedDateEcheance}
                                    onChange={(e) => setEditedDateEcheance(e.target.value)}
                                />

                                <div className="task-item-buttons">
                                    <button className="btn-save" onClick={handleSave}>Enregistrer</button>
                                    <button className="btn-cancel" onClick={() => setIsEditing(false)}>Annuler</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </li>
    );
}

export default TaskItem;
