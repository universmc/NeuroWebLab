// Charger le contenu depuis le fichier neofs.json
fetch('neofs.json')
  .then(response => response.json())
  .then(data => {
    // Boucler à travers chaque étape dans le fichier JSON
    data.forEach(etape => {
      // Sélectionner la section correspondante dans le DOM
      const sectionElement = document.getElementById(etape.Identifiant.toLowerCase());

      // Vérifier si la section existe
      if (sectionElement) {
        // Créer un titre pour l'étape
        const titleElement = document.createElement('h2');
        titleElement.textContent = etape.Étape;

        // Créer une liste à puces pour les tâches
        const tasksListElement = document.createElement('ul');
        etape.Tâches.forEach(tache => {
          const taskItemElement = document.createElement('li');
          taskItemElement.textContent = tache;
          tasksListElement.appendChild(taskItemElement);
        });

        // Créer un paragraphe pour les métadonnées de l'étape
        const metadataParagraph = document.createElement('p');
        metadataParagraph.textContent = etape['Metadonnees de l Étape'];

        // Ajouter le titre, la liste de tâches et les métadonnées à la section
        sectionElement.appendChild(titleElement);
        sectionElement.appendChild(metadataParagraph);
        sectionElement.appendChild(tasksListElement);
      }
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du chargement de neofs.json :', error);
  });
