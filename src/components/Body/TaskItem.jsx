function TaskItem({ task }) {
    return (
        <li>
            {/* Affichage du titre de la tâche avec gestion de l'état "accomplie" */}
            <span style={{ textDecoration: task.etat === "Reussi" ? "line-through" : "none" }}>
                {task.title}
            </span>

            {/* Affichage de l'état */}
            <span> ({task.etat}) </span>

            {/* Affichage de la date d'échéance */}
            <span> - Échéance : {task.date_echeance} </span>

            {/* Indicateur si la tâche est urgente */}
            {task.urgent && <strong style={{ color: "red" }}> URGENT </strong>}
        </li>
    );
}

export default TaskItem;
