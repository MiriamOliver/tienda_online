const models = require('../models/index.js');
const {Op} = require('sequelize');

const emailExiste = async( email ) => {
    const existeEmail = await models.User.findOne({
        where: {"email": email}
    })
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const nombreExiste = async( nombre ) => {
    
    const existeNombre = await models.User.findOne({
        where: {"nombre": nombre}
    })
    if ( existeNombre ) {
        throw new Error(`El nombre: ${ nombre }, ya está registrado`);
    }
}

const emailDesconocido = async( email ) => {
    const desconocidoEmail = await models.User.findOne({
        where: {"email": email}
    })
    if ( !desconocidoEmail ) {
        throw new Error(`Correo desconocido`);
    }
}

const emailVerificado = async( email ) => {
    const verificado = await models.User.findOne({
        where: {"email": email,
                "verifiedAt": {[Op.not]: null,}
                }
    })
    if (!verificado) {
        throw new Error(`Correo no verificado. Revisa tu correo para verificar tu cuenta`);
    }
}


module.exports = {
    emailExiste,
    nombreExiste,
    emailDesconocido,
    emailVerificado
}