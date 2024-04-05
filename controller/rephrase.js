const { OpenAI } = require("openai");
const langdetect = require("langdetect");

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

const rephraseSentence = async (request, response) => {
    try {
        const { prompt } = request.body;
        const detectedLanguage = langdetect.detect(prompt);
        const language =
            detectedLanguage[0].lang == "tl" ? "tagalog" : "english";
        // console.log(language)
        // console.log(detectedLanguage)
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",

                    content:
                        "please parapharse this sentence" +
                        (detectedLanguage ? " in " + language : "") +
                        ": " +
                        prompt,
                },
            ],
        });

        const message = completion.choices[0].message.content;
        return response.status(200).json({
            rephrased: message,
        });
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Error rephrasing sentence");
    }
};

module.exports = { rephraseSentence };
