const doTask = require('../../config/DatabaseTasker').doTask;
const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const doTaskWithNoArguments = () => {
    it('Tira una excepción ya que no hay una acción que ejecutar.', async () => {
        const spy = sinon.spy(doTask);
        try {
            await spy();
        } catch (error) {
            assert(error.message === 'Se debe indicar una acción.');
        }
    })
};

const doTaskWithAnAction = () => {
    it('Debería ejecutar una acción que no requiere argumentos.', async () => {
        const stub = sinon.stub().returns(true);
        const result = await doTask(stub);
        assert(result === true);
    })
};

const doTaskWithAnActionAndAnData = () => {
    it('Debería ejecutar una acción usando la data que se le proporcione.', async () => {
        const action = (data) => !data;
        const spy = sinon.spy(action);
        const data = true;
        const result = await doTask(spy, data);
        assert(spy.calledWith(true));
        assert(result === false);
    })
};

describe('Prueba la funcion doTask según los argumentos que se le pasen', () => {
    doTaskWithNoArguments();
    doTaskWithAnAction();
    doTaskWithAnActionAndAnData();
});