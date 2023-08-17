const getInfo = require('./services/getInfoService').getInfo;
const getQuestions = require('./services/getFrequentQuestionsService').getQuestions;
const express = require('express');
require("custom-env").env(process.env.ENV);

/**
 * Puerto del servidor express.
 * @type {number}
 */
const PORT = process.env.SERVER_PORT;

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint que da una respuesta según un enunciado dado por el usuario y un conjunto de
// sitios web asociados a la respuesta.
app.get('/',async(req, res) => {
    if(!req.query.utterance) {
        return res.status(400).json({error: 'Deberías escribir algo para que el chatbot intente contestar.'});
    } else {
        const response = await getInfo(req.query.utterance);
        res.status(200).json(response);
    }
});

// endpoint para recuperar las 3 preguntas más frecuentes que tiene la base de datos.
app.get('/fq', async(req, res) => {
    const questions = await getQuestions();
    res.status(200).json({questions});
});

app.listen(PORT, () => {
    console.log(`El servidor ha sido levantado en el puerto ${PORT}.`);
})

module.exports = app;