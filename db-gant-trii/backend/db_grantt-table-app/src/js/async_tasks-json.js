async function loadTasks() {
    try {
        const response = await fetch('path/to/tasks.json');
        const tasksData = await response.json();
        tasksData.forEach(task => {
            // Ajouter chaque tâche au tableau
            // ...
        });
    } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
    }
}
