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
        const storedTasks = loadTasks();
        const storedCategories = loadCategories();
        const storedRelations = loadRelations();

        const isEmpty = storedTasks.length === 0 && storedCategories.length === 0 && storedRelations.length === 0;

        if (isEmpty) {
            fetch("/taches.json")
                .then(response => response.json())
                .then(data => {
                    console.log("✅ Données chargées depuis taches.json :", data);

                    setTasks(data.taches || []);
                    setCategories(data.categories || []);
                    setRelations(data.relations || []);

                    saveTasks(data.taches || []);
                    saveCategories(data.categories || []);
                    saveRelations(data.relations || []);
                })
                .catch(error => {
                    console.error("❌ Erreur lors du chargement de taches.json :", error);
                });
        } else {
            setTasks(storedTasks);
            setCategories(storedCategories);
            setRelations(storedRelations);
        }
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

    // Ajouter une tâche
    const addTask = (newTask) => {
        const taskWithId = {
            id: Date.now(),
            title: newTask.title,
            description: newTask.description || "",
            date_creation: new Date().toISOString().split("T")[0],
            date_echeance: newTask.date_echeance || "",
            etat: newTask.etat,
            urgent: newTask.urgent || false
        };

        setTasks([...tasks, taskWithId]);
        saveTask(taskWithId);

        if (newTask.categoryId) {
            const newRelation = { tache: taskWithId.id, categorie: newTask.categoryId };
            const updatedRelations = [...relations, newRelation];
            setRelations(updatedRelations);
            saveRelations(updatedRelations);
        }
    };

    // Ajouter une catégorie
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

    // Supprimer une tâche
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);

        const updatedRelations = relations.filter(rel => rel.tache !== taskId);
        setRelations(updatedRelations);
        saveRelations(updatedRelations);
    };

    return (
        <div>
            <Header tasks={tasks} />
            <Body
                tasks={tasks}
                setTasks={setTasks}
                categories={categories}
                relations={relations}
                onDeleteTask={deleteTask}
            />
            <Footer
                onAddTask={addTask}
                onAddCategory={addCategory}
                categories={categories}
            />
        </div>
    );
}

export default App;
