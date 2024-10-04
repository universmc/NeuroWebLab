
// data de db-table-gant insert
const dbTableGantData = [
    // Ajoutez vos données ici
];

// Sélectionne l'élément db-table-gant
const dbTableGant = document.querySelector('.db-table-gant');

// Génération dynamique du contenu
function generateDbTableGant() {
    // Boucle à travers les données et crée les éléments nécessaires
    for (const item of dbTableGantData) {
        // Créez des éléments HTML et ajoutez-les à dbTableGant
        // Exemple : const newItem = document.createElement('div');
        // dbTableGant.appendChild(newItem);
    }
}

// Appel de la fonction de génération au chargement de la page
window.addEventListener('load', generateDbTableGant);
