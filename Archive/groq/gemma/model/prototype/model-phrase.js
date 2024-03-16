const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'assistant', content: ' *💡* Idée géniale** 💻 : Trouver des idées originales et innovantes pour le développement de projet (📅 Gestion des ressources et de la capacité de l équipe 🕒).'}],
    model: 'mixtral-8x7b-32768',
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();