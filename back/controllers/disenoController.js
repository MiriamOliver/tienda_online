const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionDiseno');
const moment = require('moment');


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

const listadoUltimosDisenos = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getDisenosUltimos()
    .then( disenos => {
        disenos.forEach(diseno =>{
            diseno.imagen = process.env.URL + process.env.PORT + "/upload/" + diseno.imagen;
        })
        res.status(200).json(disenos); 
    })
    .catch(err => {
        res.status(203).json({'msg':'No se han encontrado registros'});
    })
}

const listadoProductosRecomendados = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getProductosRecomendados(req.params.id)
        .then( productos => {
            if(productos == 0){

                res.status(200).json([])
            }else{

                productos.forEach(producto =>{
                    producto.imagen = process.env.URL + process.env.PORT + "/upload/" + producto.imagen;
                })
                res.status(200).json(productos); 
            }
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getArtistasAfines = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getArtistasRecomendados(req.params.id)
        .then( artistas => {
            if(artistas == 0){

                res.status(200).json([])
            }else{
                artistas.forEach(artista =>{
                    artista.avatar = process.env.URL + process.env.PORT + "/upload/" + artista.avatar;
                })
                res.status(200).json(artistas); 
            }  
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
            res.status(200).json(disenos); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getDatosUsuario = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getInfoUsuario(req.params.id)
        .then( usuario => {
            usuario[0].avatar = process.env.URL + process.env.PORT + "/upload/" + usuario[0].avatar; 
            usuario[0].fecha = moment(usuario[0].fecha).format("DD-MM-YYYY")           
            res.status(200).json(usuario[0]); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const registrarDiseno = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.crearDiseno(req)
        .then( id => {        
            res.status(200).json(id); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se pudo registrar'});
        })
    }

    const registrarProducto = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.crearProducto(req)
            .then( id => {        
                res.status(200).json({'sucess':true, id:id});
            })
            .catch(err => {
                res.status(203).json({'sucess':false});
            })
        }

    const getTipos = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.getTipos()
            .then( tipos => {        
                res.status(200).json(tipos);
            })
            .catch(err => {
                res.status(203).json({'msg':'No se encontraron registros'});
            })
        }

    const getDisenoProductos = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.getDisenoProductos(req.params.id)
            .then( diseno => {
                diseno.forEach(d =>{
                    d.imagen = process.env.URL + process.env.PORT + "/upload/" + d.imagen; 
                    d.fecha = moment(d.fecha).format("DD-MM-YYYY")
                });                  
                res.status(200).json(diseno[0]);
            })
            .catch(err => {
                res.status(203).json({'msg':'No se encontraron registros'});
            })
        }

    const listadoProductosDiseno = (req, res = response) => {
            const conex = new ConexionSequelize();
            conex.getListadoProductos(req.params.id)
            .then((productos) => {
                productos.forEach(p => {
                    p.imagen = process.env.URL + process.env.PORT + "/upload/" + p.imagen; 
                    p.fecha = moment(p.fecha).format("DD-MM-YYYY") 
                });
                res.status(200).json(productos);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se encontraron registros'});
        }) 
    }

    const activarProductosDiseno = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.activarProductos(req.params.id, req.body.activado)
        .then((resp) => {
        res.status(200).json({'success':true, 'msg':'Activado con éxito', resp});
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        }) 
    }

    const borrarProductosDiseno = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.deleteProductos(req.params.id)
        .then((resp) => {
            res.status(200).json({'success':true, 'msg':'Borrado con éxito', resp});
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        }) 
    }

    const getInfoDiseno = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.getInfoDiseno(req.params.id)
        .then((resp) => {
            resp.imagen = process.env.URL + process.env.PORT + "/upload/" + resp.imagen;
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        }) 
    }

    const modificarDiseno = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.modificarDiseno(req, req.params.id)
        .then((id) => {
            res.status(200).json(id);
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        }) 
    }

    const borrarDiseno = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.deleteDiseno(req.params.id)
        .then((resp) => {
            res.status(200).json({'success':true, 'msg':'Borrado con éxito', resp});
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        }) 
    }

    const activarDiseno = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.activarDiseno(req.params.id, req.body.activado)
        .then((resp) => {
        res.status(200).json({'success':true, 'msg':'Activado con éxito', resp});
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        }) 
    }

    const modificarProducto = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.modificarProducto(req.params.id, req)
        .then(resp => {
            res.status(200).json({'success':true, 'msg':'Modificado con éxito', resp});
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        })
    } 

    const conseguirDiseno = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.conseguirDiseno(req.params.id)
        .then(resp => {
            resp.fecha = moment(resp.fecha).format("DD-MM-YYYY") 
            resp.avatar = process.env.URL + process.env.PORT + "/upload/" + resp.avatar;
            resp.imagen = process.env.URL + process.env.PORT + "/upload/" + resp.imagen;
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        })
    } 

    const conseguirListaProductos = (req, res = response) => {
        const conex = new ConexionSequelize();
        conex.conseguirProductos(req.params.id)
        .then(resp => {
            resp.forEach(p =>{
                p.fecha = moment(resp.fecha).format("DD-MM-YYYY") 
                p.imagen = process.env.URL + process.env.PORT + "/upload/" + p.imagen;
            })
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'success':false, 'msg':'No se encontraron registros'});
        })
    }


module.exports = {
    listadoDisenos,
    listadoMisDisenos,
    listadoProductos,
    listadoUltimosDisenos,
    listadoProductosRecomendados,
    getArtistasAfines,
    getArtistaDestacado,
    getDisenosDestacados,
    getDisenosArtista,
    getDatosUsuario,
    registrarDiseno,
    registrarProducto,
    getTipos,
    getDisenoProductos,
    listadoProductosDiseno,
    activarProductosDiseno,
    borrarProductosDiseno,
    getInfoDiseno,
    modificarDiseno,
    activarDiseno,
    borrarDiseno,
    modificarProducto,
    conseguirDiseno,
    conseguirListaProductos
}