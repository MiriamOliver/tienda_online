const jwt = require('jsonwebtoken')
require('dotenv').config();

const generarJWT = (uid = '', nombre, rol, avatar) => {
  
    let token = jwt.sign({ uid, nombre, rol, avatar }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '24h' // 24 hours
    });

    return token;
}

const validarJWT = (token) => {

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }

}

const decodeJWT = (token = '') => {

    try {
        const { uid } = jwt.decode(token, process.env.SECRETORPRIVATEKEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }

}


module.exports = {
    generarJWT,
    validarJWT,
    decodeJWT
}