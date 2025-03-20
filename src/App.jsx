import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import { loadTasks, saveTasks, loadCategories, saveCategories } from "./utils/storage";

function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    // Charger les tâches et catégories au démarrage
    useEffect(() => {
        setTasks(loadTasks());
        const loadedCategories = loadCategories();
        console.log("Catégories chargées :", loadedCategories); // Vérifie ce qui est affiché
        setCategories(loadedCategories);
    }, []);

    // Sauvegarder les tâches à chaque mise à jour
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    // Sauvegarder les catégories à chaque mise à jour
    useEffect(() => {
        saveCategories(categories);
    }, [categories]);

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const addCategory = (newCategory) => {
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        saveCategories(updatedCategories); // Assure que la sauvegarde est immédiate
    };

    return (
        <div>
            <Header tasks={tasks} />
            <Body tasks={tasks} setTasks={setTasks} categories={categories} />
            <Footer onAddTask={addTask} onAddCategory={addCategory} categories={categories} />
        </div>
    );
}

export default App;
