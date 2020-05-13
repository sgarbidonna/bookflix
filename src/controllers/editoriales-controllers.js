const editorialesCtrl = {};
const Editorial = require('../models/Editorial');

editorialesCtrl.listar = async (req, res) => {
    const editoriales = await Editorial.find();
    res.json(editoriales);
};

editorialesCtrl.visualizar = async (req,res) => {
    const editorial = await Editorial.findById({_id: req.params.id});
    res.json(editorial);
};

editorialesCtrl.cargar = async (req,res) => {
    const editorial = Editorial.findOne({nombre:req.body.nombre});
    
    if(editorial){
        res.json('La editorial ya fue cargada')
    }
    
    await new Editorial({
        nombre: req.body.nombre,
       })
        .save()
        .then(edit => {
            res.json(edit);
            res.status(200).send('Editorial cargada')
        })
        .catch(err => res.json(err));


};

editorialesCtrl.modificar = async (req,res) => {
    
    const editorialVieja = await Editorial.findById(req.params.id);
    const editorialNueva = await Editorial.findOne({ nombre:req.body.nombre} );
   
    //si encuentra un autorNuevo Y no es el mismo al viejo
    if(editorialNueva  && editorialNueva != editorialVieja){
        res.json('La editorial ya fue cargado')   
    } else {
        await new Editorial({
            nombre: req.body.nombre,
        })
        .save()
        .then(edit => {
            res.json(edit);
            res.status(200).send('Editorial cargada')
        })
        .catch(err => res.json(err));
    };
};

editorialesCtrl.eliminar = async (req,res) => {
    
    await Editorial.findById(req.params.id)
        .delete()
        .then(res.status(200).send('Editorial eliminada'));
    
};



module.exports = editorialesCtrl;