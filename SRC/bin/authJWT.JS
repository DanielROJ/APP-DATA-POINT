const jwt= require('json-web-token')
let moment = require('moment')
const config = require('../config.js')



function crearToken(){

    const payload={

     sub: 1234556,
     iat : moment.now(),
     exp : moment().add(1,'days').unix(),
    }
    
    let token= jwt.encode(payload, process.env.SECRET);
    return token
 }





function verificarToken(req, res, next){

try{
    if(!req.headers.authorization){    
    res.status(401).send("error")

    }else{

   if(payload.exp<= moment().unix()){
    res.status(401)  
}else{

const token= req.headres.authorization.split(" ")[1]
const payload= jwt.decode(token,config.secret)
req.user=payload.sub;
next()

}
    }
  
}catch(err){

    req.status(500).send({error: "problema en el JWT"})


}

}


module.exports={
    verificarToken,
    crearToken
}
