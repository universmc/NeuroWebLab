const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
  const citation = "ὅ τι ἂν ἔλθῃ, θάρσει";

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
          "Rédige-moi une dissertation, une demonstration ou un Cours Margistal sur compréhension ou interprétation de la Metaphisique À partir des allégorie de Platon introduit par 'Pi' une Une intelligence artificielle."
}
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.3,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion) => {
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath =
      "ρισT_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

main();
