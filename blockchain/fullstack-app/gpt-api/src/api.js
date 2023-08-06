const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

(async () => {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  const history = [];

  const material = "Titanium chloride";
  const field = "food";

  while (true) {
    const userInput = `harms and benefits of ${material} in the ${field} field`;
    const messages = [];
    for (const [inputText, completionText] of history) {
      messages.push({ role: "user", content: inputText });
      messages.push({ role: "assistant", content: completionText });
    }
    messages.push({ role: "user", content: userInput });

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });
      const completionText = completion.data.choices[0].message.content;
      console.log(completionText);
      history.push([userInput, completionText]);

      const userInputNew = readlineSync.question("\nWould you like to continue the conversation? (Y/N)");
      if (userInputNew.toUpperCase() === "N") {
        return;
      } else if (userInputNew.toUpperCase() !== "Y") {
        console.log("Invalid input");
        return;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
})();
