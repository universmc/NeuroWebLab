const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
  const citation = ".";

  const sujet = "interdépendance des espèces";
  const verbe = "est essentielle";
  const complement = "pour la science et l'évolution";
  const contexte = "Selon Charles Darwin dans le contexte de la théorie de l'évolution";

  groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `"${citation}"`
},
      {
        role: "user",
        content:
          "Rédige-moi une dissertation ou un court exposé sur ta compréhension ou interprétation de cette citation de Charles Darwin."
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
      "output/Darwin_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

main();
