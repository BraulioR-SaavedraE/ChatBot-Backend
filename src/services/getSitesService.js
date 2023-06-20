const actions = require('../utils/databaseActions');
const dbConnection = require('../config/DatabaseTasker');
const executor = dbConnection.doTask;
const readSites = actions.readSites;

/**
* Función que obtiene los sitios web que le corresponden a una respuesta del bot.
*
* @param {string} answer - La respuesta que mostrará el bot
*
* @returns {Object} Arreglo con los sitios web asociados a esa respuesta.
*/
const getSites = async (answer) => {
        const sites = await executor(readSites, answer);
        return sites;
};

module.exports.getSites = getSites;