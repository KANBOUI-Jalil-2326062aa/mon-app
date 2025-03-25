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
        <div className="filters-panel">
            <div className="filters-categories">
                <label className="filters-label">Catégories</label>
                <div className="filters-options">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`filter-btn ${selectedCategories.includes(category.id) ? "selected" : ""}`}
                            >
                                {category.title}
                            </button>
                        ))
                    ) : (
                        <p className="filters-empty">Aucune catégorie</p>
                    )}
                </div>
            </div>

            <div className="filters-etats">
                <label className="filters-label">États</label>
                <div className="filters-options">
                    {["Nouveau", "En cours", "En attente", "Reussi", "Abandonné"].map((state) => (
                        <button
                            key={state}
                            onClick={() => handleStateChange(state)}
                            className={`filter-btn ${selectedStates.includes(state) ? "selected" : ""}`}
                        >
                            {state}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filters-urgent">
                <label className="filters-label">Urgentes</label>
                <div className="filters-options">
                    <button
                        onClick={toggleUrgent}
                        className={`filter-btn ${filterUrgent ? "selected" : ""}`}
                    >
                        {filterUrgent ? "Filtrer : Urgentes" : "Toutes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filters;
