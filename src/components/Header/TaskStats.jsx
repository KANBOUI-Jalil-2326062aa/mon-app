function TaskStats({ tasks }) {
    // Nombre total de tâches
    const totalTasks = tasks.length;

    // Nombre de tâches non accomplies (toutes sauf "Reussi" et "Abandonné")
    const pendingTasks = tasks.filter(task => task.etat !== "Reussi" && task.etat !== "Abandonné").length;

    return (
        <div>
            <h3>Statistiques des Tâches</h3>
            <p>Nombre total de tâches : {totalTasks}</p>
            <p>Nombre de tâches non accomplies : {pendingTasks}</p>
        </div>
    );
}

export default TaskStats;
