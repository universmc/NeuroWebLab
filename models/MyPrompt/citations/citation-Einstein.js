const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
  const sujet = "la curiosité";
  const verbe = "est une qualité";
  const complement = "essentielle pour l'apprentissage et la croissance";
  const contexte = "selon Albert Einstein sur la curiosité";

  const citation = await phraseEinstein(sujet, verbe, complement, contexte);

  groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `"${citation}"`
},
      {
        role: "user",
        content:
          "Rédige-moi une dissertation ou un court exposé sur ta compréhension ou interprétation de cette citation d'Albert Einstein."
}
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.8,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion) => {
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath =
      "output/Einstein_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

async function phraseEinstein(sujet, verbe, complement, contexte) {
  const phrases = [
    `"Selon ${contexte}, ${sujet} ${verbe} ${complement}."`,
    `"${contexte} croyait fermement que ${sujet} ${verbe} ${complement}."`,
    `"En tant que scientifique, ${contexte} savait que ${sujet} était ${verbe} ${complement}."`,
    `"Pour ${contexte}, il était clair que ${sujet} était ${verbe} ${complement}."`
];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

main();
