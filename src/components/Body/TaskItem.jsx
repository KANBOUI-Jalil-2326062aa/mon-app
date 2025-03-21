import { useState } from "react";

function TaskItem({ task }) {
    const [showDetails, setShowDetails] = useState(false); // État pour afficher/masquer les détails

    return (
        <li onClick={() => setShowDetails(!showDetails)}>
            {/* Affichage du titre, état et urgence */}
            <span style={{ textDecoration: task.etat === "Reussi" ? "line-through" : "none" }}>
                {task.title}
            </span>
            <span> ({task.etat}) </span>
            <span> - Échéance : {task.date_echeance} </span>
            {task.urgent && <strong style={{ color: "red" }}> URGENT </strong>}

            {/* Affichage des détails au clic */}
            {showDetails && (
                <div>
                    <p><strong>Description :</strong> {task.description || "Aucune description"}</p>
                    <p><strong>Date de création :</strong> {task.date_creation}</p>
                    <p><strong>Date d'échéance :</strong> {task.date_echeance || "Non défini"}</p>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
