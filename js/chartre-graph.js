// Exemple de script pour charger et afficher les données de la charte graphique
fetch('json/charte-graphique.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.charte-graphique');

    // Créer et ajouter des éléments HTML en fonction des données JSON
    data.sections.forEach(section => {
      const title = document.createElement('h2');
      title.textContent = section.title;
      container.appendChild(title);

      const list = document.createElement('ul');
      section.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${item.label}:</strong> ${item.content}`;
        list.appendChild(listItem);
      });
      container.appendChild(list);
    });
  })
  .catch(error => console.error('Erreur lors du chargement des données de la charte graphique:', error));
