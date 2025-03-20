import { useState } from "react";

function TaskItem({ task, onClick }) {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <li
            onClick={() => setShowDescription(!showDescription)}
            style={{
                color: task.etat === "urgente" ? "red" : "black",
                textDecoration: task.etat === "accomplie" ? "line-through" : "none"
            }}
        >
            <span>{task.nom}</span> - <span>{task.etat}</span> - <span>{task.dateEcheance}</span>
            {showDescription && <p>{task.description}</p>}
        </li>
    );
}

export default TaskItem;
