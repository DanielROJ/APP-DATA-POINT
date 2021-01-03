'use strict'

const path = require('path')
let pa= path.resolve('../','../config.js')
const confi = require(pa)
let FTP = require('ftp')
let fs= require('fs')



require('babel-polyfill')

let config = {
    host: 'files.000webhost.com',
    port: 21,
    user: 'epicdroro',
    password: confi.ftpPass,
    connTimeout: 50000
}






let client = new FTP();


/** 
client.on('ready', function() {
  client.status(function(err, status) {
    
    if (err) throw err;
    console.dir(status);
    client.end();
  });
});

  */


async function comprobar() {
    try {

        await client.connect(config)
        client.on('ready', function () {

       console.log('Conexion correcta ftp /n')

            client.list(function (err, list) {
                if (err) throw err;
                console.log(list); client.end()
            });

        });
        //let sta = await client.status()
        //console.log(sta)    
    } catch (err) {
        console.log("error _ " + err)
    }

}

async function uploadFile() {
    try {

        await client.connect(config)
        client.on('ready', function () {
            client.put(__dirname+'/fok.txt',"/ArchivosBase/texto",function(err){if(err) throw err; client.end()})
        });
        //let sta = await client.status()
        //console.log(sta)    
    } catch (err) {
        console.log("error _ " + err)
    }

}


async function dowloadFile() {
    try {

        await client.connect(config)
        console.log(pa)
        client.on('ready', function () {
            client.get('/ArchivosBase/texto',function(err, stream){
            if(err) throw err;   
            stream.once('close', function() { client.end(); });
            
            stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
        });
              
        }); 
    } catch (err) {
        console.log("error _ " + err)
    }

}







module.exports = {
    comprobar,
    dowloadFile,
    uploadFile
}