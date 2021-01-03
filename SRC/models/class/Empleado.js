
const Sequelize = require('sequelize');
const sequelize = require('../../database/ConfigORM').seq;
const TipoUsuario = require('./TipoUsuario').TipoUsuario;
const Usuario = require('./Usuario').Usuario;


class Empleado extends Sequelize.Model {}

Empleado.init({
    ide: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    cedula: { type: Sequelize.BIGINT, allowNull: false },
    nombre: { type: Sequelize.STRING(66), allowNull: false },
    cargo: { type: Sequelize.STRING(50), allowNull: false },
    celular: { type: Sequelize.BIGINT, allowNull: false },
    correo: { type: Sequelize.STRING(100), allowNull: false },

    idtu: { type: Sequelize.INTEGER, allowNull: false, references: { model: TipoUsuario, key: 'idTu', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE } },
    idu: { type: Sequelize.BIGINT, allowNull: false, references: { model: Usuario, key: 'idU', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE } }
}, {

        sequelize,
        modelName: 'empleado',
        timestamps: false,
        tableName:'empleado'

    });



Empleado.hasOne(Usuario,{foreignKey:'idu', sourceKey:'idu'});
Usuario.belongsTo(Empleado,{foreignKey:'idu', targetKey:'idu'});

Empleado.hasOne(TipoUsuario,{foreignKey:'idtu', sourceKey:'idtu'});
TipoUsuario.belongsTo(Empleado,{foreignKey:'idtu', targetKey:'idtu'});

module.exports.Empleado = Empleado;