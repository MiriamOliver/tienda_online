const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        console.log(errors.errors[0].msg)
        return res.status(203).json({success:false, msg:errors.errors[0].msg});
    }

    next();
}

module.exports = {
    validarCampos
}