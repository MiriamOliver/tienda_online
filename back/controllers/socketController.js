/* const ConexionDiseno = require('./Conexion/ConexionDiseno');
const moment = require('moment');

const socketController = (socket) => {
    const id_handshake = socket.id;

    let {payload} = socket.handshake.query;


    if (payload != 'null') {
               
        payload = JSON.parse(payload) 

        socket.join(payload.id); 

    }
}
*/