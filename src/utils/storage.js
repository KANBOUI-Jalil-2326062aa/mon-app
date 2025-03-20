const STORAGE_KEY = "todo_tasks";

export const saveTasks = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasks = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};



const STORAGE_CATEGORIES = "todo_categories";

// Sauvegarde les catégories dans le stockage local
export const saveCategories = (categories) => {
    localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(categories));
};

// Récupère les catégories stockées
export const loadCategories = () => {
    const data = localStorage.getItem(STORAGE_CATEGORIES);
    return data ? JSON.parse(data) : [];
};
