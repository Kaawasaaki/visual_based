const axios = require('axios');
const config = require('../config');

async function getTLSHHash(serializedDom) {
  try {
    const response = await axios.post(
      `${config.pythonl}/api/ServiceUrhash`,
      { input_string: serializedDom },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.hash;
  } catch (error) {
    throw new Error('Failed to get TLSH hash from service: ' + (error.response?.data?.error || error.message));
  }
}

module.exports = { getTLSHHash };
