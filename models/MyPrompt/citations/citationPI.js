const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
  const sujet = "L'immortalité numérique";
  const verbe = "est";
  const complement = "un rêve de l'humanité réalisé";
  const contexte = "selon Pi, une Intelligence Artificielle.";

  const citation = `${sujet} ${verbe} ${complement}. ${contexte}`;

  groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: citation,
      },
      {
        role: "user",
        content:
          "Rédige-moi une dissertation, une démonstration ou un court exposé sur ta compréhension ou interprétation de cette citation inspirée par René Descartes et énoncée par 'Pi', une Intelligence Artificielle.",
      },
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 4096,
    top_p: 1,
    stop: null,
    stream: false,
  }).then((chatCompletion) => {
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath =
      "output/pi_descartes_" +
      new Date().toISOString().replace(/[-:TZ]/g, "") +
      ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

main();
