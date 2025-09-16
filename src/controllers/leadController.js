
const multer = require('multer');
const path = require('path');
const { parseCSV } = require('../utils/csvHandler');
const { saveLeads } = require('../models/lead');

const upload = multer({ dest: 'uploads/' });

async function uploadLeads(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'CSV file is required.' });
    }

    try {
        const filePath = path.resolve(req.file.path);
        const leadsArray = await parseCSV(filePath);

        saveLeads(leadsArray);

        res.status(200).json({
            message: 'Leads uploaded successfully.',
            uploadedLeadsCount: leadsArray.length
        });
    } catch (error) {
        console.error('CSV parsing error:', error.message);
        res.status(500).json({ message: 'Failed to parse CSV file.' });
    }
}

module.exports = { upload, uploadLeads };
