const express = require('express');
const app = express();
let { validarToken } = require('../middlewares/token');
let Ingreso = require('../models/ingresoModels');

//Crear ingresos

app.get('/ingresos/:id', (req, res) => {
    let id = req.params.id;
    Ingreso.find({ usuario: id }, (err, ingresoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            ingresoBD
        });
    });
});

// app.get('/ingresos/:fechaIn', (req, res) => {
//     let fechaIn = req.params.date;
//     Ingreso.find({ usuario: id }, (err, ingresoBD) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }
//         res.status(200).json({
//             ok: true,
//             ingresoBD
//         });
//     });
// });

app.post('/ingresos', [validarToken], async (req, res) => {
    let body = req.body;

    let ingreso = new Ingreso({
        descripcion: body.descripcion,
        valor: body.valor,
        tipo: body.tipo,
        categoria:body.categoria,
        date: body.date,
        usuario: req.data._id
    });

    ingreso.save((err, ingresoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            ingresoBD
        });
    });
});


app.put('/ingresos/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Ingreso.findByIdAndUpdate(id, body, (err, ingresoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            ingresoBD
        });
    });
});

app.delete('/ingresos/:id', [validarToken], (req, res) => {
    let id = req.params.id;
    Ingreso.findByIdAndDelete(id, (err, ingresoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            ingresoBD,
            message: 'Ingreso eliminado'
        });
    });
});

module.exports = app;
