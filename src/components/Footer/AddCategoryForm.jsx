import { useState } from "react";

function AddCategoryForm({ onAddCategory }) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("#000000");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryName.length < 3) {
            alert("Le nom de la catégorie doit contenir au moins 3 caractères");
            return;
        }
        onAddCategory({ name: categoryName, color: categoryColor });
        setCategoryName("");
        setCategoryColor("#000000");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Ajouter une Catégorie</h3>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Nom de la catégorie"
            />
            <input
                type="color"
                value={categoryColor}
                onChange={(e) => setCategoryColor(e.target.value)}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default AddCategoryForm;