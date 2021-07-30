const express = require('express');
const app = express();
let { validarToken } = require('../middlewares/token');
let ahorro = require('../models/ahorroModels');

//Crear ahorros

app.get('/ahorros/:id', (req, res) => {
    let id = req.params.id;
    ahorro.find({ usuario: id }, (err, ahorroBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            ahorroBD
        });
    });
});

// app.get('/ahorros/:fechaIn', (req, res) => {
//     let fechaIn = req.params.date;
//     ahorro.find({ usuario: id }, (err, ahorroBD) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }
//         res.status(200).json({
//             ok: true,
//             ahorroBD
//         });
//     });
// });

app.post('/ahorros', [validarToken], async (req, res) => {
    let body = req.body;

    let ahorros = new ahorro({
        descripcion: body.descripcion,
        valor: body.valor,
        categoria: body.categoria,
        date: body.date,
        usuario: req.data._id
    });

    ahorros.save((err, ahorroBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err, 
                message:'Error al guardar'
            });
        }
        res.status(200).json({
            ok: true,
            ahorroBD
        });
    });
});


app.put('/ahorros/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    ahorro.findByIdAndUpdate(id, body, (err, ahorroBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            ahorroBD
        });
    });
});

app.delete('/ahorros/:id', [validarToken], (req, res) => {
    let id = req.params.id;
    ahorro.findByIdAndDelete(id, (err, ahorroBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            ahorroBD,
            message: 'ahorro eliminado'
        });
    });
});

module.exports = app;
