const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/disenoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/listado', controlador.listadoDisenos);

router.get('/listado/afin/:id', controlador.listadoArtistaAfin);

router.get('/filtro/productos', controlador.listadoProductos);


module.exports = router