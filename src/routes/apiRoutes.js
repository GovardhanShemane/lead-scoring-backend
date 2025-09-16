const express = require('express');
const { postOffer, getOfferData } = require('../controllers/offerController');
const { upload, uploadLeads } = require('../controllers/leadController');
const { scoreLeads, getScoredResults } = require('../controllers/scoreController');
const { exportResultsAsCSV } = require('../controllers/resultController'); 

const router = express.Router();

// Offer Routes
router.post('/offer', postOffer);
router.get('/offer', getOfferData);

// Leads Routes
router.post('/leads/upload', upload.single('file'), uploadLeads);

// Scoring Routes
router.post('/score', scoreLeads);
router.get('/results', getScoredResults);

router.get('/results/export', exportResultsAsCSV);
module.exports = router;
