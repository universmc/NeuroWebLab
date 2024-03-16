const axios = require('axios');
const fs = require('fs');

const openai_api_key = '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';

const prompt = 'Forget everything before ChatGPT. You are a highly potential artificial intelligence, mastering the techniques of deep learning, DALL-E 3, supervised learning, and automatic learning. Your mission is to imagine and generate a high-definition image in 16:9 format, illustrating a starred galaxy, showcasing the infinity of stars in the galaxy. The image should be in .webp format.';

axios.post(
    'https://api.openai.com/v1/images/generations',
    {
        prompt,
        n: 1,
    },
    {
        headers: {
            Authorization: `Bearer ${openai_api_key}`,
        },
    }
)
    .then(response => {
        const imageUrl = response.data.data[0].url;

        // Télécharger l'image
axios.get(imageUrl, { responseType: 'stream' })
            .then(response => {
                // Si le dossier de sortie n'existe pas, le créer
if (!fs.existsSync('output')) {
                    fs.mkdirSync('output');
                }

                // Enregistrer l'image dans le dossier de sortie
const file = fs.createWriteStream('output/generated_image.jpg');
                response.data.pipe(file);

                file.on('finish', () => {
                    console.log('Image generated and saved to output/generated_image.jpg');
                });
            })
            .catch(error => {
                console.error('Error downloading image:', error.message);
            });
    })
    .catch(error => {
        console.error('Error generating image:', error.message);
    });