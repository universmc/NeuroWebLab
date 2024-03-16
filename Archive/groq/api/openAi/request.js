const groq_sdk = require('groq-sdk');
const openai = require('openai');

const groq = new groq_sdk();
const openai = new openai({ apiKey: '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' });

const roles = ["system", "assistant", "user"];

function generateSystemMessage() {
    // Générez un message pour le rôle système
}

function generateAssistantMessage() {
    // Générez un message pour le rôle assistant
}

function generateUserMessage() {
    // Générez un message pour le rôle utilisateur
}