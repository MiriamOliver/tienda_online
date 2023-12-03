/* const ConexionDiseno = require('./Conexion/ConexionDiseno');
const moment = require('moment');

const socketController = (socket) => {
    //const id_handshake = socket.id;

    let {payload} = socket.handshake.query;


    if (payload != 'null') {
               
        payload = JSON.parse(payload) 

        socket.join(payload.id); 

        socket.on('listadoproductos', (res) => {
            listadoProductos(socket, payload, res);
        })
    }
}

const listadoProductos = (socket, payload, res) => {
    if(res.event == 'listadoproductos') {
        let conx = new ConexionDiseno();
        conx.getListadoProductos(res.payload.id)
        .then((productos) => {
            productos.forEach(p => {
                p.imagen = process.env.URL + process.env.PORT + "/upload/" + p.imagen; 
                p.fecha = moment(p.fecha).format("DD-MM-YYYY") 
            });
            socket.to(payload.id).emit('listadoproductos',productos);
            socket.emit('listadoproductos', productos);
        }); 
    }
}

module.exports = {
    socketController
} */