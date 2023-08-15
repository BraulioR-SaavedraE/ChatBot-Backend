const actions = require('../utils/databaseActions');
const dbConnection = require('../config/DatabaseTasker');
const executor = dbConnection.doTask;
const readQuestions = actions.readFrequentQuestions;

/**
* Función que obtiene las preguntas más frecuentes asociadas al bot.
*
* @returns {Object} Arreglo con las 3 preguntas más frecuentes.
*/
const getQuestions = async () => {
    const questions = await executor(readQuestions);

    return questions;
};

module.exports.getQuestions = getQuestions;