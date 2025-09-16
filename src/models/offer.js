let currentOffer = null;

function setOffer(data) {
    currentOffer = data;
}

function getOffer() {
    return currentOffer;
}

module.exports = { setOffer, getOffer };
