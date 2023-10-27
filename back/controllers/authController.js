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

const login =  (req = request, res = response) => {
    const conx = new ConexionSequelize();
    conx.loginUsuario(req)    
        .then( user => {
            const resp = {
                success: true,
                msg: '¡Inicio de Sesión correcto!. Bienvenido a PICTOON',
                data: {
                    id: user.id,
                    nombre: user.nombre,
                    rol: user.rol,
                    avatar: user.avatar,
                    token: generarJWT(user.id, user.nombre, user.rol, user.avatar),
                },
            }
            res.status(200).json(resp);
        })
        .catch ( err => {
            console.log(err);
            res.status(203).json({success:false, msg:'¡Error!. Fallo en Inicio de Sesión', err});
        });
}

const emailPasswd = (req, res = response) => {
    const conx = new ConexionSequelize();
    conx.enviarCodigo(req.body.email)
    .then(resp => {
        res.send({success:true, msg:'Revisa tu correo para obtener el código de restauración de contraseña'});
    }).catch(err => {
        res.send({success:false, msg:'Fallo en la recuperación de contraseña. El email es incorrecto', err});
    });
}

const guardarPassword = (req, res = response) => {
    const conx = new ConexionSequelize();
    conx.restaurarPasswd(req.body.codigo, req.body.password)
    .then(resp => {
        res.send({success:true, msg:'Restauración de contraseña exitosa'});
    }).catch(err => {
        console.log(err);
        res.send({success:false, msg:'Fallo en la restauración de contraseña', err});
    });
}

const logout = (req = request, res = response) => {
    const conx = new ConexionSequelize();
    conx.cerrarSesion(req.body.id)
    .then(resp => {
        res.send({success:true, msg:'!OK!'});
    }).catch(err => {
        res.send({success:false, msg:'¡Error!', err});
    });
}

    module.exports = {
        register,
        verificarCorreo,
        login,
        emailPasswd,
        guardarPassword,
        logout
    }