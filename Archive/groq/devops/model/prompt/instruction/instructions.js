const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Lire les citations à partir du fichier JSON
const instustions = JSON.parse(fs.readFileSync("instustion.json", "utf-8"));

async function main(
) {
    // Sélectionnez aléatoirement une citation
const instruction = instuctions[Math.floor(Math.random() * instustion.length)];

    groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `instruction: "${insturstion.instruction}" - ${instruction.auteur}. Prompt généré par une intelligence artificielle: pi.`
},
            {
                role: "system",
                content: `Tu utilisera le format .md (markdown) pour écrire la citation et son plan de développement.`
},
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.2,
        max_tokens: 2048,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/instruction_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation générée et enregistrée dans " + outputFilePath);
    });
}

main();
