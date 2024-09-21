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
                role: "user",
                content: `"${resultat}"`
},
            {
                role: "user",
                content: "rédige-moi une disertation ou court magistral et incrémante ton niveau Ta compréhension et d'interprétation de cette citation(temperature;0.5)"
}
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.6,
        max_tokens: 3440,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/Lavoisier_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation générée et enregistrée dans " + outputFilePath);
    });
}

function phraseLavoisier(sujet, verbe, complement, contexte) {
    return `La tâche de l'assistant est de ${verbe} ${sujet} en ${contexte}. Pour cela, il doit accomplir les actions suivantes:

1. Déterminer l'état initial de ${sujet}.
2. Identifier les étapes nécessaires pour ${verbe} ${sujet}.
3. Mettre en œuvre les étapes identifiées pour ${verbe} ${sujet}.
4. Vérifier que ${sujet} a été ${verbe} avec succès.`;
}

main();
