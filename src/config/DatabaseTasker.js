/**
 * módulo de ejecutor de acciones para la base de datps
 * @module DatabaseTasker
 */

/**
* Función que ejecuta una acción de la base de datos.
*
* @param action - La acción a ejecutar
*
* @param data - La data necesaria para ejecutar la acción (en caso de ser necesaria)
*
* @returns una respuesta de la base de datos
*/
const doTask = async (action, data) => {
    if(!action) 
      throw new Error('Se debe indicar una acción.');
    
    if(data) {
      return await action(data);
    } else {
        return await action();
    }
}

module.exports.doTask = doTask;
