'use strict'
//Cretor : _danielRoj 

//Import Configurations APP 
require('dotenv').config();

//Import Native Modules
const path = require('path');

//Import Modules Third part
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let pg = require('pg')
const session = require('express-session')
const bodyParser = require('body-parser')
const  hbs = require('express-hbs');
const fileUpload = require('express-fileupload')

//Import own modules or Locla Files 
const indexRouter = require('./routes/index');
const userExternal = require('./routes/concesionario')
const userInternal = require('./routes/distribuidoraDashBoard');




const app = express();


//config of sessions
let pool = new pg.Pool({
  connectionString: process.env.URIDB,
  max:20,
})


app.use(session({
  secret: process.env.SECRET,
  resave:true,
  saveUninitialized:true
}))
//-----------------------------------------



// view engine setup
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/'  

}));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs');

//Enable static public files (Css,JS, HTML)
app.use(express.static(path.join(__dirname, 'public')));

//Parser Different Request
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use(logger('dev'));

//Parser Cookies 
app.use(cookieParser());

//Enable Module file Upoload()
app.use(fileUpload());




//Define differents Routes In the App
app.use('/', indexRouter);
app.use('/external', userExternal);
app.use('/internal',userInternal);



// catch 404 and forward to error  handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
