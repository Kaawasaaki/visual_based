const fs = require('fs');
const path = require('path');

const whitelistPath = path.join(__dirname, 'whitelist.json');

function loadWhitelist() {
  try {
    if (!fs.existsSync(whitelistPath)) return [];
    const data = fs.readFileSync(whitelistPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load whitelist:', error.message);
    return [];
  }
}

function saveWhitelist(list) {
  try {
    fs.writeFileSync(whitelistPath, JSON.stringify(list, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save whitelist:', error.message);
  }
}

module.exports = { loadWhitelist, saveWhitelist };
