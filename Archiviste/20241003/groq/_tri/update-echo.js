const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
    groq.chat.completions.create({
        // Paramètres requis
        
        // Les messages constituent la conversation avec l'assistant. Ils définissent le contexte et la requête.
        messages: [
            // Définir un message système optionnel. Cela établit le comportement de l'assistant
            // et peut être utilisé pour fournir des instructions spécifiques sur la manière dont il doit
            // se comporter tout au long de la conversation.
            {
                role: "system",
                content: "GNous commencerons par développer la plateforme sur univers-mc.cloud en intégrant les services d'apprentissage automatique, de cartographie et de développement d'algorithmes d'application. Ensuite, nous créerons un système de mise en avant des compétences en utilisant des métadonnées pour les CV. Parallèlement, nous utiliserons Ethereum, Remix et Solidity pour créer et tester des contrats intelligents. Nous développerons également des algorithmes d'apprentissage automatique pour améliorer la précision des métadonnées des compétences et optimiser l'économie circulaire à l'aide des fonctionnalité emoji(exemple liste_fichiers=(✨, ⌚️, 📱, 💻, 🖥, 📺, 📻, 💾, 💿, 📀, 📷, 🔌, 💡, 📡, 🔋, 📺, 📽, 📸, 📹, 🎥, 📞, ☎️, 📠, 📺, 📻, 🎙, 🔦, 🕯, 🗑, 🛢, 💸, 💵, 💴, 💶, 💷, 💰, 💳, ⚽️, 🏀, 🏈, ⛳️, 🎾, 🛹, 🎸, 🎺, 🥁, 🎲, 🎬) de bien ou serveur sur le serveur UMC i.c.o) et nodejs parkage.json et des methode d'affinage prompting entre le [role: 'assistant' & role: 'user'], ,."
            },
            // Définir un message de l'assistant pour introduire la documentation ou la réponse.
            {
                role: "assistant",
                content: "guide nous sur toute les etapes ... jusqu'au Makefile update.md :"
            },
            // Définir un message de l'utilisateur pour lequel l'assistant doit répondre.
            {
                role: "user",
                content: "voici la liste des fichier update générer pour service le script Makefile: style.css for classic groq"
            },
            {
                role: "system",
                content: "make build all."
            }
        ],
        // Le modèle de langage qui générera la réponse.
        model: "mixtral-8x7b-32768",

        // Paramètres optionnels
        
        // Contrôle de l'aléatoire : diminuer le résultat pour avoir moins de complétions aléatoires.
        // À mesure que la température se rapproche de zéro, le modèle deviendra déterministe et répétitif.
        temperature: 0.9,
        // Le nombre maximum de jetons à générer. Les requêtes peuvent utiliser jusqu'à
        // 2048 jetons partagés entre l'invite et la complétion.
        max_tokens: 1024,
        // Contrôle de la diversité via l'échantillonnage du noyau : 0.5 signifie que la moitié de toutes les options
        // pondérées par la probabilité sont considérées.
        top_p: 1,
        // Une séquence d'arrêt est une chaîne de texte prédéfinie ou spécifiée par l'utilisateur qui
        // signale à l'IA de s'arrêter de générer du contenu, assurant que ses réponses
        // restent concentrées et concises. Des exemples incluent les marques de ponctuation et
        // des marqueurs comme "[fin]".
        stop: null,
        // Si défini, des deltas de messages partiels seront envoyés.
        stream: false
    }).then((chatCompletion)=>{
        // Imprime la complétion retournée par le modèle de langage.
        const cssContent = chatCompletion.choices[0]?.message?.content;
        // Définit le chemin du fichier de sortie où la documentation sera enregistrée.
        const outputFilePath = "output/update_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        // Écrit le contenu dans le fichier spécifié.
        fs.writeFileSync(outputFilePath, cssContent);
        // Affiche un message confirmant que la documentation a été générée et enregistrée.
        console.log("Documentation générée et enregistrée dans " + outputFilePath);
    });
}

main();
