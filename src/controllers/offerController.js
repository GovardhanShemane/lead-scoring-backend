
const { setOffer, getOffer } = require('../models/offer');

function postOffer(req, res) {
    const { name, value_props, ideal_use_cases } = req.body;

    if (!name || !value_props || !ideal_use_cases) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    const offerData = {
        name,
        value_props,
        ideal_use_cases
    };

    setOffer(offerData);

    res.status(200).json({ message: 'Offer saved successfully.', offer: offerData });
}

function getOfferData(req, res) {
    const offer = getOffer();

    if (!offer) {
        return res.status(404).json({ message: 'No offer found.' });
    }

    res.status(200).json(offer);
}

module.exports = { postOffer, getOfferData };
