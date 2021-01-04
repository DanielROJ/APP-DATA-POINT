'use strict' 


const {Pool,Client} = require('pg')
const connectionString = process.env.URIDB;



const client = new Client({
    connectionString: connectionString,
    
})




const pool = new Pool({
    connectionString: connectionString,
    max:20,
})

async function ejecutaQuery(text) {

//a.rowCount
//a.rows
//a.fields
   const client = await pool.connect()
    try { 
const query = await client.query(text)  
return query
    }  catch (err) {
        console.log("Durante la ejcucion del query se presento : ", err)
        return;
    }finally {
        client.release()
      }
}

module.exports = {
ejecutaQuery
}



