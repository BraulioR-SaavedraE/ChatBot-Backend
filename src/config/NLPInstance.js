const { dockStart } = require('@nlpjs/basic');

/*
 * Clase para construir un nlp processor.
 */
class PrivateNLP {
    /*
     * @param {Object} nlp processor.
     */
    constructor (nlp) {
        /*
         * @property {Object} nlp - nlp processor.
         */
        this.nlp = nlp;
    }

    /*
* Función para crear un nlp processor con la información especificada del ambiente.
*
* @returns {Object} contiene el nlp processor.
*/
    static async initialize() {
        const dock = await dockStart({ use: ['Basic', 'Qna'] });
        const nlp = dock.get('nlp');
        const path = require('path');
        const qnaFileName = process.env.QNA_FILE;
        await nlp.addCorpus({ filename: path.join(__dirname, `../data/${qnaFileName}`), importer: 'qna', locale: 'es' });
        await nlp.train();
        return new PrivateNLP(nlp);
    }
}

/**
 * Clase para obtener un singleton del nlp processor.
 */
class NLPInstance {
    /**
     * @throws Lanza un error porque no se debería usar el constructor, sino, el método
     * getInstance que verifica que no haya ya una instancia creada.
     */
    constructor() {
        throw new Error('Use NLPInstance.getInstance()');
    }

    /**
* Función que manda a crear una instancia para el nlp processor
* en caso no existir una, o da la existente.
*
* @returns {Object} El nlp processor.
*/
    static async getInstance() {
        if (!NLPInstance.instance) 
            NLPInstance.instance = await PrivateNLP.initialize();

        return NLPInstance.instance;
    }
}

module.exports = NLPInstance;