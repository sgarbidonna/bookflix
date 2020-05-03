const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const passport = require('passport'); //no es mi passport.js sino la library
const config = require('../config/keyToken');
const validateRegisterInput = require('../validation/register');
const Suscriptor = require('../models/Suscriptor');
const Perfil = require('../models/Perfil');

router.get('/', async (req, res) => {
    const suscriptores = await Suscriptor.find();
    res.json(suscriptores);
});

router.post('/registrar', async (req,res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);
    
    if(!isValid){
        return res.status(400).send(errors);
    }
    
    const suscriptor = await Suscriptor.findOne({ email: req.body.email });
       
    if (suscriptor){
        return res.status(500).send('Ingrese otro email, el actual ya está en uso' );
       //401 sin auth
    }
    const nuevoSuscriptor = new Suscriptor({
        nombre: req.body.nombre,
        email:req.body.email,
        password:req.body.password,
        suscripcion: req.body.suscripcion,
        perfiles: [new Perfil({ nombre:req.body.nombre })]
    });

    const nuevo= await nuevoSuscriptor
        .save()
        .then(res.status(200).send('Suscriptor Registrade'))
        .catch(err => res.status(500).send(err));


    const token = JWT.sign({id:nuevoSuscriptor._id}, config.secret,{
        expiresIn: 60 * 60 * 2  
     });
    console.log(token, {id: nuevo._id});
    
//    res.json({auth:true,token}); no me deja por los headers , pero en el login si me dejaaaa whatafaccc
});

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/register',
    successRedirect: '/',
}));
 
//no entiendo bien como funciona pero es para cuando un suscriptor navegue por la aplicacion deberia tambien devolverse a si mismo y poder usarlo, para visualizar
router.get('/me', async (req,res,next)=>{
   
    const token = req.headers['xaccess']; //cuando se lo paso?
    if(!token){
        return res.status(401).json({
            auth:false,
            message: 'no token provided'
        });
    }
    const decoded = JWT.verify(token, config.secret);

    const suscriptor = await Suscriptor.findById(decoded.id, { password:0 });

    if (!suscriptor){
        return res.status(404).send('Usuario no encontrado');
    }
    res.json(suscriptor);
});

router.post('/logout', (req,res) => {
    req.logout();
    res.redirect('/');  
});

//no funca
router.delete('/delete/:id'), async (re,res)=>{
    await Suscriptor.findByIdAndDelete(req.params.id)
        .then(res.status(400).send('Suscripción eliminada'))
        .catch(err);
};
//no funca
router.put('/update/:id', async (req,res) => {
    await Suscriptor.findByIdAndUpdate(req.params.id)
        .then(res.status(400).send('Suscripción eliminada'))
        .catch(err);

    /*
    const {nombre, email, password} = req.body;
    const token = req.headers['xaccess']; //cuando se lo paso?
    
    if(!token){
        return res.status(401).json({
            auth:false,
            message: 'no token provided'
        });
    }
    
    const decoded = JWT.verify(token, config.secret);
    
    await Suscriptor.findById(decoded.id, { password:0 }). update({
        nombre: nombre,
            email:email,
            password:password
        
    });

    res.json({auth:true,token});

*/



});


module.exports = router;



/*
router.post('/login', async (req,res,next)=>{
    
    const { email, password } = req.body;
    
    const suscriptor = await Suscriptor.findOne({email});
    
    if(!suscriptor){
        return res.status(404).send('No se encontró suscriptor');
    }
    
    const match = suscriptor.matchPassword(password);
    
    if (!match){
        res.status(401).send('Contraseña inválida');
    }
    
    const token = JWT.sign({id: suscriptor._id},config.secret,{
        expiresIn: 60 * 60 * 2
    });
    res.json({auth:true,token});
    

});
*/
