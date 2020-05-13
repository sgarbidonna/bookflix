const generosCtrl = {};
const Genero = require('../models/Genero');

generosCtrl.listar = async (req, res) => {
    const generos = await Genero.find()
    res.json(generos);
};

generosCtrl.visualizar =async (req, res) => {
    const genero = await Genero.findById(req.params.id);
    res.json(genero);
};

generosCtrl.cargar=async (req,res) => {
    
    const genero = await Genero.findOne({ nombre:req.body.nombre });
    
    if(genero){
       return res.json('El género ya fue cargado')
    }
    await new Genero({
        nombre: req.body.nombre,
       }).save()
        .then( gen =>{
            res.status(200).send('Género cargado');
            res.json(gen);
        })
        .catch(err => res.json(err));


};

generosCtrl.modificar = async (req,res) => {
    
    const generoViejo = await Genero.findById(req.params.id);
    const generoNuevo = await Genero.findOne({ nombre:req.body.nombre});
   
    //si encuentra un autorNuevo Y no es el mismo al viejo
    if(generoNuevo  && generoNuevo != generoViejo){
        res.json('El género ya fue cargado')   
    } else {
        await new Genero({
            nombre: req.body.nombre,
        })
            .save() 
            .then(gen => {
                generoViejo.delete();
                res.status(200).send('Género modificado correctamente');
                res.json(gen)
            });
    };
    
};

generosCtrl.eliminar = async (req,res) => {
    await Genero.findById(req.params.id)
        .delete()
        .then(res.status(200).send('Género eliminado'));
    
};

module.exports = generosCtrl;