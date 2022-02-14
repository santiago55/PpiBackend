const nodemailer = require('nodemailer');
const email = {
    user: 'financecontrolppi@gmail.com',
    pass: '12345ppi'
};
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: email.user,
        pass: email.pass,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmailForgetPass = async (mail, asunto, html) => {
    try {
        await transporter.sendMail({
            from: `Finance Control ${email.user}`, // sender address
            to: mail, // list of receivers
            subject: asunto, // Subject line
            text: "Hola por favor confirma tu cuenta", // plain text body
            html, 
        });
    } catch (error) {
        console.log("Error al enviar el correo" + error);
    }
}

const getTemplateForgetPass = (name, token) => {
    return `<head>
    <link rel="stylesheet" href="./style.css">
</head>

<div id="email___content">
    <h2>Hola ${name}</h2>
    <p>Para cambiar tu contraseña ingresa en el siguiente enlace: </p>
    <a
        href="http://localhost:3000/CambiarContraseñaCorreo/${token}"
        target="_blank"
    >Confirmar Cuenta</a>
</div>`
}

module.exports = {
    getTemplateForgetPass,
    sendEmailForgetPass
};

