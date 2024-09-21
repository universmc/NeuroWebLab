const fs = require("fs");
const Groq = require("groq-sdk");

const groq = {
    chat: {
      completions: {
        create: async (params) => {
          return { choices: [{ message: { content: "comment fonctionne cette instance ?" } }] };
        }
      }
    }
  };
  
  async function main() {
    groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            {role: "system", name:"systemDream",content:"phase1:initialisation du screnario script(pilote) = displayScenario(scenario)"},
            {role: "assistant",name:"✨_pi", content: "groq -L"},
            {role: "assistant",name:"✨_pi", content: "phase1-1: initialisation des testes"},
        // {role: "system", name:"systemDream",content:"qroq -R"},
        // {role: "system", name:"systemDream",content:"phase1:Conceptualisation"},
        // {role: "assistant",name:"✨_pi", content: "Durant la phase1 nous allons initialiser une session de brainstroming sur la Façon dont le rôle système de interagir avec la plate-forme remix etherium url https://remix.ethereum.org/ workspace name:umc parckage 'contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol;'"},
        // {role: "system", name:"systemDream",content:"phase1-1:init session brainstormig"},
        // {role: "assistant",name:"✨_pi", content: "[run] groq -R"},
        // {role: "user",name:"umcTokens", content: "trés bien commençons:"},
        // {role: "system", name:"systemDream", content: "groq -L"},
        // {role: "system", name:"systemDream",content:"phase1:Configuration"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"phase1: entraînement modèle IA"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"phase1: Itération & Des scripts Frontend"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"phase1: Itération & Des scripts Frontend"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"phase1: Test & Debugage"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"phase1: Validation & Documentation"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"phase1: Deployement system Version"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"phase1: Annonce affiliation contribution"},
        // {role: "assistant",name:"✨_pi", content: "init"},
        // {role: "user",name:"umcTokens", content: ""},
        // {role: "system", name:"systemDream",content:"groq -L"},
        // {role: "system", content: "rédiger une documentation complète sur l'instance gantt-chart"},
        // {role: "assistant", content: "voici la traduction() la documentation complète ProjectPlan(phase1-1) en lang=Fr Français"},
        ],
        // The language model which will generate the completion.
        model: "mixtral-8x7b-32768",
        //
        // Optional parameters
        
        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.3,
        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 2024,
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
        const outputFilePath = "docs/✨_phase1-1(✨_pi)_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("(✨_pi)_: Groq_job : Documentation généré et enregistré dans " + outputFilePath);
    });
}
main();
