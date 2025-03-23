function Filters({
                     categories,
                     selectedCategories,
                     setSelectedCategories,
                     selectedStates,
                     setSelectedStates,
                     filterUrgent,
                     setFilterUrgent,
                     onSort
                 }) {
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(c => c !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleStateChange = (state) => {
        setSelectedStates(prev =>
            prev.includes(state)
                ? prev.filter(s => s !== state)
                : [...prev, state]
        );
    };

    const toggleUrgent = () => {
        setFilterUrgent(prev => !prev);
    };

    return (
        <div className="filters-container">
            <h3 className="filters-title">Filtres</h3>

            {/* Catégories */}
            <div className="filter-group">
                <label className="filter-label">Catégories :</label>
                <div className="filter-options">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <button
                                key={category.id}
                                className={`filter-button ${selectedCategories.includes(category.id) ? "active" : ""}`}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.title}
                            </button>
                        ))
                    ) : (
                        <p className="filter-empty">Aucune catégorie disponible</p>
                    )}
                </div>
            </div>

            {/* États */}
            <div className="filter-group">
                <label className="filter-label">États :</label>
                <div className="filter-options">
                    {["Nouveau", "En cours", "En attente", "Reussi", "Abandonné"].map((state) => (
                        <button
                            key={state}
                            className={`filter-button ${selectedStates.includes(state) ? "active" : ""}`}
                            onClick={() => handleStateChange(state)}
                        >
                            {state}
                        </button>
                    ))}
                </div>
            </div>

            {/* Urgent */}
            <div className="filter-group">
                <label className="filter-label">Urgente :</label>
                <button
                    className={`filter-button ${filterUrgent ? "active" : ""}`}
                    onClick={toggleUrgent}
                >
                    {filterUrgent ? "Filtrer : Urgentes" : "Toutes"}
                </button>
            </div>

            {/* Tri */}
            <div className="filter-group">
                <label className="filter-label">Trier par :</label>
                <select className="filter-select" onChange={(e) => onSort(e.target.value)}>
                    <option value="dateCreation">Date de création</option>
                    <option value="dateEcheance">Date d’échéance</option>
                    <option value="title">Nom</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;
