

const tp = require('./TipoUsuario').TipoUsuario;

const us = require('./Usuario').Usuario;




(async function(){
   
    let t = await tp.findByPk(500);
    console.log(t)
   
})()

