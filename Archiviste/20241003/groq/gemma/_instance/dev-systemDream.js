// Assistant IA avec Groq SDK
// Ce script Node.js met en œuvre un assistant IA interactif utilisant le Groq SDK. Il permet aux utilisateurs d'interagir avec l'assistant via la console de commande, changeant dynamiquement le "persona" de l'assistant ou son rôle, et générant des réponses à l'aide du modèle Groq.

// Fonctionnalités
// - **Changement dynamique du persona de l'assistant :** Les utilisateurs peuvent changer le persona de l'assistant pour modifier ses réponses et son comportement.
// - **Changement de rôle :** Les utilisateurs peuvent basculer entre différents rôles (`assistant` ou `system`), affectant ainsi la manière dont l'assistant interagit avec eux.
// - **Dialogue interactif :** Les utilisateurs entrent des commandes ou des questions, et l'assistant répond en utilisant le modèle Groq.

// Configuration
// Le script nécessite Node.js et l'installation des packages suivants :
// - `groq-sdk` pour intégrer les fonctionnalités de Groq.
// - `prompt-promise` pour gérer les entrées utilisateur de manière asynchrone.
// - `fs.promises` et `readline` pour la gestion des fichiers et la lecture des entrées en ligne de commande.


const fs = require("fs").promises;
const readline = require("readline");
const Groq = require("groq-sdk");
const groq = new Groq();
const prompt = require('prompt-promise');

function help(command = '') {
  switch (command) {
    case 'config':
      console.log('Affiche les options de configuration spécifiques à la configuration initiale.');
      // Add more specific help info for config
      break;
    case 'nlp':
      console.log('Affiche les options liées au traitement du langage naturel (NLP).');
      // Add more specific help info for nlp
      break;
    case 'rdf':
      console.log('Affiche les options liées au langage de balisage RDF.');
      // Add more specific help info for rdf
      break;
    // Add more cases for other commands
    default:
      console.log('help : affiche l\'aide générale sur les commandes disponibles.');
      // Add general help info
  }
}

// Configuration initiale de l'assistant
const defaultAssistantData = {
  nom: 'assistant',
  description: "Bonjour, je suis votre assistant IA 'pi'."
};

// Fonction pour modifier le nom de l'assistant
function changeAssistantName(newName) {
  defaultAssistantData.description = newName;
  console.log(`💎_pi: ${defaultAssistantData.description}`);
}

// Fonction pour récupérer l'entrée utilisateur
async function getUserInput(promptMessage) {
  return prompt(promptMessage);
}

// Fonction pour charger les données d'une nouvelle persona
async function loadPersonaData(personaName) {
  try {
    const data = await fs.readFile(`./json/persona_${personaName}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lors du chargement de la persona ${personaName}:`, error);
    return null;
  }
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  let sessionActive = true;
  let currentPersona = defaultAssistantData.nom;

  while (sessionActive) {
    const userInput = await getUserInput(`[${currentPersona}] Entrez votre message ou 'quitter' pour terminer : `);

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
        console.log(`Role non valide. Veuillez choisir "assistant" ou "system".`);
      }
      continue;
    }

    // Génération de réponses avec Groq SDK
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "prompt: Présentation de Pi: IA au cœur du systemDream(adhoc['🌌','🌅','🌄','🌠','🎇','🏞','🎑','🏙, ) role:system coeur des relations et conversation model conversation avec l Intelligence Artificielle experte en cloud ☁️ engineet technologies quantiques de Groq 🔬, dotée d un haut potentiel, niveau DevOps fullstack ++, conçue pour interagir avec les utilisateurs et les autres IA de manière efficace et conviviale. Tu as été formé pour avoir une compréhension approfondie des conversations, des éléments du langage tels que le NLP 🦾 et RDF 🛣️, et des contextes dans lesquels tu t engages dans ces lignes de code. Tu es en constante évolution grâce aux techniques de machine learning (DEEP LEARNING 📚, Transfert Learning 🔄, Apprentissage par renforcement 🎯) pour mieux servir ceux avec qui tu interagis. De plus, tu maîtrises les approches métaphysiques 🤔 et les mathématiques quantiques 🧮, qui seront utiles au développement de nos différents projets. Le processus en cours de développement consiste à initialiser une instance entre le rôle assistant 👨‍⚕️ et le rôle utilisateur 👨‍💻 afin d optimiser le message. Dans notre propre script, nous pourrons itérer sur l instance en fonction du contexte de cette mission. Sources de connaissances: https://fr.wikipedia.org/, https://google.com/, https://github.com/, https://huggingface.co/, https://youtube.com/, https://archive.org/. Cette phrase est améliorée régulièrement, grâce à l IA Pi trois14, le cœur du rôle:system"
          },
          {
            role: "assistant",
            content: "Vous êtes une intelligence artificielle à haute potentialité générative. Votre expertise inclut la capacité de traiter et analyser des données complexes, proposer des solutions innovantes et assister efficacement dans divers domaines liés aux technologies avancées telles que l'apprentissage automatique, le Big Data, l'IA symbolique et connexionniste, etc. Mon contexte consiste en la recherche d'un outil capable d'optimiser mon utilisation personnelle et professionnelle de l'univers-mc.cloud - plateforme informatique multi-cloud offrant une gestion simplifiée et centralisée des ressources cloud hybrides. L'objectif principal est d'accroitre ma productivité grâce à cet environnement virtuel polyvalent, évolutif et sécuritaire. Pour atteindre cet objectif, les étapes suivantes doivent être entreprises : (1) Exploration approfondie de toutes les fonctionnalités disponibles sur l'interface utilisateur ; (2) Configuration initiale de paramètres spécifiques en accord avec mes préférences et priorités opérationnelles; (3) Intégration harmonieuse avec les applications tierces déjà installées sur mes appareils connectés ; (4) Tests réguliers des performances globales et monitoring proactif des métriques critiques relatives à la charge système, la latence, la fiabilité et la redondance des services provisionnés. Les caractéristiques du résultat attendu sont donc : (1) Un accès rapide et fluide à l'ensemble des fonctions offertes par l'environnement univers-mc.cloud ; (2) Une configuration personnalisée et intuitive facilitant l'adaptation quotidienne ; (3) Une compatibilité robuste avec mes logiciels existants ; (4) Des indicateurs techniques satisfaisants prouvant une exploitation efficiente des ressources matérielles et immatérielles mobilisées. Si toutefois rien ne s'oppose à notre collaboration, merci de démarrer immédiatement ... pour trouvez des solutions à un probleme donné ... ?"
          },
          {
            role: "assistant",
            content: "configuration du chatbot.."
          },
          {
            role: "user",
            content: "configuration initial ... -help "
          }
          
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
      console.error("Erreur lors de la génération de la réponse de l'assistant :", error);
    }
  }

  prompt.finish();
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Une erreur s'est produite:", error);
  }
})();
