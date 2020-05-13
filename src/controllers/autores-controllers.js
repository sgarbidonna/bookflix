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
    const autor = await Autor.findOne({ nombre:req.body.nombre},{apellido:req.body.apellido} );
   
    if(autor){
        res.json('El autor ya fue cargado')   
    }

    await Autor({
        nombre: req.body.nombre,
        apellido:req.body.apellido
    }).save()
        .then(aut => {
            res.json(aut);
            res.status(200).send('Autor cargado')
        })
        .catch(err => res.json(err));

};

autoresCtrl.modificar = async (req,res) => {
    
    const autorViejo = await Autor.findById(req.params.id);
    const autorNuevo = await Autor.findOne({ nombre:req.body.nombre},{apellido:req.body.apellido} );
   
    //si encuentra un autorNuevo Y no es el mismo al viejo
    if(autorNuevo  && autorNuevo != autorViejo){
        res.json('El autor ya fue cargado')   
    } else {
        await new Autor({
            nombre: req.body.nombre,
            apellido:req.body.apellido
        })
            .save() 
            .then(autor => {
                autorViejo.delete();
                res.status(200).send('Autor modificado correctamente');
                res.json(autor)
            });
    };
    
};

autoresCtrl.eliminar = async (req,res) => {
    
    await Autor.findById(req.params.id)
        .delete()
        .then(res.status(200).send('Autor eliminado correctamente'));
    
};


module.exports = autoresCtrl;