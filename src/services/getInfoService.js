const getAnswer = require('./getAnswerService').getAnswer;
const getSites = require('./getSitesService').getSites;

/**
* Función que recolecta la respuesta a una entrada del usuario y los sitios web asociados a ésta.
*
* @param {string} utterance - El enunciado a analizar.
*
* @returns {Object} Un JSON que contiene la respuesta junto con los sitios webs asociados a ésta.
* En caso de que haya problemas para recuperar alguna información, se regresa un sitio web predeterminado
* para buscar más información sobre el tema de consulta.
*/
const getInfo = async (utterance) => {
    var answer = await getAnswer(utterance);
    var sites;

    try {
        if(answer) {
            sites = await getSites(answer);
        } else {
            answer = 'No entendí, ¿podrías decírmelo con otras palabras, por favor?';
            sites = [];
        }
    } catch(error) {
        sites = [{sitio: 'COE', url: 'http://dgoae.unam.mx/COE/'}];
    }
 
    return {
        respuesta: answer,
        sitios: sites
    };
};

module.exports.getInfo = getInfo;