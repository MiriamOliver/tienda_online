const ConexionSequelize = require('./ConexionSequelize');
const models = require('../../models/index.js');
const moment = require('moment');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

class ConexionPedido extends ConexionSequelize {

    constructor() {
        super();
    }

    getBeneficioMeses = async(id) => {
        let beneficios = null

        beneficios = await models.sequelize.query(`SELECT pedidos.fecha, SUM(pedidos.cantidad * productos.precio) as 'precio' FROM pedidos 
                                                    JOIN productos ON pedidos.id_producto = productos.id WHERE pedidos.id_producto IN 
                                                    (SELECT disenoproductos.id_producto FROM disenoproductos where disenoproductos.id_diseno IN 
                                                    (SELECT disenosartistas.id_diseno from disenosartistas WHERE disenosartistas.id_user = ? )) 
                                                    GROUP BY MONTH(pedidos.fecha), YEAR(pedidos.fecha) ORDER BY pedidos.fecha ASC;`,
                                                    { replacements: [id], type: QueryTypes.SELECT })
    

        return beneficios;
    }

    getBeneficioAnios = async(id) => {
        let beneficios = null

        beneficios = await models.sequelize.query(`SELECT pedidos.fecha, SUM(pedidos.cantidad * productos.precio) as 'precio' FROM pedidos 
                                                    JOIN productos ON pedidos.id_producto = productos.id WHERE pedidos.id_producto IN 
                                                    (SELECT disenoproductos.id_producto FROM disenoproductos where disenoproductos.id_diseno IN 
                                                    (SELECT disenosartistas.id_diseno from disenosartistas WHERE disenosartistas.id_user = ? )) 
                                                    GROUP BY YEAR(pedidos.fecha) ORDER BY pedidos.fecha DESC;`,
                                                    { replacements: [id], type: QueryTypes.SELECT })
    
        return beneficios;
    }

}

module.exports = ConexionPedido;