const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const email = {
    user: 'financecontrolppi@gmail.com',
    pass: '12345ppi'
};

const client_id ="751918155457-8ep3cv6s6gl0l9vbdbun2rvv0tuc3j70.apps.googleusercontent.com";
const client_secret="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";
const redirect_uri="https://developers.google.com/oauthplayground";
const REFRESH_TOKEN="1//04ab_x2UtfanbCgYIARAAGAQSNwF-L9IrN4Hc8Lfw8eCSYeY0BBc2Pc0bEkrviDM5EnDVtch99GdeaCQb_m92Cg4GhtBKdId_5-M";
const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
    );

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
const sendEmail = async (mail, asunto, html) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        //host: "smtp.gmail.com",
        //port: 587,
        //secure: false,
        auth: {
            type:"OAuth2",
            user: email.user,
            clientId: client_id,
            clientSecret: client_secret,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
            //user: email.user,
            //pass: email.pass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
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
        href="https://ppibackend.vercel.app/user/confirm/${token}"
        target="_blank"
    >Confirmar Cuenta</a>
</div>`
}

module.exports = {
    getTemplate,
    sendEmail
};