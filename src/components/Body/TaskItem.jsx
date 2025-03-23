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
        <li>
            {!isEditing ? (
                <div onClick={() => setShowDetails(!showDetails)}>
                    <span style={{ textDecoration: task.etat === "Reussi" ? "line-through" : "none" }}>
                        {task.title}
                    </span>
                    <span> ({task.etat}) </span>
                    <span> - Échéance : {task.date_echeance || "Non définie"} </span>
                    {task.urgent && <strong style={{ color: "red" }}> URGENT </strong>}

                    {showDetails && (
                        <div>
                            <p><strong>Description :</strong> {task.description || "Aucune description"}</p>
                            <p><strong>Date de création :</strong> {task.date_creation}</p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditing(true);
                                }}
                            >
                                Modifier
                            </button>

                            <button
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
                    )}
                </div>
            ) : (
                <div>
                    <h4>Modifier la tâche</h4>

                    <label>Description :</label><br />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    /><br />

                    <label>État :</label><br />
                    <select value={editedEtat} onChange={(e) => setEditedEtat(e.target.value)}>
                        <option value="Nouveau">Nouveau</option>
                        <option value="En cours">En cours</option>
                        <option value="En attente">En attente</option>
                        <option value="Reussi">Réussi</option>
                    </select><br />

                    <label>Urgent :</label>
                    <input
                        type="checkbox"
                        checked={editedUrgent}
                        onChange={(e) => setEditedUrgent(e.target.checked)}
                    /><br />

                    <label>Date d’échéance :</label><br />
                    <input
                        type="date"
                        value={editedDateEcheance}
                        onChange={(e) => setEditedDateEcheance(e.target.value)}
                    /><br />

                    <button onClick={handleSave}>Enregistrer</button>
                    <button onClick={() => setIsEditing(false)}>Annuler</button>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
