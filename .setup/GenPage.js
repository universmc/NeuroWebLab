const OpenAI = require("openai");
const openai = new OpenAI();
const Groq = require("groq-sdk");
const groq = new Groq();
const axios = require("axios");
const fs = require("fs");

const config = {
  imagePrompts: {
    wirefram_single_Page: "A clean, minimalist wireframe for a single-page website layout, with a clear focus on user experience, including navigation bar, hero section, content areas, and footer.",
    wirefram_single_bootstrap: "A wireframe for a website built using Bootstrap, showcasing a structured layout with a responsive grid, navigation bar, hero section, content areas, and footer.",
    wirefram: "A multi-page wireframe layout for a website, showing the homepage, about page, services, and contact sections, emphasizing navigation and user flow.",
    prototype: "A dynamic website prototype that demonstrates transitions, animations, and interactivity for key pages like homepage, services, and contact.",
    navigation: "A responsive and interactive navigation menu layout for a multi-page website, including hover effects, dropdowns, and smooth transitions.",
    page_content_layout: "A structured content layout for a webpage, including headings, paragraphs, images, and interactive elements, with a focus on readability and user engagement."
  },
  documentationPrompts: {
    how_to_wireframe: "This guide explains how to create a wireframe for a single-page website, covering layout, navigation structure, and user experience optimization.",
    how_to_prototype: "This guide walks you through the steps to create a website prototype, detailing interactivity, transitions, and design elements.",
    how_to_navigation_menu: "A detailed guide on building a responsive navigation menu, including dropdowns and hover effects, ensuring smooth user experience across devices.",
    how_to_content_layout: "This guide describes how to structure and design the content for a webpage, focusing on layout, typography, and user engagement."
  }
};

// Fonction pour générer des images avec OpenAI
async function generateImage(subject) {
  try {
    const prompt = config.imagePrompts[subject];
    if (!prompt) {
      console.error(`No prompt found for the subject: ${subject}`);
      return null;
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",
    });

    const imageUrl = response.data[0].url;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const date = new Date().toISOString().split('T')[0];
    const fileName = `../build/image_${subject}_${date}.webp`;
    fs.writeFileSync(fileName, imageResponse.data);

    console.log(`Image for ${subject} saved as ${fileName}`);
    return fileName;
  } catch (error) {
    console.error("Error generating or saving the image:", error);
    return null;
  }
}

// Fonction pour générer de la documentation avec Groq-SDK
async function generateDocumentation(subject) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: `Generating a How-To guide for ${subject}...` },
      ],
      model: "gemma2-9b-it",
      temperature: 0.5,
      max_tokens: 4096,
    });

    const mdContent = completion.choices[0]?.message?.content;
    const outputFilePath = `../build/how-to_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
    fs.writeFileSync(outputFilePath, mdContent);

    console.log(`How-To documentation for ${subject} saved as ${outputFilePath}`);
    return mdContent;
  } catch (error) {
    console.error("Error generating documentation:", error);
    return null;
  }
}

// Fonction pour générer le fichier HTML
async function generateHTML(subject) {
  try {
    const imageFileName = await generateImage(subject);
    const documentation = await generateDocumentation(subject);
    
    if (!imageFileName || !documentation) {
      console.error("Failed to generate HTML due to missing image or documentation.");
      return;
    }

    const title = `How-To Guide and Image for ${subject}`;
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; }
      .container { max-width: 800px; margin: 0 auto; padding: 20px; }
      .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
      .image-container { text-align: center; margin-bottom: 20px; }
      img { max-width: 100%; height: auto; }
      .description { font-size: 16px; line-height: 1.5; }
      .how-to { background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
      nav { background-color: #333; padding: 10px; margin-bottom: 20px; }
      nav a { color: white; text-decoration: none; padding: 10px; display: inline-block; }
      nav a:hover { background-color: #555; }
    </style>
</head>
<body>
  <div class="container">
    <div class="title">${title}</div>

    <!-- Menu de navigation -->
    <nav>
      <a href="#wireframe">Wireframe</a>
      <a href="#prototype">Prototype</a>
      <a href="#navigation">Navigation</a>
      <a href="#content">Content Layout</a>
    </nav>

    <div class="image-container">
      <img src="${imageFileName}" alt="${subject}">
    </div>
    
    <div class="description">
      <p><strong>Description :</strong> ${config.imagePrompts[subject]}</p>
    </div>

    <div class="how-to">
      <h2>Guide How-To</h2>
      <pre>${documentation}</pre>
    </div>
  </div>
</body>
</html>
    `;

    const htmlFileName = `../build/${subject}_howto_${new Date().toISOString().replace(/[-:TZ]/g, "")}.html`;
    fs.writeFileSync(htmlFileName, htmlContent);
    console.log(`HTML file for ${subject} saved as ${htmlFileName}`);
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

// Fonction principale pour orchestrer les différentes étapes
async function main() {
  const subject = process.argv[2] || 'wirefram';
  
  // Appel des différentes étapes dans l'ordre
  await generateHTML(subject);
  
  // Incorporation de Prompto dans le processus
  console.log(`Prompto has supervised the process for ${subject}`);
}

main();
