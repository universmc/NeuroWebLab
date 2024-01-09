# Cours sur le language CSS
# Stylus : Un Préprocesseur CSS pour un Développement Web Plus Efficace

## Introduction
Stylus est un préprocesseur CSS puissant qui permet aux développeurs de créer des styles de manière plus efficace et organisée. En utilisant une syntaxe simplifiée et des fonctionnalités avancées, Stylus améliore la productivité et la maintenabilité du code CSS.

## Objectifs
- Comprendre ce qu'est un préprocesseur CSS et les avantages de l'utilisation de Stylus.
- Apprendre la syntaxe de base et les fonctionnalités clés de Stylus.
- Mettre en pratique la création de styles CSS plus dynamiques et réutilisables.

## Contenu du Cours

### Section 1: Introduction à Stylus
- **Qu'est-ce qu'un Préprocesseur CSS?**
- **Installation et Configuration de Stylus**
- **Syntaxe de Base de Stylus**

### Section 2: Caractéristiques Clés de Stylus
- **Variables et Mixins**: Comment les utiliser pour un code réutilisable.
- **Imbrication**: Simplification de la structure CSS.
- **Fonctions et Opérations**: Manipulation dynamique des styles.

### Section 3: Projets Pratiques avec Stylus
- **Création d'un Thème de Site Web**: Utilisation de variables et mixins.
- **Responsive Design avec Stylus**: Techniques d'écriture de media queries efficaces.

## Exemples de Code

stylus
// Définition de variables
primary-color = #333
secondary-color = #888

// Utilisation des variables
body
  color: primary-color
  background-color: secondary-color

// Mixin pour les médias
media-query(size)
  @media (max-width: size)
    {block}

// Utilisation du mixin
+media-query('600px')
  body
    font-size: 14px

## Exercices Pratiques

    Créer une petite bibliothèque de mixins pour des composants courants (boutons, cartes, modals).
    Convertir un fichier CSS existant en Stylus pour améliorer sa lisibilité et sa maintenance.

## Ressources Supplémentaires

    Documentation Officielle de Stylus
    Tutoriels et Guides Stylus

## Conclusion

Stylus offre un moyen puissant et flexible d'écrire du CSS. En maîtrisant ce préprocesseur, les développeurs peuvent accroître leur efficacité et produire des styles CSS plus organisés et maintenables.