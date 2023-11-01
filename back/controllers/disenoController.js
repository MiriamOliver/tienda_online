const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionDiseno');


const listadoDisenos = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getDisenos(req.params.id)
        .then( disenos => {
            console.log(disenos);
            res.status(200).json(disenos); 
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}



module.exports = {
    listadoDisenos
}