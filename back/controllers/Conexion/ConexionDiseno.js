const ConexionSequelize = require('./ConexionSequelize');
const models = require('../../models/index.js');
const moment = require('moment');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { listadoDisenos } = require('../disenoController.js');
const File = require('../../helpers/file-upload');

class ConexionDiseno extends ConexionSequelize {

    constructor() {
        super();
    }

    getDisenos = async () => {
        let disenos = null;
        let productos = null;

        try{

            disenos = await models.sequelize.query(`SELECT disenos.id, disenos.titulo, disenos.imagen, users.id AS 'id_artista', users.nombre, 
                                                        disenos.createdAt AS 'fecha', disenos.tema,disenos.estilo FROM disenos 
                                                        JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                        JOIN users on users.id = disenosartistas.id_user 
                                                        WHERE disenos.activado = 1
                                                        ORDER BY disenos.createdAt DESC;`, 
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

            if(recomendados.length != 0){

                disenosRecomendados = await models.sequelize.query(`SELECT disenos.id, disenos.titulo, disenos.imagen, users.id AS 'id_artista', users.nombre, 
                                                                disenos.createdAt AS 'fecha', disenos.estilo, disenos.tema FROM disenos 
                                                                JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                                JOIN users on users.id = disenosartistas.id_user
                                                                WHERE disenos.tema = ?  AND disenos.activado = 1
                                                                ORDER BY disenos.createdAt DESC;`, 
                                                                { replacements: [recomendados[0].tema], type: QueryTypes.SELECT });
    
                disenosRecomendados.forEach(e =>{
                    if(cont > 0){
                        listaDisenosRecomendados.push(e);
                        cont --;
                    }
                })

                return listaDisenosRecomendados

            }else{

                return 0
            }
     
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
            
            if(favoritos.length != 0){
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
            }else{

                return 0
            }
              
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
                                                        JOIN users on users.id = disenosartistas.id_user 
                                                        WHERE disenos.activado = 1
                                                        ORDER BY disenos.createdAt DESC;`, 
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
                                                group by disenosartistas.id_user ORDER BY disenos DESC;`,
                                                { type: QueryTypes.SELECT })
        return artista[0];
    }

    getDisenosDestacados = async() => {
        let productos = null;
        let listaProductos = [];
        let cont = 3;

        productos = await models.sequelize.query(`select favoritos.id_diseno as 'id', disenos.titulo, disenos.imagen, users.nombre, disenos.createdAt AS 'fecha', 
                                                    COUNT(favoritos.id_diseno) as 'disenos' from favoritos 
                                                    JOIN disenos on disenos.id=favoritos.id_diseno 
                                                    JOIN disenosartistas on disenos.id = disenosartistas.id_diseno 
                                                    JOIN users on users.id=disenosartistas.id_user 
                                                    WHERE disenos.activado = 1 
                                                    group by favoritos.id_diseno 
                                                    ORDER BY disenos DESC`,
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

            let disenos = await models.sequelize.query(`SELECT COUNT(favoritos.id_diseno) as 'favoritos', disenos.id, disenos.activado, disenos.titulo, disenos.imagen, users.id AS 'id_artista', 
                                                users.nombre, disenos.createdAt AS 'fecha', disenos.tema, disenos.estilo FROM disenos 
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
                    id_user: Number(req.body.id_artista),
                    id_diseno: diseno.dataValues.id
                })              
            }

            return diseno.dataValues.id;
            
        }catch (err){

            throw err;
        }
    }

    crearProducto = async(req) => {

        try{

            const archivo = await File.subirArchivo(req.files, undefined, 'imgs' );

            const idTipo = await models.Tipo.findOne({
                attributes :['id'],
                where:{tipo: req.body.tipo}
            })
            
            const producto = await models.Producto.create({
                titulo: req.body.titulo,
                imagen: archivo,
                id_tipo: idTipo.dataValues.id,
                precio: Number(req.body.precio),
                descripcion: req.body.descripcion
            });

            if(producto){
                let prueba = await models.DisenoProducto.create({
                    id_diseno: Number(req.body.id_diseno),
                    id_producto: producto.dataValues.id
                })  
          
            }

            return producto.dataValues.id;
            
        }catch (err){

            throw err;
        }
    }

    getTipos = async() => {

        let listaTipos = [];

        try{

            let tipos = await models.Tipo.findAll({
                attributes: ['tipo']
            });

            tipos.forEach(t =>{
                listaTipos.push(t.tipo);
            })

            return listaTipos;

        }catch (err){

            throw err;
        }
    }

    getDisenoProductos= async(id) => {

        try{

            let disenos = await models.sequelize.query(`SELECT COUNT(favoritos.id_diseno) as 'favoritos', disenos.id, disenos.titulo, disenos.imagen, 
                                                disenos.createdAt AS 'fecha', disenos.tema, disenos.estilo, disenos.descripcion FROM disenos 
                                                JOIN favoritos ON favoritos.id_diseno = disenos.id 
                                                WHERE disenos.id = ?`, 
                                                { replacements: [id], type: QueryTypes.SELECT });
               
            return disenos;

        }catch (err){

            throw err;
        }
    }

    getListadoProductos = async(id) => {

        try{

            let productos = await models.sequelize.query(`SELECT tipos.tipo, productos.id, productos.titulo, productos.imagen, productos.precio, productos.estado, 
                                                            productos.createdAt AS 'fecha', productos.descripcion, productos.activado FROM productos 
                                                            JOIN tipos ON tipos.id = productos.id_tipo 
                                                            JOIN disenoproductos ON disenoproductos.id_producto = productos.id 
                                                            WHERE disenoproductos.id_diseno = ? ORDER BY fecha DESC`, 
                                                            { replacements: [id], type: QueryTypes.SELECT });
               
            return productos;

        }catch (err){

            throw err;
        }
        

    }

    activarProductos = async(id, activado) => {

        try{

            let producto = await models.Producto.update(
                {activado:activado},
                {where:{id:id}}
            );
               
            return producto;

        }catch (err){

            throw err;
        }
    }

    deleteProductos = async(id) => {

        try{

            let producto = await models.Producto.destroy({
                where:{id:id}
            })

            await models.DisenoProducto.destroy({
                where:{id_producto:id}
            })
               
            return producto;

        }catch (err){

            throw err;
        }
    }

    deleteDiseno = async(id) => {

        try{

            let diseno = await models.Diseno.destroy({
                where:{id:id}
            })

            await models.DisenosArtistas.destroy({
                where:{id_diseno:id}
            })
               
            return diseno;

        }catch (err){

            throw err;
        }
    }

    getInfoDiseno = async(id) => {
        try{
            let diseno = await models.Diseno.findOne({
                attributes:['id','titulo','imagen','tema','estilo','descripcion'],
                where:{id:id}
            })

            return diseno.dataValues
        }catch (err){

            throw err;
        }
    }

    modificarDiseno = async(req, id) => {

        try{

            if(req.files){
                const nombre = await File.subirArchivo(req.files, undefined, 'imgs' );
    
                await models.Diseno.update({
                    titulo:req.body.titulo,
                    imagen:nombre,
                    tema:req.body.tema,
                    estilo:req.body.estilo,
                    descripcion:req.body.descripcion,
                    },
                    {where:{id:id}}
                );
            }else{
                await models.Diseno.update({
                    titulo:req.body.titulo,
                    tema:req.body.tema,
                    estilo:req.body.estilo,
                    descripcion:req.body.descripcion,
                    },
                    {where:{id:id}}
                );

            }

            let diseno = await models.Diseno.findOne({
                attributes:['id'],
                where:{id:id}
            })
              
            return diseno.dataValues.id;

        }catch (err){

            throw err;
        }
    }

    activarDiseno = async(id, activado) => {

        try{

            let diseno = await models.Diseno.update(
                {activado:activado},
                {where:{id:id}}
            );
               
            return diseno;

        }catch (err){

            throw err;
        }
    }

    getDiseno = async(id) =>{
        const diseno = models.Diseno.findOne({
            where:{id:id}
        })

        return diseno;
    }

    getProducto = async(id) =>{
        const producto = models.Producto.findOne({
            where:{id:id}
        })

        return producto;
    }

    getPropietarioProducto = async(id, user) => {

        const producto = await models.DisenoProducto.findOne({
            attributes:['id_diseno'],
            where:{id_producto:id}
        })

        const propietario = await models.DisenosArtistas.findOne({
            attributes:['id_user'],
            where:{id_diseno:producto.dataValues.id_diseno}
        })

        if(propietario.dataValues.id_user == user){

            return propietario;
        }
    }

    getPropietarioDiseno = async(id, user) => {

        const propietario = await models.DisenosArtistas.findOne({
            attributes:['id_user'],
            where:{id_diseno:id}
        })

        if(propietario.dataValues.id_user == user){
            
            return propietario;
        }

    }

    modificarProducto = async(id, req) => {

        try{

            let idTipo = await models.Tipo.findOne({
                attributes:['id'],
                where:{tipo:req.body.tipo}
            })

            if(req.files){
                const nombre = await File.subirArchivo(req.files, undefined, 'imgs' );
    
                await models.Producto.update({
                    titulo:req.body.titulo,
                    imagen:nombre,
                    id_tipo:idTipo.dataValues.id,
                    precio: Number(req.body.precio),
                    descripcion:req.body.descripcion,
                    estado:req.body.estado,
                    },
                    {where:{id:id}}
                );
            }else{
                await models.Producto.update({
                    titulo:req.body.titulo,
                    id_tipo:idTipo.dataValues.id,
                    precio:Number(req.body.precio),
                    descripcion:req.body.descripcion,
                    estado:req.body.estado,
                    },
                    {where:{id:id}}
                ); 

            }

            let producto = await models.Producto.findOne({
                attributes:['id'],
                where:{id:id}
            })
              
            return producto.dataValues.id;

        }catch (err){

            throw err;
        }
    }

    conseguirDiseno = async(id) => {

        try{

            let diseno = await models.sequelize.query(`SELECT disenos.id, disenos.titulo, disenos.imagen, disenos.tema, disenos.estilo, disenos.descripcion, 
                                                        disenos.createdAt AS 'fecha', users.id AS 'id_artista', users.nombre, users.avatar, 
                                                        COUNT(disenoproductos.id_diseno) as 'cant_productos', COUNT(favoritos.id_diseno) as 'favoritos' FROM disenos 
                                                        JOIN disenosartistas ON disenos.id=disenosartistas.id_diseno 
                                                        JOIN users ON users.id=disenosartistas.id_user 
                                                        LEFT JOIN disenoproductos ON disenoproductos.id_diseno=disenos.id 
                                                        LEFT JOIN favoritos ON favoritos.id_diseno=disenos.id 
                                                        WHERE disenos.id = ? GROUP BY disenos.id;`, 
                                                        { replacements: [id], type: QueryTypes.SELECT });

            return diseno[0]
            
        }catch (err){

            throw err;
        }
    }

    conseguirProductos = async(id) => {

        try{

            let productos = await models.sequelize.query(`SELECT productos.id, productos.titulo, productos.imagen, productos.descripcion, productos.activado, productos.precio, 
                                                            productos.estado, productos.createdAt as 'fecha', tipos.tipo FROM productos 
                                                            JOIN tipos ON tipos.id = productos.id_tipo 
                                                            JOIN disenoproductos ON disenoproductos.id_producto = productos.id 
                                                            WHERE disenoproductos.id_diseno = ? AND productos.activado = 1 
                                                            ORDER BY fecha DESC`, 
                                                            { replacements: [id], type: QueryTypes.SELECT });

            return productos
            
        }catch (err){

            throw err;
        }
    }

} 

module.exports = ConexionDiseno;