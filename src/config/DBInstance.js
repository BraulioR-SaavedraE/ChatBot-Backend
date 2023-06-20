const {MongoClient} = require('mongodb');
require("custom-env").env(process.env.ENV);

/*
 * Clase para construir una conexión a la base de datos.
 */
class PrivateDB {
    /*
     * @param {Object} conexión a la base de datos.
     */
    constructor (db) {
        /*
         * @property {Object} db - conexión a la base de datos.
         */
        this.db = db;
    }

    /*
* Función para crear una conexión a la base de datos con la información especificada del ambiente.
*
* @returns {Object} contiene la conexión a la base de datos.
*/
    static async initialize() {
        const HOST = process.env.MONGO_HOST;
        const PORT = process.env.MONGO_PORT;
        const URI = `mongodb://${HOST}:${PORT}`;
        const dbName = process.env.MONGO_DB;
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            return new PrivateDB(db);
        } catch(error) {
            throw new Error('Hubo un error al intentar conectarse a la base de datos');
        }    
    }
}

/**
 * Clase para obtener un singleton de la conexión a la base de datos.
 */
class DBInstance {
    /**
     * @throws Lanza un error porque no se debería usar el constructor, sino, el método
     * getInstance que verifica que no haya ya una instancia creada.
     */
    constructor() {
        throw new Error('Usa DBInstance.getInstance()');
    }

    /**
* Función que manda a crear una instancia para la conexión a la base de datos
* en caso no existir una, o da la existente.
*
* @returns {Object} La conexión a la base de datos.
*/
    static async getInstance() {
        if (!DBInstance.instance)
            DBInstance.instance = await PrivateDB.initialize();
           
        return await DBInstance.instance.db;
    }
}

module.exports = DBInstance;