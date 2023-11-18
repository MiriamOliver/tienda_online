const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionDiseno');


const listadoDisenos = async (req, res = response) => {
    let disenos;
    let favoritos = [];
    const conex = new ConexionSequelize();
    try{
        disenos = await conex.getDisenos()       
        if(disenos){
            conex.getArtistaAfin(req.params.id)
            .then(resp => {
                resp.forEach(e => {
                    disenos.forEach(d => {
                    if(e.artista == d.id_artista){
                        favoritos.push(d);
                    }
                    })
                })
                let data = {todos: disenos, afines:favoritos}
                res.status(200).json(data); 

            })
        }
            
    }catch(err){
        res.status(203).json({'msg':'No se han encontrado registros'});
    }
}

const listadoProductos = (req, res = response) => {
    let listaProductos = [];
    const conex = new ConexionSequelize();
    conex.getProductos()
        .then( productos => {
            productos.forEach(p => {
                p.checked = false;
                listaProductos.push({
                    tipo: p.tipo,
                    checked: false
                });
            });
            res.status(200).json(listaProductos); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const listadoProductosRecomendados = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getProductosRecomendados(req.params.id)
        .then( productos => {
            productos.forEach(producto =>{
                producto.imagen = process.env.URL + process.env.PORT + "/upload/" + producto.imagen;
            })
            res.status(200).json(productos); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getArtistasAfines = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getArtistasRecomendados(req.params.id)
        .then( artistas => {
            artistas.forEach(artista =>{
                artista.avatar = process.env.URL + process.env.PORT + "/upload/" + artista.avatar;
            })
            res.status(200).json(artistas); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getArtistaDestacado = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getArtistaDestacado()
        .then( artista => {
            artista.avatar = process.env.URL + process.env.PORT + "/upload/" + artista.avatar;
            res.status(200).json(artista); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getDisenosDestacados = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getDisenosDestacados()
        .then( disenos => {
            res.status(200).json(disenos); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getDisenosArtista = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getDisenosArtista(req.params.id)
        .then( disenos => {
            console.log(disenos);
            res.status(200).json(disenos); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const listadoMisDisenos = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getInfoMisDisenos(req.params.id)
        .then( disenos => {
            console.log(disenos);
            res.status(200).json(disenos); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}



module.exports = {
    listadoDisenos,
    listadoMisDisenos,
    listadoProductos,
    listadoProductosRecomendados,
    getArtistasAfines,
    getArtistaDestacado,
    getDisenosDestacados,
    getDisenosArtista
}