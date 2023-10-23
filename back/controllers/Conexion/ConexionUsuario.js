const ConexionSequelize = require('./ConexionSequelize');
const { v4: uuidv4 } = require('uuid');
const models = require('../../models/index.js');
const File = require('../../helpers/file-upload');
const moment = require('moment');
const correo = require('../../helpers/correo');
const { Op } = require('sequelize');

class ConexionUsuario extends ConexionSequelize {

    constructor() {
        super();
    }

    registrarUsuario = async (req) => {

        try{

            const archivo = await File.subirArchivo(req.files, undefined, 'imgs' );

            const usuario = await models.User.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                avatar:archivo
            });

            if(usuario){
                const idRol = await this.getIdRol('cliente');
                await this.asignarRol(usuario.dataValues.id, idRol.dataValues.id);
                correo.verificarCorreo(usuario.dataValues.id, usuario.dataValues.email, 'verificarcorreo');
                
            }

            return usuario.dataValues;
            
        }catch (err){
            throw err;
        }
    }

    loginUsuario = async (req) => {

        const user = await models.User.findOne({
            attributes: ['id', 'nombre', 'avatar'],
            where : {
                email: req.body.email,
                password: req.body.password,
                habilitado: 1,
                verifiedAt:{[Op.ne]: null}
            },  

            include: 'RolesAsignados'
        });
        
        const idRol = user.dataValues.RolesAsignados[0].dataValues.id_rol;
        const rol = await models.Rol.findByPk(idRol);

        await models.User.update({conectado: 1}, 
                                {where: {id:user.dataValues.id}});

        return {
            id: user.dataValues.id,
            avatar: process.env.URL + process.env.PORT + "/upload/" + user.dataValues.avatar,
            nombre: user.dataValues.nombre,
            rol: rol.dataValues.rol,
        };
    } 

    getIdRol = async (rol) => {
        
        const idRol = await models.Rol.findOne({
            attributes: ['id'],
            where: { rol: rol },
        });

        return idRol;
    }

    asignarRol = async (idUser, idRol) => {
        const resp = await models.RolesAsignados.create({
            id_user: idUser,
            id_rol: idRol
        });
        return resp;
    }

    verificarCorreo = async(id) => {  
        let resultado = null;

        console.log(id);

        try {
            const usuario = await models.User.findByPk(id);
            
            if (usuario) {      
                resultado = await usuario.update({verifiedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')});
            }

            return resultado;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = ConexionUsuario;