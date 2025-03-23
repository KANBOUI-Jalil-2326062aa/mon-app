import { useState } from "react";

function AddTaskForm({ onAddTask, categories }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskCategoryId, setTaskCategoryId] = useState("");
    const [taskDateEcheance, setTaskDateEcheance] = useState("");
    const [taskEtat, setTaskEtat] = useState("Nouveau");
    const [taskUrgent, setTaskUrgent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.length < 3) {
            alert("Le titre de la tâche doit contenir au moins 3 caractères.");
            return;
        }
        if (taskCategoryId.length === 0) {
            alert("Une catégorie doit être attribuée à la tache.");
            return;
        }

        onAddTask({
            title: taskTitle,
            description: taskDescription || "",
            categoryId: taskCategoryId ? parseInt(taskCategoryId) : null,
            date_creation: new Date().toISOString().split("T")[0],
            date_echeance: taskDateEcheance,
            etat: taskEtat,
            urgent: taskUrgent
        });

        setTaskTitle("");
        setTaskDescription("");
        setTaskCategoryId("");
        setTaskDateEcheance("");
        setTaskEtat("Nouveau");
        setTaskUrgent(false);
    };

    return (
        <form onSubmit={handleSubmit} className="form task-form">
            <h3 className="form-title">Ajouter une Tâche</h3>

            <div className="form-group">
                <label>Titre :</label>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Titre de la tâche"
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Description :</label>
                <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Description de la tâche (optionnel)"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Catégorie :</label>
                <select
                    value={taskCategoryId}
                    onChange={(e) => setTaskCategoryId(e.target.value)}
                    className="form-control"
                >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))
                    ) : (
                        <option disabled>Aucune catégorie disponible</option>
                    )}
                </select>
            </div>

            <div className="form-group">
                <label>Date d'échéance :</label>
                <input
                    type="date"
                    value={taskDateEcheance}
                    onChange={(e) => setTaskDateEcheance(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>État :</label>
                <select
                    value={taskEtat}
                    onChange={(e) => setTaskEtat(e.target.value)}
                    className="form-control"
                >
                    <option value="Nouveau">Nouveau</option>
                    <option value="En cours">En cours</option>
                    <option value="En attente">En attente</option>
                    <option value="Reussi">Réussi</option>
                    <option value="Abandonné">Abandonné</option>
                </select>
            </div>

            <div className="form-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={taskUrgent}
                        onChange={(e) => setTaskUrgent(e.target.checked)}
                    />
                    Urgent
                </label>
            </div>

            <button type="submit" className="btn">
                Ajouter
            </button>
        </form>
    );
}

export default AddTaskForm;
