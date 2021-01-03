const conexion = require('./conexion.js')

let archivo = undefined;





async function DAOcargaArchivo(arch, iduser){
try{

archivo = arch;

var query= "insert into archivo values("+archivo.codigo+","+"'"+arch.descripcion+"'"+","+"'"+arch.fechaInicio+"'"+","+"'"+arch.fechaFinal+"'"+","+"'"+archivo.file+"'"+","+"'"+archivo.name+"'"+");"
result = await  conexion.ejecutaQuery(query).catch(console.log);

await DAOcrearLog(archivo.codigo,iduser);
return result;

}catch(err){
    console.log("ERROR EN DAOcargarArchivo : "+err);
    return;
}

}



 async function DAOcrearLog(idArchivo,iduser){

    try{ 
    var fecha = new Date()
     var dd = fecha.getDate();
     var mm = fecha.getMonth()+1; 
     var yyyy = fecha.getFullYear();
     var actual=yyyy+"-"+mm+"-"+dd
     var time = fecha.getHours() +":"+fecha.getMinutes()+":"+fecha.getSeconds();
     var query= "insert into archivo_userexternal values("+idArchivo+","+iduser+","+"'"+actual+"'"+","+"'"+time+"');"
     result = await conexion.ejecutaQuery(query); 

     return result;
    }catch(err)
    {
      console.log(" ERROR EN DAO_CREARLOG : "+err)
      return;
    }

}



async function DAObuscarArchivo(file){
try{
    var query= "select * from archivo where  file = "+"'"+file+"'"+";"
    result = await conexion.ejecutaQuery(query);
    
    
    return result.rowCount;
}catch(err){
    console.log(" ERROR EN DAO_buscarArchivo : "+err)
    return;
}
}




 async function DAOconsultarLogArchivo(iduser,idArchivo){
try{
let arr=[];
let query = "";
if(idArchivo!=null){
     query= "select idexternal, fecha, hora from archivo_userexternal where  idarchivo = "+idArchivo+";"
}else{
    query= "select idarchivo, fecha, hora from archivo_userexternal where  idexternal = "+iduser+";"
}

result = await conexion.ejecutaQuery(query);

if(result!=null){
let f = result.rowCount;
let i = 0
let x = {}
while(i<f){
let pt = [];    
x=result.rows[i];
arr.push(x);
i++;
}
}
return arr;

}catch(err){
console.log()
}

}

async function DAObuscarA(fechaInicio,fechaFinal){
    try{
        var query= "select nombre,fechainicio,fechafinal from archivo where  fechaInicio ="+"'"+fechaInicio+"'"+"and fechafinal="+"'"+fechaFinal+"'"+";"
        result = await conexion.ejecutaQuery(query);
        let nombre = result.rows[0];
        return nombre;
    }catch(err){
        console.log(" ERROR EN DAO_buscarArchivo : "+err)
        return;
    }
    }






module.exports={
DAOcargaArchivo,
DAOconsultarLogArchivo,
DAOcrearLog,
DAObuscarArchivo,
DAObuscarA
}
