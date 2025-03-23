import TaskItem from "./TaskItem";

function TaskList({ tasks, setTasks, relations, selectedCategories = [], selectedStates = [], sortBy }) {
    // Fonction de tri
    const sortTasks = (a, b) => {
        if (sortBy === "dateCreation") return a.date_creation.localeCompare(b.date_creation);
        if (sortBy === "dateEcheance") return a.date_echeance.localeCompare(b.date_echeance);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
    };

    // Récupérer les tâches liées aux catégories sélectionnées
    const getCategoryIdFromTask = (taskId) => {
        const relation = relations.find(r => r.tache === taskId);
        return relation ? relation.categorie : null;
    };

    // Appliquer filtres + tri
    const filteredTasks = tasks
        .filter(task => {
            const categoryId = getCategoryIdFromTask(task.id);
            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(categoryId);
            const matchState = selectedStates.length === 0 || selectedStates.includes(task.etat);
            return matchCategory && matchState;
        })
        .sort(sortTasks);

    // Mise à jour d'une tâche
    const handleUpdateTask = (updatedTask) => {
        const updatedList = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
        setTasks(updatedList);
    };

    // Suppression d'une tâche
    const handleDeleteTask = (taskId) => {
        const updatedList = tasks.filter(t => t.id !== taskId);
        setTasks(updatedList);
    };

    return (
        <div>
            {filteredTasks.length === 0 ? (
                <p>Aucune tâche disponible</p>
            ) : (
                <ul>
                    {filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdate={handleUpdateTask}
                            onDelete={handleDeleteTask}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
