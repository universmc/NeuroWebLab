const Groq = require('groq-sdk');

const groq = new Groq();

async function main() {
  console.log("Démarrage de la session des test");
const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "Tu es une IA spécialisée dans le développement web et la visualisation de données. Aide-nous à concevoir un Guide d'étate dit HOWTO interactif en utilisant Node.js emoji pour le backend swagger json/*.json, et bootstrap Timeline.js http://localhost:3010/api-docs/timeline pour une timeline interactive des projets. Utilise des emojis pour représenter les technologies et les étapes clés du devops web sementique w3C."
      },
      {
        "role": "user",
        "content": "Bonjour IA, j'ai besoin guide pour intégrer Timeline.js dans mes idée de streaming. Des suggestions ?"
      },
      {
        "role": "assistant",
        "content": "Bien sûr ! Considérez d'utiliser Timeline.js pour afficher votre parcours professionnel et vos projets. Chaque projet peut être représenté par un emoji spécifique, 🌐 pour les projets web, 💾 pour les projets backend, etc."
      },
      {
        "role": "system",
        "content": "Génération d'idées en cours..."
      },
      {
        "role": "user",
        "content": "tu es chatgpt tu intéragie avec nous dans ce projet addapte le script Myprompt avec les lib transfromer de huggingface pour service notre script initial"
      },
    ],
    "model": "mixtral-8x7b-32768", // Assurez-vous que ce modèle est disponible et que vous avez accès.
    "temperature": 0.8,
    "max_tokens": 2042,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  let fullResponse = ""; // Initialisation d'une variable pour stocker la réponse complète

  for await (const chunk of chatCompletion) {
    const content = chunk.choices[0]?.delta?.content || '';
    fullResponse += content; // Accumulation des fragments de texte dans la variable fullResponse
  }

  console.log("Réception de la réponse complète de l'IA : ", fullResponse); // Affichage de la réponse complète

  console.log("💻 Fin de la session de brainstorming[univers-mc.cloud].");
}

main().catch(console.error);  