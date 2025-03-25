function TaskStats({ tasks }) {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.etat !== "Reussi" && task.etat !== "Abandonné").length;

    return (
        <div className="header-stats">
            <p className="task-stats-total">Total : {totalTasks}</p>
            <p className="task-stats-pending">Non accomplies : {pendingTasks}</p>
        </div>
    );
}

export default TaskStats;
