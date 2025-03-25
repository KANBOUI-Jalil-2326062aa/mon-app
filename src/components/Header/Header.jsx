import TaskStats from "./TaskStats";
import TaskChart from "./TaskChart";

function Header({ tasks }) {
    return (
        <header className="header">
            <div className="header-left">
                <TaskStats tasks={tasks} />
            </div>

            <div className="header-center">
                <h1 className="header-title">To-Do List</h1>
            </div>

            <div className="header-right">
                <TaskChart tasks={tasks} />
            </div>
        </header>
    );
}

export default Header;
