// authHelper.js
const fs = require('fs');
const path = require('path');

function getAuthToken() {
    const tokenPath = path.join(__dirname, 'authToken.json');
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    return tokenData.token;
}

module.exports = { getAuthToken };
