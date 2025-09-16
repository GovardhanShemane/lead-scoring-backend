function calculateRuleScore(lead, offer) {
    let score = 0;

    // Role relevance
    const decisionMakerKeywords = ['Head', 'Director', 'Chief', 'VP', 'Founder'];
    const influencerKeywords = ['Manager', 'Lead', 'Coordinator'];

    const role = lead.role.toLowerCase();
    if (decisionMakerKeywords.some(keyword => role.includes(keyword.toLowerCase()))) {
        score += 20;
    } else if (influencerKeywords.some(keyword => role.includes(keyword.toLowerCase()))) {
        score += 10;
    }

    // Industry match
    const leadIndustry = lead.industry.toLowerCase();
    const idealUseCases = offer.ideal_use_cases.map(uc => uc.toLowerCase());

    if (idealUseCases.some(ideal => ideal === leadIndustry)) {
        score += 20;
    } else if (idealUseCases.some(ideal => leadIndustry.includes(ideal) || ideal.includes(leadIndustry))) {
        score += 10;
    }

    // Data completeness
    const requiredFields = ['name', 'role', 'company', 'industry', 'location', 'linkedin_bio'];
    const allFieldsPresent = requiredFields.every(field => lead[field] && lead[field].trim() !== '');
    if (allFieldsPresent) {
        score += 10;
    }

    return score;
}

module.exports = { calculateRuleScore };
