function addRowListeners() {
    const rows = document.querySelectorAll('#gantt-container tr');
    rows.forEach(row => {
        row.addEventListener('click', (event) => {
            console.log('Ligne cliquée:', event.currentTarget);
            // Vous pouvez ajouter ici d'autres logiques, comme l'affichage de détails ou la modification.
        });
    });
}

addRowListeners();
