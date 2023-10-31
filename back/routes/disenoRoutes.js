const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/disenoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/listado/:id', controlador.listadoDisenos);


module.exports = router