const ConexionSequelize = require('./ConexionSequelize');
const models = require('../../models/index.js');
const moment = require('moment');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

class ConexionPedido extends ConexionSequelize {

    getBeneficioMeses = async(id) => {
        let beneficios = null

        beneficios = await models.sequelize.query(`SELECT pedidos.fecha, SUM(pedidos.cantidad * productos.precio) as 'precio' FROM pedidos 
                                                    JOIN productos ON pedidos.id_producto = productos.id WHERE pedidos.id_cliente = ? 
                                                    GROUP BY MONTH(pedidos.fecha), YEAR(pedidos.fecha) ORDER BY pedidos.fecha ASC;`,
                                                    { replacements: [id], type: QueryTypes.SELECT })
    

        console.log(beneficios);
        
                                                    return beneficios;


    }

}

module.exports = ConexionPedido;