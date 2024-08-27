// globalSetup.js
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const dotenv = require('dotenv');

module.exports = async () => {
    const env = process.env.ENV || 'sso';
    dotenv.config({ path: `.env.${env}` });

    const username = process.env.PAT_USERNAME;
    const password = process.env.PAT_PASSWORD;
    const patBaseurl = process.env.PAT_BASEURL;

    const payload = {
        username: username,
        password: password
    };

    const res = await request(patBaseurl)
        .post('/api/authenticate')
        .send(payload)
        .expect(200);

    const authToken = res.body.payload.token;

    // Save the token to a file or environment variable
    const tokenPath = path.join(__dirname, 'authToken.json');
    fs.writeFileSync(tokenPath, JSON.stringify({ token: authToken }));
};
