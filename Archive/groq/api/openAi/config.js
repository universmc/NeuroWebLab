// OpenAI API token access
const apiKey = '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';
// Utilisation de l'URL pour les complétions, comme exemple d'utilisation basique de l'API GPT
const baseURL = 'https://api.openai.com/v1/completions';

// Headers avec la clé API
const headers = new Headers({
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
});

// Le message à envoyer et la configuration du modèle
const data = {
  "model": "gpt-4", // Remplacez par le modèle de votre choix
  "prompt": "Hello, I'm an AI assistant. How can I help you?",
  "temperature": 0.7,
  "max_tokens": 150
};

// Requête Fetch
fetch(baseURL, {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => console.log('Response data:', data))
.catch(error => console.error('Error:', error));