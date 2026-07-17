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

export const improveWriting = async (req, res) => {
    try {
        const { body } = req.body;

        const completion = await client.chat.completions.create({
            model: "poolside/laguna-xs-2.1:free",
            messages: [
                {
                    role: "user",
                    content: `Improve the following email.

Correct grammar.
Make it professional.
Keep the meaning exactly the same.

Email:

${body}

Return ONLY the improved email.`
                }
            ]
        });

        res.json({
            body: completion.choices[0].message.content.trim(),
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


export const changeTone = async (req, res) => {

    try {

        const { body, tone } = req.body;


        const completion = await client.chat.completions.create({

            model: "poolside/laguna-xs-2.1:free",

            messages: [
                {
                    role: "user",
                    content: `
Rewrite the following email in a ${tone} tone.

Keep the meaning exactly the same.
Return ONLY the rewritten email.

Email:

${body}
`
                }
            ]

        });


        res.json({
            body: completion.choices[0].message.content.trim()
        });


    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Failed to change tone"
        });

    }




};


export const summarizeEmail = async (req, res) => {

    try {

        const { body } = req.body;


        const completion = await client.chat.completions.create({

            model: "poolside/laguna-xs-2.1:free",

            messages: [
                {
                    role: "user",
                    content: `
Summarize this email.

Give:
- Short summary
- Important points
- Required actions

Email:

${body}
`
                }
            ]

        });


        res.json({
            summary: completion.choices[0].message.content.trim()
        });


    } catch(err){

        console.error(err);

        res.status(500).json({
            error:"Failed to summarize email"
        });

    }

};


export const generateReply = async (req, res) => {

    try {

        const { body } = req.body;

        const completion = await client.chat.completions.create({

            model: "poolside/laguna-xs-2.1:free",

            messages: [
                {
                    role: "user",
                    content: `
Generate a professional reply to this email.

Keep the reply polite and concise.
Return ONLY the reply email.

Email:

${body}
`
                }
            ]

        });

        res.json({
            reply: completion.choices[0].message.content.trim()
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Failed to generate reply"
        });

    }

};

export const generateSmartReplies = async (req, res) => {

    try {

        const { body } = req.body;

        const completion = await client.chat.completions.create({

            model: "poolside/laguna-xs-2.1:free",

            messages: [
                {
                    role: "user",
                    content: `
Read the email below and generate exactly 3 different professional reply options.

Return ONLY a JSON array like this:

[
  "Reply option 1",
  "Reply option 2",
  "Reply option 3"
]

Email:

${body}
`
                }
            ]

        });

        let replies;

        try {
            replies = JSON.parse(completion.choices[0].message.content);
        } catch {
            replies = [completion.choices[0].message.content];
        }

        res.json({
            replies
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Failed to generate smart replies"
        });

    }

};