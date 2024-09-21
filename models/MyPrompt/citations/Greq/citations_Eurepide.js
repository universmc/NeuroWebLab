const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
  const citation = "ὅ τι ἂν ἔλθῃ, θάρσει";

 const sujet = "ὅ τι";
 const verbe = "ἔλθῃ";
 const complement = "θάρσει";
 const contexte = "Cours lang:Greq";

 const citation_Euripide = `${sujet} ${verbe} ${complement}. ${contexte}`;

  groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `"${citation_Euripide}"`
      },
      {
        role: "assistant",
        content:
          "Rédige-moi une dissertation, une demonstration ou un Cours Margistal sur compréhension ou interprétation de la Metaphisique introduit par 'Pi' Une intelligence artificielle sur la citation_Euripide.js: `ὅ τι ἂν ἔλθῃ, θάρσει` - `Sois courageux, quoi qu'il advienne`.La citation d'Euripide 'ὅ τι ἂν ἔλθῃ, θάρσει' (Sois courageux, quoi qu'il advienne) vient de sa pièce 'Héraclès' (en grec ancien : Ἡρακλῆς μαινόμενος). Euripide a écrit cette pièce autour de l'an 421 av. J.-C., mais il est important de noter que la date exacte de sa création pourrait varier légèrement selon les sources.TimeStamp.unix"
      },
      {
        role: "user",
        content:"Mike: Traduit en lang:Fr au format & stylus Markdown!"
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
      "data/Euripide_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

main();
