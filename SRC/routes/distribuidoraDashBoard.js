'use strict'
const express = require('express');
const router =express.Router();
const control = require('../Controllers/moduloControl.js')

// Route ROOT : /internal


router.get("/view/principal",(req, res, next)=>{
    res.render("Views_Distribuidora/view_dashboard.hbs")
})


//Visualizacion de Resultados
router.post('/visor',control.CheckView);
router.get('/visor/j',control.CheckViewAJAX);



 






module.exports  = router;