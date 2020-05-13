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
    
    if(!isValid){
        return res.status(200).send(errors);
    }
    
    // si existe el email
    const suscriptor = await Suscriptor.findOne({ email: req.body.email });
    if (suscriptor){
        return res.status(200).send('Ingrese otro email, el actual ya está en uso' );
    };
    
    //si no existe el email pregunto por el dni
    suscriptor = await Suscriptor.findOne({dni: req.body.dni}) ;
    if(suscriptor){
        return res.status(200).send('Ingrese otro dni, el actual ya está en uso')
    };

    //si llego aca es porq no se repite, lo guardo
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
                            nombre: user.nombre,
                        }
                    });
                }
            )
        })
        .catch(err => res.status(200).send(err));

};

suscriptoresCtrl.login = async (req,res) => {
    const { email , password } = req.body;
    
    //esto deberian checarlo en el front
    if(!email || !password ){
        return res.status(200).send('Debe rellenar todos los campos')
    }

    const suscriptor = await Suscriptor.findOne({ email })
    if (!suscriptor) {
        return res.status(200).send('El usuario no existe');
    }

    const match = await suscriptor.matchPassword(password);
    if(!match){
        return res.status(200).send('La contraseña es incorrecta');
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

suscriptoresCtrl.visualizar =  async (req,res,next)=>{
    // este req viene por medio del middleware auth, 
    // que se quedo con el token y del token saca el id
    // prestar atencion q el req es de USERy no de BODY

    Suscriptor.findById(req.user.id)
        .then(user => res.status(200).send(user))
};

suscriptoresCtrl.modificar =  async (req,res) => {
    // la consulta put no funciona, asique borramos y hacemos un suscriptor nuevo
    // esto implica quedarnos con sus datos unicos
    // pero le cambiaria el id, por lo que hay q actualizar su token

    const suscriptorViejo = await Suscriptor.findById(req.user.id);
    
    //me fijo que el mail no este en uso
    const nuevoSuscriptor = await Suscriptor.findOne( {email:req.body.email});
 
    if( nuevoSuscriptor ){
        //ahora que se que esta en uso, me fijo sie sta enuso por otra usuario
        if(nuevoSuscriptor != suscriptorViejo){
            res.status(200).send('El email ya esta en uso');
        }

        //el email de usuario y el entrante son de la misma persona, me aseguro 
        // de lo mismo con el dni
        nuevoSuscriptor = await Suscriptor.findOne({dni: req.body.dni});
        if(nuevoSuscriptor != suscriptorViejo){
            res.status.send('El DNI ya esta en uso');
        }
    }
    //si llegué aca, el usuario cambio su dni o su email correctamente
    // o bien cambió otros campos, los guardo

    await new Suscriptor ({
            nombre: req.body.nombre, 
            email: req.body.email,
            dni: req.body.dni,
            password:req.body.password, 
            suscripcion:req.body.suscripcion
            // restan modificar los perfiles
    })
        .save()
        .then( user => {
            //ahora que ya guarde el nuevo, borro el viejo
            suscriptorViejo.delete(), 
            //renuevo su token
            JWT.sign(
                {   id: user._id },
                config.secret,
                {   expiresIn: '2h'} , 
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
        
};

suscriptoresCtrl.eliminar =  async (req,res)=>{
    //encuentro el suscriptor y lo elimino redireccionandolo al home
    const suscriptor = await Suscriptor.findById(req.user.id);
    suscriptor.delete().then(res=> res.redirect('/'));
};

suscriptoresCtrl.logout = (req,res) => {
    //borro su token redireccionandolo al home
    req.logout();
    res.redirect('/');  
} 


module.exports = suscriptoresCtrl;