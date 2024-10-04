const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {

  groq.chat.completions.create({
    messages: [
      {
        "role": "user",
        "content": "Write a JavaScript function to find the maximum number from an array of numbers."
},
      {
        "role": "assistant",
        "content": "```javascript\nfunction findMax(numbers) {\n"
}
    ],
    model: "gemma2-9b-it",
    stop: "```",
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
}).then((chatCompletion) => {
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath =
      "prefiling_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

main();
