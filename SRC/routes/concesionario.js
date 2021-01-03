'use strict'
const express = require('express');
const router = express.Router();
const control = require('../Controllers/moduloControl.js')
// Route ROOT : /external


router.get("/view/principal",(req, res, next)=>{
    res.render("view_concesionario.hbs")
})


//Subida de archivos
router.post('/subir',control.ControlArchivo);


router.post('/file',control.CheckUpload)

router.get('/file',function(req, res){
res.redirect(301,'/subir')
})






module.exports = router;