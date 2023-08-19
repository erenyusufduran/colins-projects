const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

(async () => {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  const material = "Titanium chloride";
  const field = "food";

  const userInput = `harms and benefits of ${material} in the ${field} field`;
  const messages = [];
  messages.push({ role: "user", content: userInput });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    const completionText = completion.data.choices[0].message.content;
    const textArr = completionText.split("+");
    let benefits, harms;
    textArr.forEach((element, i) => {
      benefits = element.includes("Benefits") && i;
      harms = element.includes("Harms") && i;
    });

    console.log(benefits, harms);
    textArr[benefits];

    console.log(completionText);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
})();
