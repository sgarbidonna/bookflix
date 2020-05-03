const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const config = require('../config/keyToken');
const auth = require('../middleware/auth');
const cors = require('cors');
const validateRegisterInput = require('../validation/register');

const Suscriptor = require('../models/Suscriptor');
const Perfil = require('../models/Perfil');

router.get('/', async (req, res) => {
    const suscriptores = await Suscriptor.find();
    res.json(suscriptores);
});

router.post('/registrar', cors(), async (req,res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);
    
    if(!isValid){
        return res.status(400).send(errors);
    }
    
    const suscriptor = await Suscriptor.findOne({ email: req.body.email });
       
    if (suscriptor){
        return res.status(500).send('Ingrese otro email, el actual ya está en uso' );
    }
    const nuevoSuscriptor = new Suscriptor({
        nombre: req.body.nombre,
        email:req.body.email,
        password:req.body.password,
        suscripcion: req.body.suscripcion,
        perfiles: [new Perfil({ nombre:req.body.nombre })]
    });

    await nuevoSuscriptor
        .save()
        .then( user => {
            JWT.sign(
                {   id: user._id },
                config.secret,
                {   expiresIn: 3600} ,
                (err,token) => {
                    if(err) throw err;    
                    res.json({
                        token,
                        user:{
                            id: user._id,
                            nombre: user.nombre,
                    
                        }
                    });
                }
            )
        })
        .catch(err => res.status(500).send(err));

});

router.post('/login', cors(), async (req,res) => {
    const { email , password } = req.body;
    
    if(!email || !password ){
        return res.status(400).send('Debe rellenar todos los campos')
    }

    const suscriptor = await Suscriptor.findOne({ email })
    if (!suscriptor) {
        return res.status(400).send('El usuario no existe');
    }

    const match = await suscriptor.matchPassword(password);
    if(!match){
        return res.status(400).send('La contraseña es incorrecta');
    }
    //el primer parametro es un payload
    JWT.sign({ id: suscriptor._id },
        config.secret,
        {   expiresIn: 3600} ,
        async (err,token) => {
            if(err) throw err;    
            res.json({
                token,
                user: await Suscriptor.findById(suscriptor._id)
            });
        }
    )
});

router.get('/me',auth, cors(), async (req,res,next)=>{
    Suscriptor.findById(req.user.id)
        .then(user => res.status(400).send(user))
});
 
//debe recibir todos los datos y la validacion (en el front)
router.post('/modificar', auth, cors(), async (req,res) => {
    const suscriptorViejo = await Suscriptor.findById(req.user.id);
    
    if(! await Suscriptor.findOne({email:req.body.email}) != suscriptorViejo){
    await new Suscriptor ({
            nombre: req.body.nombre, 
            email: req.body.email,
            password:req.body.password, 
            suscripcion:req.body.suscripcion
    })
        .save()
        .then( user => {
            suscriptorActual.delete(),
            JWT.sign(
                {   id: user._id },
                config.secret,
                {   expiresIn: 3600} ,
                (err,token) => {
                    if(err) throw err;    
                    res.json({
                        token,
                        user
                    });
                }
            )
        })
        .catch(err => res.status(500).send(err)); 
        
    }
    res.send('El email ya esta en uso');
});

//no funciona
router.post('/eliminar', auth, cors(), async (req,res)=>{
    const suscriptor = await Suscriptor.findById(req.user.id);
    suscriptor.delete().then(res=> res.redirect('/'));
});

//no funciona
router.post('/logout', auth, cors(),(req,res) => {
    req.logout();
    res.redirect('/');  
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
