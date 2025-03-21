import TaskItem from "./TaskItem";

function TaskList({ tasks, relations, selectedCategories, selectedStates }) {
    // Filtrer les tâches par catégories sélectionnées via `relations`
    const filteredTasks = (tasks && Array.isArray(tasks) ? tasks : []).filter(task => {
        const taskCategories = (relations && Array.isArray(relations) ? relations : [])
            .filter(relation => relation.tache === task.id)
            .map(relation => relation.categorie);

        const categoryMatch = selectedCategories.length === 0 || taskCategories.some(catId => selectedCategories.includes(catId));
        const stateMatch = selectedStates.length === 0 || selectedStates.includes(task.etat);

        return categoryMatch && stateMatch;
    });


    return (
        <div>
            <h3>Liste des Tâches</h3>
            {filteredTasks.length > 0 ? (
                <ul>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            ) : (
                <p>Aucune tâche disponible</p>
            )}
        </div>
    );
}

export default TaskList;
