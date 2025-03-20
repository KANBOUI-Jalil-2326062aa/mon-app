import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskClick }) {
    return (
        <div>
            <h2>Liste des tâches</h2>
            <ul>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        onClick={() => onTaskClick(index)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
