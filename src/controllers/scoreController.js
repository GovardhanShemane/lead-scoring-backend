const { getOffer } = require('../models/offer');
const { getLeads, saveResults, getResults } = require('../models/lead');
const { calculateRuleScore } = require('../services/ruleEngine');
const { getAIIntent } = require('../services/aiService');

async function scoreLeads(req, res) {
    const offer = getOffer();
    const leads = getLeads();

    if (!offer) {
        return res.status(400).json({ message: 'Offer must be provided before scoring.' });
    }

    if (!leads.length) {
        return res.status(400).json({ message: 'No leads uploaded to score.' });
    }

    const scoredResults = [];

    for (const lead of leads) {
        const ruleScore = calculateRuleScore(lead, offer);
        const aiResult = await getAIIntent(lead, offer);

        const finalScore = ruleScore + aiResult.aiPoints;

        scoredResults.push({
            name: lead.name,
            role: lead.role,
            company: lead.company,
            intent: aiResult.intent,
            score: finalScore,
            reasoning: aiResult.reasoning
        });
    }

    saveResults(scoredResults);

    res.status(200).json({
        message: 'Scoring completed successfully.',
        scoredCount: scoredResults.length
    });
}

function getScoredResults(req, res) {
    const results = getResults();

    if (!results.length) {
        return res.status(404).json({ message: 'No scored results available.' });
    }

    res.status(200).json(results);
    console.log("Scored results:", results);

}

module.exports = { scoreLeads, getScoredResults };
