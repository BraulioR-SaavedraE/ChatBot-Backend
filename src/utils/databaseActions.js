const getDBInstance = require('../config/DBInstance').getInstance;
require("custom-env").env(process.env.ENV);
/**
 * Conexión a la base de datos.
 * @type {Object}
 */
var db;

/**
* Función que da una colección para hacer consultas.
*
* @returns {Object} Colección sobre la que se harán las consultas para recuperar documentos.
*/
const getCollection = async() => {
    try {
      db =  await getDBInstance();
      const collectionName = process.env.MONGO_COLLECTION;
      const collection = await db.listCollections({name: collectionName}).toArray();
   
      if(collection.length > 0) {
        return await db.collection(collectionName);
      }  else {
          throw new Error(`No se pudo encontrar la colección ${collectionName}`);
      } 
    } catch(error) {
        throw error;
    }
}

/**
* Función que busca los sitios web asociados a una respuesta.
* Asumimos que answer siempre corresponde a una respuesta en la base de datos
*
* @param {string} answer - La respuesta que dio el bot
*
* @returns {Object} Array
* Los sitios web asociados a answer
*/
const readSites = async(answer) => {
  try {
    const collection = await getCollection();
    const findResult = await collection.findOne({ respuesta: answer }, { projection: { "sitios de interes": 1 } });
    return findResult.hasOwnProperty('sitios de interes') ? findResult['sitios de interes'] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = {
    readSites: readSites
};