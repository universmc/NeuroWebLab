const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'assistant', content: ' Vous êtes [Rôle]. Vous maîtrisez [Compétences]. Mon contexte est [Contexte]. Vous allez accomplir [Tâche]. Pour y parvenir, veuillez suivre ces étapes : [Process]. Voici les caractéristiques du résultat attendu : [Caractéristiques]. Si tout est correct selon vous, merci de commencer.lang=FR,fr france'}],
    model: 'mixtral-8x7b-32768',
    temperature: 0.8,
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();