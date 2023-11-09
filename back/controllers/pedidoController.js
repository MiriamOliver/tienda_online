const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionPedido');
const moment = require('moment');

const getBeneficiosMeses = (req, res = response) => {
    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    const fechaActual = moment().format('YYYY');
    let listaBeneficios = [];
    const conex = new ConexionSequelize();
    conex.getBeneficioMeses(req.params.id)
        .then( beneficios => {
            beneficios.forEach(beneficio => {
                beneficio.fecha = beneficio.fecha = moment(beneficio.fecha, fechaCompleta).format('DD-MM-YYYY');
                if(fechaActual == beneficio.fecha.slice(6, 10)){
                    beneficio.precio = Number(beneficio.precio);
                    listaBeneficios.push(beneficio);
                }
            });
            res.status(200).json(listaBeneficios); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

module.exports = {
    getBeneficiosMeses
}