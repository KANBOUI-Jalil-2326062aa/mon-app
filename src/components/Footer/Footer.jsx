import AddTaskForm from "./AddTaskForm";
import AddCategoryForm from "./AddCategoryForm";
import { useState } from "react";

function Footer({ onAddTask, onAddCategory, categories }) {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    return (
        <div>
            <h3>À ajouter</h3>

            {/* Boutons pour afficher les formulaires */}
            <button onClick={() => setShowTaskForm(!showTaskForm)}>Tâche</button>
            <button onClick={() => setShowCategoryForm(!showCategoryForm)}>Catégorie</button>

            {/* Formulaire d'ajout de tâche */}
            {showTaskForm && <AddTaskForm onAddTask={onAddTask} categories={categories} />}

            {/* Formulaire d'ajout de catégorie */}
            {showCategoryForm && <AddCategoryForm onAddCategory={onAddCategory} />}
        </div>
    );
}

export default Footer;
