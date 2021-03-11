const express = require('express');
const app = express();
const { validarToken } = require('../middlewares/token');
const Categoria = require('../models/categoryModels');


app.get('/categoria', [validarToken], (req, res) => {
    Categoria.find({ usuario: req.data._id }, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            categoriaBD
        });
    });
});

//Crear categoria
app.post('/categoria', [validarToken], (req, res) => {
    let body = req.body;
    let idUser = req.data._id;

    let categoria = new Categoria({
        categoria: body.categoria,
        usuario: idUser
    });

    categoria.save((err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            categoriaBD
        });
    });
});

app.put('/categoria/:id', [validarToken], (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Categoria.findByIdAndUpdate(id, body, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            categoriaBD
        });

    });
});

app.delete('/categoria/:id', [validarToken], (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndDelete(id, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            categoriaBD,
            message: 'Categoria eliminada'
        });
    });
});

module.exports = app;