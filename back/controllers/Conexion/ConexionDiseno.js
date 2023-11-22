const ConexionSequelize = require('./ConexionSequelize');
const models = require('../../models/index.js');
const moment = require('moment');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { listadoDisenos } = require('../disenoController.js');

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

            favoritos = await models.sequelize.query(`select COUNT(disenosartistas.id_diseno) as 'cantDisenos', disenosartistas.id_user as 'artista' from disenosartistas 
                                                        JOIN favoritos on disenosartistas.id_diseno=favoritos.id_diseno 
                                                        where favoritos.id_user = ? group by disenosartistas.id_user ORDER BY 'cantDisenos' DESC;`, 
                                                        { replacements: [id], type: QueryTypes.SELECT });
           
            return favoritos;
     
        }catch (err){

            throw err;
        }     
    }

    getProductosRecomendados = async(id) => {

        let recomendados = null;
        let disenosRecomendados = null;
        let listaDisenosRecomendados = [];
        let cont = 6;

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
    
            disenosRecomendados.forEach(e =>{
                if(cont > 0){
                    listaDisenosRecomendados.push(e);
                    cont --;
                }
            })
            
            return listaDisenosRecomendados;
     
        }catch (err){

            throw err;
        }     
    }

    getArtistasRecomendados = async(id) =>{

        let idArtistas = [];
        let listaArtistas = [];
        let favoritos = null;
        let cont = 6;

        try{

            favoritos = await models.sequelize.query(`select COUNT(disenosartistas.id_diseno) as 'disenos', disenosartistas.id_user as 'artista' from disenosartistas 
                                                        JOIN favoritos on disenosartistas.id_diseno=favoritos.id_diseno 
                                                        where favoritos.id_user = ? group by disenosartistas.id_user ORDER BY disenosartistas.id_diseno;`, 
                                                        { replacements: [id], type: QueryTypes.SELECT });
            

            favoritos.forEach(artista => {
                if(cont > 0){
                    idArtistas.push(artista.artista);
                    cont --;
                }
            });
                                                
            listaArtistas = await models.User.findAll({
                attributes:['id','nombre','avatar'],
                where: {id:{[Op.in]: idArtistas}}
            });
            
            return listaArtistas;

            
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

    getProductos = async() => {

        let resultado = await models.Tipo.findAll({
            attributes: ['tipo'],
        })

        return resultado;
    }

    getDisenosUltimos = async() => {
        let disenos = null;

        try{

            disenos = await models.sequelize.query(`SELECT disenos.id, disenos.titulo, disenos.imagen, users.id AS 'id_artista', users.nombre, 
                                                        disenos.createdAt AS 'fecha', disenos.tema,disenos.estilo FROM disenos 
                                                        JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                        JOIN users on users.id = disenosartistas.id_user ORDER BY disenos.createdAt DESC;`, 
                                                        { type: QueryTypes.SELECT });
          
            return disenos;
            
        }catch (err){

            throw err;
        }     
    }

    getArtistaDestacado = async() => {
        let artista = null;

        artista = await models.sequelize.query(`select users.id, users.nombre, users.avatar, COUNT(disenosartistas.id_diseno) as 'disenos' from disenosartistas 
                                                JOIN favoritos on disenosartistas.id_diseno=favoritos.id_diseno 
                                                join users on users.id=disenosartistas.id_user 
                                                group by disenosartistas.id_user ORDER BY disenosartistas.id_diseno;`,
                                                { type: QueryTypes.SELECT })
        return artista[0];
    }

    getDisenosDestacados = async() => {
        let productos = null;
        let listaProductos = [];
        let cont = 3;

        productos = await models.sequelize.query(`select disenos.id, disenos.titulo, disenos.imagen, users.nombre, disenos.createdAt AS 'fecha', COUNT(disenosartistas.id_diseno) as 'disenos' from disenosartistas 
                                                JOIN favoritos on disenosartistas.id_diseno=favoritos.id_diseno JOIN users on users.id=disenosartistas.id_user 
                                                JOIN disenos on disenos.id = disenosartistas.id_diseno group by favoritos.id_diseno 
                                                ORDER BY disenosartistas.id_diseno DESC`,
                                                { type: QueryTypes.SELECT })
    
              
        productos.forEach(producto =>{
            if(cont > 0){
                producto.imagen = process.env.URL + process.env.PORT + "/upload/" + producto.imagen;
                listaProductos.push(producto);
                cont--;
            }
        })

        return listaProductos;
    }

    getDisenosArtista = async (id) => {

        let disenos = null;
        let listaDisenos = [];
        let idDiseno = null;

        try{

            disenos = await models.sequelize.query(`SELECT disenos.id, disenos.titulo, disenos.imagen, disenos.tema, disenos.estilo,
                                                    SUM(pedidos.cantidad * productos.precio) as 'precio', 
                                                    SUM(pedidos.cantidad) as 'cantidad' FROM disenos 
                                                    JOIN disenoproductos ON disenos.id = disenoproductos.id_diseno 
                                                    JOIN productos ON productos.id=disenoproductos.id_producto 
                                                    JOIN pedidos ON pedidos.id_producto=productos.id 
                                                    JOIN disenosartistas ON disenosartistas.id_diseno = disenos.id 
                                                    WHERE disenos.id IN (SELECT disenosartistas.id_diseno FROM disenosartistas 
                                                    WHERE disenosartistas.id_user = ?) GROUP BY disenosartistas.id_diseno;`, 
                                                    { replacements: [id], type: QueryTypes.SELECT });
            

           listaDisenos = await this.ordenarDisenos(disenos);

           idDiseno = await this.conseguirIdDiseno(disenos);

           return await this.getVentaProductos(idDiseno, listaDisenos); 
            
        }catch (err){

            throw err;
        }     
    }

    ordenarDisenos = async(disenos) => {

        let listaDisenos = [];

        disenos.forEach( d => {
            listaDisenos.push({
                id: d.id,
                titulo: d.titulo,
                imagen: process.env.URL + process.env.PORT + "/upload/" + d.imagen,
                tema: d.tema,
                estilo: d.estilo,
                cantidad: d.cantidad,
                precio: d.precio,
                productos: []
            })
        })

        return listaDisenos;
    }

    conseguirIdDiseno = async(disenos) =>{

        let idDiseno = [];

        disenos.forEach( d => {
            idDiseno.push(d.id);
        });

        return idDiseno;
    }


    getVentaProductos = async (idDiseno, listaDisenos) => {

        let productos = null;

        
        
        try{

            productos = await models.sequelize.query(`SELECT disenoproductos.id_diseno as 'id_diseno', productos.id as 'id_producto', productos.titulo, 
                                                        productos.imagen, pedidos.cantidad, tipos.tipo, productos.activado, productos.estado, 
                                                        SUM(pedidos.cantidad * productos.precio) as 'precio' FROM pedidos 
                                                        JOIN productos ON pedidos.id_producto = productos.id 
                                                        JOIN tipos ON tipos.id=productos.id_tipo 
                                                        JOIN disenoproductos ON productos.id = disenoproductos.id_producto 
                                                        WHERE productos.id IN (SELECT disenoproductos.id_producto FROM disenoproductos 
                                                        WHERE disenoproductos.id_diseno IN (?)) 
                                                        GROUP BY productos.id;`, 
                                                        { replacements: [idDiseno], type: QueryTypes.SELECT });
                                            
            productos.forEach(p =>{
                p.imagen = process.env.URL + process.env.PORT + "/upload/" + p.imagen;
                if(p.activado == 1 ){
                    p.activado = 'activado';
                }else{
                    p.activado = 'desactivado';
                }
                listaDisenos.forEach(d=>{
                    if(d.id == p.id_diseno){
                        d.productos.push(p);
                    }
                })
            })

            return listaDisenos;
            
        }catch (err){

            throw err;
        }   
    }

    getInfoMisDisenos = async(id) => {
     
        let idDiseno = null;

        try{

            let disenos = await models.sequelize.query(`SELECT COUNT(favoritos.id_diseno) as 'favoritos', disenos.id, disenos.titulo, disenos.imagen, users.id AS 'id_artista', 
                                                users.nombre, disenos.createdAt AS 'fecha', disenos.tema,disenos.estilo FROM disenos 
                                                JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                JOIN users on users.id = disenosartistas.id_user 
                                                LEFT JOIN favoritos ON favoritos.id_diseno = disenos.id 
                                                WHERE disenosartistas.id_user = ? 
                                                GROUP BY disenosartistas.id_diseno 
                                                ORDER BY fecha ASC;`, 
                                                { replacements: [id], type: QueryTypes.SELECT });

            idDiseno = await this.conseguirIdDiseno(disenos);

            let productos = await models.sequelize.query(`SELECT tipos.tipo as tipo, disenoproductos.id_diseno as id_diseno FROM tipos 
                                                        JOIN productos ON productos.id_tipo=tipos.id 
                                                        JOIN disenoproductos ON disenoproductos.id_producto=productos.id 
                                                        WHERE disenoproductos.id_diseno IN (?)
                                                        ORDER BY disenoproductos.id_diseno ASC;`, 
                                                        { replacements: [idDiseno], type: QueryTypes.SELECT });
            
            return this.ordenarDisenoProductos(disenos, productos); 

        }catch (err){

            throw err;
        } 
    }

    getInfoUsuario = async(id) => {

        try{

            let disenos = await models.sequelize.query(`SELECT COUNT(favoritos.id_diseno) as 'favoritos', COUNT(disenosartistas.id_diseno) as 'disenos', 
                                                        users.id, users.nombre, users.avatar, users.createdAt as 'fecha' FROM users 
                                                        JOIN disenosartistas ON disenosartistas.id_user=users.id 
                                                        LEFT JOIN favoritos ON disenosartistas.id_diseno=favoritos.id_diseno 
                                                        WHERE users.id = ?;`, 
                                                        { replacements: [id], type: QueryTypes.SELECT });

            return disenos;
                                                    
        }catch (err){

            throw err;
        } 
    }

    crearDiseno = async(req) => {
        try{

            const archivo = await File.subirArchivo(req.files, undefined, 'imgs' );

            const diseno = await models.Diseno.create({
                titulo: req.body.titulo,
                imagen: archivo,
                tema: req.body.tema,
                estilo: req.body.estilo,
                descripcion: req.body.descripcion
            });

            if(diseno){
                await models.DisenosArtistas.create({
                    id_user: req.body.id_artista,
                    id_diseno: diseno.dataValues.id
                })              
            }

            return diseno.dataValues.id;
            
        }catch (err){

            throw err;
        }
    }
} 

module.exports = ConexionDiseno;