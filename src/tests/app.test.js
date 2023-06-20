const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const request = require('supertest');
const app = require('../app');

const noParametersRequest = () => {
    it('Petición sin parámetros que debería obtener un código 400.', (done) => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
};

const requestWithParameters = () => {
    it('Petición con parámetros que debería obtener un código 200.', (done) => {
        request(app)
        .get('/')
        .query({utterance: 'nada'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
};

describe('Probando el único endpoint que se diseñó para dar una respuesta según una declaración', () => {
    noParametersRequest();
    requestWithParameters();
});