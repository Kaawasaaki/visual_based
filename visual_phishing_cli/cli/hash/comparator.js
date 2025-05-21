const axios = require('axios');
const whitelist = require('../whitelist/whitelist.json');
const config = require('../config'); // Make sure this has pythonServiceUrl

async function compareHashes(hash) {
  const results = [];

  for (const entry of whitelist) {
    try {
      const response = await axios.post(`${config.pythonServiceUrl}/api/diff`, {
        hash1: hash,
        hash2: entry.hash,
      });
      const score = response.data.diff;
      results.push({ site: entry.site, score });
    } catch (error) {
      console.error(`Error comparing with ${entry.site}:`, error.message);
      // Use a large score if error happens to avoid false match
      results.push({ site: entry.site, score: 9999 });
    }
  }

  return results.sort((a, b) => a.score - b.score);
}

module.exports = { compareHashes };
