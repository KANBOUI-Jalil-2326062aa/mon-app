import { useState } from "react";

function AddCategoryForm({ onAddCategory }) {
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryColor, setCategoryColor] = useState("#000000");
    const [categoryActif, setCategoryActif] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryTitle.trim().length < 3) {
            alert("Le nom de la catégorie doit contenir au moins 3 caractères.");
            return;
        }

        onAddCategory({
            title: categoryTitle,
            color: categoryColor,
            icon: "",
            actif: categoryActif
        });

        setCategoryTitle("");
        setCategoryColor("#000000");
        setCategoryActif(true);
    };

    return (
        <form onSubmit={handleSubmit} className="form category-form">
            <h3 className="form-title">Ajouter une Catégorie</h3>

            <div className="form-group">
                <label>Nom de la catégorie :</label>
                <input
                    type="text"
                    value={categoryTitle}
                    onChange={(e) => setCategoryTitle(e.target.value)}
                    placeholder="Nom de la catégorie"
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Couleur :</label>
                <input
                    type="color"
                    value={categoryColor}
                    onChange={(e) => setCategoryColor(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="form-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={categoryActif}
                        onChange={(e) => setCategoryActif(e.target.checked)}
                    />
                    Actif
                </label>
            </div>

            <button type="submit" className="btn">
                Ajouter
            </button>
        </form>
    );
}

export default AddCategoryForm;
