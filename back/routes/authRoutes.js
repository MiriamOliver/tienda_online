const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, nombreExiste } = require('../helpers/db-validators');

router.post('/registro', 
[
    check('nombre').not().isEmpty(),
    check('nombre', 'El nombre ya existe').custom(nombreExiste),
    check('email').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email', 'El correo ya existe').custom(emailExiste),
    check('password').not().isEmpty(),
    validarCampos  

],controlador.register);

router.get('/verificarcorreo/:id', controlador.verificarCorreo);


module.exports = router