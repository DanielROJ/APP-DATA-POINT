const express = require('express');
const router = express.Router();



/* GET home page. */
router.get('/', function (req, res) {
  res.render('Login.hbs');
});


/**
 * 
 * 
 */
router.post('/login', function (req, res, next) {
  res.send("todo ok")

});



router.get('/favicon.ico', (req, res) => res.status(404));


router.get('/test',(req,res,next)=>{
  res.render('test.hbs');
})




module.exports = router;
