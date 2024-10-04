const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Lire le à partir du fichier JSON

async function main(
) {

    groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "upload"
            },
            {
                role: "assistant",
                content: "devops"
            },
            {
                role: "user",
                content: "howto use groq Model gemma in .zshrc ps3_config.sh?"
            },
            
        ],
        model: "gemma-7b-it",
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/gemma_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Cette suggestions a était générée et enregistrée dans " + outputFilePath);
    });
}

main();
