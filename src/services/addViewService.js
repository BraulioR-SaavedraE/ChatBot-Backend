const actions = require('../utils/databaseActions');
const dbConnection = require('../config/DatabaseTasker');
const executor = dbConnection.doTask;
const addViews = actions.addView;

/**
* Función que agrega una visita a una pregunta con su respectiva respuesta.
*
* @param {string} question- La respuesta a la que se le agregará la visita.
*/
const addView = async(question) => {
    executor(addViews, question);
};

module.exports.addView = addView;