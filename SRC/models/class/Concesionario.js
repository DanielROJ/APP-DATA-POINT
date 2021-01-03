
const Sequelize = require('sequelize');
const sequelize = require('../../database/ConfigORM');
const TipoUsuario = require('./TipoUsuario').TipoUsuario;
const Usuario = require('./Usuario').Usuario;

class Concesionario extends Sequelize.Model { }

Concesionario.init(
    {
        idc: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING(20, false), allowNull: false },
        direccion: { type: Sequelize.STRING(100, false), allowNull: false },
        nit: { type: Sequelize.BIGINT, allowNull: false },
        telefono: { type: Sequelize.BIGINT, allowNull: false },
        correocliente: { type: Sequelize.STRING(100, false), allowNull: false },
        correoempresa: { type: Sequelize.STRING(100, false), allowNull: false },
        celular: { type: Sequelize.BIGINT, allowNull: false },
        idtu: { type: Sequelize.INTEGER, allowNull: false, references: { key: 'idtu', model: TipoUsuario, deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE } },
        idu: { type: Sequelize.BIGINT, allowNull: false, references: { key: 'idu', model: Usuario, deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE } }
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'concesionario'
    });


Concesionario.hasOne(TipoUsuario, { foreignKey: 'idtu', sourceKey: 'idtu' });
Concesionario.hasOne(Usuario, { foreignKey: 'idu', sourceKey: 'idu' });

TipoUsuario.belongsTo(Concesionario, { foreignKey: 'idtu', targetKey: 'idtu' });
Usuario.belongsTo(Concesionario, { foreignKey: 'idu', targetKey: 'idu' });


module.exports.Concesionario = Concesionario;