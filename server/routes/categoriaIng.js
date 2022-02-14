const express = require('express');
const app = express();
const { validarToken } = require('../middlewares/token');
const CategoriaIngreso = require('../models/categoriaIngModels');


app.get('/categoriaIngreso', [validarToken], (req, res) => {
    CategoriaIngreso.find({ }, (err, categoriaBD) => {
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
app.post('/categoriaIngreso', [validarToken], (req, res) => {
    let body = req.body;
    let idUser = req.data._id;

    let categoria = new CategoriaIngreso({
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

app.put('/categoriaIngreso/:id', [validarToken], (req, res) => {
    let id = req.params.id;
    let body = req.body;
    CategoriaIngreso.findByIdAndUpdate(id, body, (err, categoriaBD) => {
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

app.delete('/categoriaIngreso/:id', [validarToken], (req, res) => {
    let id = req.params.id;
    CategoriaIngreso.findByIdAndDelete(id, (err, categoriaBD) => {
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