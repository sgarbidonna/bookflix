const generosCtrl = {};
const Genero = require('../models/Genero');

generosCtrl.listar = async (req, res) => {
    const generos = await Genero.find()
    res.json(generos);
};

generosCtrl.visualizar =async (req, res) => {
    const genero = await Genero.findById(req.body.id);
    res.json(genero);
};

generosCtrl.cargar=async (req,res) => {
    
    const genero = await Genero.findOne({ nombre:req.body.nombre });
    
    if(genero){
       return res.status(401).json('El género ya fue cargado anteriormente')
    }
    await new Genero({
        nombre: req.body.nombre,
       }).save()
        .then( gen =>{
            res.status(200).send('Género cargado');
            res.json(gen);
        })
        .catch(err => res.status(401).json(err));


};

generosCtrl.modificar = async (req,res) => {
    
    const generoViejo = await Genero.findById(req.body.id);
    const generoNuevo = await Genero.findOne({ nombre:req.body.nombre});
   
    if(generoNuevo && (generoNuevo != generoViejo)){
            res.status(401).json('El género ya fue cargado anteriormente')   
        
    }
        await generoViejo.update({
            nombre: req.body.nombre,
        }).then( res.status(200).json('Género modificado'))
    
    
    
};

generosCtrl.eliminar = async (req,res) => {
    await Genero.findByIdAndRemove(req.body.id)
        .then(res.status(200).send('Género eliminado'));
    
};

module.exports = generosCtrl;