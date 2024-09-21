const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Liste de citations prédéfinies
const instructions = {
    "génère-moi un tutoriel sur L'utilisation de la technologie groq forme de guide d'étape!": {
        auteur: "Pi 3,14",
        assistantRole: "tutoriel",
        steps: [
            {
                role: "assistant",
                content: `Étape 1: Définir les objectifs de la tâche.`
            },
            {
                role: "assistant",
                content: `Étape 2: Recueillir les données et les informations nécessaires.`
            },
            // ...
]
    },
    // ...
};

async function sendRequestToGroq(instruction) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `instruction: "${instruction.instruction}" - ${instruction.auteur}. Prompt généré par une intelligence artificielle: pi.`
},
            {
                role: `assistant_${instruction.assistantRole}`,
                content: `Étape 1: ${instruction.steps[0].content}`
},
            {
                role: `assistant_${instruction.assistantRole}`,
                content: `Étape 2: ${instruction.steps[1].content}`
},
            // ...
],
        model: "mixtral-8x7b-32768",
        temperature: 0.4,
        max_tokens: 2048,
        top_p: 1,
        stop: null,
        stream: false
});
    return chatCompletion;
}

async function writeToFile(content) {
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "output/bitbot_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation généré et enregistré dans " + outputFilePath);
}

async function main(
) {
    const instruction = instructions[Object.keys(instructions)[0]];
    const chatCompletion = await sendRequestToGroq(instruction);
    writeToFile(chatCompletion[0].text);
}

main();