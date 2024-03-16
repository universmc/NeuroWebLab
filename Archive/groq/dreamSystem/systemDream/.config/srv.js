const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { exec } = require('child_process');
const fs = require('fs');
const readline = require("readline");
const Groq = require("groq-sdk");

const app = express();

// Charger le fichier de configuration
const configPath = path.join(__dirname, 'srv.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Configuration de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'univers-mc.cloud API',
      version: '1.0.0',
      description: 'The API for univers-mc.cloud',
    },
    servers: [
      {
        url: 'http://localhost:3144',
        description: 'Local server',
      },
      
      // Ajoutez d'autres serveurs ici si nécessaire
    ],
  },
  apis: ['./json/*.json'], // debug root Emplacement des fichiers contenant les commentaires de documentation
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware pour servir Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routage des fichiers JSON
app.get('/json/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'json', `${filename}.json`));
});

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

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
  console.log(`Assistant: ${config.assistantIntro || "Bonjour, je suis votre Intelligence artificielle, On me nomme 'pi' ou trois.14, ici pour vous servire"}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput("Vous: ");

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Répondre avec iaDescription si demandé
    if (userInput.toLowerCase().includes("expertise")) {
      console.log(`Assistant: ${config.iaDescription.expertise}`);
      continue;
    }

    // Exécuter des commandes shell en réponse à la "commande magique"
    if (userInput.toLowerCase().includes("commande magique")) {
      try {
        const output = await executeShellCommand(config.magicCommand);
        console.log(`Résultat de la commande: ${output}`);
      } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande: ${error}`);
      }
      continue;
    }

    // Génération de réponses à l'aide de Groq SDK
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: config.systemContent || "System groot ready."
          },
          {
            role: "assistant",
            content: "DevOps"
          },
          {
            role: "user",
            content: userInput
          }
        ],
        model: config.modelName || "mixtral-8x7b-32768",
        temperature: 0.5,
        max_tokens: 512,
        top_p: 1,
        stream: false,
        stop: null
      });

      // Affichage de la réponse générée
      const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
      console.log(`Assistant: ${fullResponse}`);
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse de l'assistant :", error);
    }
  }

  rl.close();
}

// Démarrage du serveur Express
const PORT = 3233;
app.listen(PORT, () => console.log(`groot Server running on port ${PORT}`));

// Exécution de la fonction principale
main().catch(console.error);
