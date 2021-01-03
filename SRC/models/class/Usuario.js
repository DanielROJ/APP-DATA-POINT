const Sequelize = require('sequelize');
const sequelize = require('../../database/ConfigORM').seq;
const TipoUsuario = require('./TipoUsuario').TipoUsuario;


class Usuario extends Sequelize.Model { }

Usuario.init({

    idu: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameuser: { type: Sequelize.STRING(50, false), allowNull: false },
    pass: { type: Sequelize.STRING, allowNull: false },
    idtu: { type: Sequelize.INTEGER, allowNull: false, references: { model: TipoUsuario, key: 'idtu', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE } }

}, {
        sequelize,
        timestamps: false,
        tableName: 'users',
        modelName: 'Usuario'
    });


Usuario.hasOne(TipoUsuario, { foreignKey: 'idtu', sourceKey: 'idtu' });
TipoUsuario.belongsTo(Usuario, { foreignKey: 'idtu', targetKey: 'idtu' });


module.exports.Usuario = Usuario;