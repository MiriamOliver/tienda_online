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
const usuarioExiste = async( id_artista ) => {
    const usuario = await models.User.findOne({
        where: {id: id_artista}
    })
    if (!usuario) {
        throw new Error(`Usuario no existe`);
    }
}

const esAdministrador = async( id_artista ) => {
    const idRol = await models.Rol.findOne({
        attribute:['id'],
        where:{rol: 'administrador'}
    });

    const admin = await models.RolesAsignados.findOne({
        where:{id_user:id_artista,
               id_rol: idRol.dataValues.id}
    })
    if (!admin) {
        throw new Error(`El usuario no es administrador`);
    }
}

const disenoExiste = async( id_diseno ) => {
      
    const diseno = models.Diseno.findOne({
            where:{id:id_diseno}
        })

    if(!diseno){
        
        throw new Error(`El diseno no existe`);
    }
}


module.exports = {
    emailExiste,
    nombreExiste,
    emailDesconocido,
    emailVerificado,
    usuarioExiste,
    esAdministrador,
    disenoExiste,
}