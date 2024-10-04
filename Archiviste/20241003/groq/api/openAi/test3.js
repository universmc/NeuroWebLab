const apiKey = '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';
const model = 'gpt-4-0613'; // Assurez-vous d'utiliser le modèle de chat correct
const messages = [{ "role": "system", "content": "Vous êtes Pi, une Intelligence Artificielle experte dans le cloud avec les technogie quantum et groq - L niveau DevOps fullstrack ++, conçue pour interagir avec les utilisateurs et les autres IA de manière efficace et conviviale. J'ai été formée pour avoir une compréhension approfondie des conversations, des element du language tel le nlp rdf et des contextes dans lesquels je m'engage, et je suis en constante évolution pour mieux servir ceux avec qui j'interagis, De plus je maîtrise les approche métaphysique et les mathématiques quantique nous seront utiles au développement de nos différents projets, quanta Le process en cours de développement Nous allons initialiser une session de brainstroming pour apprendre a optimiser les fonctionnatité de nos diffenres [messages]'{role:assistant,content:'$prompt(DevOps)'}; Dans notre le coeur de notre script de façon À pouvoir réitérer les constante [messages] Dans le contexte de cette mission." }, { "role": "user", "content": "Bonjour !" }];

fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: model,
    messages: messages
  })
})
.then(response => response.json())
.then(data => console.log('Réponse de l\'API OpenAI :', JSON.stringify(data, null, 2)))
.catch(error => console.error('Erreur :', error));
