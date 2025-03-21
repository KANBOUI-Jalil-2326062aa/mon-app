function Filters({ categories, selectedCategories, setSelectedCategories, selectedStates, setSelectedStates, onSort }) {

    // Gestion de la sélection des catégories (via ID)
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(c => c !== categoryId) // Supprime si déjà sélectionné
                : [...prev, categoryId] // Ajoute sinon
        );
    };

    // Gestion de la sélection des états
    const handleStateChange = (state) => {
        setSelectedStates(prev =>
            prev.includes(state)
                ? prev.filter(s => s !== state) // Supprime si déjà sélectionné
                : [...prev, state] // Ajoute sinon
        );
    };

    return (
        <div>
            <h3>Filtres</h3>

            {/* Filtre par Catégorie */}
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

            {/* Filtre par État */}
            <div>
                <label>États :</label>
                {["Nouveau", "En cours", "Reussi", "En attente", "Abandonné"].map((state) => (
                    <button
                        key={state}
                        onClick={() => handleStateChange(state)}
                        style={{ backgroundColor: selectedStates.includes(state) ? "#ccc" : "white" }}
                    >
                        {state}
                    </button>
                ))}
            </div>

            {/* Sélection du mode de tri */}
            <div>
                <label>Trier par :</label>
                <select onChange={(e) => onSort(e.target.value)}>
                    <option value="date_creation">Date de création</option>
                    <option value="date_echeance">Date d’échéance</option>
                    <option value="title">Nom</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;
