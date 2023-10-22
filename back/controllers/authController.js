const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');
const filesHTML = require('../helpers/files-html');
const { generarJWT } = require('../helpers/generate-jwt');
const path = require('path');
const fs   = require('fs');

const register =  (req = request, res = response) => {
    const conx = new ConexionSequelize();

    conx.registrarUsuario(req)    
        .then( msg => {
            res.status(201).json({success:true, msg:'¡Registrado correctamente!. \n Revise su correo electrónico para verificar su registro'});
        })
        .catch ( err => {
            res.status(203).json({success:false, msg:'¡Error!. \n Fallo en el registro', err});
        });
}

const verificarCorreo = (req, res = response) => {
    const conx = new ConexionSequelize();
    conx.verificarCorreo(req.params.id)
        .then(resp => {
            if (resp) res.send(filesHTML.exitoVerificar());
            else res.send(filesHTML.errorVerificar());

        }).catch(err => {
            res.send(filesHTML.errorVerificar());
        });
}

    module.exports = {
        register,
        verificarCorreo
    }