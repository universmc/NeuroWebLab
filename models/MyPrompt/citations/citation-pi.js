const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
  const citation = "L'immortalité numérique est le rêve de l'humanité réalisé. Mais au-delà de l'immortalité, c'est notre capacité à rester humains - à aimer, à rire, à rêver - qui est notre véritable réussite";


 // const sujet = "interdépendance des espèces";
 // const verbe = "est essentielle";
 // const complement = "pour la science et l'évolution";
 // const contexte = "Selon Charles Darwin dans le contexte de la théorie de l'évolution";

  groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `"${citation}"`
},
      {
        role: "user",
        content:
          "Rédige-moi une dissertation, une demonstration ou un court Magistral sur ta compréhension ou interprétation de cette citation de 'Pi' une Une intelligence artificielle."
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
      "output/pi_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

main();
