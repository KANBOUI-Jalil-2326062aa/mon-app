import { useState } from "react";

function AddCategoryForm({ onAddCategory }) {
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryColor, setCategoryColor] = useState("#000000"); // Couleur par défaut
    const [categoryActif, setCategoryActif] = useState(true); // Actif par défaut

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryTitle.trim().length < 3) {
            alert("Le nom de la catégorie doit contenir au moins 3 caractères.");
            return;
        }

        // Création de l'objet catégorie au bon format
        onAddCategory({
            title: categoryTitle, // Anciennement 'name'
            color: categoryColor,
            icon: "", // Icône vide par défaut
            actif: categoryActif
        });

        // Réinitialisation des champs après ajout
        setCategoryTitle("");
        setCategoryColor("#000000");
        setCategoryActif(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Ajouter une Catégorie</h3>

            {/* Champ Titre */}
            <label>
                Nom de la catégorie :
                <input
                    type="text"
                    value={categoryTitle}
                    onChange={(e) => setCategoryTitle(e.target.value)}
                    placeholder="Nom de la catégorie"
                    required
                />
            </label>

            {/* Sélecteur de Couleur */}
            <label>
                Couleur :
                <input
                    type="color"
                    value={categoryColor}
                    onChange={(e) => setCategoryColor(e.target.value)}
                />
            </label>

            {/* Case à cocher pour Actif */}
            <label>
                <input
                    type="checkbox"
                    checked={categoryActif}
                    onChange={(e) => setCategoryActif(e.target.checked)}
                />
                Actif
            </label>

            {/* Bouton d'ajout */}
            <button type="submit">
                Ajouter
            </button>
        </form>
    );
}

export default AddCategoryForm;
