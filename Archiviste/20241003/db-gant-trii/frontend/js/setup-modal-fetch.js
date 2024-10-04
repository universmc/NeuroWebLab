// Sélectionne les éléments setup-modal
const setupModal = document.querySelector('.setup-modal');
const stepContainer = document.querySelector('.step-container');
const dbTableGant = document.querySelector('.db-table-gant');

// Charge les données actuelles de l'étape
function loadCurrentStepData() {
    // Charge les données de currentStep.json
    // Exemple : fetch('currentStep.json').then(response => response.json()).then(data => {
    //     // Utilisez les données pour afficher l'étape courante
    // });
}

// Charge les données de db_table-gantt
function loadDbTableGantData() {
    // Charge les données de db_table-gantt.json
    // Exemple : fetch('db_table-gantt.json').then(response => response.json()).then(data => {
    //     // Utilisez les données pour générer le contenu de db_table-gant
    // });
}

// Fonction pour passer à l'étape suivante
function nextStep() {
    // Implémentez la logique pour passer à l'étape suivante
}

// Fonction pour revenir à l'étape précédente
function previousStep() {
    // Implémentez la logique pour revenir à l'étape précédente
}

// Charge les données initiales lors du chargement de la page
window.addEventListener('load', () => {
    loadCurrentStepData();
    loadDbTableGantData();
});
