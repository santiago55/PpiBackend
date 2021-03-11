const express = require('express');
const app = express();
let Egresos = require('../models/egresosModels');
const { validarToken } = require('../middlewares/token');

//Buscar egresos de cada usuario
app.get('/egresos/:id', (req, res) => {
    let id_User = req.params.id;
    Egresos.find({ usuario: id_User }, (err, egresosBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!egresosBD) {
            return res.status(500).json({
                ok: false,
                message: 'No hay egresos'
            });
        }
        res.status(200).json({
            ok: true,
            egresosBD
        });
    });
});

//Crear Egresos
app.post('/egresos', [validarToken], async (req, res) => {
    let body = req.body;
    let egresos = new Egresos({
        descripcion: body.descripcion,
        valor: body.valor,
        date: body.date,
        categoria: body.categoria,
        tipo: body.tipo,
        usuario: req.data._id
    });

    egresos.save((err, egresosBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            egresosBD
        });
    });
});

app.put('/egresos/:id', [validarToken], (req, res) => {
    let body = req.body;
    let id = req.params.id;

    Egresos.findByIdAndUpdate(id, body, (err, egresosUpdate) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!egresosUpdate) {
            return res.status(400).json({
                ok: false,
                message: 'El egreso no existe'
            });
        }
        res.status(200).json({
            ok: true,
            egresosUpdate,
            message: 'Egreso actualizado'
        });
    });
});

app.delete('/egresos/:id', (req, res) => {
    let id = req.params.id;
    Egresos.findByIdAndDelete(id, (err, egresosDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            egresosDelete,
            message: 'Egreso Eliminado'
        });
    });
});

module.exports= app;
