const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/pedidoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/beneficios/mes/:id', controlador.getBeneficiosMeses);

module.exports = router