const fs = require("fs");
const Groq = require('groq-sdk');
const { Telegraf } = require('telegraf');
const axios = require('axios');
const emoji = require('node-emoji');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Utilisation de Prompto comme nodule central
const nodule = process.argv[2] || 'EcoSystem-_Prompto'; // Argument de ligne de commande

// Liste des modules pour Prompto
const nodeJs = [
     "who-is-prompto",
     "howto-role",
     "howto-context"
];

async function main() {
  for (const nodule of nodeJs) {
    try {
      const completion = await groq.chat.completions.create({
      messages: [
        {role: "system", content: `Phase 0: Initialisation de Prompto pour la documentation du module ${nodule}`},
        { role: "user", content: `Je souhaite comprendre le rôle de Prompto et documenter le module ${nodule}.` },
        {role: "assistant", content: `Prompto est un modèle conçu pour optimiser les prompts et générer du contenu basé sur des rôles et des contextes. Dans l'écosystème nodulaire, voici comment nous allons documenter les éléments suivants : ${nodeJs}.
        
        1. **who-is-prompto** : Présentation du rôle et des capacités de Prompto.
        2. **howto-role** : Comment définir et interagir avec les différents rôles dans un projet utilisant Prompto.
        3. **howto-context** : Comment intégrer Prompto dans divers contextes et générer du contenu optimisé pour chaque situation.
        
        Ces modules sont cruciaux pour mieux comprendre la flexibilité et l'efficacité de Prompto en tant qu'agent IA dans l'écosystème nodulaire.`},
        { role: "user", content: nodule }
      ],
      model: "gemma2-9b-it",
      temperature: 0.6,
      max_tokens: 4096,
    }).then((chatCompletion) => {
      const mdContent = chatCompletion.choices[0]?.message?.content;
      const outputFilePath = `../build/make_${nodule}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
fs.writeFileSync(outputFilePath, mdContent);
      console.log(`Le How-To sur ${nodule} a été enregistré dans ${outputFilePath}`);       
    });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}
}
main();
