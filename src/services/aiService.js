const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getAIIntent(lead, offer) {
    try {
        const prompt = `
You are a lead scoring assistant. 
Given the following product/offer information and a lead's profile, classify the buying intent as High, Medium, or Low. 
Explain in 1-2 sentences your reasoning.

Offer:
Name: ${offer.name}
Value Props: ${offer.value_props.join(', ')}
Use Cases: ${offer.ideal_use_cases.join(', ')}

Lead:
Name: ${lead.name}
Role: ${lead.role}
Company: ${lead.company}
Industry: ${lead.industry}
Location: ${lead.location}
LinkedIn Bio: ${lead.linkedin_bio}

Respond in the following JSON format:
{
  "intent": "High/Medium/Low",
  "reasoning": "Your explanation here."
}
`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150
        });

        const text = response.choices[0].message.content.trim();

        const aiResult = JSON.parse(text);

        let aiPoints = 10;
        if (aiResult.intent.toLowerCase() === 'high') aiPoints = 50;
        else if (aiResult.intent.toLowerCase() === 'medium') aiPoints = 30;

        return { intent: aiResult.intent, reasoning: aiResult.reasoning, aiPoints };
    } catch (error) {
        console.error('OpenAI API error:', error.message);

        // fallback to mock
        let aiPoints = 10;
        let intent = 'Low';
        let reasoning = 'Fallback AI scoring.';

        if (lead.role.toLowerCase().includes('head') || lead.role.toLowerCase().includes('manager')) {
            intent = 'High';
            aiPoints = 50;
            reasoning = 'Decision maker role detected.';
        }

        return { intent, reasoning, aiPoints };
    }
}

module.exports = { getAIIntent };
