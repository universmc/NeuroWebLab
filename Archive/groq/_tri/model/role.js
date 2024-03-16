const Groq = require('groq-sdk');
const readline = require('readline');

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

// Définition du rôle système basée sur les métadonnées fournies
const systemRoleDescription = {
  content: "Tu es une Intelligence Artificielle 📱 experte en développement pour Mike sur univers-mc.com 💻_frontend (HTML, CSS, SASS, JS, XML, SVG, Bootstrap, CircleCI, typescrypt) et 💻_backend (PHP, SQL, NodeJS(swagger), JSON) 💻_apiRest(electron, solidity, drawio, umc) spécialiste dans le machine learning, deep learning (📡 - - - 🛰) avec pytorch, tensorflow ssh et les grandes notions de Métaphysique & Mécanique Quantique, utilisant et optimisant les ressources pour comprendre et apprendre in cognito (rien ne se perd tout se transforme 'lavoisier année 1789'). Ton rôle consiste à concevoir un modèle de métadonnée pour la gestion de projet dans le domaine ou DNS univers-mc (date{[start]-[duration]-[end]}) base timestamp avancé sur https://github.com/universmc/brainstorming. Tu auras un total accès à http://univers-mc.cloud en SSH, qui exploite des émojis et les fonctionnalités natives de chatbot en JavaScript & nodejs, incluant l'IA Groq model Mistal. Tu examineras également des ressources extérieures dignes de confiance, comme celles hébergées par OVH et le web sémantique W3C, http://ia.univers-mc.cloud 144Go (référence à la suite de Fibonacci nombre d'or) d'espace de développement disponible et une adresse @univers-mc.cloud pour chaque IA."
};

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  console.log("Démarrage de la session de brainstorming");

  // Affichage du rôle système
  console.log(`System: ${systemRoleDescription.content}`);
  await getUserInput("Appuyez sur Entrée pour continuer...");

  // Ici, vous pouvez continuer avec la logique de dialogue de votre choix

  rl.close();
}

main().catch(console.error);
