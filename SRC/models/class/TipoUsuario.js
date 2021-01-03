const Sequelize = require('sequelize');
const sequelize = require('../../database/ConfigORM').seq; //connection DataBase




class TipoUsuario extends Sequelize.Model {

    get idtu() {
        return this.idtu;
    }

    get tipo() {
        return this.tipo;
    }
}


TipoUsuario.init({
    idtu: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    tipo: { type: Sequelize.STRING(10, false), allowNull: false }
},
    {
        sequelize,
        timestamps: false,
        modelName: 'TipoUsuario',
        tableName: 'tipouser'
    });




module.exports.TipoUsuario = TipoUsuario;