const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Liste de citations prédéfinies
const instruction = [
    {
        "instruction": "génère-moi un tutoriel sur L'utilisation de la technologie groq forme de guide d'étape!",
        "auteur": "Pi 3,14"
    }
    // Ajoutez plus de citations ici...
];

async function main(
) {

    groq.chat.completions.create({
        messages:  [
            {
                role: "system",
                content: `instruction: "${instruction.instruction}" - ${instruction.auteur}. Prompt généré par une intelligence artificielle: pi.`
            },
            {
                role: "assistant",
                content: `Étape 1: Définir les objectifs de la tâche.`
            },
            {
                role: "assistant",
                content: `Étape 2: Recueillir les données et les informations nécessaires.`
            },
            {
                role: "assistant",
                content: `Étape 3: Planifier les étapes du travail.`
            },
            {
                role: "assistant",
                content: `Étape 4: Commencer à travailler sur chaque étape, en faisant des pauses si nécessaire.`
            },
            {
                role: "assistant",
                content: `Étape 5: Vérifier le travail effectué et corriger les erreurs si nécessaire.`
            },
            {
                role: "assistant",
                content: `Étape 6: Présenter le travail terminé et demander un retour si nécessaire.`
            },
            {
                role: "assistant",
                content: `Tu utiliseras le format .md (markdown) pour écrire la citation et son plan de développement.`
            },
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.4,
        max_tokens: 2048,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/bitbot_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation généré et enregistré dans " + outputFilePath);
    });
}

main();