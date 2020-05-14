const autoresCtrl = {};
const Autor = require('../models/Autor');

autoresCtrl.listar = async (req, res) => {
    const autores = await Autor.find();
    res.json(autores);
};

autoresCtrl.visualizar = async (req,res) => {
    const autor = await Autor.findById({_id: req.params.id});
    res.json(autor);
};

autoresCtrl.cargar = async (req,res) => {
    const autor = await Autor.findOne({ nombre:req.body.nombre , apellido:req.body.apellido} );
   
    if(autor){
        res.status(401).json('El autor ya fue cargado anteriormente')   
    }

    await Autor({
        nombre: req.body.nombre,
        apellido:req.body.apellido
    }).save()
        .then(aut => {
            res.json(aut);
            res.status(200).send('Autor cargado')
        })
        .catch(err => res.status(401).json(err));

};

autoresCtrl.modificar = async (req,res) => {
    
    const autorViejo = await Autor.findById(req.body.id);
    const autorNuevo = await Autor.findOne({ nombre:req.body.nombre , apellido:req.body.apellido } );
   
    if(autorNuevo  && (autorNuevo != autorViejo)){
        return res.status(401).json('El autor ya fue cargado anteriormente')   
    } 
    await autorViejo.update({
        nombre: req.body.nombre,
        apellido:req.body.apellido
    })
        .then( res.status(200).send('Autor modificado correctamente'));
 
    
};

autoresCtrl.eliminar = async (req,res) => {
    
    await Autor.findByIdAndRemove(req.body.id)
        .then(res.status(200).send('Autor eliminado correctamente'));
    
};


module.exports = autoresCtrl;