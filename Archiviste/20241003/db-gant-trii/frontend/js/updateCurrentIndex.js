function update(operation, data) {
    // Charge les données actuelles de db_table-gantt.json
    fetch('db_table-gantt.json')
        .then(response => response.json())
        .then(dbTableData => {
            // Effectue les opérations CRUD en fonction de l'opération spécifiée
            switch (operation) {
                case 'create':
                    // Ajoute une nouvelle entrée à dbTableData
                    dbTableData.push(data);
                    break;
                case 'read':
                    // Retourne les données actuelles (pas besoin de modification)
                    break;
                case 'update':
                    // Recherche l'entrée à mettre à jour et applique les modifications
                    // Vous devrez identifier l'entrée à mettre à jour (par exemple, par ID)
                    // et mettre à jour les propriétés nécessaires.
                    break;
                case 'delete':
                    // Recherche l'entrée à supprimer et supprime-la de dbTableData
                    // Vous devrez identifier l'entrée à supprimer (par exemple, par ID).
                    break;
                default:
                    // Opération non reconnue
                    console.error('Opération non reconnue.');
                    return;
            }

            // Une fois les opérations CRUD effectuées, mettez à jour db_table-gantt.json
            // avec les nouvelles données en utilisant fetch() et la méthode POST.

            fetch('update-db.php', {
                method: 'POST', // Utilisez la méthode POST pour mettre à jour le fichier
                body: JSON.stringify(dbTableData), // Convertit les données en JSON
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(updatedData => {
                // Les données ont été mises à jour avec succès
                console.log('Données mises à jour :', updatedData);
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du fichier :', error);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement de db_table-gantt.json :', error);
        });
}
