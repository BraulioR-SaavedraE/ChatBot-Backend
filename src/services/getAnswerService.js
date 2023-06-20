const NLP = require('../config/NLPInstance').getInstance;

/**
* Función que usa un nlp processor para producir un intent dado un utterance.
*
* @param {string} utterance - Declaración que tras ser analizada producirá un intent
*
* @returns {string} Intent correspondiente al utterance según el análisis del nlp processor.
*/
const getAnswer = async (utterance) => {
    const nlpN = await NLP();
    const nlp = nlpN.nlp;
    const response = await nlp.process('es', utterance);
    return response.answer;
};

module.exports.getAnswer = getAnswer;