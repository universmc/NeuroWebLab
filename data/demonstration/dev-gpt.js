import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {"role": "system", "content": "You are a helpful assistant streaming."},
      {"role": "user", "content": "Help openAi stream:true model gpt-4o!"}
    ],
    stream: true,
  });

  for await (const chunk of completion) {
    console.log(chunk.choices[0].delta.content);
  }
}

main();