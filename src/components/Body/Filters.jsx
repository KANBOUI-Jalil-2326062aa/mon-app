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
        <div>
            <h3>Filtres</h3>

            <div>
                <label>Catégories :</label>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            style={{ backgroundColor: selectedCategories.includes(category.id) ? "#ccc" : "white" }}
                        >
                            {category.title}
                        </button>
                    ))
                ) : (
                    <p>Aucune catégorie disponible</p>
                )}
            </div>

            <div>
                <label>États :</label>
                {["Nouveau", "En cours", "En attente", "Reussi"].map((state) => (
                    <button
                        key={state}
                        onClick={() => handleStateChange(state)}
                        style={{ backgroundColor: selectedStates.includes(state) ? "#ccc" : "white" }}
                    >
                        {state}
                    </button>
                ))}
            </div>

            <div>
                <label>Urgente </label>
                <button
                    onClick={toggleUrgent}
                    style={{ backgroundColor: filterUrgent ? "#ccc" : "white" }}
                >
                    {filterUrgent ? "Filtrer : Urgentes" : "Toutes"}
                </button>
            </div>

            <div>
                <label>Trier par :</label>
                <select onChange={(e) => onSort(e.target.value)}>
                    <option value="dateCreation">Date de création</option>
                    <option value="dateEcheance">Date d’échéance</option>
                    <option value="title">Nom</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;
