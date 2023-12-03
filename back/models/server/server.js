const express = require('express');
const cors = require('cors');
const expfileupload = require("express-fileupload");
//const socket = require('./server-socket');


class Server {

    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.authPath = '/';
        this.disenoPath = '/diseno';
        this.pedidoPath = '/pedido';

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

        //Websockets.
        //this.sockets(); 
        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(expfileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true 
        }));
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath , require('../../routes/authRoutes'));
        this.app.use(this.disenoPath, require('../../routes/disenoRoutes'));
        this.app.use(this.pedidoPath, require('../../routes/pedidoRoutes'));
    }

    /* sockets(){
        socket.socketServer()
    } */

    listen() {
        this.server.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;