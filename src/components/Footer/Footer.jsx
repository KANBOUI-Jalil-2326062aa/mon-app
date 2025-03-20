import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import AddCategoryForm from "./AddCategoryForm";

function Footer({ onAddTask, onAddCategory, categories }) {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    return (
        <footer>
            <h3>À ajouter</h3>
            <button onClick={() => setShowTaskForm(!showTaskForm)}>Tâche</button>
            <button onClick={() => setShowCategoryForm(!showCategoryForm)}>Catégorie</button>

            {showTaskForm && <AddTaskForm onAddTask={onAddTask} categories={categories} />}
            {showCategoryForm && <AddCategoryForm onAddCategory={onAddCategory} />}
        </footer>
    );
}

export default Footer;
