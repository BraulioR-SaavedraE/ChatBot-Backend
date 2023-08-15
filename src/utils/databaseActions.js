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
};

/**
* Función que busca las 3 preguntas más frecuentes de la base de datos.
*
* @returns {Object} Array
* Las preguntas más frecuentes que a lo más serán 3.
*/
const readFrequentQuestions = async() => {
  try {
    const collection = await getCollection();
    const cursor =  await collection.find({}).sort({"visitas":1}).project({pregunta: 1, _id: 0}).limit(3);
    const selectedQuestions = cursor.toArray();

    return selectedQuestions;
  } catch (error) {
    throw error;
  }
}; 

/**
* Función que agrega una visita a una pregunta con su respectiva respuesta.
*/
const addView = async(answer) => {
  const collection = await getCollection();
  const views = await collection.findOne({respuesta: answer}, {projection: {"vistas": 1}});
  const vistas = views['vistas'];
  collection.updateOne({respuesta: answer},  {$set:{"vistas": vistas + 1}});
};

module.exports = {
    readSites: readSites,
    readFrequentQuestions: readFrequentQuestions,
    addView: addView
};