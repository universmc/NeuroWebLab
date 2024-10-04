async function fetchEnvironmentSetup() {
    try {
      const response = await fetch('./json/gantt.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const environmentSetup = await response.json();
      displayEnvironmentSetup(environmentSetup);
    } catch (error) {
      console.error("Could not load the JSON file: ", error);
    }
  }
  
  function displayEnvironmentSetup(environmentSetup) {
    const container = document.getElementById('developmentEnvironment');
  
    // Affichage de la description
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = environmentSetup.description;
    container.appendChild(descriptionElement);
  
    // Affichage des rôles
    environmentSetup.roles.forEach(role => {
      const roleElement = document.createElement('div');
      roleElement.className = 'role';
  
      const titleElement = document.createElement('h3');
      titleElement.textContent = role.title;
      roleElement.appendChild(titleElement);
  
      const skillsElement = document.createElement('p');
      skillsElement.textContent = `Compétences: ${role.skills.join(', ')}`;
      roleElement.appendChild(skillsElement);
  
      const responsibilitiesElement = document.createElement('p');
      responsibilitiesElement.textContent = `Responsabilités: ${role.responsibilities}`;
      roleElement.appendChild(responsibilitiesElement);
  
      container.appendChild(roleElement);
    });
  
    // Affichage des informations du chef de projet
    const leaderElement = document.createElement('div');
    leaderElement.className = 'projectLeader';
  
    const leaderTitleElement = document.createElement('h2');
    leaderTitleElement.textContent = "Chef de projet";
    leaderElement.appendChild(leaderTitleElement);
  
    Object.keys(environmentSetup.projectLeader.contact).forEach(key => {
      const infoElement = document.createElement('p');
      infoElement.textContent = `${key}: ${environmentSetup.projectLeader.contact[key]}`;
      leaderElement.appendChild(infoElement);
    });
  
    container.appendChild(leaderElement);
  }
  
  document.addEventListener('DOMContentLoaded', fetchEnvironmentSetup);
  