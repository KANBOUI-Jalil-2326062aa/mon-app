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
                <div className="task-view" onClick={() => setShowDetails(!showDetails)}>
                    <span className={`task-title ${["Reussi", "Abandonné"].includes(task.etat) ? "task-done" : ""}`}>
                        {task.title}
                    </span>
                    <span className="task-etat"> ({task.etat}) </span>
                    <span className="task-date"> - Échéance : {task.date_echeance || "Non définie"} </span>
                    {task.urgent && <strong className="task-urgent"> URGENT </strong>}

                    {showDetails && (
                        <div className="task-details">
                            <p><strong>Description :</strong> {task.description || "Aucune description"}</p>
                            <p><strong>Date de création :</strong> {task.date_creation}</p>

                            <div className="task-actions">
                                <button
                                    className="btn btn-edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                >
                                    Modifier
                                </button>

                                <button
                                    className="btn btn-delete"
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
                <div className="task-edit">
                    <h4 className="form-title">Modifier la tâche</h4>

                    <div className="form-group">
                        <label>Description :</label>
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>État :</label>
                        <select
                            value={editedEtat}
                            onChange={(e) => setEditedEtat(e.target.value)}
                            className="form-control"
                        >
                            <option value="Nouveau">Nouveau</option>
                            <option value="En cours">En cours</option>
                            <option value="En attente">En attente</option>
                            <option value="Reussi">Réussi</option>
                            <option value="Abandonné">Abandonné</option>
                        </select>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={editedUrgent}
                                onChange={(e) => setEditedUrgent(e.target.checked)}
                            />
                            Urgent
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Date d’échéance :</label>
                        <input
                            type="date"
                            value={editedDateEcheance}
                            onChange={(e) => setEditedDateEcheance(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-actions">
                        <button className="btn" onClick={handleSave}>Enregistrer</button>
                        <button className="btn btn-cancel" onClick={() => setIsEditing(false)}>Annuler</button>
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
