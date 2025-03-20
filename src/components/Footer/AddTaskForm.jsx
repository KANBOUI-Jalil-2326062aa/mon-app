import { useState } from "react";

function AddTaskForm({ onAddTask, categories }) {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskCategory, setTaskCategory] = useState("");
    const [taskDateEcheance, setTaskDateEcheance] = useState("");
    const [taskEtat, setTaskEtat] = useState("en cours");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.length < 3) {
            alert("Le nom de la tâche doit contenir au moins 3 caractères");
            return;
        }
        onAddTask({
            nom: taskName,
            description: taskDescription,
            category: taskCategory,
            dateCreation: new Date().toISOString(),
            dateEcheance: taskDateEcheance,
            etat: taskEtat
        });
        setTaskName("");
        setTaskDescription("");
        setTaskCategory("");
        setTaskDateEcheance("");
        setTaskEtat("en cours");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Ajouter une Tâche</h3>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Nom de la tâche"
            />
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Description de la tâche (optionnel)"
            />
            <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
            </select>
            <select value={taskEtat} onChange={(e) => setTaskEtat(e.target.value)}>
                <option value="prévue">Prévue</option>
                <option value="en cours">En cours</option>
                <option value="urgente">Urgente</option>
                <option value="accomplie">Accomplie</option>
            </select>
            <input
                type="date"
                value={taskDateEcheance}
                onChange={(e) => setTaskDateEcheance(e.target.value)}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default AddTaskForm;