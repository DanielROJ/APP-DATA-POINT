'use strict'

const Sequelize = require( 'sequelize');
const seq =new Sequelize(process.env.URIDB,{dilect:'postgres',pool:{max:18, min:0, require:30000, idle:10000}, logging:false});


function TestConnection (){
    seq
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}; 

module.exports={
    seq,
    TestConnection
}