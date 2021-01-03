const Usuario = require('../models/class/Usuario.js').Usuario
const DAOusuario = require('../models/DAOs/DAOusuario.js')
const DAOarchivo = require('../models/DAOs/DAOarchivo.js')


var fs = require('fs')



let user = new Usuario();




function ControlArchivo(req, res, next) {
    (async function () {
        let userExternal = {}
        let logs = [];
        
        try {
            
            if (user != null && user.iduser != 0) {

                user = await DAOusuario.BuscarUsuarioEXT(user).catch(console.log)
                userExternal = user.userExterno

                logs = await DAOarchivo.DAOconsultarLogArchivo(userExternal.idExternal, null);

                let nombre = userExternal.nombreLugar
                //res.render('subida.hbs', { log: logs, nombre: nombre });
                console.log(logs)
                res.status(200).render('FL.hbs',{ log: logs, nombre: nombre })

            } else {
                res.redirect(301, '../')
            }

        } catch (err) {
            console.log("FALLA en el controlador SUBIR 1.0 : " + err)
            res.send("se encuentra caido el sistema por :  " + err)
        }

    })()

}



function CheckUpload(req, res, next) {
    (async function () {
        try {

            console.log(user)
            if (user != null && user.iduser != 0) {
                let fechaInicio = req.body.fechaInicio;
                let fechaFinal = req.body.fechaFin;
                let text = req.body.Descripcion;
                let archivo = req.files.y
                let md5 = archivo.md5();
                let name = archivo.name;
                let i = 0;

                i = await DAOarchivo.DAObuscarArchivo(md5);
                console.log(i == 0)

                let idarchivo = Math.floor((Math.random() * 100) + 1);


                k = new Archivo(idarchivo, fechaInicio, fechaFinal, text, md5, name);
                await DAOarchivo.DAOcargaArchivo(k, user.idExternal);

                await archivo.mv(__dirname + 'epiquisimo: /ArchivosS' + archivo.name);

                res.redirect(308, './subir');

            } else {

                res.redirect(301, '../')
            }

        } catch (err) {

            console.log("FALLA en el controlador SUBIR 2.0 : " + err)
        }
    })()
}

let nomArchivo= 'hola';

function CheckView(req, res, next) {

    (async function () {
        try {
            let fechaI = req.body.fecha;
            let fechaf = req.body.fecha2;
            let obk = {}
            

            if (fechaI != null || fechaf != null) {

                obk = await DAOarchivo.DAObuscarA(fechaI, fechaf).catch(console.log);
                console.log(obk)
                nomArchivo = obk.nombre;
            }
             
           user = await DAOusuario.BuscarUsuarioINT(user).catch(console.log)
            
            let interno = user._userInterno
              
            console.log(interno)

            if (obk.nombre == {}) {
                nomArchivo = "direcciones.json"
            }


            let nombreO = interno.nombre;
            let rolp = interno.rol;

            res.render('visor.hbs', { nombre: nombreO, rol: rolp, fechaInicial: obk.fechainicio, fechaFinal: obk.fechafinal })

        } catch (err) {
            console.log("ERROR EN EL CONTROLADOR VISOR")
        }

    })()

}



function CheckViewAJAX(req, res, next) {

    try {
           

        if (nomArchivo == "hola") {
            nomArchivo = "direcciones.json"
        }


        var contents = fs.readFileSync(__dirname + '/ArchivosS/' + nomArchivo);
        // Define to JSON type
        var jsonContent = JSON.parse(contents);


        res.status(200).send(jsonContent);
    } catch (err) {
        console.log("ERROR EN LA BUSQUEDA DE ARCHIVOS : " + err)
    }

}






module.exports = {
    ControlArchivo,
    CheckUpload,
    CheckView,
    CheckViewAJAX
}