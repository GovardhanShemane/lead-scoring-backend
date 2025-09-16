// let leads = [];
// let scoredResults = [];

// function saveLeads(newLeads) {
//     leads = newLeads;
// }

// function getLeads() {
//     return leads;
// }

// function saveResults(results) {
//     scoredResults = results;
// }

// function getResults() {
//     return scoredResults;
// }

// module.exports = { saveLeads, getLeads, saveResults, getResults };

const store = require('../data/store');

function getLeads() {
    return store.leads;
}

function getResults() {
    return store.results;
}

function saveResults(scoredResults) {
    store.results.length = 0;  
    store.results.push(...scoredResults);
}

function saveLeads(leadsArray) {
    store.leads.length = 0;  
    store.leads.push(...leadsArray);
}

module.exports = { getLeads, saveLeads, saveResults, getResults };
