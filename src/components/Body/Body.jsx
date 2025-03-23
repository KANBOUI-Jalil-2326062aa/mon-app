import TaskList from "./TaskList";
import Filters from "./Filters";
import { useState } from "react";

function Body({ tasks, setTasks, categories, relations, onDeleteTask }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [filterUrgent, setFilterUrgent] = useState(false);
    const [sortBy, setSortBy] = useState("dateEcheance");

    // Appliquer les filtres et le tri aux tâches
    const filteredTasks = tasks
        .filter(task => {
            const relation = relations.find(r => r.tache === task.id);
            const categoryId = relation ? relation.categorie : null;

            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(categoryId);
            const matchState = selectedStates.length === 0 || selectedStates.includes(task.etat);
            const matchUrgent = !filterUrgent || task.urgent === true;

            return matchCategory && matchState && matchUrgent;
        })
        .sort((a, b) => {
            if (sortBy === "dateCreation") return a.date_creation.localeCompare(b.date_creation);
            if (sortBy === "dateEcheance") return a.date_echeance.localeCompare(b.date_echeance);
            if (sortBy === "title") return a.title.localeCompare(b.title);
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
                    filterUrgent={filterUrgent}
                    setFilterUrgent={setFilterUrgent}
                    onSort={setSortBy}
                />
            </div>

            <TaskList
                tasks={filteredTasks}
                setTasks={setTasks}
                relations={relations}
                selectedCategories={selectedCategories}
                selectedStates={selectedStates}
                sortBy={sortBy}
                onDelete={onDeleteTask}
            />
        </div>
    );
}

export default Body;
