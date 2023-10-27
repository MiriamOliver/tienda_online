const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, nombreExiste, emailDesconocido, emailVerificado } = require('../helpers/db-validators');

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

router.post('/login',
[
    check('email').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email', 'El correo no existe').custom(emailDesconocido),
    check('email', 'El correo no esta verificado').custom(emailVerificado),
    check('password').not().isEmpty(),
    validarCampos 

],controlador.login);

router.post('/recpassword',
[
    check('email').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email', 'El correo no existe').custom(emailDesconocido),
    validarCampos 
],
controlador.emailPasswd);

router.post('/genpassword',
[
    check('codigo').not().isEmpty(),
    check('password').not().isEmpty(),
    validarCampos
],
controlador.guardarPassword);

router.put('/logout', controlador.logout);


module.exports = router