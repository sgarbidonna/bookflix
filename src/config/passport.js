const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Suscriptor = require('../models/Suscriptor');

passport.use(new LocalStrategy({
    usernameField :'email',
    passwordField :'password'
}, async (email, password, done) => {
    // aca valido

    //match email 
    const suscriptor = await Suscriptor.findOne( { email } );

    if (!suscriptor){
        console.log('no existe');
        return done(null, false, {mensaje : 'No existe el suscriptor'} );
    } 
    else{
        //match password
        const match = await suscriptor.matchPassword(password)
        
        if (match){    
            return done(null, suscriptor);
        } else {       
            return done(err, false, { mensaje : 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((suscriptor,done ) => {
    done(null,suscriptor.id);
});

passport.deserializeUser((id, done) =>{
    Suscriptor.findById(id,(err,suscriptor)=>{
        done(err, suscriptor);
    })
});

/*
en vez de usar el middleware passport.use(); tb podria usar esto
module.exports = {}
*/