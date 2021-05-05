const nodemailer = require('nodemailer');
const email = {
    user: 'financecontrolppi@gmail.com',
    pass: '12345ppi'
};

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: email.user,
        pass: email.pass,
    },
});

const sendEmail = async (mail, asunto, html) => {
    try {
        await transporter.sendMail({
            from: `Finance Control ${email.user}`, // sender address
            to: mail, // list of receivers
            subject: asunto, // Subject line
            text: "Hola por favor confirma tu cuenta", // plain text body
            html, // html body
        });
    } catch (error) {
        console.log("Error al enviar el correo" + error);
    }
}

const getTemplate = (name, token) => {
    return `<head>
    <link rel="stylesheet" href="./style.css">
</head>

<div id="email___content">
    <h2>Hola ${name}</h2>
    <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
    <a
        href="http://localhost:3001/user/confirm/${token}"
        target="_blank"
    >Confirmar Cuenta</a>
</div>`
}

module.exports = {
    getTemplate,
    sendEmail
};