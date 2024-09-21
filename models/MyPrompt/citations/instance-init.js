const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Charger les fichiers JSON de rôles Groq
const rolesSystem = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-system.json'), 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-assistant.json'), 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-user.json'), 'utf8'));


async function main() {
    groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            {role: "system", name:"systemDream",content:"phase1:initialisation de l'instance"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1:Conceptualisation"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1:Configuration"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1: entraînement modèle IA"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1: Itération & Des scripts Frontend"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1: Itération & Des scripts Frontend"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1: Test & Debugage"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1: Validation & Documentation"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1: Deployement system Version"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
            {role: "system", name:"systemDream",content:"phase1: Annonce affiliation contribution"},
            {role: "assistant",name:"✨_pi", content: "init"},
            {role: "user",name:"umcTokens", content: ""},
        ],
        // The language model which will generate the completion.
        model: "mixtral-8x7b-32768",
        //
        // Optional parameters
        
        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.5,
        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 1024,
        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,
        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,
        // If set, partial message deltas will be sent.
        stream: false
    }).then((chatCompletion)=>{
        // Print the completion returned by the LLM.
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/docs(✨_pi)_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation généré et enregistré dans " + outputFilePath);
    });
}
main();
