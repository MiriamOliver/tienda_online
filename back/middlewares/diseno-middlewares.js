require('dotenv').config();
const Conexion = require('../controllers/Conexion/ConexionDiseno');
const { response, request } = require('express');

const existeDiseno = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getDiseno(req.params.id)
    .then( diseno => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'Diseño no registrado' });
    });
}

const productoExiste = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getProducto(req.params.id)
    .then( producto => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'Producto no registrado' });
    });
}

const propietarioDiseno = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getPropietarioDiseno(req.params.id, req.params.user)
    .then( diseno => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No es propietario' });
    });
}

const propietarioProducto = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getPropietarioProducto(req.params.id, req.params.user)
    .then( producto => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No es propietario' });
    });
}

const modificarDisenoPropietario = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getPropietarioDiseno(req.params.id, req.body.id_artista)
    .then( diseno => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No es propietario' });
    });
}

const modificarPropietarioProducto = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getPropietarioProducto(req.params.id, req.body.id_artista)
    .then( producto => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No es propietario del producto' });
    });
}

const propietarioDisenoProducto = async (req, res, next) => {
    const conexion = new Conexion();
    conexion.getPropietarioDisenoProducto(req.params.id, req.body.id_diseno, req.body.id_artista)
    .then( producto => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No es propietario del diseño o del producto' });
    });
}

const existePropietarioProducto = async (req, res, next) => {
    const conexion = new Conexion();
    conexion.getPropietarioProducto(req.params.id, req.body.id_artista)
    .then( producto => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No es propietario' });
    });
}

module.exports = {
    productoExiste,
    existeDiseno,
    propietarioProducto,
    propietarioDiseno,
    modificarDisenoPropietario,
    modificarPropietarioProducto,
    propietarioDisenoProducto,
    existePropietarioProducto
}