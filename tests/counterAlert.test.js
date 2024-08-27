const request = require('supertest');
const dotenv = require('dotenv'); // Import dotenv to use it
const {getAuthToken} = require('../util/authHelper');
const counterAlertPayload = require("../payloads/CounterAlert.json");

describe('Content Alert Creation', () => {
    let authToken;
    let patBaseurl;

    beforeAll(() => {
        const env = process.env.ENV || 'sso';
        dotenv.config({path: `.env.${env}`});

        patBaseurl = process.env.PAT_BASEURL;
        authToken = getAuthToken();
    });

    it('Counter Alert Creation', async () => {

        const res = await request(patBaseurl)
            .post('/alerts')
            .set('Authorization', `Bearer ${authToken}`)
            .send(counterAlertPayload)
            .expect(201);
    });
});
