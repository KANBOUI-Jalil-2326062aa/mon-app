import TaskList from "./TaskList";
import Filters from "./Filters";
import { useState } from "react";

function Body({ tasks, setTasks, categories, relations, onDeleteTask }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [filterUrgent, setFilterUrgent] = useState(false);
    const [sortBy, setSortBy] = useState("dateEcheance");
    const [showFilters, setShowFilters] = useState(false);
    const [showSortOptions, setShowSortOptions] = useState(false);

    // Appliquer les filtres et le tri aux tâches
    const filteredTasks = tasks
        .filter(task => {
            const relation = relations.find(rel => rel.tache === task.id);
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
        <main className="body">
            {/* Barre haute : tri et filtres */}
            <div className="body-header">
                <button
                    className={`sort-button ${showSortOptions ? "selected" : ""}`}
                    onClick={() => setShowSortOptions(!showSortOptions)}
                >
                    Trier
                </button>


                <button
                    className={`filter-button ${showFilters ? "selected" : ""}`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    Filtres
                </button>
            </div>

            {/* Panneau des options de tri */}
            {showSortOptions && (
                <div className="sort-section select">
                    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                        <option value="dateCreation">Date de création</option>
                        <option value="dateEcheance">Date d’échéance</option>
                        <option value="title">Nom</option>
                    </select>
                </div>
            )}

            {/* Panneau des filtres */}
            {showFilters && (
                <div className="filter-section button">
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
            )}

            {/* Zone des tâches scrollable */}
            <div className="task-list-wrapper">
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
        </main>
    );
}

export default Body;
