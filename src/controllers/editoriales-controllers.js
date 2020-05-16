const editorialesCtrl = {};
const Editorial = require('../models/Editorial');

editorialesCtrl.listar = async (req, res) => {
    const editoriales = await Editorial.find();
    res.json(editoriales);
};

editorialesCtrl.visualizar = async (req,res) => {
    const editorial = await Editorial.findById(req.body.id);
    res.json(editorial);
};

editorialesCtrl.cargar = async (req,res) => {
    const editorial = await Editorial.findOne({ nombre:req.body.nombre });
    

    if(editorial){
        return res.status(401).json('La editorial ya fue cargada anteriormente')
    }

    await new Editorial({
        nombre: req.body.nombre,
        })
        .save()
        .then(edit => {
            res.json(edit);
            res.status(200).send('Editorial cargada')
        })
        .catch(err => res.status(401).json(err));
    
    


};

editorialesCtrl.modificar = async (req,res) => {
    
    const editorialVieja = await Editorial.findById(req.body.id);
    const editorialNueva = await Editorial.findOne({ nombre:req.body.nombre} );
   
    
    if(editorialNueva  && (editorialNueva != editorialVieja)){
        res.status(401).json('La editorial ya fue cargada anteriormente')   
    } 

    await editorialVieja.update({ nombre: req.body.nombre })
        .then(res.status(200).send('Editorial modificada correctamente')  )
        .catch(err => res.status(401).json(err));
     
};

editorialesCtrl.eliminar = async (req,res) => {
    
    await Editorial.findByIdAndRemove(req.body.id)
        
        .then(res.status(200).send('Editorial eliminada'));
    
};



module.exports = editorialesCtrl;