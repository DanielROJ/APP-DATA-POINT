
const Sequelize = require('sequelize');
const sequelize = require('../../database/ConfigORM');



class TipoArchivo extends Sequelize.Model{}


TipoArchivo.init(
    {
        idta:{type: Sequelize.BIGINT, primaryKey:true, autoIncrement:true, allowNull:false},
        tipo:{type: Sequelize.STRING(20,false), allowNull:false}
    },
    {
        sequelize,
        timestamps:false,
        tableName:'tipoarchivo'
    });



module.exports.TipoArchivo = TipoArchivo;

