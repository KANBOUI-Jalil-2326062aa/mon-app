import TaskStats from "./TaskStats";
import TaskChart from "./TaskChart";

function Header({ tasks }) {
    return (
        <div>
            <h1>To-Do List</h1>

            {/* Affichage des statistiques des tâches */}
            <TaskStats tasks={tasks} />

            {/* Affichage du camembert de répartition des tâches par état */}
            <TaskChart tasks={tasks} />
        </div>
    );
}

export default Header;
