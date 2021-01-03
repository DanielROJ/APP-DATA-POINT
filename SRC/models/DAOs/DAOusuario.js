const conexion = require('./conexion.js')
const Usuario = require('../class/Usuario.js').Usuario
const UsuarioEXT = require('../class/Usuario.js').UsuarioExterno
const UsuarioINT = require('../class/Usuario.js').UsuarioInterno
var fs = require('fs')

let user = new Usuario();



/**
 * Este metodo permite encontrar los usuarios por su nombre de usuario realizando un query a la base de datos
 * @param {String} userName  nombre de usuario 
 * @returns {Object (Usuario)}  
 * @property {INT} iduser - numero unico del usuario en la base de datos. 
 */

async function BuscarUsuario(userName) {
     try {
          
          var query = 'select * from users where username =' + "'" + nameUser+ "'" + ";"
          let result;
          result = await conexion.ejecutaQuery(query);
          if (result.rowCount>0) {             
               user.iduser = result.rows[0].iduser;
               user.userName = result.rows[0].username;
               user.password = result.rows[0].password;
          }
          
          return user;
     } catch (err) {
          console.log("ERROR EN EL DAO BUSCARusuario : " + err)
          return
     }
}



async function BuscarUsuarioID(id) {
     try {
          var query = 'select * from Usuario where iduser =' +id+ ";"
          let result;
          result = await conexion.ejecutaQuery(query);
          if (result != null) {
               user.iduser = result.rows[0].iduser;
               user.userName = result.rows[0].username;
               user.password = result.rows[0].password;
          }
        
          return user;
     } catch (err) {
          console.log("ERROR EN EL DAO BUSCARusuario : " + err)
          return
     }
}



















/**
 * Este metodo permite encontrar usuario de tipo externo
 * @param {*} usert 
 */
async function BuscarUsuarioEXT(usert) {
     try {
          let query = 'select * from userexternal where iduser =' + usert.iduser + ";"
          let result;
          result = await conexion.ejecutaQuery(query);
          if (result != null) {

               usert.userExterno.nit = result.rows[0].nit
               usert.userExterno.direccion = result.rows[0].direccion
               usert.userExterno.nombreLugar = result.rows[0].name
               usert.userExterno.idExternal = result.rows[0].idexternal
          
               return usert

          }
     } catch (err) {
          console.log("ERROR EN EL DAO BUSCARusuarioEXT  : " + err)
          return
     }
}



/**
 *  usert.userInterno.idInternal = result.rows[0].idinterno
               usert.userInterno.rol = result.rows[0].nom
               usert.userInterno.nombre = result.rows[0].nombre
               
 * @param {*} usert 
 */
async function BuscarUsuarioINT(usert) {
     try {

          let query = 'select * from nani where iduser =' + usert.iduser + ";"
          let result = await conexion.ejecutaQuery(query);

          if (result != null) {
               usert.userInterno.nombre = result.rows[0].nombre
               usert.userInterno.idInternal = result.rows[0].idinterno
               usert.userInterno.rol= result.rows[0].nom
           
               return usert;
          }

     } catch (err) {
          console.log("ERROR EN EL DAO BUSCARusuarioINT  : " + err)
          return
     }
}




/**
 * 
 * @param {INT} iduser 
 */
async function GenerarLog(iduser) {

     try {
          var idlog = Math.floor((Math.random() * 100) + 1) + iduser;
          var fecha = new Date()
          var dd = fecha.getDate();
          var mm = fecha.getMonth() + 1;
          var yyyy = fecha.getFullYear();

          var actual = yyyy + "-" + mm + "-" + dd
          var time = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

          var query = 'insert into log values(' + idlog + "," + iduser + "," + "'" + actual + "'" + "," + "'" + time + "'" + ");"
          var result;
          result = await conexion.ejecutaQuery(query);
          return;

     } catch (err) {
          console.log("Se genero un  error en el metodo DAO-LOG : " + err)
     }

}





exports.BuscarUsuario = BuscarUsuario;
exports.BuscarUsuarioEXT = BuscarUsuarioEXT;
exports.BuscarUsuarioINT = BuscarUsuarioINT;
exports.GenerarLog = GenerarLog

exports.BuscarUsuarioID= BuscarUsuarioID;
















