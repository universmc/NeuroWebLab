const fs = require('fs');
const groq = require('groq-sdk');

async function generateResponse(inputFilePath, outputFilePath) {
  try {
    // Initialize the Groq client
    const client = new groq.Client({
      apiKey: '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',
      apiBaseUrl: 'https://groq.com/'
    });

    // Read the contents of the input file
    const inputContent = fs.readFileSync(inputFilePath, 'utf-8');

    // Define the Groq query
    const query = `
      {
        "model": "mixtral-8x7b-32768",
        "temperature": 0.5,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null,
        "input": $inputContent
      }
    `;

    // Define the Groq variables
    const variables = {
      inputContent
    };

    // Execute the Groq query
    const response = await client.request(query, variables);

    // Write the response to the output file
    fs.writeFileSync(outputFilePath, response, 'utf-8');

    console.log(`Generated response written to ${outputFilePath}`);
  } catch (error) {
    console.error(error);
  }
}

// Example usage
generateResponse('input/corpus.txt', 'output/response-date.md');