const NLPInstance = require('../../config/NLPInstance');
const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const useConstructor = () => {
    it('Prueba que no se pueda usar el constructor directamente. Debería lanzar una excepción.', () => {
        try {
            const nlp = new NLPInstance();
        } catch (error) {
            assert(error.message === 'Use NLPInstance.getInstance()');
        }
    });
};

const getTwoDifferentInstances = () => {
    it('Prueba que sólo se pueda crear una instancia nlp.', async () => {
        NLPInstance.instance = {instancia: "instancia"};
        const nlp1 = await NLPInstance.getInstance();
        const nlp2 = await NLPInstance.getInstance();
        assert(Object.is(nlp1, nlp2));
    });
};

describe('Prueba el singleton para la clase nlp (NLPInstance)',
() => {
    useConstructor();
    getTwoDifferentInstances();
});