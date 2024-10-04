const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
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
});

  if (chatCompletion.choices[0]) {
    const response = chatCompletion.choices[0].delta?.content;
    if (response) {
      console.log(response);
    } else {
      console.log('No response');
    }
  } else {
    console.log('No choices available');
  }
}

main();
