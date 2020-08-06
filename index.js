const express = require('express')
const pug = require('pug')
const app = express()
const fs = require('fs')
const pdf = require('html-pdf')
app.use(express.json())

const PUERTO = 8080;


app.get('/', function(req, res) {
    let salida = pug.renderFile('./views/index.pug', { nombre: 'Lucas' });
    res.send(salida);
});

app.post('/generarpdf', function(req, res) {

    /**
     * Genero el contenido del PDF a partir deun template
     */
    const data = req.body
    const salida = pug.renderFile('./views/pdf.pug', data);


    /**
     * Genero el objeto PDF y escribo los datos
     */

    pdf.create(salida).toFile('./pdfs/' + data.nombre + '_' + Date.now() + '.pdf', function(err, res) {
        if (err) {
            console.log('Ocurrió un error: %s', err);
        } else {
            console.log('OK: %s', res);
        }
    });


    res.send(salida)
});



app.listen(PUERTO, () => {
    console.log('App escuchando en http://localhost:%s', PUERTO);
});