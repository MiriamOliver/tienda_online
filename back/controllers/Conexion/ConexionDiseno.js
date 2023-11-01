const ConexionSequelize = require('./ConexionSequelize');
const models = require('../../models/index.js');
const moment = require('moment');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

class ConexionDiseno extends ConexionSequelize {

    getDisenos = async () => {
        let disenos = null;
        let productos = null;

        try{

            disenos = await models.sequelize.query(`SELECT disenos.id, disenos.titulo, disenos.imagen, users.id AS 'id_artista', users.nombre, 
                                                        DATE_FORMAT(disenos.createdAt, "%d/%m/%Y") AS 'fecha', disenos.tema,disenos.estilo FROM disenos 
                                                        JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                        JOIN users on users.id = disenosartistas.id_user;`, 
                                                        { type: QueryTypes.SELECT });


            productos = await models.sequelize.query(`SELECT tipos.tipo as tipo, disenos.id as id_diseno FROM tipos 
                                                        JOIN productos ON productos.id_tipo=tipos.id 
                                                        JOIN disenoproductos ON disenoproductos.id_producto=productos.id 
                                                        JOIN disenos ON disenoproductos.id_diseno=disenos.id;`, 
                                                        { type: QueryTypes.SELECT });
            
            
            return this.ordenarDisenoProductos(disenos, productos); 

            
        }catch (err){

            throw err;
        }     
    }


    ordenarDisenoProductos = (disenos, productos) => {
        disenos.forEach(diseno => {
            let listaProductos = [];
            productos.forEach(producto=>{
                if(producto.id_diseno == diseno.id){
                    listaProductos.push(producto.tipo);
                }
            })
            diseno.productos = listaProductos;
            diseno.imagen = process.env.URL + process.env.PORT + "/upload/" + diseno.imagen;
        });

        return disenos;
    }
}

module.exports = ConexionDiseno;