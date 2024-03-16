async function processResponse(response) {
    try {
        let data = JSON.parse(response);

        // Processing metadata
console.log("ID:", data.id);
        console.log("Object:", data.object);
        console.log("Created:", data.created);
        console.log("Model:", data.model);
        console.log("System Fingerprint:", data.system_fingerprint);

        // Processing choices
data.choices.forEach(choice => {
            console.log("Index:", choice.index);
            console.log("Role:", choice.message.role);
            console.log("Content:", choice.message.content);
            console.log("Logprobs:", choice.logprobs);
            console.log("Finish Reason:", choice.finish_reason);
        });

        // Processing usage
console.log("Prompt Tokens:", data.usage.prompt_tokens);
        console.log("Completion Tokens:", data.usage.completion_tokens);
        console.log("Total Tokens:", data.usage.total_tokens);

        return "Data processing completed successfully.";
    } catch (error) {
        return "An error occurred while processing the data: " + error.message;
    }
}
