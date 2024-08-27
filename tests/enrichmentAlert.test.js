const request = require('supertest');
const dotenv = require('dotenv'); // Import dotenv to use it
const { getAuthToken } = require('../util/authHelper');
const enrichmentAlertPayload = require("../payloads/EnrichmentAlert.json");

describe('Enrichment Alert Creation', () => {
    let authToken;
    let patBaseurl;

    beforeAll(async () => { // Use async for beforeAll if async operations are present
        const env = process.env.ENV || 'sso';
        dotenv.config({ path: `.env.${env}` });

        patBaseurl = process.env.PAT_BASEURL;
        authToken = await getAuthToken();
    });

    it('should create an enrichment alert', async () => {
        await request(patBaseurl)
            .post('/alerts')
            .set('Authorization', `Bearer ${authToken}`)
            .send(enrichmentAlertPayload)
            .expect(201);
    });
});
