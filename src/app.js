const getInfo = require('./services/getInfoService').getInfo;
const express = require('express');
require("custom-env").env(process.env.ENV);

/**
 * Puerto del servidor express.
 * @type {number}
 */
const PORT = process.env.SERVER_PORT;

const app = express()

// Endpoint que da una respuesta según un enunciado dado por el usuario y un conjunto de
// sitios web asociados a la respuesta.
app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if(!req.query.utterance) {
        return res.status(400).json({error: 'Deberías escribir algo para que el chatbot intente contestar.'});
    } else {
        getInfo(req.query.utterance).then((response) => {res.status(200).json(response)});
    }
});

app.listen(PORT, () => {
    console.log(`El servidor ha sido levantado en el puerto ${PORT}.`)
})

module.exports = app;