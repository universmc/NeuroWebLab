// Sélectionnez les boutons Précédent et Suivant par leur ID
const prevButton = document.getElementById('goPrevLeft');
const nextButton = document.getElementById('goNextRight');

// Ajoutez un gestionnaire d'événements au bouton Précédent
prevButton.addEventListener('click', () => {
    console.log('Clic gauche = Précédent');
});

// Ajoutez un gestionnaire d'événements au bouton Suivant
nextButton.addEventListener('click', () => {
    console.log('Clic droit = Suivant');
});
