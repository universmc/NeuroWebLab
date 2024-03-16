const { Gemma } = require('@googleapis/gemma');
const gemma = new Gemma({
  projectId: 'hale-function-276418',
  keyFilename: 'path/to/your/service-account-key.json',
});

async function main(
) {
  const result = await gemma.sendQuery({
    text: 'your query here',
    languageCode: 'en-US',
    sessionId: 'unique-session-id',
  });
  console.log(result);
}

main();
