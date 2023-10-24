require('dotenv').config();
const { v4: uuidv4 } = require('uuid'); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    },
    tls:{rejectUnauthorized:false}
})

const verificarCorreo = (userId, receptor, ruta) => {
    message = {
        from: process.env.EMAIL_ACCOUNT,
        to: receptor,
        subject: "PICTOON. Verificación de cuenta",
        html: `Pulsa en el siguiente enlace para confirmar tu cuenta: <br> <a class="text-align:center" href="http://${process.env.HOST}:${process.env.PORT}/${ruta}/${userId}">Pulsa aquí</a>`
    };


    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error.message)
        } else {
            console.log('Email enviado' + info.response);
        } 
    });
}

const emailRecPasswd = (receptor, codigo) => {
    message = {
        from: process.env.EMAIL_ACCOUNT,
        to: receptor,
        subject: "Restauración de Contraseña",
        html: `<p>El código de restauración de contraseña es: <b>${codigo}</b></p>`
    };


    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error.message)
        } else {
            console.log('Email enviado' + info.response);
        } 
    });
}


module.exports = {
    verificarCorreo,
    emailRecPasswd
}
