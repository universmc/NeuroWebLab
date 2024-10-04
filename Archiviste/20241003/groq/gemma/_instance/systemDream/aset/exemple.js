const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
    const sujet = "Rien";
    const verbe = "ne se perd";
    const complement = "rien ne se crée";
    const contexte = "tout se transforme";

    const resultat = phraseLavoisier(sujet, verbe, complement, contexte);

    groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Génère Une documentation sur resultat = "${resultat}". Citation: "${sujet} ${verbe}, ${complement}, ${contexte}". Ou ${sujet} ne se trouve être illustré par une phrase, commençant par une majuscule et se termine par un. Prompt généré par une intelligence artificielle.`
},
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/dev_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation généré et enregistré dans " + outputFilePath);
    });
}

function phraseLavoisier(sujet, verbe, complement, contexte) {
    return `${sujet} ${verbe}, ${complement}, ${contexte}.`;
}

main();
