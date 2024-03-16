# Cours sur le language SASS
# Animations Avancées en SASS et Configuration avec Node.js

## Introduction
Les animations en CSS peuvent grandement améliorer l'expérience utilisateur en rendant les interfaces web plus dynamiques et interactives. SASS, en tant que préprocesseur CSS, simplifie et enrichit la création de styles complexes, y compris les animations. De plus, l'utilisation de Node.js avec SASS peut automatiser et optimiser le workflow de développement.

## Objectifs
- Maîtriser les techniques d'animation en SASS.
- Comprendre l'utilisation des keyframes, des transformations, et des pseudo-classes en SASS.
- Configurer `node-sass` pour la compilation et la surveillance automatiques des fichiers SASS.

## Contenu du Cours

### Section 1: Fondamentaux des Animations en SASS
- **Pseudo-classes et Sélecteurs**: Hover, focus, et autres.
- **Keyframes et Animation**: Syntaxe de base et application.
- **Transformations CSS**: `translateX`, `translateY`, `rotate`.

### Section 2: Création de Loaders en SASS
- **Loader Circulaire**: Utilisation de `border-radius` et animations rotatives.
- **Loader Linéaire**: Animation de barres de progression.


## Exemples de Code

sass
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

.loader
  border: 5px solid #f3f3f3
  border-top: 5px solid #3498db
  border-radius: 50%
  width: 50px
  height: 50px
  animation: spin 2s linear infinite

### Section 3: Animations Complexes
- **Animation d'un Conteneur de Divs**: Techniques pour animer plusieurs éléments simultanément.
- **Transitions et Effets Visuels**: Création d'effets interactifs et réactifs.

### Section 4: Configuration de Node.js avec SASS
- **Installation de Node.js et node-sass**
- **Configuration du Script `node-sass --watch`**
- **Automatisation du Processus de Compilation SASS**

## Exemples de Code

sass
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

.loader
  border: 5px solid #f3f3f3
  border-top: 5px solid #3498db
  border-radius: 50%
  width: 50px
  height: 50px
  animation: spin 2s linear infinite
Configuration de node-sass

Pour automatiser la compilation des fichiers SASS, utilisez node-sass avec l'option --watch. Voici un exemple de configuration dans le fichier package.json :

json

"scripts": {
  "sass": "node-sass --watch scss/main.scss css/main.css"
}

## Exercices Pratiques

    Créer différents types de loaders en utilisant des animations SASS.
    Configurer un projet pour utiliser node-sass pour la compilation automatique.

## Ressources Supplémentaires

    Documentation SASS
    Node-sass GitHub Repository

## Conclusion

L'utilisation de SASS, en combinaison avec Node.js, rend le processus de développement web plus fluide et efficace. Les animations en SASS ajoutent une touche esthétique aux projets, tandis que node-sass simplifie et accélère le workflow de développement.