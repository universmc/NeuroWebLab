const fs = require('fs').promises;
const Groq = require('groq-sdk');
const groq = new Groq();

// Templates de messages et fonction pour remplir les templates
const messageTemplates = {
    systemMessage: "Présentation de Pi: IA au cœur du systemDream ...",
    assistantMessage: "Vous êtes une intelligence artificielle à haute potentialité générative...",
    userMessage: "bonjour : à toi 'choice' message input js groq"
};

function fillTemplate(template, params) {
    return template.replace(/\{(\w+)\}/g, (match, key) => params[key] || match);
}

const contextData = {
    // Données contextuelles pour remplir les templates
};
// Données par défaut de l'assistant
// Configuration initiale de l'assistant
const defaultAssistantData = {
  nom: 'assistant',
  description: "Bonjour, je suis votre assistant IA 'pi'."
};

function changeAssistantName(newName) {
  defaultAssistantData.description = newName;
  console.log(`💎_pi lib groq-sdk: ${defaultAssistantData.description}`);
}

// Fonction fictive pour simuler la saisie utilisateur - à remplacer par votre propre implémentation
async function getUserInput(assistantData) {
  // Cette fonction doit être remplacée par votre logique de récupération de l'entrée utilisateur
  return new Promise((resolve) => setTimeout(() => resolve("quitter"), 1000)); // Simule l'entrée utilisateur "quitter" après 1 seconde
}

// Fonction pour modifier le nom de l'assistant
function changeAssistantName(newName) {
  defaultAssistantData.description = newName;
  console.log(`💎_pi lib groq-sdk: ${defaultAssistantData.description}`);
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  changeAssistantName(defaultAssistantData.description || "Bonjour, je suis votre assistant IA en Français.");

  let sessionActive = true;
  let userInput;

  while (sessionActive) {
    userInput = await getUserInput(defaultAssistantData);

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Switch pour le changement de persona
    if (userInput.toLowerCase().startsWith("/persona")) {
      const newPersona = userInput.toLowerCase().split("/persona ")[1];
      const personaFilePath = `./json/persona_${newPersona}.json`;

      // Vérifier si le fichier JSON de la nouvelle persona existe
      if (fs.existsSync(personaFilePath)) {
        // Charger les données de la nouvelle persona
        const newAssistantData = require(personaFilePath);
        changeAssistantName(newAssistantData.description);
        console.log(`Assistant: Changement de persona effectué. Nouvelle persona : ${newPersona}`);
        continue;
      } else {
        console.log(`Assistant: La persona ${newPersona} n'existe pas.`);
        continue;
      }
    }

    // Ajoutez ici d'autres commandes et leur logique associée selon vos besoins
         // Génération de réponses à l'aide de Groq SDK en fonction du rôle choisi
        try {
            const messages = [
                { role: "system", content: fillTemplate(messageTemplates.systemMessage, contextData) },
                { role: "assistant", content: fillTemplate(messageTemplates.assistantMessage, contextData) },
                { role: "user", content: fillTemplate(messageTemplates.userMessage, contextData) },
                { role: currentPersona, content: userInput }
            ];

            const chatCompletion = await groq.chat.completions.create({
                messages: messages,
                model: "mixtral-8x7b-32768",
                temperature: 0.6,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                stop: null
            });

            const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
            console.log(`🦉_pi : ${fullResponse}`);
        } catch (error) {
            console.error("Erreur lors de la génération de la réponse :", error);
        }
    }
}