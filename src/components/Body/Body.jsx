import TaskList from "./TaskList";
import Filters from "./Filters";
import { useState } from "react";

function Body({ tasks, setTasks, categories, relations }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [sortBy, setSortBy] = useState("date_echeance"); // Par défaut, trié par date d'échéance

    // Appliquer les filtres et le tri aux tâches
    const filteredTasks = tasks
        .filter(task => {
            const taskCategories = relations
                .filter(relation => relation.tache === task.id)
                .map(relation => relation.categorie);

            const categoryMatch = selectedCategories.length === 0 || taskCategories.some(catId => selectedCategories.includes(catId));
            const stateMatch = selectedStates.length === 0 || selectedStates.includes(task.etat);

            return categoryMatch && stateMatch;
        })
        .sort((a, b) => {
            if (sortBy === "date_creation") return new Date(a.date_creation) - new Date(b.date_creation);
            if (sortBy === "date_echeance") return new Date(a.date_echeance) - new Date(b.date_echeance);
            if (sortBy === "title") return a.title.localeCompare(b.title);
            return 0;
        });

    return (
        <div>
            {/* Filtres et tri en haut */}
            <div>
                <Filters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedStates={selectedStates}
                    setSelectedStates={setSelectedStates}
                    onSort={setSortBy}
                />
            </div>

            {/* Liste des tâches affichées après filtrage */}
            <TaskList tasks={filteredTasks} relations={relations} selectedCategories={selectedCategories} selectedStates={selectedStates} />
        </div>
    );
}

export default Body;
