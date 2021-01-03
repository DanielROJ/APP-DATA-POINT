
const Sequelize = require('sequelize');
const sequelize = require('../../database/ConfigORM');
const TipoArchivo = require('./TipoArchivo').TipoArchivo;
const Concesionario = require('./Concesionario').Concesionario;


class Archivo extends Sequelize.Model { }


Archivo.init(
    {
        ida: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        nombre: { type: Sequelize.STRING(100, false), allowNull: false },
        rutabucket: { type: Sequelize.STRING(100, false), allowNull: false },
        hahs: { type: Sequelize.STRING, allowNull: false },
        idta: { type: Sequelize.INTEGER, allowNull: false, references: { key: 'idta', model:TipoArchivo, deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE } },
        fechasubida: { type: Sequelize.DATE, allowNull: false },
        horasubida: { type: Sequelize.TIME, allowNull: false },
        idc: { type: Sequelize.BIGINT, allowNull: false, references: { key: 'idc', model:Concesionario, deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE } }


    },
    {
        sequelize,
        timestamps: false,
        tableName: 'archivo'
    });

Archivo.hasOne(TipoArchivo,{foreignKey:'idta', sourceKey:'idta'});
TipoArchivo.belongsTo(Archivo,{foreignKey:'idta', targetKey:'idta'});

Concesionario.hasMany(Archivo,{foreignKey:'idc', sourceKey:'idc'});
Archivo.belongsTo(Concesionario,{foreignKey:'idc', targetKey:'idc'})




module.exports.Archivo = Archivo;