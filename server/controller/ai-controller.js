import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generateSubject = async (req, res) => {
  try {
    const { body } = req.body;

    const completion = await client.chat.completions.create({
      model: "poolside/laguna-xs-2.1:free",
      messages: [
        {
          role: "user",
          content: `Generate a professional email subject for:

${body}

Return only the subject.`
        }
      ]
    });

    res.json({
      subject: completion.choices[0].message.content,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};