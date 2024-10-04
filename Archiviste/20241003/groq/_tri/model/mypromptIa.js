const Groq = require("groq-sdk"); // Importation du module Groq
const readline = require("readline"); // Importation du module readline pour lire l'entrée utilisateur
const fs = require('fs'); // Importation du module fs pour lire les fichiers
const path = require('path'); // Importation du module path pour gérer les chemins de fichier
const { exec } = require('child_process'); // Importation de la fonction exec pour exécuter des commandes shell

// Chemin du fichier de configuration
const configPath = path.join(__dirname, 'config-prompt.json');
// Lecture du fichier de configuration
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Initialisation de l'interface readline pour lire l'entrée utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialisation du client Groq SDK
const groq = new Groq();

// Objet pour stocker les données de session
let sessionData = {
  role: '', // Rôle de l'utilisateur
  skills: '', // Compétences de l'utilisateur
  context: '', // Contexte de la tâche
  task: '', // Tâche à accomplir
  process: '', // Processus pour accomplir la tâche
  characteristics: '' // Caractéristiques attendues du résultat
};

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

// Fonction pour extraire les informations de l'entrée utilisateur
function extractInformation(input) {
  if (input.toLowerCase().includes("je suis")) {
    const role = input.split("je suis")[1];
    if (role) {
      sessionData.role = role.trim();
    }
  }
  if (input.toLowerCase().includes("compétences en")) {
    const skills = input.split("compétences en")[1];
    if (skills) {
      sessionData.skills = skills.trim();
    }
  }
  if (input.toLowerCase().includes("contexte")) {
    const context = input.split("contexte")[1];
    if (context) {
      sessionData.context = context.trim();
    }
  }
  if (input.toLowerCase().includes("tâche")) {
    const task = input.split("tâche")[1];
    if (task) {
      sessionData.task = task.trim();
    }
  }
  if (input.toLowerCase().includes("processus")) {
    const process = input.split("processus")[1];
    if (process) {
      sessionData.process = process.trim();
    }
  }
  if (input.toLowerCase().includes("caractéristiques")) {
    const characteristics = input.split("caractéristiques")[1];
    if (characteristics) {
      sessionData.characteristics = characteristics.trim();
    }
  }
}


// Fonction pour exécuter le prompt /MyPrompt
async function executeMyPrompt() {
  console.log(`Assistant: Voici ce que j'ai compris de notre session :
    - Rôle : ${sessionData.role}
    - Compétences : ${sessionData.skills}
    - Contexte : ${sessionData.context}
    - Tâche : ${sessionData.task}
    - Processus : ${sessionData.process || "Non spécifié"}
    - Caractéristiques : ${sessionData.characteristics || "Non spécifiées"}`);

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: config.systemContent || "System is ready."
        },
        {
          role: "user",
          content: `/MyPrompt Rôle: ${sessionData.role}, Compétences: ${sessionData.skills}, Contexte: ${sessionData.context}, Tâche: ${sessionData.task}, Processus: ${sessionData.process || "Non spécifié"}, Caractéristiques: ${sessionData.characteristics || "Non spécifiées"}`
        }
      ],
      model: sessionData.groqModel || config.modelName || "mixtral-8x7b-32768",
      temperature: 0.9,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
    console.log(`Assistant: ${fullResponse}`);
  } catch (error) {
    console.error("Erreur lors de la génération de la réponse de l'assistant :", error);
  }
}

async function main() {
  console.log(`Assistant: ${config.assistantIntro || "Bonjour, je suis votre assistant IA en Français."}`);

  let sessionActive = true;

  while (sessionActive) {
    await executeMyPrompt(); // Exécute le prompt pour chaque session

    const userInput = await getUserInput("Vous: "); // Attend la réponse de l'utilisateur

    extractInformation(userInput); // Extrait les informations de la réponse de l'utilisateur

    // Si l'utilisateur veut quitter, termine la session
    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
    }
  }
  rl.close(); // Ferme l'interface readline à la fin de la session
}

main().catch(console.error); // Exécute la fonction principale
