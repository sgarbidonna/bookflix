const novedadesCtrl = {};
const Novedad = require('../models/Novedad');


novedadesCtrl.listar = async (req, res) => {
    const novedades = await Novedad.find();
    res.json(novedades);
};

novedadesCtrl.visualizar = async (req, res) => {
    const novedad = await Novedad.findById({_id: req.params.id});
    res.json(novedad);
};

novedadesCtrl.cargar =  async (req,res) => {
    
    const novedad = await Novedad.findOne({titulo : req.body.titulo });
   
    if(novedad){
        res.status(401).json('La Novedad ya fue cargada anteriormente')
    }

    await new Novedad({
        titulo:req.body.titulo, 
        descripcion: req.body.descripcion,
        publicacion: req.body.publicacion,
        portada: req.file.filename,
       })
        .save()
        .then( novedad => {
            res.status(200).json({
                message: 'Novedad cargada con éxito',
                novedad
            })
        })
        .catch(err=> res.status(401).send(err));
};

novedadesCtrl.modificar = async (req,res) => {
    
    await Novedad.findByIdAndUpdate(req.body.id, {
        titulo:req.body.titulo, 
        descripcion: req.body.descripcion,
        publicacion: req.body.publicacion,
        portada: req.file.filename
       })
        .then( novedad => {
            res.status(200).json({
                message: 'Novedad modificada con éxito',
                novedad
            })
        })
        .catch(err=> res.status(401).json(err));
    
};

novedadesCtrl.eliminar = async (req,res) => {
    console.log(req.body.id);
    await Novedad.findByIdAndRemove(req.body.id)
        .then(res.status(200).send('Novedad eliminada'));
    
};

module.exports = novedadesCtrl;