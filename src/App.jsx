import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import {
    loadTasks, saveTasks,
    loadCategories, saveCategories,
    loadRelations, saveRelations,
    addTask as saveTask, addCategory as saveCategory
} from "./utils/storage";

function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [relations, setRelations] = useState([]);

    // Charger les données au démarrage
    useEffect(() => {
        setTasks(loadTasks());
        setCategories(loadCategories());
        setRelations(loadRelations());
    }, []);

    // Sauvegarder les tâches à chaque mise à jour
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    // Sauvegarder les catégories à chaque mise à jour
    useEffect(() => {
        saveCategories(categories);
    }, [categories]);

    // Sauvegarder les relations à chaque mise à jour
    useEffect(() => {
        saveRelations(relations);
    }, [relations]);

    // Ajouter une tâche avec le bon format
    const addTask = (newTask) => {
        const taskWithId = {
            id: Date.now(),
            title: newTask.title,
            description: newTask.description || "",
            date_creation: new Date().toISOString().split("T")[0],
            date_echeance: newTask.dateEcheance,
            etat: newTask.etat,
            urgent: newTask.urgent || false
        };

        setTasks([...tasks, taskWithId]);
        saveTask(taskWithId);

        // Ajouter la relation tâche-catégorie si une catégorie est sélectionnée
        if (newTask.categoryId) {
            const newRelation = { tache: taskWithId.id, categorie: newTask.categoryId };
            setRelations([...relations, newRelation]);
            saveRelations([...relations, newRelation]);
        }
    };

    // Ajouter une catégorie avec le bon format
    const addCategory = (newCategory) => {
        const categoryWithId = {
            id: Date.now(),
            title: newCategory.title,
            color: newCategory.color || "#000000",
            icon: newCategory.icon || "",
            actif: newCategory.actif !== undefined ? newCategory.actif : true
        };

        setCategories([...categories, categoryWithId]);
        saveCategory(categoryWithId);
    };

    return (
        <div>
            <Header tasks={tasks} />
            <Body tasks={tasks} setTasks={setTasks} categories={categories} relations={relations} />
            <Footer onAddTask={addTask} onAddCategory={addCategory} categories={categories} />
        </div>
    );
}

export default App;
