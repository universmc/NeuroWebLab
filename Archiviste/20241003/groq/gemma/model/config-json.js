const fs = require('fs').promises;
const groq = require('groq').parser;

const files = ['config1.json', 'config2.json', 'config3.json'];

const readFile = (file) => fs.readFile(file, 'utf8');

const processFiles = async (
) => {
  const contents = await Promise.all(files.map(readFile));
  const messages = {};
  for (const [index, content] of contents.entries()) {
    const config = groq.parse(content);
    for (const [key, value] of config.entries()) {
      messages[key] = {content: value.toString()};
    }
  }
  console.log(JSON.stringify({messages}, null, 2));
};

processFiles();
