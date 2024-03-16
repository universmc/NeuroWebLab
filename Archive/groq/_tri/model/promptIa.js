const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const groq = new Groq();

let sessionData = {
  role: '',
  skills: '',
  context: '',
  task: '',
  process: '',
  characteristics: ''
};

async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

function extractInformation(input) {
  if (input.toLowerCase().includes("je suis")) sessionData.role = input.split("je suis")[1].trim();
  if (input.toLowerCase().includes("compétences en")) sessionData.skills = input.split("compétences en")[1].trim();
  if (input.toLowerCase().includes("contexte")) sessionData.context = input.split("contexte")[1].trim();
  if (input.toLowerCase().includes("tâche")) sessionData.task = input.split("tâche")[1].trim();
  if (input.toLowerCase().includes("processus")) sessionData.process = input.split("processus")[1].trim();
  if (input.toLowerCase().includes("caractéristiques")) sessionData.characteristics = input.split("caractéristiques")[1].trim();
}

async function executeMyPrompt() {
  console.log(`Assistant: Voici ce que j'ai compris de notre session :
    - Rôle : ${sessionData.role}
    - Compétences : ${sessionData.skills}
    - Contexte : ${sessionData.context}
    - Tâche : ${sessionData.task}
    - Processus : ${sessionData.process}
    - Caractéristiques : ${sessionData.characteristics}`);

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: config.systemContent || "System is ready."
        },
        {
          role: "user",
          content: `/MyPrompt Rôle: ${sessionData.role}, Compétences: ${sessionData.skills}, Contexte: ${sessionData.context}, Tâche: ${sessionData.task}, Processus: ${sessionData.process}, Caractéristiques: ${sessionData.characteristics}`
        }
      ],
      model: config.modelName || "mixtral-8x7b-32768",
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

  rl.close();
}

async function main() {
  console.log(`Assistant: ${config.assistantIntro || "Bonjour, je suis votre assistant IA en Français."}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput("Vous: ");

    extractInformation(userInput);

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    if (userInput.toLowerCase() === "/myprompt") {
      await executeMyPrompt();
      sessionActive = false;
      continue;
    }
  }
}

main().catch(console.error);
