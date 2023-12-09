const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/pedidoController');
const { check } = require('express-validator');
const mid = require('../middlewares/user-middlewares')
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/beneficios/mes/:id', [mid.esAdmin, mid.usuarioExiste], controlador.getBeneficiosMeses);

router.get('/beneficios/anio/:id', [mid.esAdmin, mid.usuarioExiste], controlador.getBeneficiosAnios);

module.exports = router