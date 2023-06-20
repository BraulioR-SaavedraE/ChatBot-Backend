const DBInstance = require('../../config/DBInstance');
const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const useConstructor = () => {
    it('Prueba que no se pueda usar el constructor directamente. Debería lanzar una excepción.', () => {
        try {
            const db = new DBInstance();
        } catch (error) {
            assert(error.message === 'Usa DBInstance.getInstance()');
        }
    });
};

const getTwoDifferentInstances = () => {
    it('Prueba que sólo se pueda crear una instancia para la conexión a la base de datos.', async () => {
        DBInstance.instance = {db: "Conexión creada"};
        const db1 = await DBInstance.getInstance();
        const db2 = await DBInstance.getInstance();
        assert(Object.is(db1, db2));
    });
};

describe('Prueba el singleton para la conexión a la base de datos (DBInstance)',
() => {
    useConstructor();
    getTwoDifferentInstances();
});