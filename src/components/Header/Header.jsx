import TaskStats from "./TaskStats";
import TaskChart from "./TaskChart";

function Header({ tasks }) {
    return (
        <header>
            <h1>Ma Todo-List</h1>
            <TaskStats tasks={tasks} />
            <TaskChart tasks={tasks} />
        </header>
    );
}

export default Header;
