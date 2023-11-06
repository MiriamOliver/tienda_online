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
                                                        disenos.createdAt AS 'fecha', disenos.tema,disenos.estilo FROM disenos 
                                                        JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                        JOIN users on users.id = disenosartistas.id_user ORDER BY disenos.createdAt DESC;`, 
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

    getArtistaAfin = async(id) =>{

        let favoritos = null;

        try{

            favoritos = await models.sequelize.query(`select COUNT(disenosartistas.id_diseno) as 'disenos', disenosartistas.id_user as 'artista' from disenosartistas 
                                                        JOIN favoritos on disenosartistas.id_diseno=favoritos.id_diseno 
                                                        where favoritos.id_user = ? group by disenosartistas.id_user ORDER BY disenosartistas.id_diseno;`, 
                                                        { replacements: [id], type: QueryTypes.SELECT });
           
            return favoritos;
     
        }catch (err){

            throw err;
        }     
    }

    getProductosRecomendados = async(id) => {

        let recomendados = null;
        let disenosRecomendados = null;

        try{

            recomendados = await models.sequelize.query(`select COUNT(disenos.id) AS 'cantfavoritos', disenos.tema from disenos where disenos.id IN 
                                                        (select favoritos.id_diseno FROM favoritos WHERE id_user = ?) 
                                                        group by disenos.tema ORDER BY cantfavoritos DESC;`, 
                                                        { replacements: [id], type: QueryTypes.SELECT });
           

            disenosRecomendados = await models.sequelize.query(`SELECT disenos.id, disenos.titulo, disenos.imagen, users.id AS 'id_artista', users.nombre, 
                                                                disenos.createdAt AS 'fecha', disenos.estilo, disenos.tema FROM disenos 
                                                                JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                                JOIN users on users.id = disenosartistas.id_user
                                                                WHERE disenos.tema = ?
                                                                ORDER BY disenos.createdAt DESC;`, 
                                                                { replacements: [recomendados[0].tema], type: QueryTypes.SELECT });
    
            return disenosRecomendados;
     
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

    getProductos = async () => {

        let resultado = await models.Tipo.findAll({
            attributes: ['tipo'],
        })

        return resultado;
    }
}

module.exports = ConexionDiseno;