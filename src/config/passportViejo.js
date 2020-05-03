const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const Suscriptor = require('../models/Suscriptor');

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token= req.cookies['access_token']
    }
    return token;
}

//autorization -> for protect resources
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey: 'secret'
}, (payload,done)=> {
        Suscriptor.findById({_id: payload.sub}, (err,suscriptor =>{
            if(err)
                return done(err,false);
            if (suscriptor)
                return done(null, suscriptor);
            else
                return done(null,false);
        }));
}))
//no entiendo de donde saca _id

//authentication
passport.use( new LocalStrategy((email,password,done) => {
    console.log('paso 1 ');

    Suscriptor.findOne({ email },(err,suscriptor)=>{
        if(err) //si algo fallo con la db
            return done(err);
        
        if(!suscriptor)
            return done(null,false);
        
        //este done function, es el callback de comparePassword en el schema
        suscriptor.comparePassword(password,done);
          
    })

}));