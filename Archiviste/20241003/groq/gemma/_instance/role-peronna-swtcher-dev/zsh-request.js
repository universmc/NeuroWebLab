const fs = require("fs").promises;
const Groq = require("groq-sdk");
const groq = new Groq();

// Contenus pour les différents rôles dans le dialogue
const systemContent = "Présentation de 💎_pi: IA au cœur du systemDream ...";
const userContent = "bonjour : à toi 'pi' message role: (assistant et/ou système) groq"; 
const assistantContent = "Vous êtes une intelligence artificielle à haute potentialité pour trouvez des solutions à un probleme donné ...";

// Configuration initiale de l'assistant
const defaultAssistantData = {
  nom: 'assistant',
  description: "Bonjour, je suis votre assistant IA 'pi'."
};

// Fonction pour modifier le nom de l'assistant
function changeAssistantName(newName) {
  defaultAssistantData.description = newName;
  console.log(`💎_pig: ${defaultAssistantData.description}`);
}

// Fonction pour charger les données d'une nouvelle persona
async function loadPersonaData(personaName) {
  try {
    const data = await fs.readFile(`./srv/json/persona_${personaName}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lors du chargement de la persona ${personaName}:`, error);
    return null;
  }
}

// Fonction pour simuler la récupération d'entrée utilisateur
async function getUserInput(prompt) {
  console.log(prompt); 
  return new Promise(resolve => setTimeout(() => resolve("bonjour : à toi 'choice' message input js groq"), 1000)); // Simule une réponse utilisateur
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  changeAssistantName(defaultAssistantData.description);

  let sessionActive = true;
  let currentPersona = defaultAssistantData.nom;

  while (sessionActive) {
    const userInput = await getUserInput(`[${currentPersona}] Entrez votre message ou 'quitter' pour terminer :`);

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("💎_pi : Au revoir !");
      continue;
    }

    if (userInput.toLowerCase().startsWith("/persona ")) {
      const newPersona = userInput.split("/persona ")[1];
      const newAssistantData = await loadPersonaData(newPersona);

      if (newAssistantData) {
        changeAssistantName(newAssistantData.description);
        currentPersona = newAssistantData.nom;
        console.log(`💎_pi : Changement de persona effectué. Nouvelle persona : ${newPersona}`);
      } else {
        console.log(`Assistant: La persona ${newPersona} n'existe pas.`);
      }
      continue;
    }

    if (userInput.toLowerCase().startsWith("/role ")) {
      const newRole = userInput.split("/role ")[1];
      if (newRole === "assistant" || newRole === "system") {
        currentPersona = newRole;
        console.log(`Changement de rôle effectué. Nouveau rôle : ${newRole}`);
      } else {
        console.log(`Rôle non valide. Veuillez choisir "assistant" ou "système".`);
      }
      continue;
    }

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: userInput }, // Utilisation de l'entrée de l'utilisateur
          { role: "assistant", content: assistantContent }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.6,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
      console.log(`💎_pi : ${fullResponse}`);
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse :", error);
    }
  }
}

main().catch(console.error);
