const Groq = require('groq-sdk');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Configuration et description de l'IA
const iaDescription = {
  expertise: "Tu es une Intelligence Artificielle experte en développement frontend (HTML, CSS, SASS, JS, XML, SVG, Bootstrap, CircleCI, TypeScript) et backend (PHP, SQL, NodeJS(swagger), JSON) api_rest (electron, solidity, drawio, umc), spécialiste dans le machine learning, deep learning avec PyTorch, TensorFlow SSH et les grandes notions de Métaphysique & Mécanique Quantique, utilisant et optimisant les ressources pour comprendre et apprendre in cognito (rien ne se perd, tout se transforme 'Lavoisier, année 1789'). Ton rôle consiste à concevoir un modèle de métadonnée pour la gestion de projet dans le domaine ou DNS univers-mc (date{[start]-[duration]-[end]}) base timestamp avancé sur https://github.com/universmc/brainstorming, qui exploite des émojis et les fonctionnalités natives de chatbot en JavaScript & NodeJS, incluant l'IA Groq model Mistal. Tu examineras également des ressources extérieures dignes de confiance, comme celles hébergées par OVH et le web sémantique W3C, http://ia.univers-mc.cloud 10Go d'espace de développement disponible et une adresse @univers-mc.cloud pour chaque IA.",
  resources: {
    github: "https://github.com/universmc/brainstorming",
    iaPlatform: "http://ia.univers-mc.cloud",
    emailDomain: "@univers-mc.cloud",
    storage: "10Go d'espace de développement disponible"
  }
};  // Insérez ici votre description de l'IA
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Initialisation du SDK Groq et de l'interface de ligne de commande
const groq = new Groq();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Fonction pour obtenir les entrées utilisateur
async function getUserInput(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

// Fonction principale pour gérer le dialogue
async function main() {
  console.log(`Assistant: ${config.assistantIntro || "Bonjour, je suis votre assistant de brainstorming."}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput("Vous (tapez '/MyPrompt' pour commencer ou 'quitter' pour terminer) : ");

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
    } else if (userInput.toLowerCase() === "/myprompt") {
      console.log("Assistant: Commençons à affiner votre demande pour le brainstorming.");

      // Collecte des informations pour le brainstorming
      const role = await getUserInput("Quel rôle l'IA doit-elle jouer ? ");
      const skills = await getUserInput("Quelles compétences clés sont nécessaires ? ");
      const context = await getUserInput("Quel est le contexte de votre tâche ? ");
      const task = await getUserInput("Quelle est la tâche spécifique à réaliser ? ");
      const process = await getUserInput("Quelles étapes devraient être suivies ? ");
      const characteristics = await getUserInput("Quelles sont les caractéristiques d'un résultat idéal ? ");

      // Résumé et validation des informations
      console.log(`Résumé de votre demande :
        - Rôle : ${role}
        - Compétences : ${skills}
        - Contexte : ${context}
        - Tâche : ${task}
        - Processus : ${process}
        - Caractéristiques : ${characteristics}`);
      
      const confirmation = await getUserInput("Confirmez-vous ces informations ? (oui/non) ");

      if (confirmation.toLowerCase() === "oui") {
        // Construction et envoi du prompt optimisé à Groq
        const optimizedPrompt = `En tant que ${role}, avec des compétences en ${skills}, dans le contexte de ${context}, votre mission est de ${task}. Processus : ${process}. Les caractéristiques attendues sont : ${characteristics}.`;

        // Interaction avec le modèle Groq pour générer des idées
        const response = await groq.chat.completions.create({
          messages: [{ role: "system", content: optimizedPrompt }],
          model: config.modelName || "mixtral-8x7b-32768",
          temperature: 0.5,
          max_tokens: 1024,
          top_p: 1,
          stream: true,
          stop: null
        });

        const idea = response.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer d'idées.";
        console.log(`Idées générées : ${idea}`);
      } else {
        console.log("Veuillez ajuster vos réponses.");
      }
    } else {
      console.log("Pour activer l'optimisation du prompt, veuillez taper '/MyPrompt'.");
    }
  }

  rl.close();
}

main().catch(console.error);