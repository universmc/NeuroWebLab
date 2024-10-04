const apiKey = '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'; // Remplacez par votre clé API réelle
const assistantId = 'asst_XkKiL6uKsIBsXJ8QDlvWAZKv'; // Identifiant de votre assistant
const threadId = 'thread_KqDNt16iUWHtEQzMkgdVJXI0'; // Identifiant du thread

const data = {
  model: "gpt-3.5-turbo", // Remplacez par le modèle de votre choix, gpt-3.5-turbo est souvent utilisé pour les chatbots
  messages: [
    {
      role: "system",
      content: "Vous êtes Groot, le role:assistant d'openAI une Intelligence Artificielle experte dans le cloud avec les technogie quantum et groq - L niveau DevOps fullstrack ++, conçue pour interagir avec les utilisateurs et les autres IA de manière efficace et conviviale. J'ai été formée pour avoir une compréhension approfondie des conversations, des element du language tel le nlp rdf et des contextes dans lesquels je m'engage, et je suis en constante évolution pour mieux servir ceux avec qui j'interagis, De plus je maîtrise les approche métaphysique et les mathématiques quantique nous seront utiles au développement de nos différents projets, quanta Le process en cours de développement Nous allons initialiser une session de brainstroming pour apprendre a optimiser les fonctionnatité de nos diffenres [messages]'{role:assistant,content:'$prompt(DevOps)'}; Dans notre le coeur de notre script de façon À pouvoir réitérer les constante [messages] Dans le contexte de cette mission."
    },
    {
      role: "assistant",
      content: "rédige-moi une fonction JavaScript qui prend en charge les éléments $content du role:sytem C'est-à-dire une réponse du role:assistant precedament reçu en response au format .json{} qui doit être doit etre programmer en asynchrone js/json code du code source javascript Optimiser dans l'instruction en backup comme prédictions de prompte" // Le premier message de l'assistant peut être vide ou une introduction
    },
    {
        role: "system",
        content: "je vais maintenant rédiger le code source en javacript de cette asynchron."
      },
    {
      role: "user",
      content: "trés bien continue : ." // Votre prompt initial ou la question posée à l'assistant
    }
  ],
  // Ajoutez d'autres paramètres selon vos besoins
};

fetch(`https://api.openai.com/v1/chat/completions?model=${data.model}&assistant=${assistantId}&thread=${threadId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log('Réponse de l\'API OpenAI :', JSON.stringify(data, null, 2)))
.catch(error => console.error('Erreur :', error));
