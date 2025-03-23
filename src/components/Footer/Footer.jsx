import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import AddCategoryForm from "./AddCategoryForm";

function Footer({ onAddTask, onAddCategory, categories }) {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    return (
        <footer className="footer">
            <h3 className="footer-title">À ajouter</h3>

            <div className="footer-buttons">
                <button
                    className="footer-btn"
                    onClick={() => setShowTaskForm(true)}
                >
                    Tâche
                </button>
                <button
                    className="footer-btn"
                    onClick={() => setShowCategoryForm(true)}
                >
                    Catégorie
                </button>
            </div>

            {showTaskForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button
                            className="modal-close"
                            onClick={() => setShowTaskForm(false)}
                        >
                            ×
                        </button>
                        <AddTaskForm onAddTask={onAddTask} categories={categories} />
                    </div>
                </div>
            )}

            {showCategoryForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button
                            className="modal-close"
                            onClick={() => setShowCategoryForm(false)}
                        >
                            ×
                        </button>
                        <AddCategoryForm onAddCategory={onAddCategory} />
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;
