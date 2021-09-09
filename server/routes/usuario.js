const express = require('express');
const app = express();
const Usuario = require('../models/userModels');
const { v4: uuidv4 } = require('uuid');
const { getToken, getTokenData } = require('../middlewares/tokenEmail');
const { getTemplate, sendEmail } = require('../middlewares/emailConfig');
const {getTemplateForgetPass,sendEmailForgetPass} = require('../middlewares/emailForgetPass');
app.get('/user', (req, res) => {
    Usuario.find({}, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            usuarioBD
        });
    });
});

//Crear Usuario
app.post('/user', (req, res) => {
    let body = req.body;
    let user = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        userName: body.userName,
        password: body.password
    });
    let mailed = user.email;
    const code = uuidv4();
    const token = getToken({ mailed, code });
    const template = getTemplate(user.nombre, token);

    user.save(async (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        await sendEmail(mailed, 'Email de prueba', template);
        res.status(200).json({
            ok: true,
            user: usuarioDB
        });
    });
});

//Confirmar usuario
app.get('/user/confirm/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const data = await getTokenData(token);
        //console.log(data)
        if (!data) {
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener la data'
            });
        }
        const { mailed } = data.data;

        Usuario.findOne({ email: mailed }, (err, usuarioBD) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: 'Usuario no existe'
                });
            }
            usuarioBD.status = 'Activo';
            usuarioBD.save();
            return res.redirect('/confirm.html');
        });



    } catch (err) {
        console.log(err);
    }
});

//Cambiar contraseña
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Usuario.findByIdAndUpdate(id, body, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Usuario actualizado'
        });
    });
});


//Recuperar contraseña

app.post('/recuperarcontra', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, async (err, usuarioUpdate) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioUpdate) {
            return res.status(400).json({
                ok: false,
                message: 'El email no se encuentra registrado'
            });
        }
        let mailed = usuarioUpdate.email;
        const code = uuidv4();
        const token = getToken({ mailed, code });
        const template = getTemplateForgetPass(usuarioUpdate.nombre, token);
        await sendEmailForgetPass(mailed, 'Recuperar contraseña', template);
        return res.status(200).json({
            ok: true,
            usuarioUpdate
        });

    });


});

//Cambiar olvidar contraseña
app.put('/olvideContraseña/recuperar/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const data = await getTokenData(token);
        const body = req.body;
        //console.log(data)
        if (!data) {
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener la data'
            });
        }
        const { mailed } = data.data;

        Usuario.findOne({ email: mailed }, (err, usuarioBD) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: 'Usuario no existe'
                });
            }
            usuarioBD.password = body.password;
            usuarioBD.save();
            return res.redirect('/');
        });



    } catch (err) {
        console.log(err);
    }
});

//Eliminar usuario
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado,
            message: 'Usuario borrado'
        });
    });
});

module.exports = app;