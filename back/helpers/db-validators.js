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


module.exports = {
    emailExiste,
    nombreExiste,
}