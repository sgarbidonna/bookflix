// el codgo del servidor-> el codigo de express
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require ('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('./config/passport');


// INITIALIZATIONS
const app = express();

// SETTINGS
app.set('port', process.env.PORT || 4000) ;
require('./config/passport');

// MIDDLEWARES-> funciones q se van ejecutando a medida q llegan las ejecuciones, antes de que se procese
app.use(express.urlencoded({extended: false}));//para soportar datos de parte del front
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session()); 


//GLOBAL VARIABLE

// STATIC FILES-> cualquier app cleinte puede acceder desde el servidor
app.use(express.static(path.join(__dirname,'public')));


//ROUTERS
app.use('/api/bookflix', require('./routes/api-bookflix'));
app.use('/api/suscriptores', require('./routes/api-suscriptor'));
app.use('/api/autores', require('./routes/api-autores'));
app.use('/api/editoriales', require('./routes/api-editoriales'));
app.use('/api/generos', require('./routes/api-generos'));
app.use('/api/novedades', require('./routes/api-novedades'));


module.exports = app;

