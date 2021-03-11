const express = require('express');
const app = express();
let Tipo = require('../models/tipoModels');

//Crear tipo
app.post('/tipo', (req, res) => {
    let body = req.body;
    let tipo = new Tipo({
        tipo: body.tipo
    });
    tipo.save((err, tipoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            tipoBD
        });
    });
});

app.get('/tipo', (req, res) => {
    Tipo.find((err, tipoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            tipoBD
        });
    })
});

module.exports = app;