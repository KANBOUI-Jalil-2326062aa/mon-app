function TaskStats({ tasks }) {
    // Nombre total de tâches
    const totalTasks = tasks.length;

    // Nombre de tâches non accomplies (toutes sauf "Reussi" et "Abandonné")
    const pendingTasks = tasks.filter(task => task.etat !== "Reussi" && task.etat !== "Abandonné").length;

    return (
        <div className="task-stats">
            <h3 className="task-stats-title">Statistiques des Tâches</h3>
            <p className="task-stats-total">Nombre total de tâches : {totalTasks}</p>
            <p className="task-stats-pending">Nombre de tâches non accomplies : {pendingTasks}</p>
        </div>
    );
}

export default TaskStats;
