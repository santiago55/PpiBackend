const express = require('express');
const app = express();
let Detalle = require('../models/detallecreditoModels');
const { validarToken } = require('../middlewares/token');

//Buscar Detalle de cada usuario
app.get('/Detalle/:id', (req, res) => {
    let id_credito = req.params.id;
    Detalle.find({ idCredito: id_credito }, (err, detallecreditosBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!detallecreditosBD) {
            return res.status(500).json({
                ok: false,
                message: 'No hay Detalle'
            });
        }
        res.status(200).json({
            ok: true,
            detallecreditosBD
        });
    });
});

//Crear Detalle
app.post('/Detalle', [validarToken], async (req, res) => {
    let body = req.body;
    let Detalle = new Detalle({
        nroCuotas: body.nroCuotas,
        valor: body.valor,
        fechaCuota: body.fechaCuota,
        descripcion: body.descripcion,
        estado: body.estado,
        idCredito: req.data._id
    });

    Detalle.save((err, detallecreditosBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            detallecreditosBD
        });
    });
});

app.put('/Detalle/:id', [validarToken], (req, res) => {
    let body = req.body;
    let id = req.params.id;

    Detalle.findByIdAndUpdate(id, body, (err, detallecreditosUpdate) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!detallecreditosUpdate) {
            return res.status(400).json({
                ok: false,
                message: 'El detalle no existe'
            });
        }
        res.status(200).json({
            ok: true,
            detallecreditosUpdate,
            message: 'Detalle credito actualizado'
        });
    });
});

app.delete('/Detalle/:id', (req, res) => {
    let id = req.params.id;
    Detalle.findByIdAndDelete(id, (err, detallecreditosDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            detallecreditosDelete,
            message: 'Detalle Eliminado'
        });
    });
});

module.exports= app;
