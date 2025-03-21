import { useState } from "react";

function AddTaskForm({ onAddTask, categories }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskCategoryId, setTaskCategoryId] = useState(""); // Stocke l'ID de la catégorie
    const [taskDateEcheance, setTaskDateEcheance] = useState("");
    const [taskEtat, setTaskEtat] = useState("Nouveau"); // État par défaut
    const [taskUrgent, setTaskUrgent] = useState(false); // Urgent en booléen

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.length < 3) {
            alert("Le titre de la tâche doit contenir au moins 3 caractères.");
            return;
        }

        // Création de l'objet tâche au bon format
        onAddTask({
            title: taskTitle, // Anciennement 'nom'
            description: taskDescription || "",
            categoryId: taskCategoryId ? parseInt(taskCategoryId) : null, // Stocke l'ID et non le nom
            date_creation: new Date().toISOString().split("T")[0], // Auto-rempli
            date_echeance: taskDateEcheance,
            etat: taskEtat,
            urgent: taskUrgent
        });

        // Réinitialisation des champs après ajout
        setTaskTitle("");
        setTaskDescription("");
        setTaskCategoryId("");
        setTaskDateEcheance("");
        setTaskEtat("Nouveau");
        setTaskUrgent(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Ajouter une Tâche</h3>

            {/* Champ Titre */}
            <label>
                Titre :
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Titre de la tâche"
                    required
                />
            </label>

            {/* Champ Description */}
            <label>
                Description :
                <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Description de la tâche (optionnel)"
                />
            </label>

            {/* Sélection de la Catégorie */}
            <label>
                Catégorie :
                <select
                    value={taskCategoryId}
                    onChange={(e) => setTaskCategoryId(e.target.value)}
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
            </label>

            {/* Sélection de la Date d'échéance */}
            <label>
                Date d'échéance :
                <input
                    type="date"
                    value={taskDateEcheance}
                    onChange={(e) => setTaskDateEcheance(e.target.value)}
                    required
                />
            </label>

            {/* Sélection de l'État */}
            <label>
                État :
                <select
                    value={taskEtat}
                    onChange={(e) => setTaskEtat(e.target.value)}
                >
                    <option value="Nouveau">Nouveau</option>
                    <option value="En cours">En cours</option>
                    <option value="Reussi">Réussi</option>
                    <option value="En attente">En attente</option>
                    <option value="Abandonné">Abandonné</option>
                </select>
            </label>

            {/* Case à cocher pour Urgent */}
            <label>
                <input
                    type="checkbox"
                    checked={taskUrgent}
                    onChange={(e) => setTaskUrgent(e.target.checked)}
                />
                Urgent
            </label>

            {/* Bouton d'ajout */}
            <button type="submit">
                Ajouter
            </button>
        </form>
    );
}

export default AddTaskForm;
