const { calculateRuleScore } = require('../services/ruleEngine');

describe('Rule Engine - calculateRuleScore', () => {
    it('should calculate maximum rule score when all match', () => {
        const lead = {
            role: 'Head of Sales',
            industry: 'B2B SaaS mid-market',
            name: 'Test Lead',
            company: 'TestCorp',
            location: 'Test City',
            linkedin_bio: 'Experienced decision maker in SaaS industry.'
        };

        const offer = {
            name: 'AI Outreach Automation',
            value_props: ['24/7 outreach', '6x more meetings'],
            ideal_use_cases: ['B2B SaaS mid-market']
        };

        const score = calculateRuleScore(lead, offer);

        // Expected max score: 50
        expect(score).toBe(50);
    });

    it('should calculate lower score when fields don’t match', () => {
        const lead = {
            role: 'Engineer',
            industry: 'Retail',
            name: 'Test Lead',
            company: 'TestCorp',
            location: 'Test City',
            linkedin_bio: ''
        };

        const offer = {
            name: 'AI Outreach Automation',
            value_props: ['24/7 outreach', '6x more meetings'],
            ideal_use_cases: ['B2B SaaS mid-market']
        };

        const score = calculateRuleScore(lead, offer);

        // Expect score < 50
        expect(score).toBeLessThan(50);
    });
});
