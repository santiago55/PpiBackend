const express = require('express');
const app = express();
const Usuario = require('../models/userModels');
let jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ userName: body.userName }, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        if (usuarioBD.password !== body.password) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }
        let token = jwt.sign({
            data: usuarioBD
        }, process.env.SEED, { expiresIn: process.env.TOKEN });
        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            message: 'Ha iniciado sesion exitosamente',
            token
        });
    });
});

module.exports = app;
