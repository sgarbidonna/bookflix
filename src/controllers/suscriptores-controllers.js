const suscriptoresCtrl = {};

const JWT = require('jsonwebtoken');
const config = require('../config/keyToken');

const validateRegisterInput = require('../validation/register');

const Suscriptor = require('../models/Suscriptor');
const Perfil = require('../models/Perfil');

suscriptoresCtrl.listar = async (req, res) => {
    const suscriptores = await Suscriptor.find();
    res.json(suscriptores);
};

suscriptoresCtrl.registrar = async (req,res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(req.body.suscripcion);

    if(!isValid){
        return res.send(errors);
    }
    
    const suscriptorEmail = await Suscriptor.findOne({ email: req.body.email });
    if (suscriptorEmail){
        return res.send('Ingrese otro email, el actual ya está en uso' );
    };
    
    
    const suscriptorDNI = await Suscriptor.findOne({dni: req.body.dni}) ;

    if(suscriptorDNI){
        return res.send('Ingrese otro dni, el actual ya está en uso')
    };

    const nuevoSuscriptor = new Suscriptor({
        nombre: req.body.nombre,
        email:req.body.email,
        password:req.body.password,
        dni: req.body.dni,
        suscripcion: req.body.suscripcion,
        perfiles: [new Perfil({ nombre: req.body.nombre })]
    });
 /* CUANDO SE AVANCE CON LA ASIGNACION DE PERFILES
    ACÁ SE PREGUNTA POR EL TIPO DE SUSCRIPCION Y AGREGARÍA
    UN ELEMENTO AL ARREGLO (SI ES REGULAR)
    O TRES ELEMENTOS AL ARREGLO (SI ES PREMIUM)

    if (req.body.suscripcion = 'regular'){
    } else {
         }   
*/
    await nuevoSuscriptor
        .save()
        .then( user => {
            JWT.sign(
                {   id: user._id },
                config.secret,
                {   expiresIn: '2h'} ,
                (err,token) => {
                    if(err) throw err;    
                    res.json({
                        token,
                        user:{
                            id: user._id,
                            email: user.email,
                        }
                    });
                }
            )
        })
        .catch(err => res.status(401).send(err));

};

suscriptoresCtrl.login = async (req,res) => {
    const { email , password } = req.body;
    
    //esto deberian checarlo en el front
    if(!email || !password ){
        return res.status(401).send('Debe rellenar todos los campos')
    }

    const suscriptor = await Suscriptor.findOne({ email })
    if (!suscriptor) {
        return res.status(401).send('El usuario no existe');
    }

    const match = await suscriptor.matchPassword(password);

    if(!match){
        return res.status(401).send('La contraseña es incorrecta');
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
};

suscriptoresCtrl.visualizar =  async (req,res)=>{

    await Suscriptor.findById(req.user.id)
        .then(user => res.status(200).send(user))
};

suscriptoresCtrl.soyAdmin = async (req,res) =>{
    
    const admin = await Suscriptor.findById(req.user.id);

    if (admin.email === 'admin@admin.com'){
        res.status(200).send(true)
    } else {
        res.status(200).send(false)
    }
}

suscriptoresCtrl.modificar =  async (req,res) => {
    console.log(req.body.suscripcion);
    const nuevoSuscriptor = await Suscriptor.findOne({email:req.body.email});
 
    if( nuevoSuscriptor && (nuevoSuscriptor._id != req.body.id )){
            res.send('El email ya esta en uso');
        }

    if(nuevoSuscriptor && (nuevoSuscriptor.dni != req.body.dni)){
            res.send('El DNI ya esta en uso');
        }
        
    const suscriptor = await Suscriptor.findById(req.body.id);


    const match = await suscriptor.matchPassword(req.body.password);
    if(!match){
        return res.json('La contraseña es incorrecta');
    }
    
    await suscriptor.updateOne({
            nombre: req.body.nombre, 
            email: req.body.email,
            dni: req.body.dni,
            suscripcion: req.body.suscripcion,
            //perfiles: [new Perfil({ nombre: req.body.nombre })]
            
    })
        .then( susc=> {
            res.send('Suscriptor modificado');
            susc
        
        })        
        .catch(err => res.status(401).send(err)); 
        
};

suscriptoresCtrl.eliminar =  async (req,res)=>{
    console.log(req.body.id);
    
    await Suscriptor.findByIdAndRemove(req.body.id)
        .then(respuesta=>  res.json(respuesta));
};

suscriptoresCtrl.logout = (req,res) => {
    //borro su token redireccionandolo al home
    req.logout().then(res.status(200).json('Sesion eliminada'))
                .catch(err => res.json(err));
    res.redirect('/');  
} 


module.exports = suscriptoresCtrl;