const express = require('express');
const app = express();
let Creditos = require('../models/creditoModels');
const { validarToken } = require('../middlewares/token');

//Buscar creditos de cada usuario
app.get('/creditos/:id', (req, res) => {
    let id_User = req.params.id;
    Creditos.find({ usuario: id_User }, (err, creditosBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!creditosBD) {
            return res.status(500).json({
                ok: false,
                message: 'No hay creditos'
            });
        }
        res.status(200).json({
            ok: true,
            creditosBD
        });
    });
});

//Crear Creditos
app.post('/creditos', [validarToken], async (req, res) => {
    let body = req.body;
    let creditos = new Creditos({
        descripcion: body.descripcion,
        valor: body.valor,
        nroCuotas: body.nroCuotas,
        fechaRegistro: body.fechaRegistro,
        fechaCorte: body.fechaCorte,
        tipoCredito: body.tipoCredito,
        porcentaje: body.porcentaje,
        usuario: req.data._id
    });

    creditos.save((err, creditosBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            creditosBD
        });
    });
});

app.put('/creditos/:id', [validarToken], (req, res) => {
    let body = req.body;
    let id = req.params.id;

    Creditos.findByIdAndUpdate(id, body, (err, creditosUpdate) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!creditosUpdate) {
            return res.status(400).json({
                ok: false,
                message: 'El egreso no existe'
            });
        }
        res.status(200).json({
            ok: true,
            creditosUpdate,
            message: 'Egreso actualizado'
        });
    });
});

app.delete('/creditos/:id', (req, res) => {
    let id = req.params.id;
    Creditos.findByIdAndDelete(id, (err, creditosDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            creditosDelete,
            message: 'Egreso Eliminado'
        });
    });
});

module.exports= app;
