fetch('frontend/json/main.json')
  .then(response => response.json())
  .then(data => {
    // Sélectionnez l'élément main où vous souhaitez insérer les sections
    const mainElement = document.querySelector('main');

    // Parcourez les sections dans le JSON et insérez-les dans la page
    data.sections.forEach(section => {
      // Créez un élément de section
      const sectionElement = document.createElement('section');

      // Créez un titre pour la section
      const titleElement = document.createElement('h2');
      titleElement.textContent = section.title;

      // Créez une liste à puces pour le contenu de la section
      const contentListElement = document.createElement('ul');
      section.content.forEach(contentItem => {
        const contentItemElement = document.createElement('li');
        contentItemElement.textContent = contentItem;
        contentListElement.appendChild(contentItemElement);
      });

      // Si le champ "contenuMarkdown" est défini dans la section, convertissez-le en HTML
      if (section.contenuMarkdown) {
        fetch(section.contenuMarkdown)
          .then(response => response.text())
          .then(markdown => {
            const markdownHTML = marked(markdown);
            const markdownElement = document.createElement('div');
            markdownElement.innerHTML = markdownHTML;
            sectionElement.appendChild(markdownElement);
          })
          .catch(error => {
            console.error(`Une erreur s'est produite lors du chargement du fichier Markdown : ${error}`);
          });
      }

      // Ajoutez le titre et la liste à la section
      sectionElement.appendChild(titleElement);
      sectionElement.appendChild(contentListElement);

      // Ajoutez la section au main
      mainElement.appendChild(sectionElement);
    });
  })
  .catch(error => {
    console.error('Une erreur sest produite lors du chargement de main.json :', error);
  });
