const editorialesCtrl = {};
const Editorial = require('../models/Editorial');

editorialesCtrl.listar = async (req, res) => {
    const editoriales = await Editorial.find().sort({ nombre: 'asc' });;
    res.json(editoriales);
};

editorialesCtrl.visualizar = async (req,res) => {
    const editorial = await Editorial.findById(req.body.id);
    res.json(editorial);
};

editorialesCtrl.cargar = async (req,res) => {
    const editorial = await Editorial.findOne({ nombre:req.body.nombre });
    

    if(editorial){
        return res.json('Intente con otro nombre, la editorial ingresada ya forma parte del sistema')
    }

    await new Editorial({
        nombre: req.body.nombre,
        })
        .save()
        .then(edit => {
            
            res.send('Editorial cargada');
            res.json(edit)
        })
        .catch(err => res.json(err));
    
    


};

editorialesCtrl.modificar = async (req,res) => {
    
    const editorialVieja = await Editorial.findById(req.body.id);
    const editorialNueva = await Editorial.findOne({ nombre:req.body.nombre} );
   
    
    if(editorialNueva  && (editorialNueva != editorialVieja)){
        res.json('Intente con otro nombre, la editorial ingresada ya forma parte del sistema')   
    } 

    await editorialVieja.update({ nombre: req.body.nombre })
        .then(res.send('Editorial modificada correctamente')  )
        .catch(err => res.json(err));
     
};

editorialesCtrl.eliminar = async (req,res) => {
    
    await Editorial.findByIdAndRemove(req.body.id)
        
        .then(res.send('Editorial eliminada'));
    
};



module.exports = editorialesCtrl;