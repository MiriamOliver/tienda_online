const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/disenoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const mid = require('../middlewares/user-middlewares');
const midDiseno = require('../middlewares/diseno-middlewares');
const { usuarioExiste, esAdministrador, disenoExiste } = require('../helpers/db-validators');


router.get('/listado/:id', [mid.usuarioExiste], controlador.listadoDisenos);

router.get('/ultimos/listado', controlador.listadoUltimosDisenos);

router.get('/filtro/productos', controlador.listadoProductos);

router.get('/recomendar/productos/:id', [mid.usuarioExiste], controlador.listadoProductosRecomendados);

router.get('/artistas/afines/:id', [mid.usuarioExiste], controlador.getArtistasAfines);

router.get('/artista/destacado', controlador.getArtistaDestacado);

router.get('/disenos/destacado', controlador.getDisenosDestacados);

router.get('/listado/estadisticas/:id', [mid.esAdmin, mid.usuarioExiste], controlador.getDisenosArtista);

router.get('/listado/misdisenos/:id', [mid.esAdmin, mid.usuarioExiste], controlador.listadoMisDisenos);

router.get('/misdisenos/usuario/:id', [mid.esAdmin, mid.usuarioExiste], controlador.getDatosUsuario);

router.post('/misdisenos/crear', 
[
    check('titulo').not().isEmpty(),
    check('tema').not().isEmpty(),
    check('tema', 'Valor no válido').isIn(['videojuego','original','libro','musica','serie']),
    check('estilo').not().isEmpty(),
    check('estilo', 'Valor no válido').isIn(['digital','mixto','tradicional']),
    check('descripcion').not().isEmpty(),
    check('id_artista', 'El usuario no existe').custom(usuarioExiste),
    check('id_artista', 'El usuario no tiene permisos de administrador').custom(esAdministrador),
    validarCampos 
],
controlador.registrarDiseno);

router.put('/misdisenos/editar/:id', 
[
    check('titulo').not().isEmpty(),
    check('tema').not().isEmpty(),
    check('tema', 'Valor no válido').isIn(['videojuego','original','libro','musica','serie']),
    check('estilo').not().isEmpty(),
    check('estilo', 'Valor no válido').isIn(['digital','mixto','tradicional']),
    check('descripcion').not().isEmpty(),
    check('id_artista', 'El usuario no existe').custom(usuarioExiste),
    check('id_artista', 'El usuario no tiene permisos de administrador').custom(esAdministrador),
    validarCampos 
],
[midDiseno.existeDiseno, midDiseno.modificarDisenoPropietario],
controlador.modificarDiseno);

router.put('/misdisenos/diseno/activar/:id', [mid.esAdminPropietario, midDiseno.existeDiseno, midDiseno.modificarDisenoPropietario], controlador.activarDiseno);

router.get('/misdisenos/diseno/info/:id', [midDiseno.existeDiseno], controlador.getInfoDiseno);

router.post('/misdisenos/producto/crear', 
[
    check('titulo').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('precio').not().isEmpty(),
    check('tipo').not().isEmpty(),
    check('id_artista', 'El usuario no existe').custom(usuarioExiste),
    check('id_artista', 'El usuario no tiene permisos de administrador').custom(esAdministrador),
    check('id_diseno', 'El diseño no existe').custom(disenoExiste),
],
controlador.registrarProducto);

router.get('/misdisenos/producto/tipo', controlador.getTipos);

router.get('/misdisenos/diseno/:id/:user', [mid.esAdmin, mid.usuarioExiste, midDiseno.propietarioDiseno, midDiseno.existeDiseno], controlador.getDisenoProductos)

router.get('/misdisenos/listado/producto/diseno/:id/:user', [mid.esAdmin, mid.usuarioExiste, midDiseno.productoExiste, midDiseno.propietarioDiseno, midDiseno.existeDiseno], controlador.listadoProductosDiseno);

router.put('/misdisenos/producto/activar/:id', [mid.esAdminPropietario, midDiseno.existePropietarioProducto, midDiseno.productoExiste], controlador.activarProductosDiseno);

router.delete('/misdisenos/producto/borrar/:id/:user', [mid.esAdmin, mid.usuarioExiste, midDiseno.productoExiste, midDiseno.propietarioProducto], controlador.borrarProductosDiseno);

router.delete('/misdisenos/diseno/borrar/:id/:user', [mid.esAdmin, mid.usuarioExiste, midDiseno.existeDiseno, midDiseno.propietarioDiseno], controlador.borrarDiseno);

router.put('/misdisenos/producto/editar/:id', 
[
    check('titulo').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('precio').not().isEmpty(),
    check('tipo').not().isEmpty(),
    check('estado', 'Valor no válido').isIn(['disponible','agotado','pocas existencias']),
    check('id_artista', 'El usuario no existe').custom(usuarioExiste),
    check('id_artista', 'El usuario no tiene permisos de administrador').custom(esAdministrador),
    check('id_diseno', 'El diseño no existe').custom(disenoExiste),
],
[midDiseno.productoExiste, midDiseno.existePropietarioProducto],
controlador.modificarProducto);

router.get('/infodiseno/diseno/:id', [midDiseno.existeDiseno], controlador.conseguirDiseno);

module.exports = router