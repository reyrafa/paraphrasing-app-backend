const { OpenAI } = require("openai");
const langdetect = require("langdetect");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
});

// const openai = new OpenAI({
//
//     apiKey: process.env.API_KEY,
// });

const rephraseSentence = async (request, response) => {
    try {
        const { prompt } = request.body;
        const detectedLanguage = langdetect.detect(prompt);
        const language =
            detectedLanguage[0].lang == "tl" ? "tagalog" : "english";
        console.log(language);
        console.log(detectedLanguage);
        // const completion = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         {
        //             role: "user",

        //             content:
        //                 "please parapharse this sentence" +
        //                 (detectedLanguage ? " in " + language : "") +
        //                 ": " +
        //                 prompt,
        //         },
        //     ],
        // });

        // const message = completion.choices[0].message.content;

        const result = await model.generateContent(
            "please parapharse this sentence" +
                (detectedLanguage ? " in " + language : "") +
                "just output the sentence with no translation and whatsoever: " +
                prompt
        );
        const text_response = await result.response;
        const text = text_response.text();

        str = text.replace(/\n/g, "");
        return response.status(200).json({
            rephrased: str,
        });
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Error rephrasing sentence");
    }
};

module.exports = { rephraseSentence };
