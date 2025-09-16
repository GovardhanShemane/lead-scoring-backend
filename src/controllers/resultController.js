
const { parse } = require('json2csv');

const { results } = require('../data/store');

function getResults(req, res) {
    return res.json(results);
}

function exportResultsAsCSV(req, res) {
    if (results.length === 0) {
        return res.status(400).json({ message: 'No results available to export.' });
    }

    try {
        const fields = ['name', 'role', 'company', 'intent', 'score', 'reasoning'];
        const opts = { fields };
        const csv = parse(results, opts);

        res.header('Content-Type', 'text/csv');
        res.attachment('lead_scores.csv');
        return res.send(csv);
    } catch (error) {
        console.error('CSV export error:', error.message);
        return res.status(500).json({ message: 'Failed to export CSV.' });
    }
}

module.exports = { getResults, exportResultsAsCSV };
