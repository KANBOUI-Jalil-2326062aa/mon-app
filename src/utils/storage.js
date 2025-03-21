// Clé pour stocker les tâches, catégories et relations dans le localStorage
const TASKS_KEY = "tasks";
const CATEGORIES_KEY = "categories";
const RELATIONS_KEY = "relations";

// 📌 Charger les tâches depuis le localStorage
export function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : []; // Retourne [] au lieu de undefined
}

// 📌 Sauvegarder les tâches dans le localStorage
export function saveTasks(tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

// 📌 Charger les catégories depuis le localStorage
export function loadCategories() {
    const storedCategories = localStorage.getItem(CATEGORIES_KEY);
    return storedCategories ? JSON.parse(storedCategories) : [];
}

// 📌 Sauvegarder les catégories dans le localStorage
export function saveCategories(categories) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

// 📌 Charger les relations entre tâches et catégories
export function loadRelations() {
    const storedRelations = localStorage.getItem("relations");
    return storedRelations ? JSON.parse(storedRelations) : []; // Retourne [] au lieu de undefined
}

// 📌 Sauvegarder les relations entre tâches et catégories
export function saveRelations(relations) {
    localStorage.setItem(RELATIONS_KEY, JSON.stringify(relations));
}

// 📌 Ajouter une nouvelle tâche au stockage
export function addTask(task) {
    const tasks = loadTasks();
    const relations = loadRelations();

    const newTask = {
        id: Date.now(), // Génère un ID unique
        title: task.title, // Anciennement 'nom'
        description: task.description || "",
        date_creation: new Date().toISOString().split("T")[0], // Anciennement 'dateCreation'
        date_echeance: task.dateEcheance,
        etat: task.etat,
        urgent: task.urgent || false
    };

    tasks.push(newTask);
    saveTasks(tasks);

    // Ajouter la relation tâche-catégorie si une catégorie est sélectionnée
    if (task.categoryId) {
        relations.push({ tache: newTask.id, categorie: task.categoryId });
        saveRelations(relations);
    }
}

// 📌 Ajouter une nouvelle catégorie au stockage
export function addCategory(category) {
    const categories = loadCategories();

    const newCategory = {
        id: Date.now(), // Génère un ID unique
        title: category.title, // Anciennement 'name'
        color: category.color || "#000000",
        icon: category.icon || "",
        actif: category.actif !== undefined ? category.actif : true
    };

    categories.push(newCategory);
    saveCategories(categories);
}
