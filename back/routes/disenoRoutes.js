const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/disenoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/listado', controlador.listadoDisenos);

router.get('/listado/afin/:id', controlador.listadoArtistaAfin);

router.get('/filtro/productos', controlador.listadoProductos);

router.get('/recomendar/productos/:id', controlador.listadoProductosRecomendados);

router.get('/artistas/afines/:id', controlador.getArtistasAfines);


module.exports = router