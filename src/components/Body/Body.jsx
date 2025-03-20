import TaskList from "./TaskList";
import Filters from "./Filters";
import { useState } from "react";

function Body({ tasks, setTasks, categories }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [sortBy, setSortBy] = useState("dateEcheance");

    // Appliquer les filtres et le tri aux tâches
    const filteredTasks = tasks
        .filter(task =>
            (selectedCategories.length === 0 || selectedCategories.includes(task.category.name)) &&
            (selectedStates.length === 0 || selectedStates.includes(task.etat))
        )
        .sort((a, b) => {
            if (sortBy === "dateCreation") return new Date(a.dateCreation) - new Date(b.dateCreation);
            if (sortBy === "dateEcheance") return new Date(a.dateEcheance) - new Date(b.dateEcheance);
            if (sortBy === "nom") return a.nom.localeCompare(b.nom);
            return 0;
        });

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Filters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedStates={selectedStates}
                    setSelectedStates={setSelectedStates}
                    onSort={setSortBy}
                />
            </div>
            <TaskList tasks={filteredTasks} />
        </div>
    );
}

export default Body;
