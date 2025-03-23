import TaskStats from "./TaskStats";
import TaskChart from "./TaskChart";

function Header({ tasks }) {
    return (
        <header className="header">
            <h1 className="header-title">To-Do List</h1>

            {/* Affichage des statistiques des tâches */}
            <div className="header-stats">
                <TaskStats tasks={tasks} />
            </div>

            {/* Affichage du camembert de répartition des tâches par état */}
            <div className="header-chart">
                <TaskChart tasks={tasks} />
            </div>
        </header>
    );
}

export default Header;
