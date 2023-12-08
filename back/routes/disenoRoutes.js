const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/disenoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const mid = require('./../middlewares/diseno-middlewares');

router.get('/listado/:id', controlador.listadoDisenos);

router.get('/ultimos/listado', controlador.listadoUltimosDisenos);

router.get('/filtro/productos', controlador.listadoProductos);

router.get('/recomendar/productos/:id', controlador.listadoProductosRecomendados);

router.get('/artistas/afines/:id', controlador.getArtistasAfines);

router.get('/artista/destacado', controlador.getArtistaDestacado);

router.get('/disenos/destacado', controlador.getDisenosDestacados);

router.get('/listado/estadisticas/:id', controlador.getDisenosArtista);

router.get('/listado/misdisenos/:id', controlador.listadoMisDisenos);

router.get('/misdisenos/usuario/:id', controlador.getDatosUsuario);

router.post('/misdisenos/crear', controlador.registrarDiseno);

router.get('/misdisenos/diseno/info/:id', controlador.getInfoDiseno);

router.post('/misdisenos/producto/crear', controlador.registrarProducto);

router.put('/misdisenos/editar/:id', controlador.modificarDiseno);

router.get('/misdisenos/producto/tipo', controlador.getTipos);

router.get('/misdisenos/diseno/:id', controlador.getDisenoProductos)

router.get('/misdisenos/listado/producto/diseno/:id', controlador.listadoProductosDiseno);

router.put('/misdisenos/producto/activar/:id', controlador.activarProductosDiseno);

router.delete('/misdisenos/producto/borrar/:id', controlador.borrarProductosDiseno);

module.exports = router