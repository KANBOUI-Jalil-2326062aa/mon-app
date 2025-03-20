function TaskStats({ tasks }) {
    // Calcul du nombre total de tâches
    const totalTasks = tasks.length;

    // Calcul du nombre de tâches non accomplies
    const pendingTasks = tasks.filter(task => task.etat !== "accomplie").length;

    return (
        <div>
            <h3>Statistiques des tâches</h3>
            <p>Total des tâches : <strong>{totalTasks}</strong></p>
            <p>Tâches non accomplies : <strong>{pendingTasks}</strong></p>
        </div>
    );
}

export default TaskStats;
