const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/disenoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

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

router.post('/misdisenos/producto/crear', controlador.registrarProducto);

router.get('/misdisenos/producto/tipo', controlador.getTipos);

router.get('/misdisenos/diseno/:id', controlador.getDisenoProductos)


module.exports = router