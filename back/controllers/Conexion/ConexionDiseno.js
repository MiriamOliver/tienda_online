const ConexionSequelize = require('./ConexionSequelize');
const models = require('../../models/index.js');
const moment = require('moment');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

class ConexionDiseno extends ConexionSequelize {

    getDisenos = async (id) => {

        
    }
}

module.exports = ConexionDiseno;