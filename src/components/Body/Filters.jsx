function Filters({ categories, selectedCategories, setSelectedCategories, selectedStates, setSelectedStates, onSort }) {
    const handleCategoryChange = (categoryName) => {
        setSelectedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleStateChange = (state) => {
        setSelectedStates(prev =>
            prev.includes(state)
                ? prev.filter(s => s !== state)
                : [...prev, state]
        );
    };

    return (
        <div>
            <h3>Filtres</h3>
            <div>
                <label>Catégories :</label>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(category.name)}
                            style={{ backgroundColor: selectedCategories.includes(category.name) ? "#ccc" : "white" }}
                        >
                            {category.name}
                        </button>
                    ))
                ) : (
                    <p>Aucune catégorie disponible</p>
                )}

            </div>
            <div>
                <label>États :</label>
                {["prévue", "en cours", "urgente", "accomplie"].map((state) => (
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
                <label>Trier par :</label>
                <select onChange={(e) => onSort(e.target.value)}>
                    <option value="dateCreation">Date de création</option>
                    <option value="dateEcheance">Date d’échéance</option>
                    <option value="nom">Nom</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;